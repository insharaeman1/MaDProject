import React from "react";
import { View } from "react-native";
import { Button, Title } from "react-native-paper";

export default function SyncScreen() {
  return (
    <View style={{flex:1,justifyContent:"center",padding:20}}>
      <Title>Offline Sync</Title>
      <Button mode="contained" onPress={()=>alert("Data Synced to Server!")}>
        Sync Now
      </Button>
    </View>
  );
}