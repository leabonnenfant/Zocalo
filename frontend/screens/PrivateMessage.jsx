import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import MaterialIcons from "react-native-vector-icons/MaterialIcons";
  import { useState, useEffect } from "react";
  import { useSelector } from "react-redux";
  import socketIOClient from "socket.io-client";
  import { LinearGradient } from 'expo-linear-gradient';
    
  export default function PrivateMessage({ route, navigation }) {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const userId = useSelector((state) => state.user.value.id);
    console.log("userId", userId)
    const { receiverId, projectName } = route.params;
  
    useEffect(() => {
      const socket = socketIOClient("http://192.168.100.110:3000");
      setSocket(socket);
  
      socket.on("connect", () => {
        console.log("Socket connected to server");
      });
  
      return () => {
        socket.off("connect");
        socket.disconnect();
      };
    }, []);
  
    useEffect(() => {
      if (socket) {
        const handleReceiveMessage = (newMessage) => {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        };
        socket.on("receiveMessage", handleReceiveMessage);
  
        return () => {
          socket.off("receiveMessage", handleReceiveMessage);
        };
      }
    }, [socket]);
  
    const sendMessage = (message) => {
      if (socket) {
        socket.emit("sendMessage", message);
        console.log("Message from client:", message);
      }
    };
    
  
    const handleSendPress = () => {
      const messageText = message;
      const timestamp = new Date();
      sendMessage()
  
      const newMessage = {
        text: messageText,
        senderId: userId,
        receiverId: receiverId,
        timestamp: timestamp,
        receiverName: projectName,
      };
  
      fetch('http://192.168.100.248:3000/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMessage)
      })
      .then(response => response.json())
      .then(data => {
        setMessages((prevMessages) => [...prevMessages, data]);
        setMessage("");
      })
      .catch(error => {
        console.error('Error:', error);
      });
  
      setMessage("");
    };
  
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <LinearGradient  colors={['#F5D494', '#B875B7']}style={styles.banner}>
          <MaterialIcons
            name="keyboard-backspace"
            color="#ffffff"
            size={24}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.greetingText}>{projectName}</Text>
        </LinearGradient>
  
        <View style={styles.inset}>
          <ScrollView style={styles.scroller}>
            <View style={[styles.messageWrapper, styles.messageRecieved]}>
              <View style={[styles.message, styles.messageRecievedBg]}>
                <Text style={styles.messageText}>
                Here you can chat with me about the project I've posted and for which I need a hand! 
                I'll reply as soon as I can. Thanks for contacting me, see you soon 🙏
                </Text>
              </View>
              <Text style={styles.timeText}>11:31</Text>
            </View>
           
            {Array.isArray(messages) &&
              messages.map((message, index) => (
                <View
                  key={index}
                  style={[
                    styles.messageWrapper,
                    message.senderId === userId
                      ? styles.messageSent
                      : styles.messageRecieved,
                  ]}
                >
                  <View
                    style={[
                      styles.message,
                      message.senderId === userId
                        ? styles.messageSentBg
                        : styles.messageRecievedBg,
                    ]}
                  >
                    <Text style={styles.messageText}>{message.text}</Text>
                  </View>
                  <Text style={styles.timeText}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </Text>
                </View>
              ))}
          </ScrollView>
  
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={(value) => setMessage(value)}
              
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => handleSendPress()}
            >
              <MaterialIcons name="send" color="#ffffff" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
  

   const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#DCC4E4",
      },
      inset: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: "#ffffff",
        width: "100%",
        paddingTop: 20,
        position: "relative",
        borderTopColor: "#CE97AA",
        borderTopWidth: 4,
      },
      banner: {
        width: "100%",
        height: "10%",
        paddingTop: 20,
        paddingLeft: 20,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        // backgroundColor: "#EAD2AF",
      },
      greetingText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
        marginLeft: 15,
      },
      message: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        maxWidth: "80%",
      },
      messageWrapper: {
        marginVertical: 10,
        padding: 10,
      },
      messageSent: {
        alignSelf: "flex-end",
        alignItems: "flex-end",
      },
      messageRecieved: {
        alignSelf: "flex-start",
        alignItems: "flex-start",
      },
      messageSentBg: {
        backgroundColor: "#DCF8C6",
      },
      messageRecievedBg: {
        backgroundColor: "#ECECEC",
      },
      messageText: {
        color: "#303030",
      },
      timeText: {
        color: "#999",
        fontSize: 10,
        marginTop: 5,
      },
      inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: "#ececec",
        backgroundColor: "#ffffff",
      },
      input: {
        flex: 1,
        padding: 10,
        borderRadius: 20,
        backgroundColor: "#f0f0f0",
        marginRight: 10,
      },
      sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#128C7E",
        alignItems: "center",
        justifyContent: "center",
      },
    });