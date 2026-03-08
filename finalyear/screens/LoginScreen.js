// screens/LoginScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

export default function LoginScreen({ navigation }) {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [userType, setUserType] = useState(""); // Selected user type

  const onSubmit = async (data) => {
    if (!userType) {
      Alert.alert("Error", "Please select a user type!");
      return;
    }

    if (!data.email || !data.password) {
      Alert.alert("Error", "Please enter both email and password!");
      return;
    }

    try {
      const storedUser = await AsyncStorage.getItem(data.email);
      if (!storedUser) {
        Alert.alert("Error", "No account found with this email. Please signup first.");
        return;
      }

      const user = JSON.parse(storedUser);

      if (user.password !== data.password) {
        Alert.alert("Error", "Incorrect password!");
        return;
      }

      if (user.userType !== userType) {
        Alert.alert("Error", `Selected user type does not match registered type (${user.userType})`);
        return;
      }

      // Navigate based on user type
      switch (user.userType) {
        case "Child":
          navigation.navigate("ChildRegistration");
          break;
        case "Vaccinator":
          navigation.navigate("VaccinatorDashboard");
          break;
        case "Supervisor":
          navigation.navigate("SupervisorDashboard");
          break;
        default:
          navigation.navigate("WelcomeScreen");
      }

    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Email */}
      <Controller
        control={control}
        name="email"
        rules={{ required: true, pattern: /^\S+@\S+\.\S+$/ }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>*Enter a valid email</Text>}

      {/* Password */}
      <Controller
        control={control}
        name="password"
        rules={{ required: true, minLength: 6 }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={value}
            onChangeText={onChange}
            secureTextEntry
          />
        )}
      />
      {errors.password && <Text style={styles.error}>*Password must be at least 6 characters</Text>}

      {/* User Type */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={userType}
          onValueChange={(itemValue) => setUserType(itemValue)}
        >
          <Picker.Item label="Select User Type" value="" />
          <Picker.Item label="Child" value="Child" />
          <Picker.Item label="Vaccinator" value="Vaccinator" />
          <Picker.Item label="Supervisor" value="Supervisor" />
        </Picker>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Signup Link */}
      <TouchableOpacity onPress={() => navigation.navigate("Signup")} style={{ marginTop: 20 }}>
        <Text style={{ color: "#1E90FF", textAlign: "center", fontSize: 16 }}>
          Don't have an account? Signup
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});