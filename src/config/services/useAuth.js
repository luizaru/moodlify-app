import { useState } from "react";

import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    signInWithPopup,
    FacebookAuthProvider,
    GoogleAuthProvider,
} from "firebase/auth";

// https://firebase.google.com/docs/auth/web/facebook-login
// https://firebase.google.com/docs/auth/web/google-signin

// function useAuth() {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     return { isAuthenticated };
// };

function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({}); 

    const auth = getAuth();
    const facebookAuthProvider = new FacebookAuthProvider();
    const googleAuthProvider = new GoogleAuthProvider();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user);
            setIsAuthenticated(true);
            setUser(auth.currentUser);
            console.log("useAuth.onAuthStateChanged(): isAuthenticated=", isAuthenticated);
            return;
        }
        setIsAuthenticated(false);
        console.log("useAuth.onAuthStateChanged(): isAuthenticated=", isAuthenticated);
        return;
    });

    const createEmailUser = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password);

    const signInEmailUser = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    const signUserOut = () => signOut(auth);

    const signInFacebookUser = () => { 
        //https://firebase.google.com/docs/auth/web/facebook-login
        signInWithPopup(auth, facebookAuthProvider);
    };

    const signInGoogleUser = () => {
        //https://firebase.google.com/docs/auth/web/google-signin
        signInWithPopup(auth, googleAuthProvider);
    };

    return { createEmailUser, isAuthenticated, signInEmailUser, signUserOut, signInFacebookUser, signInGoogleUser, user };
}


export default useAuth;
