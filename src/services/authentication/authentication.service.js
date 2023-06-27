import { initializeApp } from "firebase/app";
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
  } from "firebase/auth";
// Initialize Firebase

const firebaseConfig = {
    apiKey: "AIzaSyAd3qZNAntb4s5a9UzxgkGRtrItJF6aRaM",
    authDomain: "mealstogo-46765.firebaseapp.com",
    projectId: "mealstogo-46765",
    storageBucket: "mealstogo-46765.appspot.com",
    messagingSenderId: "235672379249",
    appId: "1:235672379249:web:7c128fe30b3f22aa4e60d0"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
 
export const loginRequest = async (email, password) => 
  signInWithEmailAndPassword(auth, email, password);


// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth'

// export const loginRequest = (email, password) => {
//     firebase.auth().signInWithEmailAndPassword(email, password);
// }



//It's going to be a light wrapper around the firebase method that we just called, which was the login request.