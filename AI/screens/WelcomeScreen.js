import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const CareSyncLogo = () => (
  <View style={styles.logoWrapper}>
    <Svg width="120" height="120" viewBox="0 0 100 100">
      <Path d="M50 85C50 85 15 60 15 35C15 20 28 15 35 15C42 15 50 22 50 22C50 22 58 15 65 15C72 15 85 20 85 35C85 60 50 85 50 85Z"
        fill="none" stroke="white" strokeWidth="4" strokeLinecap="round"
      />
      <Circle cx="40" cy="35" r="3" fill="white" />
      <Circle cx="60" cy="35" r="3" fill="white" />
      <Path d="M40 45C40 45 45 50 50 50C55 50 60 45 60 45"
        fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"
      />
      <Path d="M48 65 L52 65 M50 65 L50 75" stroke="white" strokeWidth="3" />
    </Svg>
  </View>
);

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <CareSyncLogo />

      <Text style={styles.title}>AI-Powered Immunization & Vaccination Portal</Text>
      <Text style={styles.subtitle}>
        Keep your family safe with timely immunizations, reminders, and health insights.
      </Text>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.replace('Home')} // Navigate directly to Home
      >
        <Text style={styles.nextButtonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: '#7B61FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  logoWrapper: { marginBottom: 25 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  subtitle: { color: '#e0dfff', fontSize: 16, textAlign: 'center', marginBottom: 50, lineHeight: 22 },
  nextButton: { backgroundColor: '#fff', paddingVertical: 15, paddingHorizontal: 50, borderRadius: 25 },
  nextButtonText: { color: '#7B61FF', fontSize: 18, fontWeight: 'bold' },
});