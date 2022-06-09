import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";

const config = {
  apiKey: "AIzaSyDDdOWmMvPL7OWN4Hk3qiKYa0A8m3hxlQ8",
  authDomain: "react-final-2022.firebaseapp.com",
  projectId: "react-final-2022",
  storageBucket: "react-final-2022.appspot.com",
  messagingSenderId: "140809946089",
  appId: "1:140809946089:web:ac08609ff9f26692328178",
};

const app = initializeApp(config);

export const auth = getAuth(app);
export const firestore = getFirestore(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const createUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth) {
    return;
  } else {
    const docRef = doc(firestore, "users", userAuth.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(docRef, {
          displayName,
          email,
          createdAt,
        });
      } catch (error) {
        console.log("error creating user", error.message);
      }
    }

    return docRef;
  }
};
