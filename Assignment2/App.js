import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";

const Stack = createStackNavigator();

// ---------------- LOGIN SCREEN ----------------
function LoginScreen({ navigation, route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userData = route.params?.userData;

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter both email and password");
    } else if (
      userData &&
      email === userData.email &&
      password === userData.password
    ) {
      navigation.navigate("Home", { userData });
    } else {
      alert("Invalid credentials or account not found!");
    }
  };

  return (
    <LinearGradient colors={["#00C6FB", "#005BEA"]} style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/1039/1039545.png",
          }}
          style={styles.logo}
        />
        <Text style={styles.title}>PolioCare</Text>
        <Text style={styles.subtitle}>Protect Every Child</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#e6f7ff"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#e6f7ff"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.linkText}>Don’t have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

// ---------------- SIGNUP SCREEN ----------------
function SignupScreen({ navigation }) {
  const [parentName, setParentName] = useState("");
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!parentName || !childName || !childAge || !email || !password) {
      alert("Please fill all fields");
    } else {
      const userData = { parentName, childName, childAge, email, password };
      alert("Account created successfully!");
      navigation.navigate("Login", { userData });
    }
  };

  return (
    <LinearGradient colors={["#4AC29A", "#BDFFF3"]} style={styles.container}>
      <ScrollView
        style={{ width: "90%" }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/4202/4202843.png",
            }}
            style={styles.logo}
          />
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Protect your child from polio</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Parent Name"
          placeholderTextColor="#e6f7ff"
          value={parentName}
          onChangeText={setParentName}
        />
        <TextInput
          style={styles.input}
          placeholder="Child Name"
          placeholderTextColor="#e6f7ff"
          value={childName}
          onChangeText={setChildName}
        />
        <TextInput
          style={styles.input}
          placeholder="Child Age"
          placeholderTextColor="#e6f7ff"
          value={childAge}
          onChangeText={setChildAge}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#e6f7ff"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#e6f7ff"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}>Already registered? Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

// ---------------- HOME SCREEN ----------------
function HomeScreen({ route, navigation }) {
  const { userData } = route.params || {};

  return (
    <LinearGradient colors={["#89F7FE", "#66A6FF"]} style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png",
            }}
            style={styles.logo}
          />
          <Text style={styles.title}>Welcome, {userData?.parentName}</Text>
          <Text style={styles.subtitle}>
            Logged in as {userData?.email || "Guest"}
          </Text>
        </View>

        <View style={styles.profileCard}>
          <Text style={styles.profileTitle}>👶 Child Profile</Text>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
            }}
            style={{
              width: 90,
              height: 90,
              alignSelf: "center",
              marginBottom: 10,
            }}
          />
          <Text style={styles.profileText}>
            Child Name: {userData?.childName}
          </Text>
          <Text style={styles.profileText}>
            Age: {userData?.childAge} years
          </Text>
          <Text style={styles.profileText}>
            Parent: {userData?.parentName}
          </Text>
          <Text style={styles.profileText}>
            Vaccination Status: ✅ Completed
          </Text>
          <Text style={styles.profileText}>Next Dose: 25 Oct 2025</Text>
        </View>

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
            Log Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

// ---------------- APP NAVIGATION ----------------
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Signup" // 👈 Start from Signup first
      >
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  header: { alignItems: "center", marginBottom: 30, marginTop: 40 },
  logo: { width: 100, height: 100, marginBottom: 10 },
  title: { fontSize: 28, fontWeight: "bold", color: "#fff" },
  subtitle: {
    fontSize: 16,
    color: "#eef9ff",
    textAlign: "center",
    marginBottom: 10,
  },
  form: { width: "85%", alignItems: "center" },
  input: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    color: "#fff",
  },
  button: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginTop: 10,
    elevation: 3,
  },
  buttonText: { color: "#0077FF", fontSize: 16, fontWeight: "bold" },
  linkText: { color: "#fff", marginTop: 15, fontSize: 14 },
  profileCard: {
    width: "85%",
    backgroundColor: "rgba(255,255,255,0.3)",
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
  },
  profileTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  profileText: { fontSize: 16, color: "#fff", marginBottom: 6 },
  logoutBtn: {
    backgroundColor: "#ff5e62",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 30,
  },
});