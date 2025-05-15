// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBO6hMhg3kMjO3R4YbpDSWvTBHPfXszZ3A",
  authDomain: "exalt-52d22.firebaseapp.com",
  projectId: "exalt-52d22",
  storageBucket: "exalt-52d22.appspot.com",
  messagingSenderId: "125065986405",
  appId: "1:125065986405:web:fff93403f057d3dcb6e18c",
  measurementId: "G-TGZ9DBFC3F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const auth = getAuth(app)