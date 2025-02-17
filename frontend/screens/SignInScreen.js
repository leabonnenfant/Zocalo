import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/user";
import { localfetch } from "../localFetch";


// Composant de connexion
export default function SignIn({ navigation }) {
  // États pour stocker l'email et le mot de passe
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Dispatcher pour envoyer des actions à Redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  // map favorite projects et places

  // Fonction de soumission du formulaire
  const handleSubmit = () => {
    // Effectue une requête POST à l'API de connexion
    fetch(`${localfetch}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.favAnnounce);
        // Si la connexion est réussie
        if (data.result) {
          // Dispatcher l'action login avec le token et l'email de l'utilisateur
          dispatch(
            login({
              id: data.id,
              token: data.token,
              email: data.email,
              favAnnounce: data.favAnnounce,
              favPlaces: data.favPlaces,
            })
          );
          // Naviguer vers la page Maps
          navigation.navigate("TabNavigator", { screen: "Maps" });
        } else {
          // Alerte en cas d'échec de la connexion
          alert("Sign in failed, please check your credentials");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred, please try again later");
      });
  };

  return (
    // Conteneur pour gérer le clavier
    <KeyboardAvoidingView
      style={styles.screenContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Dismiss le clavier quand on clique à l'extérieur des inputs */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* Dégradé d'arrière-plan */}
        <LinearGradient
          colors={["#F5D494", "#DEB1A1", "#B875B7"]}
          style={styles.background}
        >
          <View style={styles.container}>
            {/* Logo de l'application */}
            <Image
              style={styles.image}
              source={require("../assets/logo.png")}
            />
            {/* Titre de la page */}
            <Text style={styles.title}>Sign In</Text>

            {/* Champ de saisie pour l'email */}
            <TextInput
              onChangeText={(value) => setEmail(value)}
              value={email}
              placeholder="   Email"
              placeholderTextColor="rgba(184, 117, 183, 0.7)"
              style={styles.input}
              autoCapitalize="none" // This will disable automatic capitalization
            />

            {/* Champ de saisie pour le mot de passe */}
            <TextInput
              onChangeText={(value) => setPassword(value)}
              value={password}
              placeholder="   Password"
              placeholderTextColor="rgba(184, 117, 183, 0.7)"
              secureTextEntry
              style={styles.input}
              autoCapitalize="none" // This will disable automatic capitalization
            />

            {/* Bouton submit */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <LinearGradient
                colors={["#514787", "#D032D8", "#B875B7"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.submitButtonGradient}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Lien vers l'inscription */}
            <Text>Don't have an account yet?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>

            {/* Lien vers la récupération de mot de passe */}
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={styles.passwordText}>Forgot my password</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  containerKeyboard: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  screenContainer: {
    flex: 1,
    position: "relative",
    width: "100%",
    height: "100%",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundBlendMode: "screen",
    boxShadow:
      "0px 1px 2px rgba(0, 0, 0, 0.16), 0px 2px 4px rgba(0, 0, 0, 0.12), 0px 1px 8px rgba(0, 0, 0, 0.1)",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 50,
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "#512574",
    marginBottom: 20,
  },
  Ionicons: {
    paddingRight: '5%',
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "rgba(184, 117, 183, 0.7)",
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent background
  },
  inputPassword: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    color: "rgba(75, 0, 130, 0.8)",
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Transparent background
    borderRadius: 8,
    fontFamily: 'Avenir',
  },
  submitButton: {
    width: "100%",
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginVertical: 10,
    paddingBottom: '1%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
  },},
  submitButtonGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  
  buttonText: {
    color: "#FFDE59",
    fontSize: 18,
    fontFamily: "TAN-NIMBUS",
    fontWeight: "bold",
  },
  signUpText: {
    color: "#4B0082",
    fontFamily: "TAN-NIMBUS",
    textDecorationLine: "underline",
    marginTop: 5,
    fontSize: 16,
  },
  passwordText: {
    color: "#4B0082",
    fontFamily: "TAN-NIMBUS",
    textDecorationLine: "underline",
    marginTop: 5,
    fontSize: 16,
  },
});