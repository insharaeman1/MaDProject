import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
const prayersList = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

/* =======================
   PRAYER TRACKER SCREEN
======================= */
function PrayerTrackerScreen() {
  const today = new Date().toISOString().split("T")[0];
  const [prayers, setPrayers] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const saved = await AsyncStorage.getItem(today);
    if (saved) {
      setPrayers(JSON.parse(saved));
    } else {
      const defaultState = {};
      prayersList.forEach(p => (defaultState[p] = false));
      setPrayers(defaultState);
    }
  };

  const togglePrayer = async (name) => {
    const updated = { ...prayers, [name]: !prayers[name] };
    setPrayers(updated);
    await AsyncStorage.setItem(today, JSON.stringify(updated));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Prayers</Text>

      {prayersList.map(prayer => (
        <TouchableOpacity
          key={prayer}
          style={[
            styles.prayerBox,
            { backgroundColor: prayers[prayer] ? "#4CAF50" : "#F44336" }
          ]}
          onPress={() => togglePrayer(prayer)}
        >
          <Text style={styles.prayerText}>
            {prayer} — {prayers[prayer] ? "Offered" : "Not Offered"}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

/* =======================
   PRAYER TIMINGS SCREEN
======================= */
function PrayerTimingsScreen() {
  const [timings, setTimings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTimings();
  }, []);

  const fetchTimings = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setLoading(false);
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    const response = await fetch(
      `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`
    );
    const data = await response.json();

    setTimings(data.data.timings);
    setLoading(false);
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prayer Timings</Text>

      {Object.entries(timings).map(([key, value]) => (
        <Text key={key} style={styles.timeText}>
          {key}: {value}
        </Text>
      ))}
    </View>
  );
}

/* =======================
   REPORTS SCREEN
======================= */
function ReportsScreen() {
  const [daily, setDaily] = useState(0);
  const [weekly, setWeekly] = useState(0);
  const [monthly, setMonthly] = useState(0);

  useEffect(() => {
    generateReports();
  }, []);

  const generateReports = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const today = new Date();

    let dailyCount = 0;
    let weeklyCount = 0;
    let monthlyCount = 0;

    for (let key of keys) {
      const data = await AsyncStorage.getItem(key);
      if (!data) continue;

      const date = new Date(key);
      const prayers = JSON.parse(data);
      const offeredCount = Object.values(prayers).filter(v => v).length;

      // Daily
      if (key === today.toISOString().split("T")[0]) {
        dailyCount += offeredCount;
      }

      // Weekly
      const diffDays = (today - date) / (1000 * 60 * 60 * 24);
      if (diffDays <= 7) {
        weeklyCount += offeredCount;
      }

      // Monthly
      if (
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        monthlyCount += offeredCount;
      }
    }

    setDaily(dailyCount);
    setWeekly(weeklyCount);
    setMonthly(monthlyCount);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Prayer Reports</Text>

      <View style={styles.reportBox}>
        <Text style={styles.reportText}>Daily Offered Prayers</Text>
        <Text style={styles.reportValue}>{daily} / 5</Text>
      </View>

      <View style={styles.reportBox}>
        <Text style={styles.reportText}>Weekly Offered Prayers</Text>
        <Text style={styles.reportValue}>{weekly}</Text>
      </View>

      <View style={styles.reportBox}>
        <Text style={styles.reportText}>Monthly Offered Prayers</Text>
        <Text style={styles.reportValue}>{monthly}</Text>
      </View>
    </ScrollView>
  );
}

/* =======================
   MAIN APP
======================= */
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Tracker" component={PrayerTrackerScreen} />
        <Tab.Screen name="Timings" component={PrayerTimingsScreen} />
        <Tab.Screen name="Reports" component={ReportsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

/* =======================
   STYLES
======================= */
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center"
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20
  },
  prayerBox: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 10
  },
  prayerText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center"
  },
  timeText: {
    fontSize: 18,
    marginVertical: 5
  },
  reportBox: {
    backgroundColor: "#2196F3",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10
  },
  reportText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center"
  },
  reportValue: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5
  }
});
