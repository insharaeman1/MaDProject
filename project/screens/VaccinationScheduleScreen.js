import React from "react";
import { View, Text, StyleSheet } from "react-native";

const VaccinationScheduleScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Vaccination Schedule</Text>

    <View style={styles.card}>
      <Text style={styles.smallHeading}>Birth</Text>
      <Text>• BCG</Text>
      <Text>• OPV 0</Text>
    </View>

    <View style={styles.card}>
      <Text style={styles.smallHeading}>6 Weeks</Text>
      <Text>• OPV 1</Text>
      <Text>• Penta 1</Text>
      <Text>• PCV 1</Text>
    </View>
  </View>
);

export default VaccinationScheduleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1d4e89", 
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#f0f8ff",
  },
  smallHeading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
});
