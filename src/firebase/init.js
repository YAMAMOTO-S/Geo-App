import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAsfT9RSj4CpaDlRlBKX1mLhrARacQkeYk",
  authDomain: "geo-app-60123.firebaseapp.com",
  databaseURL: "https://geo-app-60123.firebaseio.com",
  projectId: "geo-app-60123",
  storageBucket: "geo-app-60123.appspot.com",
  messagingSenderId: "533148173268",
  appId: "1:533148173268:web:e7f237b6737f21dfb98c41",
  measurementId: "G-6Z6TDNNBJT"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);



export default firebaseApp.firestore()