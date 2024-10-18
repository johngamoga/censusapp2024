import {
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
  View,
  Button,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import AuthComponent from "@/components/auth/AuthComponent";
import React from "react";

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleDashboard = () => {
    // code to handle the browse action
    (navigation as any).navigate("dashboard");
  };

  const handleSignIn = () => {
    (navigation as any).navigate("auth");
  };

  const testRoute = () => {
    (navigation as any).navigate("test");
  };

  function handleExplore(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <View style={styles.container}>
      {/* Container for the logos */}
      <View style={styles.logoContainer}>
        <Image source={require('@/assets/images/nationalemblem.png')} style={styles.logo} />
        <Image source={require('@/assets/images/censuslogo.png')} style={styles.logo} />
      </View>
      
      {/* Two Text Messages */}
      <Text style={styles.headerText}>Papua New Guinea Census 2024 Population Data Collection</Text>
      <Text style={styles.subText}>
        Your participation in the 2024 PNG Census is voluntary. All information provided
        will be kept confidential and used for statistical purposes only.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleDashboard}>
        <Text style={styles.buttonText}>Data Entry</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={handleSignIn}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styling for a modern, attractive layout
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#4CAF50", // Light background for contrast against buttons
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20, // Space between logos and header text
  },
  logo: {
    width: 110, // Adjust width as needed
    height: 120, // Adjust height as needed
    marginHorizontal: 10, // Space between logos
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40, // Space between text and buttons
  },
  button: {
    backgroundColor: "#ffde21", // Modern green color
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Elevation for Android
  },
  buttonSecondary: {
    backgroundColor: "#2196F3", // Stylish blue for Sign In/Sign Up buttons
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Elevation for Android
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
