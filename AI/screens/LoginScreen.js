import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const handleLogin = async () => {

    if (email === "" || password === "" || userType === "") {
      Alert.alert("Error", "Please enter all fields");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      Alert.alert("Error", "Please enter valid email");
      return;
    }

    const storedUser = await AsyncStorage.getItem("user");

    if (!storedUser) {
      Alert.alert("Error", "No account found. Please signup first.");
      return;
    }

    const user = JSON.parse(storedUser);

    if (
      email === user.email &&
      password === user.password &&
      userType === user.userType
    ) {
      Alert.alert("Success", "Login Successfully");
    } else {
      Alert.alert("Error", "Invalid Login Details");
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Enter Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Enter Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Picker
        selectedValue={userType}
        style={styles.input}
        onValueChange={(itemValue) => setUserType(itemValue)}
      >
        <Picker.Item label="Select User Type" value="" />
        <Picker.Item label="Child" value="Child" />
        <Picker.Item label="Parent" value="Parent" />
        <Picker.Item label="Vaccinator" value="Vaccinator" />
        <Picker.Item label="Supervisor" value="Supervisor" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link}>Don't have account? Signup</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, justifyContent:"center", padding:20 },
  title:{ fontSize:28, textAlign:"center", marginBottom:20 },
  input:{ borderWidth:1, padding:10, marginBottom:15, borderRadius:5 },
  button:{ backgroundColor:"green", padding:15, borderRadius:5 },
  buttonText:{ color:"#fff", textAlign:"center", fontSize:16 },
  link:{ textAlign:"center", marginTop:15, color:"blue" }
});