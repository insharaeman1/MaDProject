import React from "react";
import { View, Dimensions } from "react-native";
import { Title } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";

export default function VaccinatorDashboard() {
  return (
    <View>
      <Title style={{textAlign:"center"}}>Weekly Coverage</Title>
      <LineChart
        data={{
          labels: ["Mon","Tue","Wed","Thu","Fri"],
          datasets:[{data:[5,8,6,12,9]}]
        }}
        width={Dimensions.get("window").width}
        height={220}
        chartConfig={{
          backgroundColor:"#4CAF50",
          backgroundGradientFrom:"#4CAF50",
          backgroundGradientTo:"#388E3C",
          color:(opacity=1)=>`rgba(255,255,255,${opacity})`
        }}
      />
    </View>
  );
}