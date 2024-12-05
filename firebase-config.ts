// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-mhVDEXkvgglc11aOXobfOb8_mDnA3NI",
  authDomain: "diccionario-ad1bc.firebaseapp.com",
  databaseURL: "https://diccionario-ad1bc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "diccionario-ad1bc",
  storageBucket: "diccionario-ad1bc.firebasestorage.app",
  messagingSenderId: "661285499299",
  appId: "1:661285499299:web:0af3d475db387e9de72a16"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
