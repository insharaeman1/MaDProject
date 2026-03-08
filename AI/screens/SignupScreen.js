import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function SignupScreen({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const signup = () => {
    // Check empty fields
    if (!email || !password || !userType) {
      Alert.alert("Error", "Please enter all fields");
      return;
    }

    // Email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Alert.alert("Error", "Entered email is invalid");
      return;
    }

    // Password validation
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    // All validations passed
    Alert.alert(
      "Success",
      "Signup Successful",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("Login"), // Navigate to Login screen
        },
      ]
    );
  };

  return (
    <View style={{ padding: 20, marginTop: 100 }}>

      <Text style={{ fontSize: 24, marginBottom: 20 }}>Signup Page</Text>

      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ borderWidth: 1, marginTop: 10, padding: 10 }}
      />

      <TextInput
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginTop: 10, padding: 10 }}
      />

      <Picker
        selectedValue={userType}
        onValueChange={(itemValue) => setUserType(itemValue)}
        style={{ marginTop: 10 }}
      >
        <Picker.Item label="Select User Type" value="" />
        <Picker.Item label="Parent" value="parent" />
        <Picker.Item label="Child" value="child" />
        <Picker.Item label="Vaccinator" value="vaccinator" />
        <Picker.Item label="Supervisor" value="supervisor" />
      </Picker>

      <Button title="Signup" onPress={signup} />

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ color: "blue", textAlign: "center" }}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>

    </View>
  );
}