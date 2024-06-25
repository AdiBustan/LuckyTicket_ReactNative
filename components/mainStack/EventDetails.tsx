import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';
import { IEvent } from '../../moduls/IEvent';
import { Button, Icon } from '@rneui/base';
import NavBar from './NavBar';

const EventDetails = ( { navigation, route } : any ) => {
    const [event, setEvent] = useState<IEvent>();
    const [phone, setPhone] = useState('');

    useEffect(() => {
        setEvent(route.params.event);
        console.log('event data: ', event);
        setPhone('0587299721');
        //TODO - take user details according to owner ID
      }, [])

    const handleCallPress = () => {
        Linking.openURL(`tel:${phone}`);
    };

    return (
        <>
            <NavBar></NavBar>
            <View style={styles.container}>
              <Icon name="arrow-back-ios" type="material" style={{paddingTop: 15, paddingRight: 330 }} 
                    onPress = {() => {navigation.navigate('Home')}}
              />
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
                    <Text style={styles.metadataText}>  {event?.date}</Text>{'\n'}
                    <Icon name="person" type="material" />
                    <Text style={styles.metadataText}>  John Doe</Text> 
                </Text>
                <Button
                    title={phone}
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
