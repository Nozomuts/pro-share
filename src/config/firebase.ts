import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBLv_AkW0SC3xwISN6I1hkQJCnXdW2o9qc',
  authDomain: 'pro-share-653a4.firebaseapp.com',
  databaseURL: 'https://pro-share-653a4.firebaseio.com',
  projectId: 'pro-share-653a4',
  storageBucket: 'pro-share-653a4.appspot.com',
  messagingSenderId: '638026973268',
  appId: '1:638026973268:web:7a5b2e5647a737960f2dc1',
  measurementId: 'G-QSEHSNNG7X',
};

firebase.initializeApp(firebaseConfig);

export const providerTwitter = new firebase.auth.TwitterAuthProvider();
export const providerFacebook = new firebase.auth.FacebookAuthProvider();
export const providerGoogle = new firebase.auth.GoogleAuthProvider();
export default firebase;
