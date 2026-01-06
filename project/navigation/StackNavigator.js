import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import SignupScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ParentsGuideScreen from "../screens/ParentsGuideScreen";
import VaccinationScheduleScreen from "../screens/VaccinationScheduleScreen";
import ChildRegistrationScreen from "../screens/ChildRegistrationScreen";
import VaccineAvailabilityScreen from "../screens/VaccineAvailabilityScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ParentsGuide" component={ParentsGuideScreen} />
      <Stack.Screen
        name="VaccinationSchedule"
        component={VaccinationScheduleScreen}
      />
      <Stack.Screen
        name="ChildRegistration"
        component={ChildRegistrationScreen}
      />
      <Stack.Screen
        name="VaccineAvailability"
        component={VaccineAvailabilityScreen}
        options={{ title: "Vaccine Availability" }}
      />
    </Stack.Navigator>
  );
}
