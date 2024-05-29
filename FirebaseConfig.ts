// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getFirestore } from "@react-native-firebase/firestore";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcB8G9ofWqM0zIJAQHJM5hsfBb9QaGPGY",
  authDomain: "ap4projectnative.firebaseapp.com",
  projectId: "ap4projectnative",
  storageBucket: "ap4projectnative.appspot.com",
  messagingSenderId: "16866292267",
  appId: "1:16866292267:web:5d59a1721619f17b2bb06e"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);