import {  Image, Alert, StyleSheet, Text, TextInput, View, TouchableOpacity, StatusBar } from 'react-native';
import { FC, useState } from 'react';
import EventList from './components/EventList';
import NavBar from './components/NavBar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {

  const Stack = createNativeStackNavigator();

  const [text1, onText1Change] = useState<string>()
  const [text2, onText2Change] = useState<string>()
  const [text3, onText3Change] = useState<string>()
  const pressHandler = () => {
    console.log('pressed')
    Alert.alert('Alert', text1, [
    { text: 'OK', onPress: () => { console.log("alet click") } },
    { text: 'OK1', onPress: () => { console.log("alet click") } }
    ])
  }

  return (
    // <NavigationContainer>
    //     <Stack.Navigator>
    //       <Stack.Screen name="Home" component={EventList}/>
    //       <Stack.Screen name="Profile" component={ProfileScreen} />
    //     </Stack.Navigator>
    // </NavigationContainer>
      <View style={styles.container}>
        <NavBar></NavBar>
        <EventList></EventList>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
  marginTop: 60,
  flex: 1,
  },
  avatar: {
  marginTop: 10,
  marginBottom: 12,
  height: 200,
  resizeMode: 'contain',
  alignSelf: 'center'
  },
  input: {
  height: 40,
  margin: 12,
  borderWidth: 1,
  padding: 10,
  },
  buttonsContainer: {
  flexDirection: 'row',
  alignSelf: 'baseline',
  },
  button: {
  flex: 1,
  margin: 10,
  alignItems: 'center'
  },
  buttonText: {
    padding: 10
  }
})


