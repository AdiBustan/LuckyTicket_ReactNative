import { FlatList, StyleSheet, View, ActivityIndicator } from "react-native"
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
    const [loading, setLoading] = useState(true);
    
    const fetchEvents = async () => {
        setLoading(true); // Set loading to true when starting the fetch
        try {
          const res = await getAllEvents();
          setDataSet(res);
        } catch (err) {
          console.log(err);
          if (err instanceof CanceledError) return;
          setError(err.message);
        } finally {
            setLoading(false); // Set loading to false when fetch is complete
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
            {loading ? (
                <View style={styles.spinnerContainer}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
            <FlatList style={styles.list}
                data={dataset}
                keyExtractor={(item) => item.artist}
                renderItem={({ item }) => (
                    <Event navigation={navigation} data={item}/>
                )}
            />
            )}
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:"#1F2D45",
        paddingTop: 110
    },
    list: {
        width: '95%'
    },
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default EventList


