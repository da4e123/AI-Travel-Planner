// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAjgq6vLZ156viP4WY9HrlGqr2BcZVdHc",
  authDomain: "ai-travel-app-3c025.firebaseapp.com",
  projectId: "ai-travel-app-3c025",
  storageBucket: "ai-travel-app-3c025.firebasestorage.app",
  messagingSenderId: "667094812587",
  appId: "1:667094812587:web:1b358405c0fd43c139b4ee"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });
export const db = getFirestore(app);
