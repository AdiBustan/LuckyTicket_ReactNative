import { FlatList, StyleSheet, View } from "react-native"
import { IEvent } from "../moduls/IEvent"
import Event from "./event/Event"



function EventList() {
    const dataset : IEvent[] = [
                            {id: "1", date: "02-05-2024", city: "Rishon Lezion", artist: "Ravid Plotnik", imgName: "https://picsum.photos/700"},
                            {id: "2", date: "23-10-2024", city: "Tel Aviv", artist: "Tuna", imgName: "https://picsum.photos/700"},
                            {id: "3", date: "02-05-2024", city: "Rishon Lezion", artist: "Ravid Plotnik", imgName: "https://picsum.photos/700"},
                            {id: "4", date: "23-10-2024", city: "Tel Aviv", artist: "Tuna", imgName: "https://picsum.photos/700"},
                            {id: "5", date: "02-05-2024", city: "Rishon Lezion", artist: "Ravid Plotnik", imgName: "https://picsum.photos/700"},
                            {id: "6", date: "23-10-2024", city: "Tel Aviv", artist: "Tuna", imgName: "https://picsum.photos/700"},
                            {id: "7", date: "02-05-2024", city: "Rishon Lezion", artist: "Ravid Plotnik", imgName: "https://picsum.photos/700"},
                            {id: "8", date: "23-10-2024", city: "Tel Aviv", artist: "Tuna", imgName: "https://picsum.photos/700"},
                            {id: "9", date: "02-05-2024", city: "Rishon Lezion", artist: "Ravid Plotnik", imgName: "https://picsum.photos/700"},
                            {id: "10", date: "23-10-2024", city: "Tel Aviv", artist: "Tuna", imgName: "https://picsum.photos/700"},
                            {id: "11", date: "02-05-2024", city: "Rishon Lezion", artist: "Ravid Plotnik", imgName: "https://picsum.photos/700"},
                            {id: "12", date: "23-10-2024", city: "Tel Aviv", artist: "Tuna", imgName: "https://picsum.photos/700"},
                            {id: "13", date: "02-05-2024", city: "Rishon Lezion", artist: "Ravid Plotnik", imgName: "https://picsum.photos/700"},
                            {id: "14", date: "23-10-2024", city: "Tel Aviv", artist: "Tuna", imgName: "https://picsum.photos/700"},
                            {id: "15", date: "02-05-2024", city: "Rishon Lezion", artist: "Ravid Plotnik", imgName: "https://picsum.photos/700"},
                            {id: "16", date: "23-10-2024", city: "Tel Aviv", artist: "Tuna", imgName: "https://picsum.photos/700"}
                            ]

    const makeEvents = () => {
        return dataset.map((data, i) => <Event data={data} key={i}/>)
    }
    return (
        <View style={styles.container}>
            <FlatList style={styles.list}
              data={dataset}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Event data={item}/>
              )}
            />
        </View>
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


