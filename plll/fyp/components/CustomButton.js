import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CustomButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, alignItems: 'center', marginVertical: 10 },
  text: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});