// ChildRegistration.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Picker } from "@react-native-picker/picker";
import QRCode from "react-native-qrcode-svg"; // For QR code generation
import uuid from "react-native-uuid";

export default function ChildRegistration() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [motherCNIC, setMotherCNIC] = useState("");
  const [childID, setChildID] = useState("");
  const [polio, setPolio] = useState(false);
  const [routineVaccines, setRoutineVaccines] = useState(false);
  const [childPhoto, setChildPhoto] = useState(null);
  const [vaccinationCard, setVaccinationCard] = useState(null);
  const [location, setLocation] = useState(null);

  // Request location on mount
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Location permission is required.");
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  // Pick child photo
  const pickChildPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.cancelled) {
      setChildPhoto(result.uri);
    }
  };

  // Pick vaccination card
  const pickVaccinationCard = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.cancelled) {
      setVaccinationCard(result.uri);
    }
  };

  // Register child
  const handleRegister = async () => {
    if (!name || !age || !gender || !address || !motherCNIC) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    const newChildID = uuid.v4(); // Generate unique child ID
    setChildID(newChildID);

    const childData = {
      childID: newChildID,
      name,
      age,
      gender,
      address,
      motherCNIC,
      polio,
      routineVaccines,
      childPhoto,
      vaccinationCard,
      location,
      timestamp: new Date().toISOString(),
    };

    try {
      // Save child data offline
      const existingData = await AsyncStorage.getItem("children");
      const children = existingData ? JSON.parse(existingData) : [];
      children.push(childData);
      await AsyncStorage.setItem("children", JSON.stringify(children));

      // Show success message and reset form
      Alert.alert(
        "Success",
        `Child successfully registered!\nChild ID: ${newChildID}`,
        [
          {
            text: "OK",
            onPress: () => {
              setName(""); setAge(""); setGender(""); setAddress(""); setMotherCNIC("");
              setPolio(false); setRoutineVaccines(false); setChildPhoto(null); setVaccinationCard(null);
              setChildID("");
            },
          },
        ]
      );
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to save data");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Child Registration</Text>

      <TextInput
        style={styles.input}
        placeholder="Child Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <View style={styles.pickerContainer}>
        <Picker selectedValue={gender} onValueChange={setGender}>
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Mother CNIC"
        value={motherCNIC}
        onChangeText={setMotherCNIC}
        keyboardType="numeric"
      />

      <View style={styles.vaccineContainer}>
        <TouchableOpacity onPress={() => setPolio(!polio)} style={styles.checkbox}>
          <Text>{polio ? "✅" : "⬜"} Polio Vaccine</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRoutineVaccines(!routineVaccines)} style={styles.checkbox}>
          <Text>{routineVaccines ? "✅" : "⬜"} Routine Vaccines</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={pickChildPhoto}>
        <Text style={styles.buttonText}>Upload Child Photo</Text>
      </TouchableOpacity>
      {childPhoto && <Image source={{ uri: childPhoto }} style={styles.imagePreview} />}

      <TouchableOpacity style={styles.button} onPress={pickVaccinationCard}>
        <Text style={styles.buttonText}>Upload Vaccination Card</Text>
      </TouchableOpacity>
      {vaccinationCard && <Image source={{ uri: vaccinationCard }} style={styles.imagePreview} />}

      {childID !== "" && (
        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <Text>Generated Child ID: {childID}</Text>
          <QRCode value={childID} size={150} />
        </View>
      )}

      {location && (
        <Text style={{ marginBottom: 10 }}>
          Location: {location.latitude.toFixed(5)}, {location.longitude.toFixed(5)}
        </Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register Child</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  vaccineContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 25,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginVertical: 10,
    alignSelf: "center",
  },
});