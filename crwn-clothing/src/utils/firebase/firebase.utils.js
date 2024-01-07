import { initializeApp,
 } from "firebase/app";
 import { getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth"
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

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async(userAuth) => {
    const userDocRef = doc(db, "users", userAuth.uid);

    // console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    //if user data exists
    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch(error) {
            console.log('error creating user', error.message)
        }
    }

    return userDocRef;

    //if user data does not exist
  }