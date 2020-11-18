import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: "AIzaSyCKxMdZ9OdWGECtiGrvehHI6pMtcLMjaKA",
  authDomain: "te-seminar.firebaseapp.com",
  databaseURL: "https://te-seminar.firebaseio.com",
  projectId: "te-seminar",
  storageBucket: "te-seminar.appspot.com",
  messagingSenderId: "526917693411",
  appId: "1:526917693411:web:55aa349c0d5296083cbad6",
  measurementId: "G-GSVGB4DRNV"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const storage = firebase.storage();
