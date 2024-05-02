import React, { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

export const DataUpdatedContext = createContext({
  userDataInAdminVersion: 1,
  setUserDataInAdminVersion: () => {}
});

const INITIAL_STATE = {
  userDataInAdminVersion: 1,
  setUserDataInAdminVersion: () => {},
};

const DATA_LOADED_ACTION_TYPES = {
  SET_USERS_DATA_IN_ADMIN_LOADED: "SET_USERS_DATA_IN_ADMIN_LOADED",
};

const LoadingReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case DATA_LOADED_ACTION_TYPES.SET_USERS_DATA_IN_ADMIN_LOADED:
      return {
        ...state,
        userDataInAdminVersion: payload
      };
    default:
      return state;
  }
};

export function DataUpdatedProvider({ children }) {
  const [{ userDataInAdminVersion }, dispatch] = useReducer(
    LoadingReducer,
    INITIAL_STATE
  );

  const setUserDataInAdminVersion = (newState) => {
    dispatch(createAction(DATA_LOADED_ACTION_TYPES.SET_USERS_DATA_IN_ADMIN_LOADED, newState));
  };

  const value = {
    userDataInAdminVersion, setUserDataInAdminVersion
  };

  return (
    <DataUpdatedContext.Provider value={value}>
      {children}
    </DataUpdatedContext.Provider>
  );
}
