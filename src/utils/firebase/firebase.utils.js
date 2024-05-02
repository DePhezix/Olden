import { initializeApp as initializeAdminApp } from "firebase-admin/app";
import { initializeApp as initializeFirebaseApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
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
  collection,
  writeBatch,
  query,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBCj_5VucWua0H-2nk7Vc9xH_oY3lLjSs",
  authDomain: "vitecrown.firebaseapp.com",
  projectId: "vitecrown",
  storageBucket: "vitecrown.appspot.com",
  messagingSenderId: "234865601743",
  appId: "1:234865601743:web:0d0b69fae829bd63f09bba",
};
initializeAdminApp()

const app = initializeFirebaseApp(firebaseConfig);


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

export const addCollectionAndDocuments = async (
  collectionkey,
  objectsToAdd,
  field
) => {
  const collectionRef = collection(db, collectionkey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object[field].toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const addCollectionToFirebase = async (
  collectionName,
  objectToAdd,
  documentName
) => {
  const collectionRef = collection(db, collectionName);
  const docRef = doc(collectionRef, documentName.toLowerCase());
  const batch = writeBatch(db);

  batch.set(docRef, objectToAdd);
  await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");

  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, id, imageUrl, route, items } = docSnapshot.data();
    acc[title.toLowerCase()] = [id, imageUrl, route, items];
    return acc;
  }, {});

  return categoryMap;
};

export const getUserDocument = async (
  providedUser,
  additionalInformation = {}
) => {
  if (providedUser) {
    const userDocRef = doc(db, "users", providedUser.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      const {
        newDisplayName,
        isNewUserAdmin,
        givenDate,
        ...restAdditionalInfo
      } = additionalInformation;

      const { email, uid } = providedUser;
      const createdAt = givenDate || new Date();

      try {
        await setDoc(userDocRef, {
          email,
          createdAt,
          uid,
          isAdmin: isNewUserAdmin || false,
          displayName: newDisplayName || null,
          ...restAdditionalInfo,
        });
      } catch (error) {
        console.log("error creating the user", error.message);
      }
    }

    const newUserSnapshot = await getDoc(userDocRef);

    return newUserSnapshot.data();
  } else {
    const noUserObj = {
      createdAt: null,
      email: null,
      displayName: null,
      uid: null,
      isAdmin: false,
    };
    return noUserObj;
  }
};

export const createUserAsAdmin = async ({ email, password }) => {
  if (!email || !password) return;

  try {
    const userRecord = await auth.createUser({
      email,
      password,
    });
    console.log("Successfully created new user:", userRecord.uid);
    return userRecord; // Return the UID of the newly created user
  } catch (error) {
    console.log("Error creating new user:", error);
    throw error; // Throw the error for handling at the caller level
  }
};

export const updateUserPassword = async (userUid, password) => {
  if (!userUid || !password) return;

  try {
    await auth.updateUser(userUid, {
      password,
    });
    console.log("Password updated successfully for user:", userUid);
  } catch (error) {
    console.log("Error updating password for user:", error);
    throw error;
  }
};

export const getUsersInfo = async () => {
  const collectionRef = collection(db, "users");

  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  const userMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { isAdmin, createdAt, displayName, email, uid } = docSnapshot.data();
    const modifiedCreatedAt = createdAt.toDate().toISOString().split("T")[0];

    acc[email] = {
      isAdmin: isAdmin,
      createdAt: modifiedCreatedAt,
      displayName: displayName,
      uid: uid,
    };

    return acc;
  }, {});

  return userMap;
};

export const updateUserDataInDatabase = async (user, newDataObject) => {
  const userDocRef = doc(db, "users", user.uid);

  await updateDoc(userDocRef, {
    ...newDataObject,
  });
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
