import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './components/authStack/AuthStack';
import MainStack from './components/mainStack/MainStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './components/authStack/LogInPage';
import LandingPage from './components/authStack/LandingPage';
import SignUpPage from './components/authStack/SignUpPage';
import EventList from './components/mainStack/EventList';
import ProfilePage from './components/mainStack/ProfilePage';
import EventDetails from './components/mainStack/EventDetails';
import EditProfile from './components/mainStack/EditProfile';
import AddEventPage from './components/mainStack/AddEvent';

const authStack = createStackNavigator()
const mainStack = createStackNavigator()
const Stack = createStackNavigator();


const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='LandingPage' component={LandingPage} />
        <Stack.Screen name="LogIn" component={LoginPage} />
        <Stack.Screen name="SignUp" component={SignUpPage}/>
        <Stack.Screen name="Home" component={EventList}/>
        <Stack.Screen name="EventDetails" component={EventDetails} />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="UploadEvent" component={AddEventPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
