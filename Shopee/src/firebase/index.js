// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCB2MQoFTE__gIuOeFC0S_IrZ4mYhbXWJ8",
  authDomain: "nrc-sankhau.firebaseapp.com",
  projectId: "nrc-sankhau",
  storageBucket: "nrc-sankhau.appspot.com",
  messagingSenderId: "809435750224",
  appId: "1:809435750224:web:d8ac4991540f7d74159655",
  measurementId: "G-244CMQT5W8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
  