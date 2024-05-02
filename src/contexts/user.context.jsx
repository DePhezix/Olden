import { createContext, useEffect, useReducer, useContext } from "react";
import { Navigate } from "react-router-dom";

import { onAuthStateChange } from "../utils/firebase/firebase-auth.utils";
import {
  getUsersInfo,
  getUserDocument,
  updateUserDataInDatabase,
} from "../utils/firebase/firestore.utils";
import { createAction } from "../utils/reducer/reducer.utils";

import { DataUpdatedContext } from "./dataUpdated.context";
import { LoadingFeedbackContext } from "./loadingFeedback.context";

export const UserRedirect = (
  VariationType,
  Page,
  Pathname,
  currentUser,
  urlHistory,
  homePageUrl,
  signInPageUrl,
  unrestricted
) => {
  if (VariationType === 1) {
    return currentUser && urlHistory[urlHistory.length - 1] != Pathname ? (
      <Navigate to={`${urlHistory[urlHistory.length - 1]}`} />
    ) : currentUser && urlHistory[urlHistory.length - 1] === Pathname ? (
      <Navigate to={`${homePageUrl}`} replace />
    ) : (
      Page
    );
  } else if (VariationType === 2) {
    return currentUser ? Page : <Navigate to={`${signInPageUrl}`} />;
  } else if (VariationType === 3) {
    return currentUser && unrestricted ? (
      Page
    ) : currentUser && urlHistory[urlHistory.length - 1] === Pathname ? (
      <Navigate to={`${homePageUrl}`} replace />
    ) : currentUser ? (
      <Navigate to={`${urlHistory[urlHistory.length - 1]}`} />
    ) : (
      <Navigate to={`${signInPageUrl}`} />
    );
  }
};

export const UserContext = createContext({
  currentUser: {
    createdAt: null,
    email: null,
    displayName: null,
    uid: null,
    isAdmin: false,
  },
  redirect: (...args) => {
    const setLoading = useContext(LoadingFeedbackContext);
    return UserRedirect(...args, setLoading);
  },
  allUsersData: {},
  updateUserDatabase: async (user, newDataObj) => {
    const { setUserDataInAdminVersion, userDataInAdminVersion } =
      useContext(DataUpdatedContext);

    await updateUserDataInDatabase(user, newDataObj);
    setUserDataInAdminVersion(userDataInAdminVersion + 1);
  },
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
  SET_ALL_USERS_DATA: "SET_ALL_USERS_DATA",
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    case USER_ACTION_TYPES.SET_ALL_USERS_DATA:
      return {
        ...state,
        allUsersData: payload,
      };
    default:
      throw new Error(`Unhandled type: ${type}`);
  }
};

const INITIAL_STATE = {
  currentUser: {
    createdAt: null,
    email: null,
    displayName: null,
    uid: null,
    isAdmin: false,
  },
  allUsersData: {},
};

export const UserProvider = ({ children }) => {
  const { setUserDataInAdminVersion, userDataInAdminVersion } =
    useContext(DataUpdatedContext);
  const { setIsLoading, isSuccessful } = useContext(LoadingFeedbackContext);
  const setLoading = useContext(LoadingFeedbackContext);

  const redirect = (...args) => {
    return UserRedirect(...args, setLoading);
  };
  const updateUserDatabase = async (user, newDataObj) => {
    await updateUserDataInDatabase(user, newDataObj);
    setUserDataInAdminVersion(userDataInAdminVersion + 1);
  }

  const setAllUsersData = (usersData) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_ALL_USERS_DATA, usersData))
  }

  const [{ currentUser, allUsersData }, dispatch] = useReducer(
    userReducer,
    INITIAL_STATE
  );

  useEffect(() => {
    const isUserAdmin = currentUser.isAdmin;
    if (isUserAdmin) {
      const getAllUsersData = async () => {
        {typeof isSuccessful !== "string" && setIsLoading(true);}
        const usersData = await getUsersInfo();

        setAllUsersData(usersData);
        setIsLoading(false);
      };

      getAllUsersData();
    }
  }, [currentUser, userDataInAdminVersion]);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      const getCurrentUserData = async () => {
        setIsLoading(true);
        const userData = await getUserDocument(user ? user : null, {});

        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, userData));
        setIsLoading(false);
      };

      getCurrentUserData();
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    allUsersData,
    redirect,
    updateUserDatabase,
    setAllUsersData
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
