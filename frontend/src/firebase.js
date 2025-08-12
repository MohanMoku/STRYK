// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "stryk-61488.firebaseapp.com",
    projectId: "stryk-61488",
    storageBucket: "stryk-61488.firebasestorage.app",
    messagingSenderId: "654997848582",
    appId: "1:654997848582:web:5b95a4116dd810ec4b7987",
    measurementId: "G-WN9S5PS7N9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);