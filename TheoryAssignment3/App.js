import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

// -------------------- Home Screen --------------------
function HomeScreen({ navigation }) {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Welcome to Polio App</Text>
      <Button title="Signup" onPress={() => navigation.navigate("Signup")} />
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}