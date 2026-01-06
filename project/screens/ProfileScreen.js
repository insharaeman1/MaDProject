import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/styles";

const ProfileScreen = ({ route }) => {
  const { userName, userEmail } = route.params;
  return (
    <View style={styles.center}>
      <Text style={styles.heading}>Your Profile</Text>
      <Text style={styles.info}>Name: {userName}</Text>
      <Text style={styles.info}>Email: {userEmail}</Text>
    </View>
  );
};

export default ProfileScreen;
