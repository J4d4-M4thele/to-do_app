import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQkwZ96mxKxLYyTHqyom6eFj3JvvBtceY",
  authDomain: "to-do-app-e9ac1.firebaseapp.com",
  projectId: "to-do-app-e9ac1",
  storageBucket: "to-do-app-e9ac1.firebasestorage.app",
  messagingSenderId: "1076489024245",
  appId: "1:1076489024245:web:85ef8d2e217e96f7d0cbbc",
  measurementId: "G-H7C9HNQDYQ"
};

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const provider = new GoogleAuthProvider();

export { auth, db, provider };
