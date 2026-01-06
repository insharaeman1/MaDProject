import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, Alert } from "react-native";
import styles from "../styles/styles";
import savedUser from "../data/user";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === savedUser.email && password === savedUser.password) {
      navigation.navigate("Profile", { userName: savedUser.name, userEmail: savedUser.email });
    } else {
      Alert.alert("Login Failed", "Invalid email or password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link}>Create New Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
