import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Input, Button, Text, Image, Icon } from '@rneui/base';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import NavBar from './NavBar'
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { IEvent } from '../../moduls/IEvent';
import { Alert } from 'react-native';
import { addEvent, deleteEvent } from '../../services/EventService'
import Datepicker from './Datepicker';

const EditEventPage = ({ navigation, route} : any) => {
  const [pictureUri, setPictureUri] = useState('../../assets/upload_icon.png');
  const [options, setOptions] = useState([{ label: "Tel Aviv, Israel" }])
  const [artist, setArtist] = useState('')
  const [city, setCity] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [tempTime, setTempTime] = useState(new Date(1598051730000));
  
  useEffect(() => {
    fetchLocations();
    const unsubscribe = navigation.addListener('focus', () => {
        setArtist( route.params.event.artist );
        setCity( route.params.event.city );
        setDate( route.params.event.date );
        setTime( route.params.event.time );
        setPictureUri( route.params.event.imgName )
      });
      return unsubscribe;
    }, [navigation])

  const fetchLocations = async () => {
    try {
      await axios
        .get("https://countriesnow.space/api/v0.1/countries")
        .then((res) => {
          const all: { label: string }[] = [];
          res.data.data.map((location: any) => {
            if (location.country == "Israel") {
              location.cities.map((city: any) => {
                const temp = { label: city };
                all.push(temp);
              })
            }
          });
          setOptions(all);
        }).catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("Error fetching locations: " + error);
    }
  };
  
  const onChangeDate = (event : any, selectedDate : any) => { 
    const currentDate = selectedDate;
    setShowDate(false)
    setTempTime(currentDate)
    setDate(selectedDate.toISOString().split('T')[0])
  };

  const onChangeTime = (event : any, selectedDate : any) => { 
    const currentDate = selectedDate;
    setShowTime(false)
    setTempTime(currentDate)
    setTime(selectedDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))
  };

  const handleSubmit = async () => {
    
    if (!date || !time || !city || ! artist || !pictureUri) {
      Alert.alert('Missing Fields', 'Please enter all of the fields');
    } else {
      const eventToUpload: IEvent = {
      'date': date as string,
      'time': time as string,
      'city': city as string,
      'artist': artist as string,
      'imgName': pictureUri as string,
      }
      
      await deleteEvent(route.params.event.artist)
      await addEvent(eventToUpload)

      navigation.navigate('Home');
    }
    
  };

  const handleChoosePicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setPictureUri(result.assets[0].uri);
    }
  };


  return (
    <>
      <NavBar navigation={navigation}></NavBar>
      <Icon name="arrow-back-ios" type="material" style={{paddingTop: 15, paddingRight: 330 }} 
                      onPress = {() => {navigation.navigate('Home')}}
                  />
      <View style={styles.container}>
            <TouchableOpacity onPress={handleChoosePicture}>
                <Image
                  source={{ uri: pictureUri }}
                  containerStyle={styles.image}
                />
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder={artist}
                value={artist}
                onChangeText={newArtist => setArtist(newArtist)}
            />
            <Dropdown
              style={styles.input}
              data={options}
              maxHeight={200}
              labelField="label"
              valueField="label"
              placeholder={city}
              onChange={function (item: { label: string; }): void { setCity(item.label) }}
              />
              <SafeAreaView>
                <View style={styles.dateContainer}>
                    <Button 
                        buttonStyle={styles.dateButton} 
                        type="clear" 
                        onPress={() => setShowDate(true)} 
                        title={date} 
                    />
                    <Button 
                        buttonStyle={styles.dateButton} 
                        type="clear" 
                        onPress={() => setShowTime(true)} 
                        title={time} 
                    />
                </View>
                {showDate && (
                    <DateTimePicker
                    testID="datePicker"
                    value={tempTime}
                    mode="date"
                    display='spinner'
                    minimumDate={new Date(2024, 7, 2)}
                    onChange={onChangeDate}
                    />
                )}
                {showTime && (
                    <DateTimePicker
                    testID="TimePicker"
                    value={tempTime}
                    mode="time"
                    is24Hour={true}
                    display='spinner'
                    minimumDate={new Date()}
                    onChange={onChangeTime}
                    />
                )}
            </SafeAreaView>
            <TouchableOpacity style={styles.uploadBtton} onPress={handleSubmit}>
                <Text style={styles.uploadButtonText}>Upload</Text>
            </TouchableOpacity>
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      marginTop: '15%'
  },
  dateContainer: {
    flexDirection: 'row', // Align children from left to right
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingStart:45,
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
  placeholderStyle: {
    fontSize: 18,
    color: '#C7C7CD'
  },
  uploadBtton: {
    backgroundColor: '#007bff', // Blue color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 40,
  },
  uploadButtonText: {
    color: '#fff', // White color
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 80
  },
  dateButton : {
    width: '70%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 18,
  },
});

export default EditEventPage;
