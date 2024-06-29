import { Button } from "@rneui/base";
import { SafeAreaView, StyleSheet } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import { View } from "react-native";


const DatePickerComponent = () => {
    const [date, setDate] = useState(new Date(1598051730000));
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);

    const onChangeDate = (event : any, selectedDate : any) => {
        const currentDate = selectedDate;
        setShowDate(false);
        setDate(currentDate);
    };

    const onChangeTime = (event : any, selectedDate : any) => {
        const currentDate = selectedDate;
        setShowTime(false);
        setDate(currentDate);
    };
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Button 
                    buttonStyle={styles.dateButton} 
                    type="clear" 
                    onPress={() => setShowDate(true)} 
                    title={date.toISOString().split('T')[0]} 
                />
                <Button 
                    buttonStyle={styles.dateButton} 
                    type="clear" 
                    onPress={() => setShowTime(true)} 
                    title={date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} 
                />
            </View>
            {showDate && (
                <DateTimePicker
                testID="datePicker"
                value={date}
                mode="date"
                display='spinner'
                minimumDate={new Date(2024, 7, 2)}
                onChange={onChangeDate}
                />
            )}
            {showTime && (
                <DateTimePicker
                testID="TimePicker"
                value={date}
                mode="time"
                is24Hour={true}
                display='spinner'
                minimumDate={new Date()}
                onChange={onChangeTime}
                />
            )}
        </SafeAreaView>
    );};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Align children from left to right
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        paddingStart:45,
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

export default DatePickerComponent;