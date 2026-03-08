import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const VaccinatorDashboard = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [todayStats, setTodayStats] = useState({
    registered: 0,
    vaccinated: 0,
    pending: 0,
  });
  const [recentRegistrations, setRecentRegistrations] = useState([]);

  useEffect(() => {
    loadUserData();
    loadTodayStats();
  }, []);

  const loadUserData = async () => {
    try {
      const data = await AsyncStorage.getItem('userData');
      if (data) {
        setUserData(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const loadTodayStats = async () => {
    try {
      const registrations = await AsyncStorage.getItem('childRegistrations');
      if (registrations) {
        const parsed = JSON.parse(registrations);
        const today = new Date().toDateString();
        
        const todayRegistrations = parsed.filter(
          reg => new Date(reg.registrationDate).toDateString() === today
        );

        setTodayStats({
          registered: todayRegistrations.length,
          vaccinated: todayRegistrations.filter(r => r.vaccinated).length,
          pending: todayRegistrations.filter(r => !r.vaccinated).length,
        });

        setRecentRegistrations(parsed.slice(-5).reverse());
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          onPress: async () => {
            await AsyncStorage.removeItem('userData');
            navigation.replace('Welcome');
          },
        },
      ]
    );
  };

  const menuItems = [
    {
      icon: 'account-child',
      title: 'Register Child',
      description: 'Register a new child',
      onPress: () => navigation.navigate('ChildRegistration'),
      color: '#4CAF50',
    },
    {
      icon: 'qrcode-scan',
      title: 'Scan QR Code',
      description: 'Scan child QR code for vaccination',
      onPress: () => Alert.alert('Coming Soon', 'QR Scanner feature coming soon!'),
      color: '#2196F3',
    },
    {
      icon: 'needle',
      title: 'Record Vaccination',
      description: 'Record vaccine doses',
      onPress: () => Alert.alert('Coming Soon', 'Vaccination recording coming soon!'),
      color: '#FF9800',
    },
    {
      icon: 'sync',
      title: 'Sync Data',
      description: 'Sync offline data to server',
      onPress: () => Alert.alert('Success', 'Data synced successfully!'),
      color: '#9C27B0',
    },
    {
      icon: 'clipboard-text',
      title: 'Daily Summary',
      description: 'View today\'s work summary',
      onPress: () => Alert.alert('Coming Soon', 'Daily summary coming soon!'),
      color: '#F44336',
    },
    {
      icon: 'map-marker',
      title: 'GPS Tracking',
      description: 'View your route history',
      onPress: () => Alert.alert('Coming Soon', 'GPS tracking coming soon!'),
      color: '#795548',
    },
  ];

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity style={styles.menuItem} onPress={item.onPress}>
      <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
        <Icon name={item.icon} size={30} color={item.color} />
      </View>
      <Text style={styles.menuTitle}>{item.title}</Text>
      <Text style={styles.menuDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.userName}>{userData?.fullName || 'Vaccinator'}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Icon name="logout" size={24} color="#F44336" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: '#4CAF50' }]}>
            <Icon name="account-plus" size={30} color="#fff" />
            <Text style={styles.statNumber}>{todayStats.registered}</Text>
            <Text style={styles.statLabel}>Registered Today</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#2196F3' }]}>
            <Icon name="needle" size={30} color="#fff" />
            <Text style={styles.statNumber}>{todayStats.vaccinated}</Text>
            <Text style={styles.statLabel}>Vaccinated</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#FF9800' }]}>
            <Icon name="clock-outline" size={30} color="#fff" />
            <Text style={styles.statNumber}>{todayStats.pending}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <FlatList
            data={menuItems}
            renderItem={renderMenuItem}
            keyExtractor={(item) => item.title}
            numColumns={2}
            columnWrapperStyle={styles.menuRow}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Registrations</Text>
          {recentRegistrations.length > 0 ? (
            recentRegistrations.map((item, index) => (
              <TouchableOpacity key={index} style={styles.recentItem}>
                <Icon name="account-child" size={24} color="#4CAF50" />
                <View style={styles.recentInfo}>
                  <Text style={styles.recentName}>{item.childName}</Text>
                  <Text style={styles.recentDetails}>
                    Age: {item.age} years | {item.gender}
                  </Text>
                </View>
                <Text style={styles.recentDate}>
                  {new Date(item.registrationDate).toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noDataText}>No recent registrations</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  greeting: {
    fontSize: 14,
    color: '#666',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  statCard: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    marginTop: 5,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  menuRow: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  menuItem: {
    flex: 0.48,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  menuDescription: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  recentInfo: {
    flex: 1,
    marginLeft: 15,
  },
  recentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  recentDetails: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  recentDate: {
    fontSize: 11,
    color: '#999',
  },
  noDataText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
    padding: 20,
  },
});

export default VaccinatorDashboard;