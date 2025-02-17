import { Modal, StyleSheet, Text, TextInput, View, StatusBar, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { addFavPlace, removeFavPlace } from '../reducers/user';
import {localfetch} from '../localFetch';
import { LinearGradient } from 'expo-linear-gradient';


const Maps = ({navigation}) => {
  const dispatch = useDispatch();
  const [currentPosition, setCurrentPosition] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [coworkings, setCoworkings] = useState([]); 
  const favPlaces = useSelector(state => state.user.value.favPlaces) || [];
  const API_KEY = '';
  const RADIUS = '1218'; // Rayon en mètres 
  const [place, setPlace] = useState({
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
                                accessibility: undefined,
                              })
  const [searchQuery, setSearchQuery] = useState('')
// Autorisation géoloc

useEffect(() => {
    (async () => {
      const result = await Location.requestForegroundPermissionsAsync();
      const status = result?.status;
      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 10 },
          (location) => {
          
            setCurrentPosition(location.coords);
          });
      }
    })();
  }, []);



// Fetch "coworkings" around current loc - request from google api 

useEffect(() => {
    const fetchCoworkings = async () => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentPosition.latitude},${currentPosition.longitude}&radius=${RADIUS}&keyword=coworking&key=${API_KEY}`);
        const data = await response.json();
        if (data.status === 'OK') {
          let coworkingsData = [];
          data.results.map((coworking) => {
            coworkingsData.push({
              latitude : coworking.geometry.location.lat,
              longitude : coworking.geometry.location.lng,
              name : coworking.name,
              googleId: coworking.place_id,
            })
          })
          setCoworkings(coworkingsData);
      }

        }
        currentPosition && fetchCoworkings()
}, [currentPosition]); 


//au clic sur un pin : afficher modale du lieu google correspondant
const handleMarkerPress = (placeId) => {
  fetch(`https://places.googleapis.com/v1/places/${placeId}?fields=id,displayName.text,internationalPhoneNumber,formattedAddress,location,rating,websiteUri,regularOpeningHours.weekdayDescriptions,accessibilityOptions.wheelchairAccessibleSeating&key=${API_KEY}`)
  .then((response) => response.json())
  .then((data) => {
  // if (data.status === 'OK') {
          setPlace({
            googleId: data.id,
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
          setModalVisible(true);
//  };
  })
}


const onHeartPress = async (place) => {
      if (!favPlaces?.some((e) => e.googleId === place.googleId)) {
      dispatch(addFavPlace(place));
    } else {
      dispatch(removeFavPlace(place));
    }
  };

// close modale for currently opened place
const handleClose = () => {
     setModalVisible(false);
   };

const openHours = place?.openingInfo?.map((e) => {
  return (
    <Text style={styles.bodyText}>{e}</Text>
  )
});

const handleSearch = (text) => {
  setSearchQuery(text);
};

const filteredCoworkings = coworkings.filter((coworking) =>
  coworking.name.toLowerCase().includes(searchQuery.toLowerCase())
);


  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient colors={['#F5D494', '#DEB1A1', '#B875B7']} style={styles.header}>
      
        <View>
          <Text style={styles.titleHeader}>Zocalo Map</Text>
          <TextInput style={styles.searchInput} placeholder="Where are you ?..." onChangeText={handleSearch}
            value={searchQuery}/>
        </View>

        <View style={styles.headerIcons}>
        <FontAwesome5
        name="sliders-h"
        size={30}
        onPress={() => navigation.navigate('ListView')}
        style={styles.listIcon}
        color="#FFDE59" 
        />
        </View>
      </LinearGradient>


      <TouchableOpacity
                style={styles.ButtonList}
                onPress={() => navigation.navigate('ListView')}
              >
                <LinearGradient
                colors={['#514787', '#D032D8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.submitButtonGradient}
              >
              <Text style={styles.buttonLabel}>View list</Text>
              </LinearGradient>
      </TouchableOpacity>
      

     
      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.centeredView}>        
          <View style={styles.modalView}>
          <View style={styles.modalIconsContainer}>
         
            <FontAwesome 
            name={favPlaces?.some((e) => e.googleId === place.googleId) ?'heart' : 'heart-o'}
            size={20} 
            color="#B875B7"
            onPress={() => onHeartPress(place, localfetch)}/>
            <FontAwesome name='times' size={20} color='#B875B7' style={styles.closeIcon} onPress={() => handleClose()}/>
          </View>
          <View style={styles.modalContent}>
            <Text style={styles.title}>{place.name}</Text>
            <Text style={styles.bodyText}>📍 {place.address}</Text>
            <Text style={styles.bodyText}>📞 {place.phone}</Text>
            <Text style={styles.bodyText}>⭐ {place.rating}</Text>          
            <Text style={styles.bodyText}>
              🌐 <Text onPress={() => Linking.openURL(place.website)} style={styles.link}>Go to website</Text>
            </Text>
            <Text style={styles.bodyText}>🕐 Opening Hours :</Text>
              <View>
              {openHours}
              </View>
            <Text style={styles.bodyText}> ♿ Accessibility : {place.accessibility ? 'Yes' : 'No'}</Text>
          </View>
          </View>
          </View>
        </Modal>
        <MapView  
        style={styles.map}
        // initialRegion={{
        //   latitude: currentPosition?.latitude || 0 ,
        //   longitude: currentPosition?.longitude || 0,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // }}
        >
          {currentPosition && <Marker coordinate={currentPosition} title="You are here" pinColor="#fecb2d"/>}
          {coworkings.map((coworking, i) => 
          <Marker
            key={i}
            coordinate={{
              latitude: coworking.latitude,
              longitude: coworking.longitude,
            }}
            onPress={() => handleMarkerPress(coworking.googleId)}
          />
        )}
        </MapView>

    </View>
   
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
   flexDirection: 'row',
   flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5E6E7',
    backgroundColor: '#F5E6E7',
    zIndex: 1,
    height : '15%',
    justifyContent:'center',
    paddingHorizontal: 15,
    paddingTop: 20,
    height: 100,
    padding: 10,
    height : '15%',
    justifyContent:'center',
    paddingHorizontal: 15,
    paddingTop: 20,
    height: 100,
    padding: 10,
  },
  searchInput: {
    borderColor: '#B875B7',
    borderColor: '#B875B7',
    borderWidth: 1,
    borderRadius: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
    width: 270,
    height : 45,
    width: 270,
    height : 45,
    marginBottom:10,
    backgroundColor: '#DEB1A1',
    backgroundColor: '#DEB1A1',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-around',
    marginTop: 20,
    marginLeft: 5,
    alignItems:'center',
    justifyContent:'space-around',
    marginTop: 20,
    marginLeft: 5,
  },
  listIcon: {
    width : 45 ,
    padding : 4,
    margin : 4,
    width : 45 ,
    padding : 4,
    margin : 4,
  },

  map: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#FAF4F3',
    background: 'linear-gradient(180deg, #F5D494 0%, #B875B7 100%)',
    backgroundBlendMode: 'screen',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.16), 0px 2px 4px rgba(0, 0, 0, 0.12), 0px 1px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: 25,
    padding: 20,
    padding: 20,
    margin: 20,
    alignItems: 'flex-start',
    justifyContent:'center',
  },
  modalContent:{
    alignItems:'left',
    justifyContent:'center',
  },
  modalContent:{
    alignItems:'left',
  },
  title: {
    fontFamily: 'Avenir',
    fontWeight: '400',
    fontFamily: 'Avenir',
    fontWeight: '400',
    fontSize: 17,
    color: '#B875B7',
    color: '#B875B7',
    justifyText:'center',

  },
  bodyText: {
    fontFamily: 'Avenir',
    fontFamily: 'Avenir',
    fontStyle: 'normal',
    fontWeight: '250',
    top:10,
    top:10,
    fontSize: 13,
    lineHeight: 20,
    color: '#512574',
  },
  modalIconsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
    marginTop: 0,
  },
  iconButton: {
    width: 40,
    height: 40,
  },
  titleHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#512574',
    left: 90,
    marginBottom: 10,
    fontFamily: 'Avenir',
  },
  buttonLabel: {
    fontSize: 20,
    color: '#FFDE59',
    marginTop: 6,
    width: 110,
    height: 35,
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 3,
    marginBottom: 2,
  },
  ButtonList: {
    alignItems: 'center',
    backgroundColor: '#B875B7',
    height: 50,
    overflow: 'hidden',
  },
  submitButtonGradient: {
   borderRadius: 30,
  },
  titleHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#512574',
    left: 90,
    marginBottom: 10,
    fontFamily: 'Avenir',
  },
  buttonLabel: {
    fontSize: 20,
    color: '#FFDE59',
    marginTop: 6,
    width: 110,
    height: 35,
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 3,
    marginBottom: 2,
  },
  ButtonList: {
    alignItems: 'center',
    backgroundColor: '#B875B7',
    height: 50,
    overflow: 'hidden',
  },
  submitButtonGradient: {
   borderRadius: 30,
  },
});


