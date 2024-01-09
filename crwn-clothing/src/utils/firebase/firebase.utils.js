import { initializeApp,
 } from "firebase/app";
 import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore"


 const firebaseConfig = {
    apiKey: "AIzaSyBRSCGQHKDlapD7XqhP1p-V_rBDMHCOuL4",
    authDomain: "crwn-clothing-db-feba2.firebaseapp.com",
    projectId: "crwn-clothing-db-feba2",
    storageBucket: "crwn-clothing-db-feba2.appspot.com",
    messagingSenderId: "9374469659",
    appId: "1:9374469659:web:b1187c0c6fca06759d72be"
  };
  
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  export const auth = getAuth();
  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account",
  })
 

  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  // export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

  export const db = getFirestore();

  export const createUserDocFromAuth = async(userAuth, additionalInfo = {}) => {
    //creating document reference
    const userDocRef = doc(db, "users", userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    console.log(userSnapshot.exists());


    //if document data  does not exists
    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo,
            })
        } catch (error) {
            console.log("error creating the user", error.message);
        }

    }

    return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    const cred =  await createUserWithEmailAndPassword(auth, email, password);
    return cred;
  }

  export const signInUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred;
  }

  export const signOutUser = async () => await signOut(auth)

  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);



  

  