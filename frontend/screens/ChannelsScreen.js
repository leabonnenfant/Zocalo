import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';



export default function Channels() {


  const [eventMessage, setEventMessage] = useState({});
  const [healthMessage, setHealthMessage] = useState({});
  const [roomiesMessage, setRoomiesMessage] = useState({});
  const [jobMessage, setJobMessage] = useState({});
  const navigation = useNavigation()

  useEffect(() => {
    fetchData('http://192.168.100.248:3000/channels/event', setEventMessage);
    fetchData('http://192.168.100.248:3000/channels/health', setHealthMessage);
    fetchData('http://192.168.100.248:3000/channels/roomies', setRoomiesMessage);
    fetchData('http://192.168.100.248:3000/channels/jobs', setJobMessage);
  }, []);

  const fetchData = async (url, setMessage) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log('Data received:', data);
      if (data) { // On vérifie simplement si data est défini
        setMessage(data);
      } else {
        console.error('No data received');
      }
    } catch (err) {
      console.error('Fetch error:', err); 
    }
  };
  
  // const fetch channelEvent = 
  // const fetch channelHealth = 
  // const fetch channelJobboard = 
  // const fetch channelRoomies = 
  // je veux fetch les messages dans les channels respectives
  // Etape 1: onpress pour pouvoir cliquer sur une channel
  // Etape 2: Dans la channel ou on a cliqué, il faut fetcher du backend les data des messages
  // Etape 3: Faire un input en bas pour montrer qu'on peut envoyer des messages
  // Etape 4: intégration de socket pour vraiment pouvoir envoyer des messages lol
  
  
  // Dans le code suivant, j'ai besoin que on puisse cliquer sur les quatre channels présentes, et que le clique nous redirige vers une page de message direct avec un input en bas de celui ci enfin de pouvoir envoyer des messages. 
  
  // Fonction pour tronquer la longueur totale du pseudo et du message 
  const truncateMessage = (pseudo, message, maxLength) => {
    const combined = `${pseudo}: ${message}`;
    if (combined.length > maxLength) {
      return combined.substring(0, maxLength) + '...'; 
    }
    return combined; 
  };
  

  
  const MessageChannel = ({ icon, title, message, notificationCount }) => (
    <TouchableOpacity onPress={() => navigation.navigate('MessageChannels')}>
    
    <View style={styles.channelContainer}>
      <View style={styles.channelIconContainer}>
        <FontAwesome name={icon} size={30} color='black' />
      </View>
      <View style={styles.messageContainer}>
        <View style={styles.channelTitleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.messageContentContainer}>
          <Text style={styles.senderAndMessage}>
            {truncateMessage(message.pseudo, message.message, 60)} </Text>
        </View>
      </View>
      <View style={styles.dynamicContainer}>
        <View style={styles.hourContainer}>
          <Text style={styles.hour}>{message.date}</Text>
        </View>
        <View style={styles.notificationContainer}>
          <Text style={styles.notification}>{notificationCount}</Text>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <MessageChannel icon='home' title='FLAT & ROOMIES' message={jobMessage} notificationCount={20} /> 
      <MessageChannel icon='heartbeat' title='HEALTH & INSURANCES' message={healthMessage} notificationCount={9} />
      <MessageChannel icon='briefcase' title='JOB BOARD' message={roomiesMessage} notificationCount={12}/>
      <MessageChannel icon='calendar' title='LOCAL EVENTS' message={eventMessage} notificationCount={3} />
    </View>
  );
}



const styles = StyleSheet.create({
    pageTitleContainer: {
      alignItems: 'center', 
      fontFamily: 'Avenir',
      fontWeight: 'bold',
      marginTop: 15,
      padding: 10,
      fontFamily: 'Avenir',
   
    },
    pageTitle: {
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
      fontFamily: 'Avenir',
    }, 
    channelContainer: {
      margin: 10,
      marginRight: 5,
      flexDirection: 'row',
      height: 80,

      borderBottomWidth: 1,
      backgroundColor: 'white',
      borderRadius: 10,
      borderBottomColor: '#ddd',
      marginTop: '2%', // Déplacer channelContainer vers le bas
    },
  channelIconContainer: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    width: '70%',
    justifyContent: 'center',
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  channelTitleContainer: {
    flex: 0.45,
    justifyContent: 'flex-end',
  },
  messageContentContainer: {
    flex: 0.55,
    justifyContent: 'flex-start',
  },
  dynamicContainer: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hourContainer: {
    flex: 0.35,
    justifyContent: 'flex-end',
  },
  notificationContainer: {
    marginTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
  },
  senderAndMessage: {
    fontSize: 14,
    color: '#555',
  },
  hour: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'Avenir',
  },
  notification: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: '#512574',
    borderRadius: 12.5, // height / 2
    height: 25,
    width: 25,
    textAlign: 'center',
    lineHeight: 25, // match the height for perfect centering
    fontFamily: 'Avenir',
 
  
  },
});