export default Maps;

// {
// "business_status": "OPERATIONAL", 
// "geometry": {
//     "location": {
//           "lat": 48.8939078, 
//           "lng": 2.3218874
//            }, 
//     "viewport": {
//       "northeast": [Object], 
//       "southwest": [Object]
//     }
//   }, 
// "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png", 
// "icon_background_color": "#7B9EB0", 
// "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet", 
// "name": "Be-Coworking", 
// "opening_hours": {
//     "open_now": true
//   }, 
// "photos": [{
//   "height": 1000, 
//   "html_attributions": [Array], 
//   "photo_reference": "AUGGfZnd9mC678ee70WhLbBFsgWgY5LLoslslgWnspboxThiWySgiI6aRYyjiRXEikuPf111035Up073G_avpc8Ojfz22FdrJzBcqhFvvpCiKGEnn34-P4Vh0OYWFGfvYskUyDy6GCx3eDRnKKBYuT8IT1aezcwKt73GXsqqjY9CbRMHbWc9", 
//   "width": 1500}], 
// "place_id": "ChIJl5bEqKtv5kcRSjSipAHJ6p4", 
// "plus_code": {"compound_code": "V8VC+HQ Paris", "global_code": "8FW4V8VC+HQ"}, 
// "rating": 4.5, 
// "reference": "ChIJl5bEqKtv5kcRSjSipAHJ6p4", 
// "scope": "GOOGLE", 
// "types": ["point_of_interest", "establishment"], 
// "user_ratings_total": 86, 
// "vicinity": "60 Rue de La Jonquière, Paris"
// }





