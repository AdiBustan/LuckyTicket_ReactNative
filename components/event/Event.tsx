import { Avatar } from '@rneui/base';
import { ListItem } from '@rneui/themed';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Event( {data} : any) {
    
    
    return (
        <>
          <ListItem 
            containerStyle={{backgroundColor:"#2A3D5E", width:"95%", padding: 10}}
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
            <ListItem.Chevron
              onPress={() => {
                console.log('ListItem onPress: ' + data.id);}}/>
          </ListItem>
        </>
    )
}


        // <Card style={styles.card}>
        //   <Card.Cover source={{ uri: data.imgName }} style={styles.image} />
        //   <View style={styles.cardContent}>
        //     <Title>{data.artist}</Title>
        //     <Paragraph>{data.date}</Paragraph>
        //     <Paragraph>{data.city}</Paragraph>
        //   </View>
        // </Card>

// const styles = StyleSheet.create({
//     card: {
//       margin: 5,
//       width: 170,
//       height: 190,
//     },
//     cardContent: {
//       padding: 7,
//     },
//     image: {
//       width: '100%',
//       height: 100,
//       resizeMode: 'cover',
//       alignSelf: 'flex-start',
//     },
//   });
