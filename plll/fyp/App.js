import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import UserTypeScreen from './screens/UserTypeScreen';
import ChildDashboard from './screens/ChildDashboard';
import VaccinatorDashboard from './screens/VaccinatorDashboard';
import SupervisorDashboard from './screens/SupervisorDashboard';
import ChildRegistration from './screens/ChildRegistration';
import VaccinationEntry from './screens/VaccinationEntry';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="UserType" component={UserTypeScreen} />
        <Stack.Screen name="ChildDashboard" component={ChildDashboard} />
        <Stack.Screen name="VaccinatorDashboard" component={VaccinatorDashboard} />
        <Stack.Screen name="SupervisorDashboard" component={SupervisorDashboard} />
        <Stack.Screen name="ChildRegistration" component={ChildRegistration} />
        <Stack.Screen name="VaccinationEntry" component={VaccinationEntry} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}