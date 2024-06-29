import AsyncStorage from '@react-native-async-storage/async-storage';


export async function saveUser(userEmail : string) {
    try {
        await AsyncStorage.setItem('userData', userEmail);
      } catch (error) {
        console.error('Error saving user data:', error);
      }
}

export async function onLogOut() {
    try {
      AsyncStorage.clear;
    } catch (error) {
      console.error('Error while logout:', error);
    }

  }