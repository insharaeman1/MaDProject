import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import styles from "../styles/styles";

const ChildRegistrationScreen = () => {
  const [childName, setChildName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register Child</Text>
      <TextInput placeholder="Child Name" style={styles.input} value={childName} onChangeText={setChildName} />
      <TextInput placeholder="Date of Birth (DD/MM/YYYY)" style={styles.input} value={dob} onChangeText={setDob} />
      <TextInput placeholder="Gender" style={styles.input} value={gender} onChangeText={setGender} />
      <Button title="Register Child" onPress={() => Alert.alert("Child Registered Successfully!")} />
    </View>
  );
};

export default ChildRegistrationScreen;
