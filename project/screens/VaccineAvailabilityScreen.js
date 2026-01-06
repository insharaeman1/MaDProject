/*import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, ActivityIndicator, TextInput, Button } from "react-native";
import styles from "../styles/styles";

const VaccineAvailabilityScreen = () => {
  const [pincode, setPincode] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAvailability = () => {
    if (pincode.length !== 6) {
      alert("Enter a valid 6‑digit PIN code");
      return;
    }

    const today = new Date();
    const date = `${today.getDate().toString().padStart(2, "0")}-${(today.getMonth()+1)
      .toString().padStart(2, "0")}-${today.getFullYear()}`;

    setLoading(true);
    fetch(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${date}`,
      {
        headers: {
          "User-Agent": "ReactNativeApp",
          Accept: "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setData(json.sessions || []);
      })
      .catch((err) => {
        console.error(err);
        alert("Error fetching data");
      })
      .finally(() => setLoading(false));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Check Vaccine Availability</Text>

      <TextInput
        placeholder="Enter PIN code"
        style={styles.input}
        keyboardType="number‑pad"
        value={pincode}
        onChangeText={setPincode}
      />

      <Button title="Check Availability" onPress={fetchAvailability} />

      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

      {!loading && data.length > 0 ? (
        data.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.bold}>{item.name}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Vaccine: {item.vaccine || "N/A"}</Text>
            <Text>Available Slots: {item.available_capacity}</Text>
            <Text>Minimum Age: {item.min_age_limit}</Text>
            <Text>Fee Type: {item.fee_type}</Text>
          </View>
        ))
      ) : (
        !loading && <Text>No slots found.</Text>
      )}
    </ScrollView>
  );
};

export default VaccineAvailabilityScreen;*/


import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/styles";

const VaccineAvailabilityScreen = () => {
  // Mock data for Polio vaccination centers
  const mockData = [
    {
      name: "City Health Center",
      date: "05-01-2026",
      vaccine: "Polio",
      available: true,
      min_age_limit: 0,
      address: "123 Main Street",
    },
    {
      name: "Community Clinic",
      date: "05-01-2026",
      vaccine: "Polio",
      available: false,
      min_age_limit: 0,
      address: "456 Park Avenue",
    },
    {
      name: "Downtown Hospital",
      date: "05-01-2026",
      vaccine: "Polio",
      available: true,
      min_age_limit: 0,
      address: "789 Central Road",
    },
  ];

  const [data, setData] = useState([]);
  const [showData, setShowData] = useState(false);

  const handleCheckAvailability = () => {
    setData(mockData);
    setShowData(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Polio Vaccine Availability</Text>

      <TouchableOpacity style={styles.btn} onPress={handleCheckAvailability}>
        <Text style={styles.btnText}>Check Availability</Text>
      </TouchableOpacity>

      {showData && (
        <>
          {data.length > 0 ? (
            data.map((item, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.bold}>{item.name}</Text>
                <Text>Date: {item.date}</Text>
                <Text>Vaccine: {item.vaccine}</Text>
                <Text>Available: {item.available ? "Yes" : "No"}</Text>
                <Text>Minimum Age: {item.min_age_limit}</Text>
                <Text>Address: {item.address}</Text>
              </View>
            ))
          ) : (
            <Text>No slots found.</Text>
          )}
        </>
      )}
    </ScrollView>
  );
};

export default VaccineAvailabilityScreen;
