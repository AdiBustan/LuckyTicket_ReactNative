import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon, ListItem } from "@rneui/base";
import { Center } from "native-base";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { User } from "../../moduls/IUser";
import { getCurrUser, getUserByEmail } from "../../services/UserService";


const NavBar = ({ navigation } : any) => {

    const [expanded, setExpanded] = React.useState(false);
    const [userData, setUserData] = React.useState<User>();

      return (
          <>
          <SafeAreaView style={styles.navbar}>
            <ListItem.Accordion  
              content={
                <ListItem.Content >
                  <ListItem.Title style={{color: 'white', fontWeight: "bold", fontSize: 26, paddingLeft: '34%'}}>Lucky Ticket</ListItem.Title>
                </ListItem.Content>
              }
              containerStyle={{backgroundColor:"#4C679E", height: 60}}
              isExpanded={expanded}
              onPress={async () => {
                setUserData(await getCurrUser());
                setExpanded(!expanded);
              }}
            >
              <ListItem containerStyle={{backgroundColor:"#4C679E"}} onPress={() => {navigation.navigate('Home'); setExpanded(!expanded)}}>
                <ListItem.Content>
                  <ListItem.Title style={{color: 'white', fontSize: 20, paddingLeft: '42%'}}>Home</ListItem.Title>
                </ListItem.Content>
              </ListItem>
              <ListItem containerStyle={{backgroundColor:"#4C679E"}} onPress={ () => {navigation.navigate('UploadEvent'); setExpanded(!expanded)}}>
                <ListItem.Content >
                  <ListItem.Title style={{color: 'white', fontSize: 20, paddingLeft: '35%'}}>Upload Event</ListItem.Title>
                </ListItem.Content>
              </ListItem>
              <ListItem containerStyle={{backgroundColor:"#4C679E"}} 
                        onPress={() => {
                          navigation.navigate('Profile', {picture: userData.imgName, 
                                                          username: userData.username, 
                                                          email: userData.email,
                                                          phone: userData.phone}); 
                          setExpanded(!expanded)}}>
                <ListItem.Content >
                  <ListItem.Title style={{color: 'white', fontSize: 20, paddingLeft: '42%'}}>Profile</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            </ListItem.Accordion>
          </SafeAreaView>
          </>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    navbar: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      backgroundColor: "#4C679E",
    }
  })

export default NavBar