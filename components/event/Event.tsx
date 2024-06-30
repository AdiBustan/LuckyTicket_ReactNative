import { Avatar } from '@rneui/base';
import { ListItem } from '@rneui/themed';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Event( { navigation, data } : any) {
    
    return (
        <>
          <TouchableOpacity onPress={() => {
                navigation.navigate('EventDetails', {event : data})}}> 
            <ListItem 
              containerStyle={{backgroundColor:"#1F2D45", width:"100%", padding: 10}}
              bottomDivider>
              <Avatar
                rounded
                size={'large'}
                source={{ uri: data.imgName }}
              />

              <ListItem.Content style={{ padding: 5}}>
                <ListItem.Title style={{ color: "white", fontWeight: "bold" }}>{data.artist}</ListItem.Title>
                <ListItem.Subtitle style={{ color: "white" }}>{data.city}</ListItem.Subtitle>
                <ListItem.Subtitle style={{ color: "white" }}>{data.date}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron/>
            </ListItem>
          </TouchableOpacity>
        </>
    )
}
