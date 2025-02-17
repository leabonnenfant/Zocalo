	
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { addFavoriteProject, removeFavoriteProject } from '../reducers/user';
import { localfetch } from '../localFetch';


export default function Solidarity({ navigation }) {
  const [annonces, setAnnonces] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const dispatch = useDispatch();
  const userFavProjects = useSelector(state => state.user.value.favProjects) || [];


  const fetchProjects = () => {
    fetch(`${localfetch}/projects`)
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          setAnnonces(data.projects);
          setFilteredProjects(data.projects); // Mettre à jour les projets filtrés avec tous les projets au départ
        } else {
          console.error(data.error);
          setError('Échec du chargement des projets');
        }
      })
      .catch(error => {
        console.error('Erreur :', error);
        setError('Échec de la requête réseau');
      });
  };

  const handleProjectPress = (project) => {
    navigation.navigate('ProjectDetails', { project });
  };

  console.log({userFavProjects});

  const handleToggleFavorite = (project) => {

    const isFav = userFavProjects.some(e => e._id === project._id);
    console.log({isFav});
    if (isFav) {
      dispatch(removeFavoriteProject(project));
    } else {
      dispatch(addFavoriteProject(project));
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = annonces.filter(project => {
      const title = project.title ? project.title.toLowerCase() : '';
      const place = project.place ? project.place.toLowerCase() : '';
      const skills = project.skills_needed ? project.skills_needed.join(', ').toLowerCase() : '';
      const timeNeeded = project.time_needed ? project.time_needed.toString().toLowerCase() : '';
      const remote = project.remote ? 'Remote' : ' On site';

  return (
    title.includes(text.toLowerCase()) ||
    place.includes(text.toLowerCase()) ||
    skills.includes(text.toLowerCase()) ||
    timeNeeded.includes(text.toLowerCase()) ||
    remote.toLowerCase().includes(text.toLowerCase())
  );
});
setFilteredProjects(filtered);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <LinearGradient colors={['#F5D494', '#DEB1A1', '#F5E6E7']} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titleHeader}>Give your time, help a local</Text>
          <TextInput
            style={styles.input}
            placeholder="Place, skills, remote..."
            onChangeText={handleSearch}
            value={searchQuery}
          />
        </View>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <FlatList
          data={filteredProjects}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleProjectPress(item)}>
              <LinearGradient colors={['#F5D494', '#B875B7']} style={styles.annonceContainer}>
                <Image source={require('../assets/logo.png')} style={styles.image} />
                <View style={styles.annonceContent}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.item}>{item.place}</Text>
                  <Text style={styles.item}>{item.skills_needed.join(', ')}</Text>
                  <Text style={styles.item}>{item.time_needed}</Text>
                  <Text style={styles.item}>{item.remote ? 'Remote' : 'On-site'}</Text>
                </View>
                <TouchableOpacity onPress={() => handleToggleFavorite(item)} style={styles.favoriteButton}>
                <FontAwesome
                    name={userFavProjects.some(favProject => favProject._id === item._id) ? 'heart' : 'heart-o'}
                    size={24}
                    color={userFavProjects.some(favProject => favProject._id === item._id) ? '#6B387E' : '#512574'}
                  />
                </TouchableOpacity>
              </LinearGradient>
            </TouchableOpacity>
          )}
        />
        
        )}
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
    padding: 10,
    justifyContent: 'center',
  },
  annonceContainer: {
    marginBottom: 9,
    padding: 10,
    backgroundColor: '#B875B7',
    borderRadius: 5,
    flexDirection: 'row', // Ajout de la direction de la ligne pour aligner l'image et le texte horizontalement
    alignItems: 'center', // Aligner les éléments verticalement
  },
  annonceContent: {
    flex: 1, //  pour éviter le débordement
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#512574',
    top: 5,
  },
  image: {
    height: 100,
    width: 100,
    marginRight: 10,
    marginBottom : 10, 
    borderRadius: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  item: {
    color: '#6B387E',
    fontSize: 13,
  },
  header: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
    height: 120,
  },
  titleHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#512574',
    top: 15,
  },
  input: {
    height: 40,
    borderColor: '#B875B7',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: 250,
    backgroundColor: '#DEB1A1',
    fontSize: 18,
  },
  favoriteButton: {
    alignItems: 'flex-end',
  }
});
