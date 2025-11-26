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
// -------------------- Signup Screen --------------------
function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (name && email && password) {
      Alert.alert(
        "Signup Successful",
        `Account created for ${name}. Please login.`
      );
      navigation.replace("Login"); // Navigate to login after signup
    } else {
      Alert.alert("Error", "Please fill all fields.");
    }
  };
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
<TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
}
// -------------------- Login Screen --------------------
function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password) {
      Alert.alert("Login Successful", `Welcome back!`);
      navigation.replace("Profile", { userName: "User", userEmail: email }); // Navigate to Profile after login
    } else {
      Alert.alert("Error", "Please fill all fields.");
    }
  };

  return (
    <View style={styles.center}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}