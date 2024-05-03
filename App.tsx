import {  Image, Alert, StyleSheet, Text, TextInput, View, TouchableOpacity, StatusBar } from 'react-native';
import { FC, useState } from 'react';
import EventList from './components/EventList';

export default function App() {
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
    // <View style={styles.container}>
    // <Image style={styles.avatar} source={require('./assets/icon.png')}></Image>
    // <TextInput
    // style={styles.input}
    // onChangeText={onText1Change}
    // placeholder="input name"
    // value={text1}
    // />
    // <TextInput
    // style={styles.input}
    // onChangeText={onText2Change}
    // value={text2}
    // />
    // <TextInput
    // style={styles.input}
    // onChangeText={onText3Change}
    // value={text3}
    // />
    // <View style={styles.buttonsContainer}>
    // <TouchableOpacity style={styles.button} onPress={pressHandler}>
    // <Text style={styles.buttonText}>OK</Text>
    // </TouchableOpacity>
    // <TouchableOpacity style={styles.button} onPress={pressHandler}>
    // <Text style={styles.buttonText}>CANCEL</Text>
    // </TouchableOpacity>
    // </View>
    // </View>
    <View style={styles.container}>
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


