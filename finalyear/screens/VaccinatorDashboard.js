// screens/VaccinatorDashboard.js
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function VaccinatorDashboard() {
  const [childID, setChildID] = useState("");
  const [doseType, setDoseType] = useState("");
  const [doses, setDoses] = useState([]);

  // Load doses from storage on mount
  useEffect(() => {
    fetchDoses();
  }, []);

  const fetchDoses = async () => {
    const storedDoses = await AsyncStorage.getItem("doses");
    setDoses(storedDoses ? JSON.parse(storedDoses) : []);
  };

  const saveDose = async () => {
    if (!childID || !doseType) {
      Alert.alert("Error", "Child ID and Dose Type are required!");
      return;
    }

    const newDose = {
      id: Date.now().toString(),
      childID,
      doseType,
      timestamp: new Date().toISOString(),
      latitude: 0, // web: no GPS
      longitude: 0, // web: no GPS
    };

    const updatedDoses = [...doses, newDose];
    await AsyncStorage.setItem("doses", JSON.stringify(updatedDoses));
    setDoses(updatedDoses);
    setChildID("");
    setDoseType("");
    Alert.alert("Success", `Dose recorded for child ${newDose.childID}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vaccinator Dashboard (Web)</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Child ID"
        value={childID}
        onChangeText={setChildID}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Dose Type"
        value={doseType}
        onChangeText={setDoseType}
      />

      <TouchableOpacity style={styles.button} onPress={saveDose}>
        <Text style={styles.buttonText}>Record Dose</Text>
      </TouchableOpacity>

      <Text style={{ fontWeight: "bold", marginTop: 20 }}>Daily Work Summary:</Text>
      <FlatList
        data={doses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Child ID: {item.childID}</Text>
            <Text>Dose: {item.doseType}</Text>
            <Text>Time: {new Date(item.timestamp).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 15, borderRadius: 8, marginBottom: 10, backgroundColor: "#fff" },
  button: { backgroundColor: "#4CAF50", padding: 15, borderRadius: 25, marginBottom: 20 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  item: { backgroundColor: "#fff", padding: 10, marginVertical: 5, borderRadius: 8 },
});