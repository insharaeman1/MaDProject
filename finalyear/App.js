// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import ChildRegistration from "./screens/ChildRegistration";
import VaccinatorDashboard from "./screens/VaccinatorDashboard";
import SupervisorDashboard from "./screens/SupervisorDashboard";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ title: "Signup" }}
        />
        <Stack.Screen
          name="ChildRegistration"
          component={ChildRegistration}
          options={{ title: "Child Registration" }}
        />
        <Stack.Screen
          name="VaccinatorDashboard"
          component={VaccinatorDashboard}
          options={{ title: "Vaccinator Dashboard" }}
        />
        <Stack.Screen
          name="SupervisorDashboard"
          component={SupervisorDashboard}
          options={{ title: "Supervisor Dashboard" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}