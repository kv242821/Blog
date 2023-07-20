// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9NOjcFtDQQQ7b6zEODI_7Ov_QSXxwQtU",
  authDomain: "blog-51573.firebaseapp.com",
  projectId: "blog-51573",
  storageBucket: "blog-51573.appspot.com",
  messagingSenderId: "816977578155",
  appId: "1:816977578155:web:9190a1a0ebe6c791854fee",
  measurementId: "G-ELVGHPC66T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
