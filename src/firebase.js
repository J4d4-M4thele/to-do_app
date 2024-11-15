import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBMdxHX_oJANhwS2CL2_ANg7_meTezaDBY",
    authDomain: "to-do-1b824.firebaseapp.com",
    databaseURL: "https://to-do-1b824-default-rtdb.firebaseio.com",
    projectId: "to-do-1b824",
    storageBucket: "to-do-1b824.firebasestorage.app",
    messagingSenderId: "492475314631",
    appId: "1:492475314631:web:9e8dedeac3c9289a69a9e2",
    measurementId: "G-QW019P7D1G"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);