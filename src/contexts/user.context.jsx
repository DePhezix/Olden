import { createContext, useEffect, useReducer } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  getUsersInfo,
  getCurrentUserInfo,
} from "../utils/firebase/firebase.utils";
import { Navigate } from "react-router-dom";

import { createAction } from "../utils/reducer/reducer.utils";

export const UserRedirect = (
  VariationType,
  Page,
  Pathname,
  currentUser,
  urlHistory,
  pageType
) => {
  if (VariationType === 1) {
    return currentUser && urlHistory[urlHistory.length - 1] != Pathname ? (
      <Navigate to={`${urlHistory[urlHistory.length - 1]}`} />
    ) : currentUser && urlHistory[urlHistory.length - 1] === Pathname ? (
      <Navigate to="/home" replace />
    ) : pageType === "PageNotFound" && currentUser ? (
      <Navigate to={`${urlHistory[urlHistory.length - 2]}`} />
    ) : (
      Page
    );
  } else if (VariationType === 2) {
    return currentUser ? Page : <Navigate to="/" />;
  }
};

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
  redirect: UserRedirect,
  allUsersData: {},
  isUserAdmin: false,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
  SET_ALL_USERS_DATA: "SET_ALL_USERS_DATA",
  SET_IS_USER_ADMIN: "SET_IS_USER_ADMIN",
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        ...payload
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
  currentUser: null,
  isUserAdmin: false,
  allUsersData: {},
};

export const UserProvider = ({ children }) => {
  const redirect = UserRedirect;
  const [{ currentUser, allUsersData, isUserAdmin }, dispatch] = useReducer(
    userReducer,
    INITIAL_STATE
  );

  const updateUserinReducer = (newCurrentUser) => {
    const isNewUserAdmin = () => {
      if (newCurrentUser.isAdmin === true) {
        return true
      } else {
        return false
      }
    }
    const payload = {
      currentUser: newCurrentUser,
      isUserAdmin: isNewUserAdmin(),
    };

    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, payload))
  }

  useEffect(() => {
    if (isUserAdmin) {
      const getAllUsersData = async () => {
        const usersData = await getUsersInfo();

        dispatch(createAction(USER_ACTION_TYPES.SET_ALL_USERS_DATA, usersData));
      };

      getAllUsersData();
    }
  }, [isUserAdmin]);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      const getCurrentUserData = async () => {
        const userData = await getCurrentUserInfo(user.uid);

        updateUserinReducer(userData)
      };

      getCurrentUserData();
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    allUsersData,
    isUserAdmin,
    redirect,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
