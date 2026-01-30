import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCQXa0PMDVoyNQ97W1E-6l91mAJmsaSj50",
    authDomain: "karazhana-e5a29.firebaseapp.com",
    projectId: "karazhana-e5a29",
    storageBucket: "karazhana-e5a29.firebasestorage.app",
    messagingSenderId: "1068247292158",
    appId: "1:1068247292158:web:8139806587499b0d3badaf",
    measurementId: "G-1TM2GHWRQQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
