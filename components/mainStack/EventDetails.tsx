import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';
import { IEvent } from '../../moduls/IEvent';
import { Button, Icon } from '@rneui/base';
import NavBar from './NavBar';
import { getCurrUser } from '../../services/UserService';
import { deleteEvent } from '../../services/EventService';

const EventDetails = ( { navigation, route } : any ) => {
    const [event, setEvent] = useState<IEvent>();
    const [currUserEmail, setCurrUserEmail] = useState('')

    useEffect(() => {
        setEvent(route.params.event);
        findCurrUser()
      }, [])

   
    const findCurrUser = async () => {
        const user = await getCurrUser()
        setCurrUserEmail(user.email)
    }

    const handleCallPress = () => {
        Linking.openURL(`tel:${event?.phone}`);
    };

    const handleEdit = async () => {
      navigation.navigate('EditEvent', {event: event});
    }
    
    const handleDelete = async () => {
      deleteEvent(event.artist)
      navigation.navigate('Home');
    }
    
    return (
        <>
            <NavBar  navigation={navigation}></NavBar>
            <View style={styles.container}>
              <View style={{ flexDirection: 'row' }}>
                { (event?.owner != currUserEmail)  &&
                  <Icon name="arrow-back-ios" type="material" style={{paddingTop: 15, paddingRight: 330 }} 
                      onPress = {() => {navigation.navigate('Home')}}
                  />
                }
                { (event?.owner == currUserEmail)  &&
                  <Icon name="arrow-back-ios" type="material" style={{paddingTop: 15, paddingRight: 260 }} 
                      onPress = {() => {navigation.navigate('Home')}}
                  />
                }
                { (event?.owner == currUserEmail)  &&
                  <Icon style={{ paddingTop:15, paddingRight: 10}} name='edit' type='feather'size={28} onPress={handleEdit}
                  />
                }
                { (event?.owner == currUserEmail)  &&
                  <Icon style={{ paddingTop:15}} name='trash' type='feather'size={28} onPress={handleDelete}
                  />
                }
              </View>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: event?.imgName }} // Example image URI
                  style={styles.image}
                />
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.title}>{event?.artist}</Text>
                <Text style={styles.description}>
                    <Icon name="place" type="material" />
                    <Text style={styles.metadataText}>  {event?.city}</Text>{'\n'}
                    <Icon name="event" type="material" />
                    <Text style={styles.metadataText}>  {event?.date} {event?.time}</Text>{'\n'}
                    <Icon name="person" type="material" />
                    <Text style={styles.metadataText}>  {event?.owner}</Text> 
                </Text>
                <Button
                    title={event?.phone}
                    icon={{
                      name: 'call',
                      type: 'material',
                      size: 15,
                      color: 'white',
                    }}
                    iconContainerStyle={{ marginRight: 10 }}
                    titleStyle={{ fontWeight: '700' }}
                    buttonStyle={{
                      backgroundColor: 'rgba(90, 154, 230, 1)',
                      borderColor: 'transparent',
                      borderWidth: 0,
                      borderRadius: 30,
                    }}
                    containerStyle={{
                        width: 200,
                        marginHorizontal: 50,
                        marginVertical: 10,
                      }}
                    onPress={handleCallPress}
                    />
              </View>
            </View>
        </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fff',
  },
  imageContainer: {
    marginTop: 110,
    marginBottom: 20,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  detailsContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
  },
  metadataText: {
    marginLeft: 15,
  },
});

export default EventDetails;
