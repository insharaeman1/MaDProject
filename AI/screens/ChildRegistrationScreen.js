import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image, Platform 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChildRegisterScreen() {
  const [childName, setChildName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [motherCnic, setMotherCnic] = useState('');
  const [childPhoto, setChildPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [records, setRecords] = useState([]);

  // Auto-generate Child ID
  const generateChildID = () => 'CH' + Math.floor(Math.random() * 1000000);

  // Request location permission
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);
      }
    })();
    loadRecords();
  }, []);

  // Load previously saved children
  const loadRecords = async () => {
    try {
      const data = await AsyncStorage.getItem('children');
      if (data) setRecords(JSON.parse(data));
    } catch (e) {
      console.log(e);
    }
  };

  // Save child record locally
  const saveRecord = async (record) => {
    try {
      const updatedRecords = [...records, record];
      await AsyncStorage.setItem('children', JSON.stringify(updatedRecords));
      setRecords(updatedRecords);
    } catch (e) {
      console.log(e);
    }
  };

  // Handle photo upload
  const handlePhotoUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled) setChildPhoto(result.assets[0].uri);
  };

  const handleRegisterChild = () => {
    if (!childName || !age || !gender || !address || !motherCnic) {
      return Alert.alert('Error', 'Please fill all fields.');
    }

    const newChild = {
      id: generateChildID(),
      childName,
      age,
      gender,
      address,
      motherCnic,
      childPhoto,
      location,
      createdAt: new Date(),
    };

    saveRecord(newChild);
    Alert.alert('Success', `Child Registered!\nID: ${newChild.id}`);

    // Clear form
    setChildName(''); setAge(''); setGender(''); setAddress(''); setMotherCnic('');
    setChildPhoto(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Child Registration & Vaccination</Text>

      <TextInput 
        placeholder="Child Name" 
        style={styles.input} 
        value={childName} 
        onChangeText={setChildName} 
      />

      <TextInput 
        placeholder="Age" 
        style={styles.input} 
        keyboardType="numeric"
        value={age} 
        onChangeText={setAge} 
      />

      <Text>Gender</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={gender} onValueChange={setGender}>
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
      </View>

      <TextInput 
        placeholder="Address" 
        style={[styles.input, {height:80}]} 
        multiline 
        value={address} 
        onChangeText={setAddress} 
      />

      <TextInput 
        placeholder="Mother CNIC" 
        style={styles.input} 
        keyboardType="numeric"
        value={motherCnic} 
        onChangeText={setMotherCnic} 
      />

      <TouchableOpacity style={styles.photoButton} onPress={handlePhotoUpload}>
        <Text style={styles.photoText}>{childPhoto ? 'Change Photo' : 'Upload Photo'}</Text>
      </TouchableOpacity>
      {childPhoto && <Image source={{ uri: childPhoto }} style={styles.photoPreview} />}

      <TouchableOpacity style={styles.registerButton} onPress={handleRegisterChild}>
        <Text style={styles.registerText}>Register Child</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Registered Children</Text>
      {records.map((item, index) => (
        <View key={index} style={styles.recordCard}>
          <Text style={{ fontWeight:'bold' }}>{item.childName} ({item.gender})</Text>
          <Text>ID: {item.id}</Text>
          <Text>Age: {item.age}, Mother CNIC: {item.motherCnic}</Text>
          {item.childPhoto && <Image source={{ uri: item.childPhoto }} style={styles.recordPhoto} />}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow:1, padding:20, backgroundColor:'#f2f2f7' },
  title: { fontSize:24, fontWeight:'bold', color:'#7B61FF', marginBottom:20, textAlign:'center' },
  input: { borderWidth:1, borderColor:'#ccc', borderRadius:12, padding:15, marginBottom:15, backgroundColor:'#fff' },
  pickerContainer: { borderWidth:1, borderColor:'#ccc', borderRadius:12, marginBottom:15, backgroundColor:'#fff' },
  photoButton: { backgroundColor:'#7B61FF', padding:15, borderRadius:12, alignItems:'center', marginBottom:15 },
  photoText: { color:'#fff', fontWeight:'bold' },
  photoPreview: { width:100, height:100, borderRadius:50, marginBottom:15, alignSelf:'center' },
  registerButton: { backgroundColor:'#7B61FF', padding:15, borderRadius:12, alignItems:'center', marginTop:10 },
  registerText: { color:'#fff', fontWeight:'bold', fontSize:16 },
  sectionTitle: { fontSize:20, fontWeight:'bold', marginTop:30, marginBottom:10, color:'#333' },
  recordCard: { backgroundColor:'#fff', padding:15, borderRadius:12, marginBottom:10 },
  recordPhoto: { width:60, height:60, borderRadius:30, marginTop:5 },
});