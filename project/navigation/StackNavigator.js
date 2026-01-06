import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PolioIntroScreen from "../screens/PolioIntroScreen";
import HomeScreen from "../screens/HomeScreen";
import SignupScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ParentsGuideScreen from "../screens/ParentsGuideScreen";
import VaccinationScheduleScreen from "../screens/VaccinationScheduleScreen";
import ChildRegistrationScreen from "../screens/ChildRegistrationScreen";
import PolioCoverageScreen from "../screens/PolioCoverageScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Intro" component={PolioIntroScreen} />
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
        name="PolioCoverage"
        component={PolioCoverageScreen}
        options={{ title: "Polio Coverage" }}
      />
    </Stack.Navigator>
  );
}
