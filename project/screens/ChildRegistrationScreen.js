import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

const ChildRegistrationScreen = () => {
  const [childName, setChildName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [records, setRecords] = useState([]); // ✅ To store registered children

  const handleRegister = () => {
    if (!childName || !dob || !gender) return; // simple validation

    // Add new record
    setRecords([
      ...records,
      { name: childName, dob: dob, gender: gender, id: Date.now().toString() },
    ]);

    // Clear inputs
    setChildName("");
    setDob("");
    setGender("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register Child</Text>

      <TextInput
        placeholder="Child Name"
        style={styles.input}
        value={childName}
        onChangeText={setChildName}
        placeholderTextColor="#555"
      />
      <TextInput
        placeholder="Date of Birth (DD/MM/YYYY)"
        style={styles.input}
        value={dob}
        onChangeText={setDob}
        placeholderTextColor="#555"
      />
      <TextInput
        placeholder="Gender"
        style={styles.input}
        value={gender}
        onChangeText={setGender}
        placeholderTextColor="#555"
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register Child</Text>
      </TouchableOpacity>

      {/* ✅ Display Records */}
      {records.length > 0 && (
        <View style={styles.recordsContainer}>
          <Text style={styles.recordsTitle}>Registered Children:</Text>
          {records.map((item) => (
            <View key={item.id} style={styles.recordCard}>
              <Text style={styles.bold}>Name: {item.name}</Text>
              <Text>DOB: {item.dob}</Text>
              <Text>Gender: {item.gender}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default ChildRegistrationScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1d4e89",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#e6f0ff",
    color: "#000",
  },
  button: {
    backgroundColor: "#1d4e89",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  recordsContainer: {
    marginTop: 20,
  },
  recordsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1d4e89",
    marginBottom: 10,
  },
  recordCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#f0f8ff",
  },
  bold: {
    fontWeight: "bold",
  },
});
