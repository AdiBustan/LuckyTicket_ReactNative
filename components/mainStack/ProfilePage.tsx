import { Avatar, Divider, Icon, ListItem, Text } from '@rneui/base';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import EventList from './EventList';
import * as SecureStore from 'expo-secure-store';
import NavBar from './NavBar';
import { onLogOut } from '../../services/AuthService';


const ProfilePage = ({ navigation } : any) => {
  const [userData, setUserData] = useState({
    picture: '',
    username: '',
    email: '',
    password: '',
  });

  const handleLogOut = async () => {
    onLogOut();
    navigation.navigate('LandingPage')
  }
  
  useEffect(() => {
    getUserData
  }, [])

  async function getUserData() {
    try {
      const currUserData = await SecureStore.getItemAsync('userData');
      if (currUserData !== null) {
        // User data exists, parse it and use it in your app
        setUserData(JSON.parse(currUserData));
        console.log('User data:', JSON.parse(currUserData));
      } else {
        console.log('No user data found.');
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  }

  return (
    <>
      <NavBar navigation={navigation}></NavBar>
      <View style={styles.container}>
        <Icon
          name='logout' 
          type='material'
          onPress={handleLogOut}
          />
        <View style={styles.header}>
          <Avatar
            size="xlarge"
            rounded
            source={{
              uri: 'https://randomuser.me/api/portraits/men/1.jpg',
            }}
            containerStyle={styles.avatar}
          />
          <Text h4 style={styles.name}>{userData.username}</Text>
          <Text style={styles.email}>{userData.email}</Text>
        </View>
        <Divider style={styles.divider} />
        <Text h4 style={styles.sectionTitle}>My Events</Text>
        {/* <EventList></EventList> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    marginBottom: 10,
  },
  name: {
    marginBottom: 5,
    textAlign: 'center',
  },
  email: {
    marginBottom: 20,
    textAlign: 'center',
  },
  divider: {
    marginVertical: 20,
  },
  sectionTitle: {
    marginBottom: 10,
  },
  list: {
        width: '95%'
    }
});

export default ProfilePage;
