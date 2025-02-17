import React, { useState } from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');

  // Vérifier si la route
  const handlePasswordReset = () => {
    fetch('http://localhost:3000/users/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          // Handle successful password reset request (e.g., show a message or navigate to another screen)
        }
      });
  };

return (
  <View style={styles.screenContainer}>
    <LinearGradient colors={['#F5D494', '#DEB1A1', '#B875B7']} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Reset password</Text>
        <Text style={styles.funny}>
          Oopsie... Sometimes globetrotting can make you forget things, like your password 🤯
        </Text>
        <Text style={styles.funnyend}>
          Don't worry, we’ve got your back:
        </Text>
        <TextInput
          onChangeText={(value) => setEmail(value)}
          value={email}
          placeholder="Enter your email"
          placeholderTextColor="rgba(184, 117, 183, 0.7)"
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => handlePasswordReset()}
        >
          <LinearGradient
            colors={['#514787', '#D032D8', '#B875B7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.submitButtonGradient}
          >
            <Text style={styles.buttonText}>🔓 I WANT TO BREAK FREE</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  </View>
);
}

const styles = StyleSheet.create({
screenContainer: {
  flex: 1,
  position: 'relative',
  width: '100%',
  height: '100%',
},
background: {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundBlendMode: 'screen',
  boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.16), 0px 2px 4px rgba(0, 0, 0, 0.12), 0px 1px 8px rgba(0, 0, 0, 0.1)',
},
container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 20,
},
title: {
  fontSize: 30,
  fontFamily: 'Roboto',
  fontWeight: 'bold',
  color: '#512574',
  marginBottom: 20,
},
input: {
  width: '100%',
  height: 40,
  borderColor: 'rgba(184, 117, 183, 0.7)',
  borderWidth: 1,
  marginBottom: 20,
  paddingLeft: 10,
  color: 'rgba(75, 0, 130, 0.8)',
  backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent background
  borderRadius: 8,
},
submitButton: {
  width: '100%',
  height: 50,
  borderRadius: 25,
  overflow: 'hidden',
  marginVertical: 10,
},
submitButtonGradient: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
},
buttonText: {
  color: '#FFDE59',
  fontSize: 16,
  fontFamily: 'TAN-NIMBUS',
  fontWeight: 'bold',
},
funny: {
  textAlign: 'center', // Centers the text
  marginHorizontal: 10, // Add horizontal margin if needed for padding
  marginTop: 10, // Add top margin if needed for spacing
  color: '#512574', 
  fontSize: 15,
  paddingBottom: '5%',
},
funnyend: {
  alignSelf: 'flex-start', // Aligns the text to the left
  marginTop: 10, // Add top margin if needed for spacing
  color: '#512574', // Example color, adjust as needed
  fontSize: 13,
  paddingBottom: '2%',
}
});