import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Input, Button, Avatar, Text } from '@rneui/base';
import { saveUserData } from '../../services/AuthService';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../config"



const SignUpPage = ({ navigation } : any) => {
  const [avatarUri, setAvatarUri] = useState('');
  const [errorState, setErrorState] = useState("");

  const [userData, setUserData] = useState({
    picture: '',
    username: '',
    email: '',
    phone: '',
    password: '',
  });


  const handleSignUp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (userData.phone.length < 9 ) {
      Alert.alert('Invalid Phone number', 'Phone number must be valid.');
      return;
    }

    if (userData.password.length < 6) {
      Alert.alert('Invalid Password', 'Password must be at least 6 characters long.');
      return;
    }
    
    createUserWithEmailAndPassword( auth, userData.email, userData.password).catch((error: { message: React.SetStateAction<string>; }) =>
      setErrorState(error.message)
    );
    saveUserData(userData);

    console.log('Username:', userData.username);
    console.log('Email:', userData.email);
    console.log('Phone:', userData.phone);
    console.log('Password:', userData.password);
    console.log('Avatar URI:', userData.picture);

    navigation.navigate('Home');
  };

  const handleChooseAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
      setUserData({ ...userData, picture: result.assets[0].uri})
    }
  };

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={{
        flex: 1
      }}>
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>
      <TouchableOpacity onPress={handleChooseAvatar}>
        <Avatar
          rounded
          size="xlarge"
          source={avatarUri ? { uri: avatarUri } : { uri: 'https://i.pinimg.com/564x/dc/c9/f5/dcc9f5cf6a8051865296ab6e796108c6.jpg'}}
          containerStyle={styles.avatar}
        />
      </TouchableOpacity>
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
        placeholder="Phone"
        value={userData.phone}
        keyboardType="phone-pad"
        onChangeText={(value) => setUserData({ ...userData, phone: value })}
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
    </ScrollView>
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
  avatar: {
    marginBottom: 20,
  },
});

export default SignUpPage;

