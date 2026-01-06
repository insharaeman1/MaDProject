import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfileScreen = ({ route }) => {
  const { userName, userEmail } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.info}>{userName}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.info}>{userEmail}</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#4f6d7a", // ✅ title color
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    color: "#555",
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
    color: "#000",
  },
});
