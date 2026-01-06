import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/styles";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Polio Vaccination App</Text>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.btnText}>Go to Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.btnText}>Go to Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("ParentsGuide")}>
        <Text style={styles.btnText}>Parents Guide</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("VaccinationSchedule")}>
        <Text style={styles.btnText}>Vaccination Schedule</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("ChildRegistration")}>
        <Text style={styles.btnText}>Child Registration</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("VaccineAvailability")}>
        <Text style={styles.btnText}>Check Vaccine Availability</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
