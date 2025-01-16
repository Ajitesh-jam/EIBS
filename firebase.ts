// Import the functions you need from the SDKs you need
import { initializeApp,getApps,getApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsiC860i-n-_JeZ0uRJB1BRBMYO-r6jVk",
  authDomain: "otptutorial-a4e9e.firebaseapp.com",
  projectId: "otptutorial-a4e9e",
  storageBucket: "otptutorial-a4e9e.firebasestorage.app",
  messagingSenderId: "341060541935",
  appId: "1:341060541935:web:2ddea2cebd3aae8d33aa1a",
  measurementId: "G-N2B68BSB4V"
};

// Initialize Firebase
const app = ((getApps().length==0)? initializeApp(firebaseConfig) : getApp());
const analytics = getAnalytics(app);
const auth = getAuth(app);
auth.useDeviceLanguage();

export{auth};

