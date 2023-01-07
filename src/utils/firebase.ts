import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCiLALd1PZPxYgOKPFGW9XLafPk7zSY_O0",
  authDomain: "maeil-d.firebaseapp.com",
  projectId: "maeil-d",
  storageBucket: "maeil-d.appspot.com",
  messagingSenderId: "844098518931",
  appId: "1:844098518931:web:0d7a61c6d39f8f0221f266",
  measurementId: "G-RXDCQRPY80",
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
