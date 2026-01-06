import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";

const ParentsGuideScreen = () => (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>Parents Guide</Text>
    <Text style={styles.text}>✔ Vaccines protect your child.</Text>
    <Text style={styles.text}>✔ Keep vaccination card safe.</Text>
    <Text style={styles.text}>✔ Mild fever after vaccine is normal.</Text>
    <Text style={styles.text}>✔ Follow national immunization schedule.</Text>
  </ScrollView>
);

export default ParentsGuideScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1d4e89", // ✅ title color
    marginBottom: 20,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
  },
});
