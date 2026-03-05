import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function ProfileScreen({ navigation }) {
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Text>User: Vaccinator</Text>
      <Button mode="contained" onPress={()=>navigation.replace("Login")}>
        Logout
      </Button>
    </View>
  );
}