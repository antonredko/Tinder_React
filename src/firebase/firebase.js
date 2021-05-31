import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyAFSqX3q3EOdRHNQmn8gdpqaGrVifWpiqs",
  authDomain: "react-lessons-53b9f.firebaseapp.com",
  projectId: "react-lessons-53b9f",
  storageBucket: "react-lessons-53b9f.appspot.com",
  messagingSenderId: "1080785801235",
  appId: "1:1080785801235:web:dec6295366fc530c00efe6",
  measurementId: "G-67BVZTGP6N",
});

const db = firebase.firestore();

export { firebase, db };