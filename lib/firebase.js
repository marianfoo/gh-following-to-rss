import { initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator, httpsCallable   } from 'firebase/functions';

export  {
    initializeApp,getAuth,GithubAuthProvider,signInWithPopup,getFunctions,connectFunctionsEmulator,httpsCallable
}