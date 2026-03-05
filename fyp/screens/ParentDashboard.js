import React from "react";
import { View } from "react-native";
import { Card, Text, Title } from "react-native-paper";

export default function ParentDashboard() {
  return (
    <View style={{padding:20}}>
      <Title>Next Vaccine Reminder</Title>
      <Card style={{marginTop:10}}>
        <Card.Content>
          <Text>Measles - Due 15 March 2026</Text>
        </Card.Content>
      </Card>
    </View>
  );
}