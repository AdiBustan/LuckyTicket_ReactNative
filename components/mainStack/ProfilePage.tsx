import { Avatar, Divider, Icon, ListItem, Text } from '@rneui/base';
import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import EventList from './EventList';
import NavBar from './NavBar';
import { onLogOut } from '../../services/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from 'firebase/auth';
import { auth } from "../../config"
import { IEvent } from '../../moduls/IEvent';
import Event from "../event/Event"
import { CanceledError } from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { getEventsByUser } from '../../services/EventService';
import { User } from '../../moduls/IUser';
import { getCurrUser } from '../../services/UserService';

const ProfilePage = ({ navigation, route } : any) => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [picture, setPicture] = useState('');
  const [dataset, setDataSet] = useState<IEvent[]>([])
  const [error, setError] = useState()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    setPicture( route.params.picture );
    setUserName( route.params.username );
    setEmail( route.params.email );
    setPhone( route.params.phone );
    });

    return unsubscribe;
  }, [navigation])

  const handleLogOut = async () => {
    onLogOut();
    signOut(auth)
    navigation.navigate('LandingPage')
  }

  const handleEdit = async () => {
    navigation.navigate('EditProfile', {picture: picture, 
                                        username: username, 
                                        email: email,
                                        phone: phone});
  }
  
  const fetchEvents = async () => {
        setLoading(true); // Set loading to true when starting the fetch
        try {
          const res = await getEventsByUser();
          setDataSet(res);
        } catch (err) {
          console.log(err);
          if (err instanceof CanceledError) return;
          setError(err.message);
        } finally {
            setLoading(false); // Set loading to false when fetch is complete
        }
    };
  useFocusEffect(
      useCallback(() => {
        fetchEvents();
        
      }, [])
  );

 


  return (
    <>
      <NavBar navigation={navigation}></NavBar>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <Icon
            style={{paddingTop:15, paddingLeft: 290}}
            name='edit' 
            type='feather'
            size={28}
            onPress={handleEdit}
          />
          <Icon
            style={{paddingTop: 15, paddingLeft: 10}}
            name='logout' 
            type='material'
            size={28}
            onPress={handleLogOut}
          />
        </View>
        <View style={styles.header}>
          <Avatar
            size="xlarge"
            rounded
            source={picture ? { uri: picture } : { uri: 'data:image/png;base64,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'}}
            containerStyle={styles.avatar}
          />
          <Text style={styles.name} >{username}</Text>
          <Text style={styles.email}>{email}</Text>
          <Text style={styles.email}>{phone}</Text>
        </View>
        <Divider style={styles.divider} />
       
        
      </View>
      <Text style={styles.sectionTitle}>My Events</Text>

      <View style={styles.eventsContainer}>
            {loading ? (
                <View style={styles.spinnerContainer}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
            <FlatList style={styles.list}
                data={dataset}
                keyExtractor={(item) => item.artist}
                renderItem={({ item }) => (
                    <Event navigation={navigation} data={item}/>
                )}
            />
            )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 110,
  },
  eventsContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:"#1F2D45"
},
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    marginTop: 30,
  },
  name: {
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 15,
    textAlign: 'center',
  },
  email: {
    marginTop: '3%',
    fontSize: 18,
    textAlign: 'center',
  },
  divider: {
    marginVertical: 20,
  },
  sectionTitle: {
    marginLeft:20,
    marginBottom: 10,
    marginTop: '10%',
    fontWeight: "bold", 
    fontSize: 26
  },
  list: {
        width: '95%'
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ProfilePage;
