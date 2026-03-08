import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

export default function SignupScreen({ navigation }) {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [userType, setUserType] = useState(""); // State for user type

  const onSubmit = async (data) => {
    if (!userType) {
      Alert.alert("Error", "Please select a user type!");
      return;
    }

    try {
      const existingUser = await AsyncStorage.getItem(data.email);
      if (existingUser) {
        Alert.alert("Error", "Email is already registered!");
      } else {
        const userData = {
          name: data.name,
          email: data.email,
          password: data.password,
          userType: userType, // Add user type to stored data
        };
        await AsyncStorage.setItem(data.email, JSON.stringify(userData));

        // Success message
        Alert.alert(
          "Success",
          "You have signed up successfully!",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("Login"), // Navigate to Login
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>

      {/* Name Field */}
      <Controller
        control={control}
        name="name"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.name && <Text style={styles.error}>*Name is mandatory</Text>}

      {/* Email Field */}
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
          />
        )}
      />
      {errors.email && <Text style={styles.error}>*Enter a valid email</Text>}

      {/* Password Field */}
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

      {/* User Type Picker */}
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

      {/* Signup Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>

      {/* Already have an account? Login */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ color: "#1E90FF", textAlign: "center", fontSize: 16 }}>
          Already have an account? Login
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