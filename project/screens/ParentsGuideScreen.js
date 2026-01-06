import React from "react";
import { ScrollView, Text } from "react-native";
import styles from "../styles/styles";

const ParentsGuideScreen = () => (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.heading}>Parents Guide</Text>
    <Text style={styles.text}>✔ Vaccines protect your child.</Text>
    <Text style={styles.text}>✔ Keep vaccination card safe.</Text>
    <Text style={styles.text}>✔ Mild fever after vaccine is normal.</Text>
    <Text style={styles.text}>✔ Follow national immunization schedule.</Text>
  </ScrollView>
);

export default ParentsGuideScreen;
