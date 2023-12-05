// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdnm60i6lwzuSlXfe44Osdj-X_r2sZ4m0",
  authDomain: "user-time-management.firebaseapp.com",
  databaseURL: "https://user-time-management-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "user-time-management",
  storageBucket: "user-time-management.appspot.com",
  messagingSenderId: "256078554676",
  appId: "1:256078554676:web:63b29ff3fb7a5fb478cc61",
  measurementId: "G-HJYSXYBX7Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();