// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// @ts-ignore
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDpH_PQenOK6ZZ2z3S1gl0nuHE7N3xxScQ",
  authDomain: "ambel-78ea9.firebaseapp.com",
  projectId: "ambel-78ea9",
  storageBucket: "ambel-78ea9.appspot.com",
  messagingSenderId: "867321255859",
  appId: "1:867321255859:web:3608e69fcbb3e9e68f9dc6",
  measurementId: "G-CH9ZZ59CGC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
