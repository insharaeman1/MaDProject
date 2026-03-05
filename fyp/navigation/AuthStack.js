import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import RoleSelectionScreen from "../screens/RoleSelectionScreen";
import VaccinatorTabs from "./VaccinatorTabs";
import ParentTabs from "./ParentTabs";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="RoleSelect" component={RoleSelectionScreen} />
      <Stack.Screen name="VaccinatorApp" component={VaccinatorTabs} />
      <Stack.Screen name="ParentApp" component={ParentTabs} />
    </Stack.Navigator>
  );
}