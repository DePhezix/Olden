import { createContext, useEffect, useReducer } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
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
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled type: ${type}`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };

  const redirect = UserRedirect;

  const value = { currentUser, setCurrentUser, redirect };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
