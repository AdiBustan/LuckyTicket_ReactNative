import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfilePage from './ProfilePage';
import EventList from './EventList';
import AddEventPage from './AddEvent'

const MainStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={EventList}/>
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="UploadEvent" component={AddEventPage} />
    </Stack.Navigator>
  )
}

export default MainStack
