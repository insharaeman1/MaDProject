import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Card, Text } from "react-native-paper";
import { getVaccinations } from "../services/storage";

export default function ChildHistoryScreen() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getVaccinations().then(setRecords);
  }, []);

  return (
    <FlatList
      data={records}
      keyExtractor={(item,index)=>index.toString()}
      renderItem={({item})=>(
        <Card style={{margin:10}}>
          <Card.Content>
            <Text>Child ID: {item.childId}</Text>
            <Text>Vaccine: {item.vaccine}</Text>
            <Text>Date: {item.date}</Text>
          </Card.Content>
        </Card>
      )}
    />
  );
}