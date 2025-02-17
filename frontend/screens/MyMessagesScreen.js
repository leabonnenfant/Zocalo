import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from "react-redux";
import { localfetch } from '../localFetch';

export function MyMessages() {
  const userId = useSelector((state) => state.user.value.id);
  const [messageList, setMessageList] = useState([]);

  console.log(userId)
  console.log(messageList)

  useEffect(() => {
    if (userId) {
      (async() => {
        try {
          const response = await fetch(`${localfetch}/messages/user/${userId}`);
          if (response.ok) {
            const messages = await response.json();
            setMessageList(messages)
          } else {
            alert("An error has occurred")
          }
        } catch (e) {
          console.error(e.message);
        }
      })();
    }
  }, [userId])

  const messageItems = messageList.map((e) => {
    return (
      <TouchableOpacity key={e._id} style={styles.messageItem}>
        <Image source={{ uri: e.receiverId.image }} style={styles.icon} />
        <View style={styles.messageDetails}>
          <Text style={styles.name}>{e.receiverId.title}</Text>
          <Text style={styles.message}>{e.text}</Text>
        </View>
        <Text style={styles.time}>{new Date(e.timestamp).toLocaleTimeString()}</Text>
      </TouchableOpacity>
    )
  })


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        placeholderTextColor="#888"
      />
      {messageItems}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Corrigez la couleur d'arrière-plan
  },
  searchBar: {
    height: 40,
    backgroundColor: '#333',
    borderRadius: 20,
    paddingHorizontal: 15,
    margin: 10,
    color: '#fff',
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  messageDetails: {
    flex: 1,
  
  },
  name: {
    fontWeight: 'bold',
    color: '#fff',
  },
  message: {
    color: '#888',
  },
  time: {
    color: '#888',
  },
});

export default MyMessages;
