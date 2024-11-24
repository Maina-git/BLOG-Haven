import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import  {  getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDvHSz4MmYyRhOvkAGs9LYLJXwuxtOcQgs",
  authDomain: "typescript-5a2b8.firebaseapp.com",
  projectId: "typescript-5a2b8",
  storageBucket: "typescript-5a2b8.firebasestorage.app",
  messagingSenderId: "13396243946",
  appId: "1:13396243946:web:534ab39ad5ad1ed8916e93",
  measurementId: "G-KQGFPVJH48"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export  const  db=getFirestore(app);
const analytics = getAnalytics(app);