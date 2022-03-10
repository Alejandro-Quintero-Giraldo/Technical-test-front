import firebaseApp from './firebaseInit';
import 'firebase/auth';

export const auth = firebaseApp.auth();

export const signInWithGoogle = () => {
  auth.signInWithPopup(new firebaseApp.auth.GoogleAuthProvider());
}

export const signOutWithGoogle = () => {
  auth.signOut();
  window.location.href = '/';
}