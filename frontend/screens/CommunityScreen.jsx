import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Channels from './ChannelsScreen'; 
import MyMessages from './MyMessagesScreen';
import { LinearGradient } from 'expo-linear-gradient';
export default function Community({ navigation }) {
  const [activeTab, setActiveTab] = useState("channels");
  return (
    <LinearGradient colors={['#F5D494', '#DEB1A1', '#B875B7']} style={styles.fullContainer}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Community</Text>
        </View>
    {/* Tabs */}
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === "channels" && styles.activeTab,
        ]}
        onPress={() => setActiveTab("channels")}
      >
        <Text
          style={[
            styles.tabButtonText,
            activeTab === "channels" && styles.activeTabText,
          ]}
        >
          LOCAL CHANNELS
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === "messages" && styles.activeTab,
        ]}
        onPress={() => setActiveTab("messages")}
      >
        <Text
          style={[
            styles.tabButtonText,
            activeTab === "messages" && styles.activeTabText,
          ]}
        >
          MESSAGES
        </Text>
      </TouchableOpacity>
    </View>

    {/* Content */}
    <View style={styles.content}>
      {activeTab === "channels" ? (
        <Channels />
      ) : (
        <MyMessages />
      )}
    </View>
  </View>
</LinearGradient>
  );
}
const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  
  },
  header: {
    marginTop: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#512574',
    fontFamily: 'Avenir',
  },
  tabContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  activeTabText: {
    color: "#ffff",
    fontWeight: 'bold',
    fontFamily: 'Avenir',
  },
  tabButtonText: {
    fontSize: 16,
    color: "#B875B7",
    fontWeight: '700',
    fontFamily: 'Avenir',
  },
  content: {
    flex: 1,
  },
});
