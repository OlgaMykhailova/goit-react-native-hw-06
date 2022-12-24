// Import the functions you need from the SDKs you need
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import {
    initializeAuth,
    getReactNativePersistence
  } from 'firebase/auth/react-native';
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyCSYll9ivFN2R_2Qae8qDms8r2Nlr7KxTM",
    authDomain: "react-native-project-134fb.firebaseapp.com",
    projectId: "react-native-project-134fb",
    storageBucket: "react-native-project-134fb.appspot.com",
    messagingSenderId: "838492559569",
    appId: "1:838492559569:web:3248b439e780b83f514df0",
    measurementId: "G-6K73SQQ4ZB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
  
  export { auth };

export const firestore = getFirestore(app);

