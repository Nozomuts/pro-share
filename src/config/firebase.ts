import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDY6MZXVHvp9qXq0OimRmx13HLqugPLjnc",
  authDomain: "share-pro-20be9.firebaseapp.com",
  databaseURL: "https://share-pro-20be9.firebaseio.com",
  projectId: "share-pro-20be9",
  storageBucket: "share-pro-20be9.appspot.com",
  messagingSenderId: "930667147859",
  appId: "1:930667147859:web:70c8eae75eb462b8154ca6",
  measurementId: "G-MJ79J4KTTQ"
};

firebase.initializeApp(firebaseConfig);

export default firebase;