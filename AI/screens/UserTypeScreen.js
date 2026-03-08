import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserTypeScreen = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState(null);

  const handleContinue = async () => {
    if (!selectedType) {
      Alert.alert('Error', 'Please select a user type');
      return;
    }

    try {
      // Save user type
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsed = JSON.parse(userData);
        parsed.userType = selectedType;
        await AsyncStorage.setItem('userData', JSON.stringify(parsed));
      }

      // Navigate based on selection
      if (selectedType === 'vaccinator') {
        navigation.replace('VaccinatorDashboard');
      } else {
        navigation.replace('SupervisorDashboard');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save user type');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="account-switch" size={60} color="#4CAF50" />
        <Text style={styles.title}>Select User Type</Text>
        <Text style={styles.subtitle}>Choose how you want to continue</Text>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.option,
            selectedType === 'vaccinator' && styles.selectedOption,
          ]}
          onPress={() => setSelectedType('vaccinator')}
        >
          <Icon
            name="needle"
            size={40}
            color={selectedType === 'vaccinator' ? '#4CAF50' : '#666'}
          />
          <Text
            style={[
              styles.optionTitle,
              selectedType === 'vaccinator' && styles.selectedOptionText,
            ]}
          >
            Vaccinator
          </Text>
          <Text style={styles.optionDescription}>
            Register children and manage vaccinations
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            selectedType === 'supervisor' && styles.selectedOption,
          ]}
          onPress={() => setSelectedType('supervisor')}
        >
          <Icon
            name="account-supervisor"
            size={40}
            color={selectedType === 'supervisor' ? '#4CAF50' : '#666'}
          />
          <Text
            style={[
              styles.optionTitle,
              selectedType === 'supervisor' && styles.selectedOptionText,
            ]}
          >
            Supervisor
          </Text>
          <Text style={styles.optionDescription}>
            Monitor coverage and team performance
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.continueButton, !selectedType && styles.disabledButton]}
        onPress={handleContinue}
        disabled={!selectedType}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  option: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: '#4CAF50',
    backgroundColor: '#f0f9f0',
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
  },
  selectedOptionText: {
    color: '#4CAF50',
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserTypeScreen;