// import firestore from '@react-native-firebase/firestore';
import { User } from '../moduls/IUser';
import { Firestore, doc, getDoc, setDoc } from 'firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import { db } from '../config/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


export async function addUser(user : User){
    try {
        const docRef = doc(db, "users", user.email);
        await setDoc(docRef, user);
        // const docRef = await setDoc(collection(db, "users"), user);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}


export const getCurrUser = async () => {
    try {
        const currUserEmail = await AsyncStorage.getItem('userData');
        if (currUserEmail !== null) {
            return await getUserByEmail(currUserEmail)
        } else {
            console.log('No user data found.');
        }
    } catch (error) {
        console.error('Error retrieving user data:', error);
    }
}

export const getUserByEmail = async (email : string) => {
    const userRef = doc(db, 'users', email);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
        const user: User = {
            "username": userDoc.data().username,
            "email": userDoc.data().email,
            "phone": userDoc.data().phone,
            "imgName": userDoc.data().imgName,
          }
      return user;
    } else {
      console.log('No such user!');
      return null;
    }
  };