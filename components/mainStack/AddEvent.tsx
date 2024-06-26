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
import { addEvent } from '../../services/EventService'
import { uploadImage } from '../../services/imagesService';

const AddEventPage = ({ navigation, route} : any) => {
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
  }, [])

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
      'imgName': pictureUri.split('/').pop() as string,
      }
      
      await addEvent(eventToUpload)
      await uploadImage(pictureUri)
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
      <View style={styles.container}>
            <TouchableOpacity onPress={handleChoosePicture}>
                <Image
                  defaultSource={require('../../assets/upload_icon.png')}
                  source={{ uri: pictureUri }}
                  containerStyle={styles.image}
                />
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Artist"
                onChangeText={newArtist => setArtist(newArtist)}
            />
            <Dropdown
              style={styles.input}
              data={options}
              maxHeight={200}
              labelField="label"
              valueField="label"
              placeholder="City" 
              itemTextStyle= {{fontSize: 18}}
              selectedTextStyle = {{fontSize: 18}}
              placeholderStyle={styles.placeholderStyle}
              onChange={function (item: { label: string; }): void { setCity(item.label) }}
              />
              <SafeAreaView>
                <View style={styles.dateContainer}>
                    <Button 
                        buttonStyle={styles.dateButton} 
                        type="clear" 
                        onPress={() => setShowDate(true)} 
                        title={tempTime.toISOString().split('T')[0]} 
                    />
                    <Button 
                        buttonStyle={styles.dateButton} 
                        type="clear" 
                        onPress={() => setShowTime(true)} 
                        title={tempTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} 
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
      paddingTop: 170
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
    marginBottom: 15,
    fontSize: 18
  },
  placeholderStyle: {
    fontSize: 18,
    color: '#C7C7CD'
  },
  uploadBtton: {
    backgroundColor: '#4C679E', // Blue color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  uploadButtonText: {
    color: '#fff', // White color
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 40
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

export default AddEventPage;
