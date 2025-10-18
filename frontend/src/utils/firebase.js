import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "foodfetch-a432a.firebaseapp.com",
  projectId: "foodfetch-a432a",
  storageBucket: "foodfetch-a432a.firebasestorage.app",
  messagingSenderId: "177741257463",
  appId: "1:177741257463:web:953e1024522552b84411f2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export {app, auth}