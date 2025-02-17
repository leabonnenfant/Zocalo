import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { addFavPlace, removeFavPlace } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';



export default function ListView({ navigation }) {
  const dispatch = useDispatch();
  const [currentPosition, setCurrentPosition] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [coworkings, setCoworkings] = useState([]); 
  const favPlaces = useSelector(state => state.user.value.favPlaces)|| [];
  const API_KEY = 'AIzaSyBCpB_ezKsCj7KuaA9v0Op6B2mkOrDY0bQ';
  const RADIUS = '1218'; // Rayon en mètres 
  const [place, setPlace] = useState({
                               // placeGoogleId: undefined,
                                googleId: undefined,
                                name: undefined,
                                phone: undefined,
                                address: undefined,
                                latitude: undefined,
                                longitude: undefined,
                                rating: undefined,
                                website:  undefined,
                                openingInfo:  undefined,
                                accessibility: undefined,
                              })
 const [searchQuery, setSearchQuery] = useState('');
 const [error, setError] = useState(null);

// Autorisation géoloc
useEffect(() => {
    (async () => {
      const result = await Location.requestForegroundPermissionsAsync();
      const status = result?.status;
      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 10 },
          (location) => {
          
            setCurrentPosition(location.coords);
            // console.log('truc',currentPosition)
          });
      }
    })();
  }, []);

  //fetch coworkings from google
  useEffect(() => {
    const fetchCoworkings = async () => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentPosition.latitude},${currentPosition.longitude}&radius=${RADIUS}&keyword=coworking&key=${API_KEY}`)
        const data = await response.json();
        if (data.status === 'OK') {
          let coworkingsData = [];
          data.results.map((coworking) => {
            coworkingsData.push({
              latitude : coworking.geometry.location.lat,
              longitude : coworking.geometry.location.lng,
              name : coworking.name,
              googleId: coworking.place_id,
              //open : coworking.opening_hours.open_now,
              address: coworking.vicinity,
              rating: coworking.rating,
              // dans mon tableau coworkingsData, je push pour chaque coworking les données correspondates de Google
            })
          })
          setCoworkings(coworkingsData);
          //setFilteredCoworkings(coworkingsData);
    }
  }
  currentPosition && fetchCoworkings()
}, [currentPosition]); 
//console.log('foulahaine list',coworkings)



//au clic sur un pin : afficher modale du lieu google correspondant
const fetchPlaceDetail = (placeId) => {
  fetch(`https://places.googleapis.com/v1/places/${placeId}?fields=id,displayName.text,internationalPhoneNumber,formattedAddress,location,rating,websiteUri,regularOpeningHours.weekdayDescriptions,accessibilityOptions.wheelchairAccessibleSeating&key=${API_KEY}`)
  .then((response) => response.json())
  .then((data) => {
  // if (data.status === 'OK') {
          setPlace({
            googleId: data.id,
            // placeGoogleId: data.id,
            name: data.displayName.text,
            phone: data.internationalPhoneNumber,
            address: data.formattedAddress,
            latitude: data.location.latitude,
            longitude: data.location.longitude,
            rating: data.rating,
            website: data.websiteUri,
            openingInfo: data.regularOpeningHours?.weekdayDescriptions,
            accessibility: data.accessibilityOptions?.wheelchairAccessibleSeating
          })
          
//  };
  })
}


const handleSearch = (text) => {
  setSearchQuery(text);
};

const filteredCoworkings = coworkings.filter((coworking) => {
  const query = searchQuery.toLowerCase();
  return coworking.name.toLowerCase().includes(query) || 
         coworking.rating.toString().includes(query);
});

const onHeartPress = async (place, googleId) => {
  const isFav = favPlaces.some((e) => e.googleId === place.googleId);
  if (isFav) {
    dispatch(removeFavPlace(place));
  } else {
    dispatch(addFavPlace(place));
  }
 // updateFavoriteProject(project._id, !isFav);
};
  console.log('samarsh : ',favPlaces);



  return (
    <LinearGradient colors={['#F5D494', '#DEB1A1', '#F5E6E7']} style={styles.background}>
    <View style={styles.background}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleHeader}>Where to work ?</Text>
        <View style={styles.headerContent}>
        <FontAwesome name="map-o" size={35} marginRight={20} color="#512574" onPress={() => navigation.navigate('Maps')} />
        <TextInput
          style={styles.input}
          placeholder="City, name..."
           value={searchQuery}
           onChangeText={handleSearch}
        />
        </View>         
      </View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        
        <FlatList
          data={filteredCoworkings}
          keyExtractor={(item) => item.googleId.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity  >
             {/*  onPress={() => handlePlacePress(item)} */}
             <LinearGradient colors={['#F5D494', '#B875B7']} style={styles.PlaceContainer}>
              <View style={styles.placeContainer}>
                <View style={styles.placeHeader}>
                  <Text style={styles.title}>{item.name}</Text>
                    <FontAwesome
                    name={favPlaces.some((favPlaces) => favPlaces.googleId === item.googleId) ?'heart' : 'heart-o'}
                    size={20}
                    color={favPlaces.some((favPlaces) => favPlaces.googleId === item.googleId) ? "#6B387E" : "#6B387E"}
                    onPress={() => onHeartPress(item)}
                    />
                </View>
                <Text style={styles.item}>📍{item.address}</Text>
                <Text style={styles.item}>{item.open}</Text>
                <Text style={styles.item}>⭐{item.rating}</Text>
              </View>
              </LinearGradient>
            </TouchableOpacity>
          )}
        />
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
    padding: 10,
    justifyContent: 'center',
    borderRadius: 5,
  },
  placeContainer: {
    marginBottom: 20,
    padding: 15,
   // backgroundColor: '#B875B7',
    borderRadius: 2,
  },
  placeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B387E',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  item: {
    color: '#6B387E',
    fontSize: 18,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
    height: 130,
  },
  titleHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#512574',
    marginTop: 20,
    paddingTop:10,
  },
  headerContent:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  PlaceContainer: {
    marginBottom: 5,
    padding: 1,
    backgroundColor: '#B875B7',
    borderRadius: 5,
  }
});

