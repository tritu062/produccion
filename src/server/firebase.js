// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFLhVLCEJLM3WWGlm3JS8g_odH-2mZinc",
  authDomain: "consultas-c56d7.firebaseapp.com",
  projectId: "consultas-c56d7",
  storageBucket: "consultas-c56d7.appspot.com",
  messagingSenderId: "317484264072",
  appId: "1:317484264072:web:5a344d7295dea2d9004d3d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);