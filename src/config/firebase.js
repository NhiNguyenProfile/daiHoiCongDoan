// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvfxieOFq3yUM4iiTYTIGXMqKja7KVheI",
  authDomain: "daihoicongdoanvienchuc-48718.firebaseapp.com",
  projectId: "daihoicongdoanvienchuc-48718",
  storageBucket: "daihoicongdoanvienchuc-48718.appspot.com",
  messagingSenderId: "983602819778",
  appId: "1:983602819778:web:33ea5a7ae1a71781ba815b",
  measurementId: "G-L5C2RVGCHN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const database = getDatabase(app);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

