import {initializeApp} from 'firebase/app';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBQDVwVsgYYUg68qemVXFohGKF2Ye9OpHs",
    authDomain: "let-sg.firebaseapp.com",
    projectId: "let-sg",
    storageBucket: "let-sg.appspot.com",
    messagingSenderId: "157930628762",
    appId: "1:157930628762:web:a5d37e53f742f03befe123",
    measurementId: "G-ZPN24SWGL0"
});
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

onAuthStateChanged(auth, user => {
    if(user == null){
        console.log("user logged in");
    }else{
        console.log("user not found");
    }
});