// ---
// https://places.googleapis.com/v1/places/ChIJl5bEqKtv5kcRSjSipAHJ6p4?fields=id,displayName.text,internationalPhoneNumber,formattedAddress,location,rating,websiteUri,regularOpeningHours.weekdayDescriptions,accessibilityOptions.wheelchairAccessibleSeating&key=

// {
//   "id": "ChIJl5bEqKtv5kcRSjSipAHJ6p4",
//   "internationalPhoneNumber": "+33 1 42 26 33 36",
//   "formattedAddress": "60 Rue de La Jonquière, 75017 Paris, France",
//   "location": {
//     "latitude": 48.8939078,
//     "longitude": 2.3218874
//   },
//   "rating": 4.5,
//   "websiteUri": "http://be-coworking.fr/",
//   "regularOpeningHours": {
//     "weekdayDescriptions": [
//       "lundi: 08:30 – 19:30",
//       "mardi: 08:30 – 19:30",
//       "mercredi: 08:30 – 19:30",
//       "jeudi: 08:30 – 19:30",
//       "vendredi: 08:30 – 19:30",
//       "samedi: Fermé",
//       "dimanche: Fermé"
//     ]
//   },
//   "displayName": {
//     "text": "Be-Coworking"
//   },
//   "accessibilityOptions": {
//     "wheelchairAccessibleSeating": true
//   }
// }

// ('TabNavigator', { screen: 'ListView' })}
// ('TabNavigator', { screen: 'ListView' })}