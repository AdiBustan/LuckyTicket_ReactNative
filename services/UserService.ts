// import firestore from '@react-native-firebase/firestore';
import { User } from '../moduls/IUser';
import { firestore } from '../config/firebase';

const usersCollection = firestore().collection('Users');

export async function addUser(user : User){
   usersCollection.doc(user.email).set({ user })
    .then(() => {
        console.log('User added!');
    });
}

export async function updateUser(user : User){
    usersCollection.doc(user.email).set({ user })
    .then(() => {
        console.log('User updete!');
    });
}

export const getUserByEmail = (email : string) => {
    return (usersCollection.where('email', '==', email).get())
}