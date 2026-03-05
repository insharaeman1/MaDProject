import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { Card, Text } from "react-native-paper";
import { getChildren } from "../services/storage";

export default function ChildListScreen() {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    getChildren().then(setChildren);
  }, []);

  return (
    <FlatList
      data={children}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Card style={{margin:10}}>
          <Card.Content>
            <Text>Name: {item.name}</Text>
            <Text>CNIC: {item.cnic}</Text>
          </Card.Content>
        </Card>
      )}
    />
  );
}