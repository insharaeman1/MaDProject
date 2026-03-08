import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import { isValidEmail, isEmpty } from '../utils/validation';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (isEmpty(email) || isEmpty(password)) return Alert.alert('Error', 'Please enter all fields!');
    if (!isValidEmail(email)) return Alert.alert('Error', 'Enter a valid email!');

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const user = users[email];
    if (!user) return Alert.alert('Error', 'User not found. Please signup first.');
    if (user.password !== password) return Alert.alert('Error', 'Incorrect password!');

    // Navigate based on user type
    if (user.userType.toLowerCase() === 'child') navigation.navigate('ChildDashboard');
    else if (user.userType.toLowerCase() === 'vaccinator') navigation.navigate('VaccinatorDashboard');
    else if (user.userType.toLowerCase() === 'supervisor') navigation.navigate('SupervisorDashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <CustomButton title="Login" onPress={handleLogin} />
      <Text style={{ marginTop: 20 }} onPress={() => navigation.navigate('Signup')}>
        Don't have an account? Signup
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 8, borderRadius: 5 },
});