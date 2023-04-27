
import { initializeApp } from "firebase/app";
import { getAuth , createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword} from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { useEffect, useState } from "react";

const firebaseConfig = {
    apiKey: "AIzaSyCcC_PlP8yQKR2sYPX9yVW_EKQXUk1eaYc",
    authDomain: "fir-eindproject.firebaseapp.com",
    projectId: "fir-eindproject",
    storageBucket: "fir-eindproject.appspot.com",
    messagingSenderId: "168255899338",
    appId: "1:168255899338:web:37c53c51f0fb3302679633",
    measurementId: "G-LTHZTQDW5K"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default getFirestore(app);

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout(){
    return signOut(auth);
}

export function useAuth(){
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {setCurrentUser(user)});
    return unsub;
  }, [])

  return currentUser;
}


