import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

let savedUser = { name: "", email: "", password: "" };

/* --------------------------------------------------
   1. HOME SCREEN
-------------------------------------------------- */
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Polio Vaccination App</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.btnText}>Go to Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.btnText}>Go to Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("ParentsGuide")}
      >
        <Text style={styles.btnText}>Parents Guide</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("VaccinationSchedule")}
      >
        <Text style={styles.btnText}>Vaccination Schedule</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("ChildRegistration")}
      >
        <Text style={styles.btnText}>Child Registration</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("VaccineAvailability")}
      >
        <Text style={styles.btnText}>Check Vaccine Availability</Text>
      </TouchableOpacity>
    </View>
  );
};

/* --------------------------------------------------
   2. SIGNUP SCREEN
-------------------------------------------------- */
const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }
    savedUser = { name, email, password };
    Alert.alert("Success", "Account created successfully!");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Account</Text>
      <TextInput
        placeholder="Full Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Signup" onPress={handleSignup} />
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

/* --------------------------------------------------
   3. LOGIN SCREEN
-------------------------------------------------- */
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === savedUser.email && password === savedUser.password) {
      navigation.navigate("Profile", {
        userName: savedUser.name,
        userEmail: savedUser.email,
      });
    } else {
      Alert.alert("Login Failed", "Invalid email or password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link}>Create New Account</Text>
      </TouchableOpacity>
    </View>
  );
};

/* --------------------------------------------------
   4. PROFILE SCREEN
-------------------------------------------------- */
const ProfileScreen = ({ route }) => {
  const { userName, userEmail } = route.params;
  return (
    <View style={styles.center}>
      <Text style={styles.heading}>Your Profile</Text>
      <Text style={styles.info}>Name: {userName}</Text>
      <Text style={styles.info}>Email: {userEmail}</Text>
    </View>
  );
};

/* --------------------------------------------------
   5. PARENTS GUIDE SCREEN
-------------------------------------------------- */
const ParentsGuideScreen = () => (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.heading}>Parents Guide</Text>
    <Text style={styles.text}>✔ Vaccines protect your child.</Text>
    <Text style={styles.text}>✔ Keep vaccination card safe.</Text>
    <Text style={styles.text}>✔ Mild fever after vaccine is normal.</Text>
    <Text style={styles.text}>✔ Follow national immunization schedule.</Text>
  </ScrollView>
);

/* --------------------------------------------------
   6. VACCINATION SCHEDULE SCREEN
-------------------------------------------------- */
const VaccinationScheduleScreen = () => (
  <View style={styles.container}>
    <Text style={styles.heading}>Vaccination Schedule</Text>
    <View style={styles.card}>
      <Text style={styles.smallHeading}>Birth</Text>
      <Text>• BCG</Text>
      <Text>• OPV 0</Text>
    </View>
    <View style={styles.card}>
      <Text style={styles.smallHeading}>6 Weeks</Text>
      <Text>• OPV 1</Text>
      <Text>• Penta 1</Text>
      <Text>• PCV 1</Text>
    </View>
  </View>
);

/* --------------------------------------------------
   7. CHILD REGISTRATION SCREEN
-------------------------------------------------- */
const ChildRegistrationScreen = () => {
  const [childName, setChildName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register Child</Text>
      <TextInput
        placeholder="Child Name"
        style={styles.input}
        value={childName}
        onChangeText={setChildName}
      />
      <TextInput
        placeholder="Date of Birth (DD/MM/YYYY)"
        style={styles.input}
        value={dob}
        onChangeText={setDob}
      />
      <TextInput
        placeholder="Gender"
        style={styles.input}
        value={gender}
        onChangeText={setGender}
      />
      <Button
        title="Register Child"
        onPress={() => Alert.alert("Child Registered Successfully!")}
      />
    </View>
  );
};

/* --------------------------------------------------
   8. VACCINE AVAILABILITY SCREEN (RapidAPI)
-------------------------------------------------- */
const VaccineAvailabilityScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const RAPIDAPI_KEY = "YOUR_RAPIDAPI_KEY"; // Replace with your RapidAPI key
  const HOST = "vaccines-availability-data-usa.p.rapidapi.com"; // Example endpoint

  useEffect(() => {
    fetch(`https://${HOST}/availability`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": RAPIDAPI_KEY,
        "x-rapidapi-host": HOST,
      },
    })
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={styles.center} size="large" />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Vaccine Availability</Text>
      {data && data.length > 0 ? (
        data.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.bold}>{item.name || "Location"}</Text>
            <Text>Available: {item.available ? "Yes" : "No"}</Text>
            <Text>Address: {item.address || "N/A"}</Text>
          </View>
        ))
      ) : (
        <Text>No data available.</Text>
      )}
    </ScrollView>
  );
};

/* --------------------------------------------------
   APP COMPONENT
-------------------------------------------------- */
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ParentsGuide" component={ParentsGuideScreen} />
        <Stack.Screen
          name="VaccinationSchedule"
          component={VaccinationScheduleScreen}
        />
        <Stack.Screen
          name="ChildRegistration"
          component={ChildRegistrationScreen}
        />
        <Stack.Screen
          name="VaccineAvailability"
          component={VaccineAvailabilityScreen}
          options={{ title: "Vaccine Availability" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* --------------------------------------------------
   STYLES
-------------------------------------------------- */
const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 25 },
  heading: { fontSize: 26, fontWeight: "bold", marginBottom: 15, color: "#0A6EBD" },
  smallHeading: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
  input: { borderWidth: 1, borderColor: "#bbb", padding: 12, borderRadius: 8, marginVertical: 10 },
  btn: { backgroundColor: "#0A6EBD", padding: 15, width: "80%", marginVertical: 10, borderRadius: 10 },
  btnText: { color: "white", textAlign: "center", fontSize: 18, fontWeight: "bold" },
  text: { fontSize: 18, marginBottom: 10 },
  card: { backgroundColor: "white", padding: 15, borderRadius: 10, marginVertical: 10, elevation: 3 },
  info: { fontSize: 18, marginVertical: 5 },
  link: { marginTop: 15, textAlign: "center", color: "blue" },
  bold: { fontSize: 18, fontWeight: "bold" },
});
