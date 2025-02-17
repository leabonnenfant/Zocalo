import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const messages = [
  { id: '1', pseudo: 'Léa', profile: 'LéaB', picture: 'lea.png', message: "I'm looking for a studio near Roma Norte? if you heard about anything..", date: '11:17' },
  { id: '2', pseudo: 'F@tou', profile: 'FarahM', picture: 'farah.png', message: "Hi, I'm releasing my two-room apartment at the end of June. It’s $760/per month including charges.", date: '11:18' },
  { id: '3', pseudo: 'KweenKebz', profile: 'Fatou', picture: 'fatou.png', message: 'I would also be interested. It can also be a studio.. !', date: '11:21' },
  { id: '4', pseudo: 'MartinM', profile: 'Martin', picture: 'martin.png', message: 'A room has just become available in my shared accommodation.', date: '11:25' },
  { id: '5', pseudo: 'Léa', profile: 'LéaB', picture: 'lea.png', message: 'Hi @MartinM, could you tell me more?', date: '11:27' },
  { id: '6', pseudo: 'F@tou', profile: 'Fatou', picture: 'fatou.png', message: 'Is there an exterior? What neighborhood is this in exactly?', date: '11:28' },
  { id: '7', pseudo: 'MartinM', profile: 'Martin', picture: 'martin.png', message: 'You will have a private room with individual bathroom for $590/month.', date: '11:29' },
  { id: '8', pseudo: 'MartinM', profile: 'Martin', picture: 'martin.png', message: 'It is between Juarez and Roma Norte. The neighborhood is great, safe and very dynamic!', date: '11:29' },
  { id: '9', pseudo: 'Léa', profile: 'LéaB', picture: 'lea.png', message: 'OK, I am interested how to do it?', date: '11:30' },
  { id: '10', pseudo: 'F@tou', profile: 'Fatou', picture: 'fatou.png', message: 'Me too!', date: '11:30' },
  { id: '11', pseudo: 'MartinM', profile: 'Martin', picture: 'martin.png', message: 'You can contact me at +226067255167', date: '11:32' },
];

export default function MyChannels() {
  const [inputMessage, setInputMessage] = useState('');
  const navigation = useNavigation()

  const handleSendMessage = () => {
    console.log('Send message:', inputMessage);
    setInputMessage('');
  };

  const MessageItem = ({ message }) => (
    <View style={styles.messageItem}>
      <View style={styles.messageHeader}>
        <Text style={styles.pseudo}>{message.pseudo}</Text>
        <Text style={styles.date}>{message.date}</Text>
      </View>
      <Text style={styles.messageText}>{message.message}</Text>
    </View>
  );

  return (
    <LinearGradient colors={['#F5D494', '#DEB1A1', '#B875B7']} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.messageList}>
      
          <View style={styles.inner}>
            <LinearGradient colors={['#F5D494', '#DEB1A1', '#B875B7']} style={styles.header}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack('Channels')}>
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerText}>Channel JobBoard</Text>
            </LinearGradient>
            
          </View>
          <View style={styles.textMessages}>
          {messages.map((message) => (
                <MessageItem key={message.id} message={message} />
              ))}
              </View>
          </ScrollView>
        </TouchableWithoutFeedback>
        <LinearGradient colors={['#F5D494', '#DEB1A1', '#B875B7']} style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Type a message..."
                value={inputMessage}
                onChangeText={setInputMessage}
              />
              <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </LinearGradient>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%'
  },
  inner: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 60,
    marginBottom: 0,
  },
  textMessages: {
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Avenir',
  },
  messageItem: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: '#ffff',
    borderRadius: 20,
    fontFamily: 'Avenir',
    width: '80%',
    alignCenter: 'center',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  pseudo: {
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Avenir',
  },
  date: {
    color: 'black',
    fontFamily: 'Avenir',
  },
  messageText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Avenir',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#e2e2e2',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#8e44ad', // Purple color
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Avenir',
  },
});
