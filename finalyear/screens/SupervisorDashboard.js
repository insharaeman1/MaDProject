// SupervisorDashboard.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LineChart, BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function SupervisorDashboard() {
  const [childrenData, setChildrenData] = useState([]);
  const [missedChildren, setMissedChildren] = useState([]);
  const [refusalCases, setRefusalCases] = useState([]);
  const [vaccinatorPerformance, setVaccinatorPerformance] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedChildren = await AsyncStorage.getItem("children");
        const children = storedChildren ? JSON.parse(storedChildren) : [];

        setChildrenData(children);

        // Missed children = children without polio or routine vaccines
        const missed = children.filter(
          (c) => !c.polio || !c.routineVaccines
        );
        setMissedChildren(missed);

        // Refusal cases = let's assume children with polio false are refusals
        const refusals = children.filter((c) => c.polio === false);
        setRefusalCases(refusals);

        // Vaccinator performance (mock data)
        const performance = [
          { vaccinator: "Ali", vaccinated: 25 },
          { vaccinator: "Sara", vaccinated: 18 },
          { vaccinator: "Usman", vaccinated: 30 },
        ];
        setVaccinatorPerformance(performance);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Supervisor Dashboard</Text>

      {/* Real-time Vaccination Coverage */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vaccination Coverage</Text>
        <LineChart
          data={{
            labels: ["Polio", "Routine"],
            datasets: [{ data: [
              childrenData.filter(c => c.polio).length,
              childrenData.filter(c => c.routineVaccines).length
            ] }],
          }}
          width={screenWidth - 40}
          height={220}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: { r: "6", strokeWidth: "2", stroke: "#4CAF50" }
          }}
          style={{ marginVertical: 10, borderRadius: 16 }}
        />
      </View>

      {/* Missed Children List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Missed Children</Text>
        <FlatList
          data={missedChildren}
          keyExtractor={(item) => item.childID}
          renderItem={({ item }) => (
            <Text style={styles.listItem}>{item.name} - ID: {item.childID}</Text>
          )}
        />
      </View>

      {/* Refusal Cases */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Refusal Cases</Text>
        <FlatList
          data={refusalCases}
          keyExtractor={(item) => item.childID}
          renderItem={({ item }) => (
            <Text style={styles.listItem}>{item.name} - Polio refused</Text>
          )}
        />
      </View>

      {/* Vaccinator Performance */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vaccinator Performance</Text>
        <BarChart
          data={{
            labels: vaccinatorPerformance.map(v => v.vaccinator),
            datasets: [{ data: vaccinatorPerformance.map(v => v.vaccinated) }],
          }}
          width={screenWidth - 40}
          height={220}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
          }}
          style={{ marginVertical: 10, borderRadius: 16 }}
        />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  listItem: { paddingVertical: 5, fontSize: 16 },
});