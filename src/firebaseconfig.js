import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



const firebaseConfig = {

  apiKey: "AIzaSyDJcUW0_uLdFcRbfd-3ElvfrMbD0_kz4w0",
  authDomain: "prueba-tecnica-agsbyte.firebaseapp.com",
  projectId: "prueba-tecnica-agsbyte",
  storageBucket: "prueba-tecnica-agsbyte.appspot.com",
  messagingSenderId: "108277729733",
  appId: "1:108277729733:web:8cd0e3b1a99552b668e3ac"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

const auth = getAuth(appFirebase);


export {appFirebase, auth}