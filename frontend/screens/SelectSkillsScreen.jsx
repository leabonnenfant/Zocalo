import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { updateSkills } from '../reducers/profile';
import { localfetch } from '../localFetch';


export default function SelectSkills({ navigation }) {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [pseudo, setPseudo] = useState('');
  const dispatch = useDispatch();

  const skills = [
    "Art (painting, music, etc.)", 
    "Community Management", 
    "Content creation", 
    "Graphism", 
    "Marketing and communications", 
    "Mobile app development", 
    "Motion design", 
    "Photo", 
    "Saas Solutions", 
    "SEO, GoogleAds, YouTubeAds",
    "Software developer",
    "UX/UI design",
    "Video montage",
    "Web design",
    "Web redaction",
    "Website developer",
    "Website maintenance"
  ];

  const handleSubmit = () => {
    fetch(`${localfetch}/profiles/updateProfile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skills: selectedSkills, pseudo }), // Inclure le pseudo
    })
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          dispatch(updateSkills({ skills: selectedSkills, pseudo })); // Assurez-vous d'envoyer pseudo ici
          navigation.navigate('TabNavigator', {screen: 'Maps'});
        } else {
          alert('Failed to update skills, please try again');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred, please try again later');
      });
  };

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(item => item !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const isSelected = (skill) => {
    return selectedSkills.includes(skill);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.stepText}>Step 2/2</Text>
        <Text style={styles.title}>Your skills</Text>
        <Text style={styles.subtitle}>How can you help locals?</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.skillsContainer}>
        {skills.map((skill, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.skillButton, isSelected(skill) && styles.selectedSkillButton]}
            onPress={() => toggleSkill(skill)}
          >
            <Text style={[styles.skillText, isSelected(skill) && styles.selectedSkillText]}>{skill}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>


      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleSubmit}
      >
        <LinearGradient
          colors={['#514787', '#D032D8', '#B875B7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.continueButtonGradient}
        >
          <Text style={styles.continueButtonText}>Continue →</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 40, // Adjust this value to move the header down
  },
  stepText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    color: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#000',
    marginBottom: 20,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  skillButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderColor: '#000',
    borderWidth: 1,
    margin: 5,
  },
  selectedSkillButton: {
    backgroundColor: 'rgba(184, 117, 183, 0.2)',
    borderColor: '#B875B7',
  },
  skillText: {
    color: '#000',
  },
  selectedSkillText: {
    color: '#B875B7',
  },
  continueButton: {
    marginTop: 20,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 30, // Adjust this value to move the button up or down
  },
  continueButtonGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});