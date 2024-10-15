// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAec200pkBHq4_Tb0AIAOdYUofSw79qdZk",
  authDomain: "creact-crypto.firebaseapp.com",
  projectId: "creact-crypto",
  storageBucket: "creact-crypto.appspot.com",
  messagingSenderId: "1088866409255",
  appId: "1:1088866409255:web:8f7610188492b278fee702",
  measurementId: "G-1C4XQZ5T28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };



