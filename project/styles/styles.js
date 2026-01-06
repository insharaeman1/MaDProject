import { StyleSheet } from "react-native";

export default StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 25 },
  heading: { fontSize: 26, fontWeight: "bold", marginBottom: 15, color: "#0A6EBD" },
  smallHeading: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
  input: { borderWidth: 1, borderColor: "#bbb", padding: 12, borderRadius: 8, marginVertical: 10 },
  btn: { backgroundColor: "#28666e", padding: 15, width: "80%", marginVertical: 10, borderRadius: 10 },
  btnText: { color: "white", textAlign: "center", fontSize: 18, fontWeight: "bold" },
  text: { fontSize: 18, marginBottom: 10 },
  card: { backgroundColor: "white", padding: 15, borderRadius: 10, marginVertical: 10, elevation: 3 },
  info: { fontSize: 18, marginVertical: 5 },
  link: { marginTop: 15, textAlign: "center", color: "blue" },
  bold: { fontSize: 18, fontWeight: "bold" },
});
