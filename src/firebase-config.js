// src/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA7B9CYqeYmQmJFZGDCKnfnHb0Kt2LGaTA",
  authDomain: "gadgetstore-6587a.firebaseapp.com",
  projectId: "gadgetstore-6587a",
  storageBucket: "gadgetstore-6587a.firebasestorage.app",
  messagingSenderId: "600476627353",
  appId: "1:600476627353:web:a9bacfd138ef20af456308"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };
