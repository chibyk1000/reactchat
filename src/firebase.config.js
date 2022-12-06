
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCCU2X0mHun4UEsbtdvHHDn5crIRnHHHxo",
  authDomain: "chat-app-d2217.firebaseapp.com",
  projectId: "chat-app-d2217",
  storageBucket: "chat-app-d2217.appspot.com",
  messagingSenderId: "1044446596671",
  appId: "1:1044446596671:web:09e970353a6f215f44b28a",
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db  = getFirestore(app)
