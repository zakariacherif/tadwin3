import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCalkG6mLAES39d5H_M72QRZCUBlepm89g",
    authDomain: "tadwin-a5365.firebaseapp.com",
    projectId: "tadwin-a5365",
    storageBucket: "tadwin-a5365.appspot.com",
    messagingSenderId: "141250483259",
    appId: "1:141250483259:web:724224d1de168330c7b81e"
  };

  // Initialize Firebase
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const db = getFirestore(app);

  export { db };