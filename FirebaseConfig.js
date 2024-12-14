// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7tkiFM3l-byw9_AQU4PoJQ54cAVVyZe4",
  authDomain: "attendance-app-913dc.firebaseapp.com",
  projectId: "attendance-app-913dc",
  storageBucket: "attendance-app-913dc.firebasestorage.app",
  messagingSenderId: "1017083094642",
  appId: "1:1017083094642:web:4c623acd2ed475529a84eb"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);