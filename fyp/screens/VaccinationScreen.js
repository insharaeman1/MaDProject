import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Button, TextInput, Title } from "react-native-paper";
import * as BarcodeScanner from "expo-barcode-scanner";
import { saveVaccination } from "../services/storage";

export default function VaccinationScreen() {
  const [permission, setPermission] = useState(null);
  const [scannedId, setScannedId] = useState("");
  const [vaccine, setVaccine] = useState("");

  useEffect(() => {
    BarcodeScanner.requestPermissionsAsync()
      .then(({ status }) => setPermission(status === "granted"));
  }, []);

  const handleScan = ({ data }) => setScannedId(data);

  const save = async () => {
    await saveVaccination({
      childId: scannedId,
      vaccine,
      date: new Date().toLocaleDateString()
    });
    alert("Vaccination Saved!");
  };

  if (permission === null) return null;

  return (
    <View style={{flex:1,padding:20}}>
      <Title>Scan Child QR</Title>
      <BarcodeScanner.BarCodeScanner
        onBarCodeScanned={handleScan}
        style={{height:200}}
      />
      <TextInput label="Scanned ID" value={scannedId} style={{marginTop:10}}/>
      <TextInput label="Vaccine Name" value={vaccine} onChangeText={setVaccine} style={{marginTop:10}}/>
      <Button mode="contained" style={{marginTop:20}} onPress={save}>Save Vaccination</Button>
    </View>
  );
}