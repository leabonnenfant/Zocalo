import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MyPlaces from "./MyPlacesScreen";
import MyProjects from "./MyProjectsScreen";
import { localfetch } from '../localFetch';
import { useSelector } from 'react-redux';

const BACKEND_ADDRESS = localfetch;

export default function Profile({ navigation }) {
  const [activeTab, setActiveTab] = useState("myPlaces");
  const [pageFavoriteProjects, setPageFavoriteProjects] = useState([]);
  const [favoriteCoworkings, setFavoriteCoworkings] = useState([]);
  const user = useSelector((state) => state.user.value);

  console.log(favoriteCoworkings);

  console.log(user);

  const userId = useSelector((state) => state.user.value.id);
  console.log('User ID:', userId); // Vérifiez que l'ID utilisateur est bien récupéré

  const fetchFavPlacesAndProjects = async () => {
    if (!userId) {
        console.error("User ID is undefined");
        return;
    }

    try {
        const response = await fetch(`${BACKEND_ADDRESS}/users/fav/${userId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const responseText = await response.text(); // Lire la réponse comme texte pour inspection

        try {
            const data = JSON.parse(responseText); // Essayer de parser le JSON

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch favorite places and projects');
            }

            setPageFavoriteProjects(data.favAnnounce || []);
            setFavoriteCoworkings(data.favPlaces || []);
        } catch (error) {
            // Afficher le texte de la réponse pour mieux comprendre l'erreur
            console.error('Response Text:', responseText);
            console.error('JSON Parse Error:', error);
            alert('An error occurred while parsing the response');
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        alert(error.message || 'An error occurred, please try again later');
    }
};


  useEffect(() => {
    if (userId) {
      fetchFavPlacesAndProjects();
    } else {
      console.error("User ID is undefined");
    }
  }, [activeTab, userId]);




  

  return (
    <LinearGradient
      colors={["#F5D494", "#DEB1A1", "#B875B7"]}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>ZOCALO LIFE</Text>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <TouchableOpacity style={styles.profileImageContainer}>
            <Image
              style={styles.profileImage}
              source={require('../assets/rebelle.png')}
            />
          </TouchableOpacity>
          <Text style={styles.modifyProfileText}>Modify my profile</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "myPlaces" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("myPlaces")}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === "myPlaces" && styles.activeTabText,
              ]}
            >
              MY PLACES
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "myProjects" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("myProjects")}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === "myProjects" && styles.activeTabText,
              ]}
            >
              MY PROJECTS
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Section */}
        <View style={styles.searchSection}>
          <TextInput
            style={styles.searchInput}
            placeholder="City"
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.filterButton}>
            <FontAwesome5 name="sliders-h" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {activeTab === "myPlaces" ? (
            <MyPlaces favoriteCoworkings={favoriteCoworkings} favAnnounce={user.favAnnounce} favPlaces={user.favPlaces}/>
          ) : (
            <MyProjects favoriteProjects={pageFavoriteProjects} />
          )}
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
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10, 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 90,
    marginTop: 50,
  },
  title: {
    fontSize: 30,
    alignItems: "center",
    fontWeight: "800",
    color: "#512578",
    fontFamily: 'Avenir',
  },
  profileSection: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImageContainer: {
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  modifyProfileText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: "#512578",
    fontFamily: 'Avenir',
  },
  tabContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#ffff",
  },
  tabButtonText: {
    fontSize: 16,
    color: "#ffff",
    fontWeight: '700',
    fontFamily: 'Avenir',
  },
  activeTab: {
    borderBottomColor: "#B875B7",
  },
  activeTabText: {
    color: "#B875B7",
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 20,
    width: "100%",
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#B875B7",
    borderWidth: 1,
    paddingLeft: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  filterButton: {
    marginLeft: 10,
  },
  content: {
    flex: 1,
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 20,
  },
});