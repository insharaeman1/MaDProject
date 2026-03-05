import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import VaccinatorDashboard from "../screens/VaccinatorDashboard";
import RegisterChildScreen from "../screens/RegisterChildScreen";
import VaccinationScreen from "../screens/VaccinationScreen";
import ChildListScreen from "../screens/ChildListScreen";
import SyncScreen from "../screens/SyncScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function VaccinatorTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Dashboard" component={VaccinatorDashboard} />
      <Tab.Screen name="Register Child" component={RegisterChildScreen} />
      <Tab.Screen name="Vaccinate" component={VaccinationScreen} />
      <Tab.Screen name="Children" component={ChildListScreen} />
      <Tab.Screen name="Sync" component={SyncScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}