import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import { isValidEmail, isValidPassword, isEmpty } from '../utils/validation';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');

  const handleSignup = () => {
    if (isEmpty(email) || isEmpty(password) || isEmpty(userType)) {
      return Alert.alert('Error', 'Please enter all fields!');
    }
    if (!isValidEmail(email)) return Alert.alert('Error', 'Enter a valid email!');
    if (!isValidPassword(password)) return Alert.alert('Error', 'Password must be at least 6 characters!');

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[email]) return Alert.alert('Error', 'User already exists!');

    users[email] = { email, password, userType };
    localStorage.setItem('users', JSON.stringify(users));
    Alert.alert('Success', 'Signup Successful! Login now.');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput placeholder="User Type (Child/Vaccinator/Supervisor)" style={styles.input} value={userType} onChangeText={setUserType} />
      <CustomButton title="Signup" onPress={handleSignup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 8, borderRadius: 5 },
});