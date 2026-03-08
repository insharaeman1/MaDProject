import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';

export default function ChildRegistration() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [motherCNIC, setMotherCNIC] = useState('');

  const handleRegister = () => {
    if (!name || !age || !gender || !motherCNIC) return Alert.alert('Error', 'Please fill all fields!');
    // Save child to localStorage for simplicity
    const children = JSON.parse(localStorage.getItem('children') || '[]');
    children.push({ name, age, gender, motherCNIC, id: Date.now() });
    localStorage.setItem('children', JSON.stringify(children));
    Alert.alert('Success', 'Child Registered Successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Child Registration</Text>
      <TextInput placeholder="Child Name" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Age" style={styles.input} value={age} onChangeText={setAge} keyboardType="numeric" />
      <TextInput placeholder="Gender" style={styles.input} value={gender} onChangeText={setGender} />
      <TextInput placeholder="Mother CNIC" style={styles.input} value={motherCNIC} onChangeText={setMotherCNIC} />
      <CustomButton title="Register" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 8, borderRadius: 5 },
});