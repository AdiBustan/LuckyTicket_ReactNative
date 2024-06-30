import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config";
import { saveUser } from '../../services/AuthService';
import { Icon } from '@rneui/base';

const LoginPage = ({ navigation } : any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    var isSucces : boolean = true;

    try {
      // Perform login logic here, e.g., validate credentials
      await signInWithEmailAndPassword(auth, email, password).catch((error: any) => {
        isSucces = false;
        Alert.alert("Email or password are incorrect");
        return;
      });
    } catch {
      return;
    }
    
    if (isSucces) {
      saveUser(email)
      navigation.navigate('Home');
    }
    
  };

  const handleSignUp = () => {
    // Navigate to the sign up screen
    navigation.navigate('SignUp');
  };

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={{
        flex: 1
      }}>
    <View style={styles.container}>
    <Icon name="arrow-back-ios" type="material" style={{paddingTop: 15, paddingRight: 330 }} 
                      onPress = {() => {navigation.navigate('LandingPage')}}
                  />
      <Text style={styles.heading}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        keyboardType="email-address"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 150,
    marginBottom: 70,
    color: '#4C679E', // Blue color
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 18,
  },
  loginButton: {
    backgroundColor: '#4C679E', // Blue color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 40,
  },
  loginButtonText: {
    color: '#fff', // White color
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginPage;
