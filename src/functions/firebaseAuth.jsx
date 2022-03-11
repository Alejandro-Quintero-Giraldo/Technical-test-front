import firebaseApp from './firebaseInit';
import 'firebase/auth'

export const auth = firebaseApp.auth();

export const signingWithGoogle = () => {
    auth.signInWithPopup(new firebaseApp.auth.GoogleAuthProvider())
}

export const signOut = () => {
    auth.signOut();
    window.location.reload();
}