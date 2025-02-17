import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import 'react-native-reanimated';
import { LogBox } from 'react-native';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';
import place from './reducers/place';
import { View, Platform } from 'react-native';


import Channels from './screens/ChannelsScreen';
import Community from './screens/CommunityScreen';
import CreateProfile from './screens/CreateProfileScreen';
import ForgotPassword from './screens/ForgotPasswordScreen';
import ListView from './screens/ListViewScreen';
import Maps from './screens/MapsScreen';
import MyMessages from './screens/MyMessagesScreen';
import MyPlaces from './screens/MyPlacesScreen';
import MyProjects from './screens/MyProjectsScreen';
import Profile from './screens/ProfileScreen';
import SelectSkills from './screens/SelectSkillsScreen';
import SignIn from './screens/SignInScreen';
import SignUp from './screens/SignUpScreen';
import Solidarity from './screens/SolidarityScreen';
import ProjectDetails from './screens/ProjectDetailsScreen';
import PrivateMessage from './screens/PrivateMessage';
import MessageChannels from './screens/MessageChannelsScreen';

LogBox.ignoreAllLogs();//Ignore all log notifications

 const store = configureStore({
 reducer: { user , place },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = '';

        if (route.name === 'Maps') {
          iconName = 'location-arrow';
        } 
        else if (route.name === 'Community') {
          iconName = 'users';
        }
        else if (route.name === 'Solidarity') {
          iconName = 'heart';
        }
        else if (route.name === 'Profile') {
          iconName = 'user';
        }

        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#6B387E',
      tabBarInactiveTintColor: '#B875B7',
      tabBarStyle: {backgroundColor:'#FBD3A3'},
      headerShown: false,
    })}>
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Maps" component={Maps} />
      <Tab.Screen name="Community" component={Community} />
      <Tab.Screen name="Solidarity" component={Solidarity} />
    </Tab.Navigator>
  );
};


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignIn}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="CreateProfile" component={CreateProfile} />
        <Stack.Screen name="SelectSkills" component={SelectSkills}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
        <Stack.Screen name="TabNavigator" component={TabNavigator}/>
        <Stack.Screen name="Maps" component={Maps}/>
        <Stack.Screen name="ListView" component={ListView}/>
        <Stack.Screen name="Channels" component={Channels} />
        <Stack.Screen name="Solidarity" component={Solidarity} />
        <Stack.Screen name="ProjectDetails" component={ProjectDetails} /> 
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="MyPlaces" component={MyPlaces} />
        <Stack.Screen name="MyProjects" component={MyProjects} />
        <Stack.Screen name="MyMessages" component={MyMessages} />
        <Stack.Screen name="PrivateMessage" component={PrivateMessage}/>
        <Stack.Screen name="MessageChannels" component={MessageChannels}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

