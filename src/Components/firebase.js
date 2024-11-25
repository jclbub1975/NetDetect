// src/Components/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import Firestore

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjfa3BHCQtVbVDffoTQX0Ta7pRka2bmVI",
  authDomain: "netdetect-a206e.firebaseapp.com",
  databaseURL: "https://netdetect-a206e-default-rtdb.firebaseio.com",
  projectId: "netdetect-a206e",
  storageBucket: "netdetect-a206e.firebasestorage.app",
  messagingSenderId: "1023311818764",
  appId: "1:1023311818764:web:6efc5124a904aaca013e29",
  measurementId: "G-168QFVW2W9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase Auth and Firestore instances
const auth = getAuth(app);
const db = getFirestore(app);  // Firestore instance

// Export the instances
export { auth, db };
