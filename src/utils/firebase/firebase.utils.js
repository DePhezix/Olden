import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDBCj_5VucWua0H-2nk7Vc9xH_oY3lLjSs",
  authDomain: "vitecrown.firebaseapp.com",
  projectId: "vitecrown",
  storageBucket: "vitecrown.appspot.com",
  messagingSenderId: "234865601743",
  appId: "1:234865601743:web:0d0b69fae829bd63f09bba",
};
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionkey, objectsToAdd, field) => {
  const collectionRef = collection(db, collectionkey)
  const batch = writeBatch(db)

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object[field].toLowerCase())
    batch.set(docRef, object)
  })

  await batch.commit()
  console.log('done')
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories')
  
  const q = query(collectionRef)
  const querySnapshot = await getDocs(q)


  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data()
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})

  return categoryMap
}

export const getHomeCategoriesandDocuments = async () => {
  const collectionRef = collection(db, 'homeCategories')
    
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);


  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, id, imageUrl, route } = docSnapshot.data();
    
    if (!Array.isArray(acc) || !acc.length) {
      acc = []
    }

    acc.push({title, id, imageUrl, route})
    return acc;
  }, {});

  return categoryMap;
}

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);