import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Picker } from "react-native";

export default function VaccinationEntry() {
  const [children, setChildren] = useState([]);
  const [selectedChildId, setSelectedChildId] = useState("");
  const [vaccine, setVaccine] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const storedChildren = JSON.parse(localStorage.getItem("children") || "[]");
    setChildren(storedChildren);
  }, []);

  const handleVaccination = () => {
    if (!selectedChildId || !vaccine || !date) return Alert.alert("Error", "Please fill all fields!");

    const updatedChildren = children.map((c) => {
      if (c.id === selectedChildId) {
        return { ...c, vaccinated: true, vaccine, vaccinationDate: date };
      }
      return c;
    });

    localStorage.setItem("children", JSON.stringify(updatedChildren));
    Alert.alert("Success", "Vaccination Recorded!");
    setSelectedChildId("");
    setVaccine("");
    setDate("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Record Vaccination</Text>

      <Text>Select Child</Text>
      <Picker
        selectedValue={selectedChildId}
        onValueChange={(itemValue) => setSelectedChildId(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="--Select Child--" value="" />
        {children.map((child) => (
          <Picker.Item key={child.id} label={child.name} value={child.id} />
        ))}
      </Picker>

      <Text>Vaccine Name</Text>
      <TextInput
        placeholder="Polio / Routine"
        style={styles.input}
        value={vaccine}
        onChangeText={setVaccine}
      />

      <Text>Vaccination Date</Text>
      <TextInput
        placeholder="YYYY-MM-DD"
        style={styles.input}
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity style={styles.button} onPress={handleVaccination}>
        <Text style={styles.buttonText}>Record Vaccination</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginVertical: 10, borderRadius: 5 },
  picker: { borderWidth: 1, borderColor: "#ccc", marginVertical: 10 },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});