import { initializeApp }
from "firebase/app";


import {
  getAuth,
  GoogleAuthProvider
}
from "firebase/auth";
import {
  getFirestore
}

from "firebase/firestore";

const firebaseConfig = {

  apiKey : "AIzaSyCL4bedHFKJcXYPj8rHtaeEgIFCggXlIIg" , 

  authDomain : "tinhoc3-online.firebaseapp.com" ,


  projectId : "tinhoc3-online" , 

  storageBucket : "tinhoc3-online.firebasestorage.app" ,

  messagingSenderId : "926891841139" , 

  appId : "1:926891841139:web:02865b38b1ac16d233bc06" , 
  measurementId : "G-HF9TP5XC2V" 
};

const app =
  initializeApp(firebaseConfig);

/* AUTH */

export const auth =  getAuth(app);

export const provider =  new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;