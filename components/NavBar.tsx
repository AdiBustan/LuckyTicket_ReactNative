import { Icon, ListItem } from "@rneui/base";
import React from "react";
import { StyleSheet } from "react-native";


const NavBar = () => {

    const [expanded, setExpanded] = React.useState(false);
  
    return (
        <>
          <ListItem.Accordion
            content={
              <ListItem.Content>
                <ListItem.Title style={{color: 'white', fontSize: 24, paddingLeft: '35%'}}>Lucky Ticket</ListItem.Title>
              </ListItem.Content>
            }
            containerStyle={{backgroundColor:"#648FDE"}}
            isExpanded={expanded}
            onPress={() => {
              setExpanded(!expanded);
            }}
          >
            <ListItem containerStyle={{backgroundColor:"#648FDE"}}>
              <ListItem.Content>
                <ListItem.Title style={{color: 'white', fontSize: 20, paddingLeft: '40%'}}>Home</ListItem.Title>
              </ListItem.Content>
            </ListItem>
            <ListItem containerStyle={{backgroundColor:"#648FDE"}}>
              <ListItem.Content>
                <ListItem.Title style={{color: 'white', fontSize: 20, paddingLeft: '35%'}}>Upload Event</ListItem.Title>
              </ListItem.Content>
            </ListItem>
            <ListItem containerStyle={{backgroundColor:"#648FDE"}}>
              <ListItem.Content>
                <ListItem.Title style={{color: 'white', fontSize: 20, paddingLeft: '40%'}}>Profile</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </ListItem.Accordion>
        </>
  );
}

export default NavBar