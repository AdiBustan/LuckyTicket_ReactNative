import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Input, Button, Avatar, Text } from '@rneui/base';
import { saveUser } from '../../services/AuthService';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAvoidingView } from 'native-base';
import { User } from '../../moduls/IUser';
import { addUser } from '../../services/UserService';


const EditProfile = ({ navigation, route } : any) => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [picture, setPicture] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    setPicture( route.params.picture );
    setUserName( route.params.username );
    setEmail( route.params.email );
    setPhone( route.params.phone );
    });

    return unsubscribe;
  }, [navigation])
  
  const handleSave = async () => {
    if (phone.length < 9 ) {
      Alert.alert('Invalid Phone number', 'Phone number must be valid.');
      return;
    }

    const userData : User = {
      "username": username,
      "email": email,
      "phone": phone,
      "imgName": picture,
    }

    await addUser(userData);
    console.log("========== sent: " + username)
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
      setPicture( result.assets[0].uri )
      console.log("=======" + result.assets[0].uri )
    }
  };

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={{
        flex: 1
      }}>
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Profile</Text>
      <TouchableOpacity onPress={handleChooseAvatar}>
        <Avatar
          rounded
          size="xlarge"
          source={picture ? { uri: picture } : { uri: 'https://i.pinimg.com/564x/dc/c9/f5/dcc9f5cf6a8051865296ab6e796108c6.jpg'}}
          containerStyle={styles.avatar}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder={username}
        value={username}
        onChangeText={(value) => setUserName( value )}
      />
      <TextInput
        style={styles.input}
        placeholder={email}
        value={email}
        keyboardType="email-address"
        onChangeText={(value) => setEmail( value )}
      />
      <TextInput
        style={styles.input}
        placeholder={phone}
        value={phone}
        keyboardType="phone-pad"
        onChangeText={(value) => setPhone( value )}
      />
      <TouchableOpacity style={styles.signUpButton} onPress={handleSave}>
        <Text style={styles.signUpButtonText}>Save</Text>
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

export default EditProfile;
