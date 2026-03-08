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
import { LineChart, BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const SupervisorDashboard = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [coverageData, setCoverageData] = useState({
    totalChildren: 0,
    vaccinated: 0,
    missed: 0,
    refusal: 0,
  });
  const [vaccinatorPerformance, setVaccinatorPerformance] = useState([]);

  useEffect(() => {
    loadUserData();
    loadDashboardData();
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

  const loadDashboardData = async () => {
    try {
      const registrations = await AsyncStorage.getItem('childRegistrations');
      if (registrations) {
        const parsed = JSON.parse(registrations);
        
        setCoverageData({
          totalChildren: parsed.length,
          vaccinated: parsed.filter(r => r.vaccinated).length,
          missed: parsed.filter(r => !r.vaccinated && !r.refusal).length,
          refusal: parsed.filter(r => r.refusal).length,
        });

        // Mock vaccinator performance data
        setVaccinatorPerformance([
          { name: 'Dr. Ali', completed: 45, pending: 12, target: 60 },
          { name: 'Dr. Sara', completed: 52, pending: 8, target: 60 },
          { name: 'Dr. Ahmed', completed: 38, pending: 15, target: 60 },
          { name: 'Dr. Fatima', completed: 48, pending: 10, target: 60 },
        ]);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
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

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [65, 78, 82, 87, 92, 95],
        color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  const menuItems = [
    {
      icon: 'account-multiple',
      title: 'Missed Children',
      description: 'View list of missed vaccinations',
      onPress: () => Alert.alert('Coming Soon', 'Missed children list coming soon!'),
      color: '#F44336',
    },
    {
      icon: 'alert-circle',
      title: 'Refusal Cases',
      description: 'Track vaccination refusals',
      onPress: () => Alert.alert('Coming Soon', 'Refusal cases coming soon!'),
      color: '#FF9800',
    },
    {
      icon: 'chart-line',
      title: 'Area Reports',
      description: 'Area-wise vaccination reports',
      onPress: () => Alert.alert('Coming Soon', 'Area reports coming soon!'),
      color: '#2196F3',
    },
    {
      icon: 'account-supervisor',
      title: 'Team Performance',
      description: 'Monitor vaccinator performance',
      onPress: () => Alert.alert('Coming Soon', 'Team performance coming soon!'),
      color: '#9C27B0',
    },
  ];

  const renderPerformanceItem = ({ item }) => (
    <View style={styles.performanceItem}>
      <Text style={styles.performanceName}>{item.name}</Text>
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${(item.completed / item.target) * 100}%` }
          ]} 
        />
      </View>
      <View style={styles.performanceStats}>
        <Text style={styles.completedText}>{item.completed} Completed</Text>
        <Text style={styles.pendingText}>{item.pending} Pending</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.userName}>{userData?.fullName || 'Supervisor'}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Icon name="logout" size={24} color="#F44336" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: '#4CAF50' }]}>
            <Icon name="account-child" size={30} color="#fff" />
            <Text style={styles.statNumber}>{coverageData.totalChildren}</Text>
            <Text style={styles.statLabel}>Total Children</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#2196F3' }]}>
            <Icon name="needle" size={30} color="#fff" />
            <Text style={styles.statNumber}>{coverageData.vaccinated}</Text>
            <Text style={styles.statLabel}>Vaccinated</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#F44336' }]}>
            <Icon name="close-circle" size={30} color="#fff" />
            <Text style={styles.statNumber}>{coverageData.missed}</Text>
            <Text style={styles.statLabel}>Missed</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#FF9800' }]}>
            <Icon name="alert" size={30} color="#fff" />
            <Text style={styles.statNumber}>{coverageData.refusal}</Text>
            <Text style={styles.statLabel}>Refusal</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vaccination Coverage Trend</Text>
          <View style={styles.chartContainer}>
            <LineChart
              data={chartData}
              width={width - 40}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.menuGrid}>
            {menuItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
                <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
                  <Icon name={item.icon} size={30} color={item.color} />
                </View>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuDescription}>{item.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vaccinator Performance</Text>
          <View style={styles.performanceContainer}>
            {vaccinatorPerformance.map((item, index) => (
              <View key={index} style={styles.performanceItem}>
                <Text style={styles.performanceName}>{item.name}</Text>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${(item.completed / item.target) * 100}%` }
                    ]} 
                  />
                </View>
                <View style={styles.performanceStats}>
                  <Text style={styles.completedText}>{item.completed} Completed</Text>
                  <Text style={styles.pendingText}>{item.pending} Pending</Text>
                </View>
              </View>
            ))}
          </View>
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
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
  },
  statCard: {
    width: '48%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  statNumber: {
    fontSize: 28,
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
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
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
    textAlign: 'center',
  },
  menuDescription: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
  },
  performanceContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  performanceItem: {
    marginBottom: 20,
  },
  performanceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  performanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  completedText: {
    fontSize: 12,
    color: '#4CAF50',
  },
  pendingText: {
    fontSize: 12,
    color: '#FF9800',
  },
});

export default SupervisorDashboard;