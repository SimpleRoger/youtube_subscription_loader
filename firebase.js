// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC03H09IQfD_PSZ8eiHym9-FjFdfTWbw8M",
  authDomain: "subscription-loader.firebaseapp.com",
  projectId: "subscription-loader",
  storageBucket: "subscription-loader.appspot.com",
  messagingSenderId: "771449073384",
  appId: "1:771449073384:web:20eca23832ecaa0235235d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//database
export const db = getFirestore(app);
// export const storage = getStorage();
export const auth = getAuth(app);
