// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey || "AIzaSyDMsPc_z3tEr7kYlCjb1nPnPi7-itoSS7I",
  authDomain: process.env.REACT_APP_authDomain || "react-cursos-d22ad.firebaseapp.com",
  projectId: process.env.REACT_APP_projectId || "react-cursos-d22ad",
  storageBucket: process.env.REACT_APP_storageBucket || "react-cursos-d22ad.appspot.com",
  messagingSenderId: process.env.REACT_APP_messagingSenderId || "326681444133",
  appId: process.env.REACT_APP_appId || "1:326681444133:web:3b7451c9517b2d366024cc",
  measurementId: process.env.REACT_APP_measurementId 
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth= getAuth(FirebaseApp);
export const FirebaseDB= getFirestore(FirebaseApp);