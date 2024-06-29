import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDnf5ypTwuJZ2pTcyb0YSCrHU4FfGQCEQ8",
  authDomain: "luckyticket.firebaseapp.com",
  databaseURL: 'https://console.firebase.google.com/project/luckyticket/firestore/databases/-default-/data/~2F',
  projectId: "luckyticket",
  storageBucket: "luckyticket.appspot.com",
  messagingSenderId: "423277097005",
  appId: "1:423277097005:web:ecf879b4fb5fbf211308a4",
  measurementId: "G-ETQM8Z6GCQ"
};

// initialize firebase
const app = initializeApp(firebaseConfig);

// initialize auth; only for native platforms (Android and iOS)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app)
const authToAutoLogin = getAuth(app)

export { auth, db, authToAutoLogin };
