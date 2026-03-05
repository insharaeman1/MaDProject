import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [cnic, setCnic] = useState('');
  const [contact, setContact] = useState('');
  const [userType, setUserType] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!name || !cnic || !contact || !userType || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    // Here you can save the data to backend or local storage
    Alert.alert('Success', `User ${name} registered successfully!`);

    // Navigate to Login / Authentication screen
    navigation.replace('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} placeholder="Enter Name" value={name} onChangeText={setName} />

      <Text style={styles.label}>CNIC</Text>
      <TextInput style={styles.input} placeholder="Enter CNIC" value={cnic} onChangeText={setCnic} />

      <Text style={styles.label}>Contact</Text>
      <TextInput style={styles.input} placeholder="Enter Contact Number" value={contact} onChangeText={setContact} />

      <Text style={styles.label}>User Type</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={userType} onValueChange={setUserType} style={{ color: '#333' }}>
          <Picker.Item label="Select User Type" value="" />
          <Picker.Item label="Parent" value="parent" />
          <Picker.Item label="Supervisor" value="supervisor" />
          <Picker.Item label="Vaccinator" value="vaccinator" />
        </Picker>
      </View>

      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} placeholder="Enter Password" secureTextEntry value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f2f2f7', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#7B61FF', textAlign: 'center', marginBottom: 30 },
  label: { fontSize: 14, color: '#555', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 12, padding: 15, marginBottom: 15, backgroundColor: '#fff', fontSize: 16 },
  pickerContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 12, marginBottom: 15, overflow: 'hidden', backgroundColor: '#fff' },
  registerButton: { backgroundColor: '#7B61FF', paddingVertical: 15, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  registerText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});