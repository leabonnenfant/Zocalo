import React, { useState } from 'react';
import { Image, StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { addUser } from '../reducers/user';
import { localfetch } from '../localFetch'
import Ionicons from 'react-native-vector-icons/Ionicons';

const BACKEND_ADDRESS = localfetch;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleRegister = () => {
    setEmailError(false);
    setPasswordError(false);

    if (!EMAIL_REGEX.test(email)) {
      setEmailError(true);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError(true);
      return;
    }

    fetch(`${localfetch}/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        lastName: lastName,
        firstName: firstName,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          const newUser = {
            email,
            lastName,
            firstName,
            password,
            token: data.user.token,
            id: data.user._id
          };
          dispatch(addUser(newUser));
          setEmail('');
          setFirstName('');
          setLastName('');
          setPassword('');
          setConfirmPassword('');
          navigation.navigate('CreateProfile');
        } else {
          console.error(data.error);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <LinearGradient colors={['#F5D494', '#B875B7']} style={styles.background}>
      <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/logo.png')} />
        <Text style={styles.title}>Welcome to Zocalo</Text>
        <Text style={styles.account}>Hi there, join the community!</Text>
        <TextInput
          onChangeText={setFirstName}
          value={firstName}
          placeholderTextColor="rgba(184, 117, 183, 0.7)"
          placeholder="First Name*"
          style={styles.input}
        />
        <TextInput
          onChangeText={setLastName}
          value={lastName}
          placeholder="Last Name*"
          placeholderTextColor="rgba(184, 117, 183, 0.7)"
          style={styles.input}
        />
        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder="Email*"
          style={styles.input}
          placeholderTextColor="rgba(184, 117, 183, 0.7)"
          autoCapitalize="none"
        />
        {emailError && <Text style={styles.error}>Invalid email address</Text>}
        <View style={styles.passwordContainer}>
          <TextInput
            onChangeText={setPassword}
            value={password}
            placeholder="Password*"
            style={styles.inputPassword}
            secureTextEntry={!passwordVisible}
            placeholderTextColor="rgba(184, 117, 183, 0.7)"
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons
              name={passwordVisible ? 'eye' : 'eye-off'}
              size={24}
              color="gray"
              style={styles.ionicons}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            placeholder="Confirm Password*"
            style={styles.inputPassword}
            secureTextEntry={!confirmPasswordVisible}
            autoCapitalize="none"
            placeholderTextColor="rgba(184, 117, 183, 0.7)"
          />
          <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
            <Ionicons
              name={confirmPasswordVisible ? 'eye' : 'eye-off'}
              size={24}
              color="gray"
              style={styles.ionicons}
            />
          </TouchableOpacity>
        </View>
        {passwordError && <Text style={styles.error}>Passwords do not match</Text>}
        <TouchableOpacity style={styles.submitButton} onPress={handleRegister}>
          <LinearGradient
            colors={['#514787', '#D032D8', '#B875B7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text>Already a Zocalo addict?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.signUpText}>Sign in to account</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

  const styles = StyleSheet.create({
    background: {
      flex: 1,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20, // Ajouter des marges à l'ensemble de la vue
    },
    title: {
      width: '80%', // Augmenter la largeur pour être plus centré
      fontSize: 22,
      fontWeight: '600',
      textAlign: 'center',
      color: '#512578',
      marginBottom: 10,
    },
    account: {
      width: '80%', // Augmenter la largeur pour être plus centré
      fontSize: 18,
      fontWeight: '500',
      textAlign: 'center',
      color: '#4B0082',
      marginBottom: 10,
      paddingTop: '3%',
    },
    already: {
      width: '80%', // Augmenter la largeur pour être plus centré
      fontSize: 13,
      fontWeight: '500',
      textAlign: 'center',
      color: '#4B0082',
      marginBottom: '4%',
      paddingTop: '3%',
    },
    image: {
      width: 120, // Réduire la taille de l'image
      height: 120,
      borderRadius: 60,
      marginBottom: 20,
      marginTop: '5%',
    },
    input: {
      width: '90%',
      height: 40,
      borderColor: 'rgba(184, 117, 183, 0.7)',
      borderWidth: 1,
      marginBottom: 20,
      paddingLeft: 10,
      color: 'rgba(75, 0, 130, 0.8)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 8,
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '90%',
      borderColor: 'rgba(184, 117, 183, 0.7)',
      borderWidth: 1,
      marginBottom: 20,
      borderRadius: 8,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    inputPassword: {
      flex: 1,
      height: 40,
      paddingLeft: 10,
      color: 'rgba(75, 0, 130, 0.8)',
    },
    submitButton: {
      borderRadius: 25,
      paddingBottom: '1%',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.16,
      shadowRadius: 2.62,
      elevation: 4,
      width: '90%', // Augmenter la largeur pour être plus centré
      marginBottom: 5,
    },
    ionicons: {
      paddingRight: '5%',
    },
    button: {
      borderRadius: 25,
      paddingVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      color: 'yellow', // Change text color to yellow
      fontSize: 15,
      fontWeight: 'bold', // Make text bold
    },
    buttonText: {
      color: 'yellow', // Change text color to yellow
      fontSize: 15,
      fontWeight: 'bold', // Make text bold
    },
    signUpText: {
      color: '#4B0082',
      textDecorationLine: 'underline',
      marginTop: 5,
      fontSize: 16,
    },
    error: {
      color: 'white',
      marginBottom: 10,
    },
  });
  