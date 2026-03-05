import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button, Title } from "react-native-paper";
import * as Location from "expo-location";
import { saveChild } from "../services/storage";

export default function RegisterChildScreen() {
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");

  const register = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return alert("Location permission required");

    const location = await Location.getCurrentPositionAsync({});
    const child = {
      id: Date.now(),
      name,
      cnic,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    };

    await saveChild(child);
    alert("Child Registered Successfully!");
  };

  return (
    <View style={{flex:1,padding:20}}>
      <Title>Register Child</Title>
      <TextInput label="Child Name" value={name} onChangeText={setName}/>
      <TextInput label="Mother CNIC" value={cnic} onChangeText={setCnic} style={{marginTop:10}}/>
      <Button mode="contained" style={{marginTop:20}} onPress={register}>Save</Button>
    </View>
  );
}