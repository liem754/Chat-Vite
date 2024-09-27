/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-88e3c.firebaseapp.com",
  projectId: "reactchat-88e3c",
  storageBucket: "reactchat-88e3c.appspot.com",
  messagingSenderId: "583745310661",
  appId: "1:583745310661:web:64c9ec2970ded627e205ac",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
