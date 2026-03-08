import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
import Geolocation from 'react-native-geolocation-service';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import QRCode from 'react-native-qrcode-svg';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateCNIC } from '../utils/validation';

const ChildRegistrationScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    childName: '',
    age: '',
    gender: 'male',
    address: '',
    motherCNIC: '',
    fatherName: '',
    contactNumber: '',
  });

  const [childPhoto, setChildPhoto] = useState(null);
  const [vaccinationCard, setVaccinationCard] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [qrValue, setQrValue] = useState(null);
  const [uniqueId, setUniqueId] = useState(null);

  useEffect(() => {
    getCurrentLocation();
    generateUniqueId();
  }, []);

  const generateUniqueId = () => {
    const id = uuid.v4();
    setUniqueId(id);
    setQrValue(id);
  };

  const getCurrentLocation = async () => {
    try {
      const permission = Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      });

      const result = await check(permission);

      if (result === RESULTS.DENIED) {
        const requestResult = await request(permission);
        if (requestResult !== RESULTS.GRANTED) {
          Alert.alert('Error', 'Location permission is required');
          return;
        }
      }

      Geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
          Alert.alert('Error', 'Failed to get location');
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const pickImage = (type) => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 1,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        Alert.alert('Error', 'ImagePicker Error: ' + response.error);
      } else {
        if (type === 'child') {
          setChildPhoto(response.assets[0]);
        } else {
          setVaccinationCard(response.assets[0]);
        }
      }
    });
  };

  const takePhoto = (type) => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 1,
      saveToPhotos: true,
    };

    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        Alert.alert('Error', 'Camera Error: ' + response.error);
      } else {
        if (type === 'child') {
          setChildPhoto(response.assets[0]);
        } else {
          setVaccinationCard(response.assets[0]);
        }
      }
    });
  };

  const validateForm = () => {
    if (!formData.childName.trim()) {
      Alert.alert('Error', 'Please enter child name');
      return false;
    }

    if (!formData.age || parseInt(formData.age) < 0 || parseInt(formData.age) > 18) {
      Alert.alert('Error', 'Please enter valid age (0-18 years)');
      return false;
    }

    if (!formData.motherCNIC.trim()) {
      Alert.alert('Error', 'Please enter mother CNIC');
      return false;
    }

    if (!validateCNIC(formData.motherCNIC.replace(/-/g, ''))) {
      Alert.alert('Error', 'Please enter a valid 13-digit CNIC number');
      return false;
    }

    if (!formData.address.trim()) {
      Alert.alert('Error', 'Please enter address');
      return false;
    }

    if (!location) {
      Alert.alert('Error', 'Unable to get location. Please try again.');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Prepare registration data
      const registrationData = {
        ...formData,
        uniqueId,
        location,
        childPhoto: childPhoto ? childPhoto.uri : null,
        vaccinationCard: vaccinationCard ? vaccinationCard.uri : null,
        registrationDate: new Date().toISOString(),
        qrCode: qrValue,
        vaccinations: [
          { name: 'Polio', status: 'pending', dueDate: '2024-01-15' },
          { name: 'Pentavalent', status: 'pending', dueDate: '2024-01-20' },
          { name: 'PCV', status: 'pending', dueDate: '2024-01-25' },
          { name: 'Rotavirus', status: 'pending', dueDate: '2024-01-30' },
        ],
      };

      // Save to local storage (for offline mode)
      const existingRegistrations = await AsyncStorage.getItem('childRegistrations');
      const registrations = existingRegistrations ? JSON.parse(existingRegistrations) : [];
      registrations.push(registrationData);
      await AsyncStorage.setItem('childRegistrations', JSON.stringify(registrations));

      setLoading(false);
      Alert.alert(
        'Success',
        'Child registered successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to register child. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Child Registration</Text>
      </View>

      {qrValue && (
        <View style={styles.qrContainer}>
          <QRCode
            value={qrValue}
            size={150}
            color="black"
            backgroundColor="white"
          />
          <Text style={styles.qrText}>Scan QR Code for child details</Text>
        </View>
      )}

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Icon name="account-child" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Child Name *"
            value={formData.childName}
            onChangeText={(text) => setFormData({...formData, childName: text})}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="calendar" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Age (in years) *"
            value={formData.age}
            onChangeText={(text) => setFormData({...formData, age: text})}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.pickerContainer}>
          <Icon name="gender-male-female" size={20} color="#666" style={styles.inputIcon} />
          <Picker
            selectedValue={formData.gender}
            style={styles.picker}
            onValueChange={(itemValue) => setFormData({...formData, gender: itemValue})}
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Icon name="card-account-details" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Mother's CNIC (without dashes) *"
            value={formData.motherCNIC}
            onChangeText={(text) => setFormData({...formData, motherCNIC: text})}
            keyboardType="numeric"
            maxLength={13}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="account" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Father's Name"
            value={formData.fatherName}
            onChangeText={(text) => setFormData({...formData, fatherName: text})}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="phone" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChangeText={(text) => setFormData({...formData, contactNumber: text})}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="map-marker" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Address *"
            value={formData.address}
            onChangeText={(text) => setFormData({...formData, address: text})}
            multiline
          />
        </View>

        <View style={styles.locationContainer}>
          <Icon name="crosshairs-gps" size={20} color="#4CAF50" />
          <Text style={styles.locationText}>
            {location ? 
              `Location captured: ${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}` : 
              'Capturing location...'}
          </Text>
        </View>

        <View style={styles.imageSection}>
          <Text style={styles.sectionTitle}>Child Photo</Text>
          <View style={styles.imageButtons}>
            <TouchableOpacity
              style={styles.imageButton}
              onPress={() => takePhoto('child')}
            >
              <Icon name="camera" size={24} color="#4CAF50" />
              <Text style={styles.imageButtonText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.imageButton}
              onPress={() => pickImage('child')}
            >
              <Icon name="image" size={24} color="#4CAF50" />
              <Text style={styles.imageButtonText}>Gallery</Text>
            </TouchableOpacity>
          </View>
          {childPhoto && (
            <Image source={{ uri: childPhoto.uri }} style={styles.previewImage} />
          )}
        </View>

        <View style={styles.imageSection}>
          <Text style={styles.sectionTitle}>Vaccination Card</Text>
          <View style={styles.imageButtons}>
            <TouchableOpacity
              style={styles.imageButton}
              onPress={() => takePhoto('card')}
            >
              <Icon name="camera" size={24} color="#4CAF50" />
              <Text style={styles.imageButtonText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.imageButton}
              onPress={() => pickImage('card')}
            >
              <Icon name="image" size={24} color="#4CAF50" />
              <Text style={styles.imageButtonText}>Gallery</Text>
            </TouchableOpacity>
          </View>
          {vaccinationCard && (
            <Image source={{ uri: vaccinationCard.uri }} style={styles.previewImage} />
          )}
        </View>

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Register Child</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#f9f9f9',
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  qrContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  qrText: {
    marginTop: 10,
    fontSize: 12,
    color: '#666',
  },
  form: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
  },
  picker: {
    flex: 1,
    height: 50,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  locationText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#2e7d32',
  },
  imageSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  imageButton: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f9f0',
    borderRadius: 10,
    flex: 0.45,
  },
  imageButtonText: {
    color: '#4CAF50',
    marginTop: 5,
    fontSize: 12,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  disabledButton: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChildRegistrationScreen;