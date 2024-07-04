// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-26045.firebaseapp.com",
  projectId: "mern-estate-26045",
  storageBucket: "mern-estate-26045.appspot.com",
  messagingSenderId: "365195738231",
  appId: "1:365195738231:web:241fe59f5364156b20da72"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);