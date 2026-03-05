import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ParentDashboard from "../screens/ParentDashboard";
import ChildHistoryScreen from "../screens/ChildHistoryScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function ParentTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={ParentDashboard} />
      <Tab.Screen name="History" component={ChildHistoryScreen} />
      <Tab.Screen name="Notifications" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}