// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJldUmsDxP_LyLIg-P5jkwvrXaK-V252s",
  authDomain: "authface-a04a5.firebaseapp.com",
  projectId: "authface-a04a5",
  storageBucket: "authface-a04a5.appspot.com",
  messagingSenderId: "330745811871",
  appId: "1:330745811871:web:145e45049845e30237a3aa",
  measurementId: "G-ZYD9TFW350"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const providerGoogle = new GoogleAuthProvider()
export const providerFacebook = new FacebookAuthProvider()
