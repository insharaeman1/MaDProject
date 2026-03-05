import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      
      {/* Logo / Icon */}
      <View style={styles.logoCircle}>
        <Text style={styles.logoIcon}>🛡️</Text>
      </View>

      {/* App Name */}
      <Text style={styles.appName}>ImmunoSphere</Text>
      <Text style={styles.subtitle}>AI-Powered Immunization & Vaccination Portal</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        {/* Navigate to RegisterScreen */}
        <TouchableOpacity 
          style={styles.registerButton} 
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>

        {/* Navigate to LoginScreen */}
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>Already Registered? Login</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    backgroundColor: '#f2f2f7',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#7B61FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoIcon: { fontSize: 48, color: '#fff' },
  appName: { fontSize: 32, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#555', textAlign: 'center', marginBottom: 40, lineHeight: 22 },
  buttonContainer: { width: '100%' },
  registerButton: {
    backgroundColor: '#7B61FF',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  registerText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  loginButton: {
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  loginText: { color: '#7B61FF', fontSize: 16, fontWeight: 'bold' },
});