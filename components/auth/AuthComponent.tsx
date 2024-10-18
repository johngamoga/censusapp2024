import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image, // Import Image component
} from "react-native";
import React, { useState } from "react";

const AuthComponent = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <View style={styles.container}>
      {/* Logos */}
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/nationalemblem.png')} // Update the path
          style={styles.logo}
        />
        <Image
          source={require('@/assets/images/censuslogo.png')} // Update the path
          style={styles.logo}
        />
      </View>

      {/* Title */}
      <Text style={styles.headerText}>
        {isSignIn ? "Sign In to Your Account" : "Create a New Account"}
      </Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#888"
      />

      {!isSignIn && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          placeholderTextColor="#888"
        />
      )}

      {/* Action Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          {isSignIn ? "Sign In" : "Sign Up"}
        </Text>
      </TouchableOpacity>

      {/* Toggle between forms */}
      <TouchableOpacity onPress={toggleForm}>
        <Text style={styles.toggleText}>
          {isSignIn
            ? "Don't have an account? Sign Up"
            : "Already have an account? Sign In"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Modern styling for the form
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    width: "100%",
  },
  logoContainer: {
    flexDirection: "row", // Align logos horizontally
    justifyContent: "space-around", // Space between logos
    width: "100%", // Adjust width as needed
    marginBottom: 25, // Space between logos and header
  },
  logo: {
    width: 140, // Adjust width as needed
    height: 150, // Adjust height as needed
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  button: {
    backgroundColor: "#ffde21",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 80,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  toggleText: {
    color: "#2196F3",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 20,
    textDecorationLine: 'underline'
  },
});

export default AuthComponent;