import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { addFavoriteProject, removeFavoriteProject } from '../reducers/user';
import { localfetch } from '../localFetch';


export default function ProjectDetails({ route, navigation }) {
  const { project } = route.params;

  const userFavProjects = useSelector(state => state.user.value.favProjects) || [];

  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.value.userID); // a modifier chez tt le monde

  const isFav = userFavProjects.some(favProject => favProject._id === project._id);

  const handleToggleFavorite = () => {
    if (isFav) {
      dispatch(removeFavoriteProject(project._id));
    } else {
      dispatch(addFavoriteProject(project));
    }
  };
  
  const receiverId = project._id;
  const projectName = project.title;
  console.log(userId);
  console.log(receiverId);
  console.log(projectName);
 

  const handleContactTheLocal = () => {
    navigation.navigate('PrivateMessage', { receiverId, projectName });
  }

  return (
    <LinearGradient colors={['#F5D494', '#B875B7']} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={35} color="#512574" />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <View style={styles.header}>
            <Text style={styles.titleHeader}>Give your Time, help a local</Text>
          </View>
           <View style={styles.littleContainer}>
            <View style={styles.imageTitleContainer}>
              <Image source={require('../assets/logo.png')} style={styles.image} />
              <Text style={styles.title}>{project.title}</Text>
            </View>
            <Text style={styles.subtitle}>Description:</Text>
            <Text style={styles.content}>{project.description}</Text>
            <Text style={styles.subtitle}>Skills Needed:</Text>
            <Text style={styles.content}>{project.skills_needed.join(', ')}</Text>
            <Text style={styles.subtitle}>Time Needed:</Text>
            <Text style={styles.content}>{project.time_needed}</Text>
            <Text style={styles.subtitle}>Remote:</Text>
            <Text style={styles.content}>{project.remote ? 'Yes' : 'No'}</Text>
            <View style={styles.heartContainer}>
              <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
                <FontAwesome
                  name={isFav ? 'heart' : 'heart-o'}
                  size={25}
                  color={isFav ? '#6B387E' : '#512574'}
                />
                <Text style={styles.buttonLabel}>Favorite</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.messageButton}
                onPress={handleContactTheLocal}
              >
                <FontAwesome name="comment" size={25} color="#512574" />
                <Text style={styles.buttonLabel}>Message</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    padding: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#512574',
    flex: 1,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#512574',
  },
  content: {
    fontSize: 16,
    marginBottom: 15,
    color: '#6B387E',
  },
  favoriteButton: {
    alignItems: 'center',
    marginRight: 20,
  },
  messageButton: {
    alignItems: 'center',
  },
  buttonLabel: {
    fontSize: 16,
    color: '#512574',
    marginTop: 5,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    height: 100,
  },
  titleHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#512574',
    top: 30,
  },
  image: {
    height: 100,
    width: 100,
    marginRight: 10,
  },
  imageTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingRight: 7,
    paddingLeft: 7,
    height: 120,
  },
  textContainer: {
    flex: 1,
  },
  littleContainer: {
    paddingLeft: 7,
    paddingRight: 7,
    flexDirection: 'column',
    flex: 1,
    top: 25,
  },
  heartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
});