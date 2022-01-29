import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAGr7683UXYREl5L7TLppGB9rsWhWxYRxI",
    authDomain: "tinder-clone-246a8.firebaseapp.com",
    projectId: "tinder-clone-246a8",
    storageBucket: "tinder-clone-246a8.appspot.com",
    messagingSenderId: "234162125222",
    appId: "1:234162125222:web:6e94fd2bdda50bd1b57767"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {auth, db}