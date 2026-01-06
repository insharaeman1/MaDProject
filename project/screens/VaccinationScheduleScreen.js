import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/styles";

const VaccinationScheduleScreen = () => (
  <View style={styles.container}>
    <Text style={styles.heading}>Vaccination Schedule</Text>
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
