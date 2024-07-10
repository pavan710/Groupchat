// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeGfozOquxXTeP1wdPbZ_jcSowvnAc1nQ",
  authDomain: "chatapp-70481.firebaseapp.com",
  projectId: "chatapp-70481",
  storageBucket: "chatapp-70481.appspot.com",
  messagingSenderId: "404252361427",
  appId: "1:404252361427:web:926d8fc6753bd8e167ca26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider = new GoogleAuthProvider();
export const db= getFirestore(app);