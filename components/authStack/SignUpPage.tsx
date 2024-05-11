import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Input, Button, Avatar, Text } from '@rneui/base';
import { saveUserData } from '../../services/AuthService';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';


const SignUpPage = ({ navigation} : any) => {
  const [userData, setUserData] = useState({
    picture: '',
    username: '',
    email: '',
    password: '',
  });


  const handleSignUp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (userData.password.length < 6) {
      Alert.alert('Invalid Password', 'Password must be at least 6 characters long.');
      return;
    }

    saveUserData(userData);

    console.log('Username:', userData.username);
    console.log('Email:', userData.email);
    console.log('Password:', userData.password);
    // console.log('Avatar URI:', avatarUri);

    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="User Picture URL"
        value={userData.picture}
        onChangeText={(value) => setUserData({ ...userData, picture: value })}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={userData.username}
        onChangeText={(value) => setUserData({ ...userData, username: value })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userData.email}
        keyboardType="email-address"
        onChangeText={(value) => setUserData({ ...userData, email: value })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={userData.password}
        onChangeText={(value) => setUserData({ ...userData, password: value })}
      />
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
        <Text style={styles.loginLink}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#007bff', // Blue color
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
  signUpButton: {
    backgroundColor: '#007bff', // Blue color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#fff', // White color
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    color: '#007bff', // Blue color
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default SignUpPage;
