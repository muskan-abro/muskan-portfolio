// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCbk1aCX9AVj2AHAkSrI3xnBDVV-cFbPw",
  authDomain: "muskan-portfolio-58392.firebaseapp.com",
  projectId: "muskan-portfolio-58392",
  storageBucket: "muskan-portfolio-58392.appspot.com", // ✅ corrected from .app to .com
  messagingSenderId: "1007199594203",
  appId: "1:1007199594203:web:1e0e804de01063e6164efe",
  measurementId: "G-QSJEB8Q4GW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Export Firestore and Storage
export const db = getFirestore(app);
export const storage = getStorage(app);
