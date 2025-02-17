import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { addProfile } from '../reducers/profile';
import { localfetch } from '../localFetch';

export default function CreateProfile({ navigation }) {
  const dispatch = useDispatch();

  const [pseudo, setPseudo] = useState('');
  const [position, setPosition] = useState('');
  const [nationality, setNationality] = useState('');
  const [bio, setBio] = useState('');
  const [picture, setPicture] = useState(null);

  const handleRegister = () => {
    fetch(`${localfetch}/profiles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pseudo: pseudo,
        nationality: nationality,
        picture: picture,
        bio: bio,
        position: position,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          const newProfile = {
            pseudo,
            nationality,
            picture,
            position,
            bio,
            token: data.token,
          };
          dispatch(addProfile(newProfile));
          setPseudo('');
          setPosition('');
          setNationality('');
          setPicture('');
          setBio('');
          navigation.navigate('SelectSkills');
        } else {
          console.error(data.error);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPicture(result.assets[0].uri);
    }
  };

  return (
    <LinearGradient colors={['#F5D494', '#B875B7']} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.account}>Create your profile</Text>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={pickImage}>
            {picture ? (
              <Image source={{ uri: picture }} style={styles.image} />
            ) : (
              <View style={styles.cameraIconContainer}>
                <FontAwesome name="camera" size={50} color="#888" />
              </View>
            )}
          </TouchableOpacity>
          <Text style={styles.title}> Customize your profile </Text>
        </View>
        <TextInput
          onChangeText={setPseudo}
          value={pseudo}
          placeholder="Pseudo*"
          style={styles.input}
          placeholderTextColor="rgba(184, 117, 183, 0.9)"
        />
        <TextInput
          onChangeText={setPosition}
          value={position}
          placeholder="Job title"
          style={styles.input}
          placeholderTextColor="rgba(184, 117, 183, 0.7)"
        />
        <TextInput
          onChangeText={setNationality}
          value={nationality}
          placeholder="Where you're from?"
          style={styles.input}
          placeholderTextColor="rgba(184, 117, 183, 0.7)"
        />
        <View style={styles.inputBioContainer}>
          <Text style={styles.bioLabel}>Tell us more about you</Text>
          <TextInput
            onChangeText={setBio}
            value={bio}
            style={styles.inputBio}
            maxLength={420}
            multiline
            placeholderTextColor="rgba(184, 117, 183, 0.7)"
          />
          <Text style={styles.charCount}>{bio.length}/420</Text>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleRegister}>
          <LinearGradient
            colors={['#514787', '#D032D8', '#B875B7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </LinearGradient>
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
  },
  account: {
    width: '60%',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#512578',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  cameraIconContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: '#512578',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'rgba(184, 117, 183, 0.7)',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    color: 'rgba(75, 0, 130, 0.8)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  inputBioContainer: {
    width: '80%',
    marginBottom: 20,
  },
  bioLabel: {
    fontSize: 14,
    color: 'rgba(184, 117, 183, 0.7)',
    marginBottom: 5,
  },
  inputBio: {
    height: 100,
    borderColor: 'rgba(184, 117, 183, 0.7)',
    borderWidth: 1,
    paddingLeft: 10,
    paddingTop: 10,
    color: 'rgba(75, 0, 130, 0.8)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  charCount: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'right',
    color: '#512578',
    marginTop: 5,
  },
  submitButton: {
    width: '80%',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 2.62,
    elevation: 4,
  },
  button: {
    borderRadius: 25,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'yellow',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
