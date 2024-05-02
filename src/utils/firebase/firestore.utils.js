// firestore.js
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import app from "./firebase-client.utils.js";

export const db = getFirestore(app);
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
      const { email, displayName, uid } = providedUser;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          uid,
          isAdmin: false,
          ...additionalInformation,
        });
      } catch (error) {
        console.error("Error creating the user:", error);
        throw error;
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

export const updateUserDataInDatabase = async (user, newDataObject) => {
  const userDocRef = doc(db, "users", user.uid);

  await updateDoc(userDocRef, {
    ...newDataObject,
  });
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
