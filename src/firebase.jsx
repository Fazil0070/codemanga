// src/firebase.jsx
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDFBpgGgcmqIyQToQaEfBoNGqcGv3RyX5Y",
  authDomain: "lms-project-c6d4a.firebaseapp.com",
  projectId: "lms-project-c6d4a",
  storageBucket: "lms-project-c6d4a.appspot.com",
  messagingSenderId: "869059729616",
  appId: "1:869059729616:web:08ada8efd3fbe5f1faa6d5",
  measurementId: "G-Z3NJ8Q75XR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
