import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Title } from "react-native-paper";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Title>ImmunoSphere</Title>
      <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input}/>
      <TextInput label="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input}/>
      <Button mode="contained" onPress={() => navigation.navigate("RoleSelect")}>
        Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { marginBottom: 15 }
});