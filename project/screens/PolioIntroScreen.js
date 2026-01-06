import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const PolioIntroScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={{
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBOH_C-XwfnCN753r3Gdjo8VYl-jizDWqCeg&s",
      }}
      style={styles.background}
      resizeMode="cover" // ✅ changed from "cover" to "contain"
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Polio Vaccination App</Text>

          <Text style={styles.subtitle}>
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.replace("Home")}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default PolioIntroScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)", // keeps text readable
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  content: {
    width: "100%",
    maxWidth: 350,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#3d5a80",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
