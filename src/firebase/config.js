// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMsPc_z3tEr7kYlCjb1nPnPi7-itoSS7I",
  authDomain: "react-cursos-d22ad.firebaseapp.com",
  projectId: "react-cursos-d22ad",
  storageBucket: "react-cursos-d22ad.appspot.com",
  messagingSenderId: "326681444133",
  appId: "1:326681444133:web:3b7451c9517b2d366024cc"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth= getAuth(FirebaseApp);
export const FirebaseDB= getFirestore(FirebaseApp);