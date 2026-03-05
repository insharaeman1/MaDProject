import React from "react";
import { View } from "react-native";
import { Button, Title } from "react-native-paper";

export default function RoleSelectionScreen({ navigation }) {
  return (
    <View style={{ flex:1, justifyContent:"center", padding:20 }}>
      <Title>Select Role</Title>
      <Button mode="contained" onPress={() => navigation.replace("VaccinatorApp")}>Vaccinator</Button>
      <Button mode="contained" style={{marginTop:10}} onPress={() => navigation.replace("ParentApp")}>Parent</Button>
    </View>
  );
}