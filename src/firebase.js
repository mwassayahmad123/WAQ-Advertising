
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
  
const firebaseConfig = {
  apiKey: "AIzaSyBxKoxtktjHNcqv82I1zZTA6aBtN2bkH4w",
  authDomain: "waq-advertisement.firebaseapp.com",
  projectId: "waq-advertisement",
  storageBucket: "waq-advertisement.appspot.com",
  messagingSenderId: "335968383474",
  appId: "1:335968383474:web:5b56a11e51eeea7d24fb6b",
  measurementId: "G-EWDWXD2FCN"
};
  
  const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const database = getDatabase(app); // Initialize Realtime Database

export { app, auth, db, storage, database };


