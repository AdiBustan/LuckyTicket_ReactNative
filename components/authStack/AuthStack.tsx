// AuthStack.js

import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpPage from './SignUpPage';
import * as SecureStore from 'expo-secure-store';
import LandingPage from './LandingPage';
import LoginPage from './LogInPage';


const Stack = createStackNavigator();

const AuthStack = () => {

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='landingPage' component={LandingPage} />
      <Stack.Screen name="LogIn" component={LoginPage} />
      <Stack.Screen name="SignUp" component={SignUpPage}/>
    </Stack.Navigator>
  );
};

export default AuthStack;
