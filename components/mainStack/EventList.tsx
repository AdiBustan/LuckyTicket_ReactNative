import { FlatList, StyleSheet, View } from "react-native"
import { IEvent } from "../../moduls/IEvent"
import Event from "../event/Event"
import NavBar from "./NavBar"
import { getAllEvents } from "../../services/EventService"
import { useCallback, useEffect, useState } from "react"
import { CanceledError } from "axios"
import { useFocusEffect } from "@react-navigation/native"



function EventList ({ navigation } : any) {
    const [dataset, setDataSet] = useState<IEvent[]>([])
    const [error, setError] = useState()

    const fetchEvents = async () => {
        try {
          const res = await getAllEvents();
          setDataSet(res);
        } catch (err) {
          console.log(err);
          if (err instanceof CanceledError) return;
          setError(err.message);
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
            <FlatList style={styles.list}
                data={dataset}
                keyExtractor={(item) => item.artist}
                renderItem={({ item }) => (
                    <Event navigation={navigation} data={item}/>
                )}
            />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:"#2A3D5E"
    },
    list: {
        width: '95%'
    }
})

export default EventList


