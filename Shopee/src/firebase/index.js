// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRpK6muEEi8m_GfH1QWVobaODBC3mClQ4",
  authDomain: "imageshopee-e80ee.firebaseapp.com",
  projectId: "imageshopee-e80ee",
  storageBucket: "imageshopee-e80ee.appspot.com",
  messagingSenderId: "713596942057",
  appId: "1:713596942057:web:acd4464ddb253e72622278",
  measurementId: "G-19CFMZN16T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
