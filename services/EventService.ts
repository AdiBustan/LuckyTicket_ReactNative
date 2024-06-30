import { IEvent } from '../moduls/IEvent';
import { User } from '../moduls/IUser'
import { collection, addDoc, getDocs, doc, setDoc, query, where, deleteDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { db } from '../config/firebase';
import { getCurrUser, getUserByEmail } from './UserService';
import { getDownloadImage } from './imagesService';

var currUser: User

export async function addEvent(event : IEvent){
    currUser = await getCurrUser()

    const eventToUpload: IEvent = {
        'date': event.date as string,
        'time': event.time as string,
        'city': event.city as string,
        'artist': event.artist as string,
        'imgName': event.imgName as string,
        'owner': currUser.email as string,
        'phone': currUser.phone as string
    }

    try {
        const docRef = doc(db, "events", eventToUpload.artist);
        await setDoc(docRef, eventToUpload);
        //const docRef = await addDoc(collection(db, "events"), eventToUpload);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}


export async function getAllEvents() : Promise<IEvent[]> {
    
    var allEvents: IEvent[] = []
    var i = 0
    const querySnapshot = await getDocs(collection(db, "events"));
    querySnapshot.forEach(async (doc) => {
        const imgUri: string = (await getDownloadImage(doc.data().imgName))
        
        allEvents[i] = {
            'date': doc.data().date as string,
            'time': doc.data().time as string,
            'city': doc.data().city as string,
            'artist': doc.data().artist as string,
            'imgName':  imgUri as string,
            'owner' : doc.data().owner as string,
            'phone': doc.data().phone as string
        }
        i++
    });
    return allEvents
}

export async function getEventsByUser() : Promise<IEvent[]> {
    currUser = await getCurrUser()

    var allEvents: IEvent[] = []
    var i = 0
    const q = query(collection(db, "events"), where("owner", "==", currUser.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
        const imgUri: string = (await getDownloadImage(doc.data().imgName))
        allEvents[i] = {
            'date': doc.data().date as string,
            'time': doc.data().time as string,
            'city': doc.data().city as string,
            'artist': doc.data().artist as string,
            'imgName': imgUri as string,
            'owner' : doc.data().owner as string,
            'phone': doc.data().phone as string
        }
        i++
    });
    return allEvents
}

export async function deleteEvent(artist : string){
    try {
        const docRef = doc(db, "events", artist);
        await deleteDoc(docRef);
        //const docRef = await addDoc(collection(db, "events"), eventToUpload);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
