import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function MyPlaces() {
  const favoriteCoworkings = useSelector(state => state.user.value.favPlaces);

  const renderPlace = ({ item }) => (
    <View style={styles.placeCard}>
      <Text style={styles.placeName}>{item.name}</Text>
      <Text style={styles.placeAddress}>{item.address}</Text>
      <Text style={styles.placeStatus}>{item.status}</Text>
      <Text style={styles.placeWifi}>{item.wifiRating}</Text>
    </View>
  );

  return (
    <FlatList
      data={favoriteCoworkings}
      renderItem={renderPlace}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.placesList}
    />
  );
}

const styles = StyleSheet.create({
  placeCard: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeAddress: {
    fontSize: 14,
    color: '#666',
  },
  placeStatus: {
    fontSize: 14,
    color: '#666',
  },
  placeWifi: {
    fontSize: 14,
    color: '#666',
  },
  placesList: {
    padding: 16,
  },
});
