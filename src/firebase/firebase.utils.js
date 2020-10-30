import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBEiH36LDfBrI-FgQ9EF7eNYHoUYgjYHyU",
  authDomain: "crwn-clothing-data-base.firebaseapp.com",
  databaseURL: "https://crwn-clothing-data-base.firebaseio.com",
  projectId: "crwn-clothing-data-base",
  storageBucket: "crwn-clothing-data-base.appspot.com",
  messagingSenderId: "979213854379",
  appId: "1:979213854379:web:e838886b7a7137430d79ee",
  measurementId: "G-EDTZHNGJH5"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
