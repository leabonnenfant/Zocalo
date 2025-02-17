import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function MyProjects() {
  const userFavProjects = useSelector(state => state.user.value.favProjects || []);

  console.log(userFavProjects);

  const renderProject = ({ item }) => (
    <View style={styles.projectCard}>
      <Text style={styles.projectName}>{item.title}</Text>
      <Text style={styles.projectDescription}>{item.description}</Text>
      {/* <Text style={styles.projectDescription}>{item.skills_needed.join(', ')}</Text> */}
      <Text style={styles.projectDescription}>{item.time_needed}</Text>
      <Text style={styles.projectDescription}>{item.remote ? 'Remote' : 'On-site'}</Text>
    </View>
  );

  return (
    <FlatList
      data={userFavProjects}
      renderItem={renderProject}
      keyExtractor={item => item._id}
    />
  );
}

const styles = StyleSheet.create({
  projectCard: {
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 15,
  },
  projectName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  projectDescription: {
    color: '#666',
  },
  projectsList: {
    padding: 20,
  },
});

