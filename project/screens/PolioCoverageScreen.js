import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";

const PolioCoverageScreen = () => {
  const [country, setCountry] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPolioData = () => {
    if (country.length !== 2) {
      Alert.alert("Error", "Enter 2-letter country code (PK, IN, AF)");
      return;
    }

    setLoading(true);

    fetch(
      `https://api.worldbank.org/v2/country/${country.toUpperCase()}/indicator/SH.IMM.POL3?format=json`
    )
      .then((res) => res.json())
      .then((json) => {
        if (!json[1]) {
          Alert.alert("No Data Found");
          setData([]);
        } else {
          setData(json[1]);
        }
      })
      .catch(() => Alert.alert("Error fetching data"))
      .finally(() => setLoading(false));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Polio Vaccination Coverage</Text>

      <TextInput
        style={styles.input}
        value={country}
        autoCapitalize="characters"
        placeholder="Country Code (PK)"
        onChangeText={setCountry}
        placeholderTextColor="#555"
      />

      {/* ✅ Custom Button */}
      <TouchableOpacity style={styles.button} onPress={fetchPolioData}>
        <Text style={styles.buttonText}>Fetch Coverage</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

      {!loading &&
        data.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.bold}>Year: {item.date}</Text>
            <Text>Coverage: {item.value ?? "N/A"}%</Text>
          </View>
        ))}
    </ScrollView>
  );
};

export default PolioCoverageScreen;

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff" },
  
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1d4e89", // ✅ title color
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    borderColor: "#ccc",
    backgroundColor: "#e6f0ff", // ✅ input background
    color: "#000",
  },

  button: {
    backgroundColor: "#1d4e89", // ✅ button color
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 20,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  card: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 6,
    marginTop: 10,
    borderColor: "#ccc",
  },

  bold: { fontWeight: "bold" },
});
