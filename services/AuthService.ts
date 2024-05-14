import AsyncStorage from '@react-native-async-storage/async-storage';


export async function saveUserData(userData : any) {
    try {
        console.log(JSON.stringify(userData));
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        await AsyncStorage.setItem('user_id', '123456');
        console.log('User data saved successfully!');
      } catch (error) {
        console.error('Error saving user data:', error);
      }
}

export async function onLogOut() {
    try {
      // await AsyncStorage.deleteItemAsync('userData');
      AsyncStorage.clear;
      console.log('User data removed successfully!');
    } catch (error) {
      console.error('Error while logout:', error);
    }

  }