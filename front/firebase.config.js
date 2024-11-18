// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
//import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configurations
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4jVcBRsKcTYbWYwZZEg3nnxds47lZtrU",
    authDomain: "nossa-lista-99265.firebaseapp.com",
    projectId: "nossa-lista-99265",
    storageBucket: "nossa-lista-99265.firebasestorage.app",
    messagingSenderId: "848578638090",
    appId: "1:848578638090:web:198e24687dbb48b922caf3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const authentication = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
export const db = getFirestore(app);
export const storage = getStorage(app);