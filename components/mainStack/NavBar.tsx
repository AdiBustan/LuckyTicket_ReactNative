import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon, ListItem } from "@rneui/base";
import { Center } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { User } from "../../moduls/IUser";
import { getCurrUser, getUserByEmail } from "../../services/UserService";


const NavBar = ({ navigation } : any) => {

    const [expanded, setExpanded] = React.useState(false);
    const [userData, setUserData] = React.useState<User>();

    return (
        <>
          <ListItem.Accordion
            content={
              <ListItem.Content>
                <ListItem.Title style={{color: 'white', fontSize: 24, paddingLeft: '35%', paddingTop: 30}}>Lucky Ticket</ListItem.Title>
              </ListItem.Content>
            }
            containerStyle={{backgroundColor:"#648FDE", height: 100}}
            isExpanded={expanded}
            onPress={async () => {
              setUserData(await getCurrUser());
              setExpanded(!expanded);
            }}
          >
            <ListItem containerStyle={{backgroundColor:"#648FDE"}} onPress={() => {navigation.navigate('Home'); setExpanded(!expanded)}}>
              <ListItem.Content>
                <ListItem.Title style={{color: 'white', fontSize: 20, paddingLeft: '40%'}}>Home</ListItem.Title>
              </ListItem.Content>
            </ListItem>
            <ListItem containerStyle={{backgroundColor:"#648FDE"}} onPress={ () => {navigation.navigate('UploadEvent'); setExpanded(!expanded)}}>
              <ListItem.Content >
                <ListItem.Title style={{color: 'white', fontSize: 20, paddingLeft: '35%'}}>Upload Event</ListItem.Title>
              </ListItem.Content>
            </ListItem>
            <ListItem containerStyle={{backgroundColor:"#648FDE"}} 
                      onPress={() => {
                        navigation.navigate('Profile', {picture: userData.imgName, 
                                                        username: userData.username, 
                                                        email: userData.email,
                                                        phone: userData.phone}); 
                        setExpanded(!expanded)}}>
              <ListItem.Content >
                <ListItem.Title style={{color: 'white', fontSize: 20, paddingLeft: '40%'}}>Profile</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </ListItem.Accordion>
        </>
  );
}

export default NavBar