// loadingFeedback.context.jsx

import React, { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';

export const AdminContext = createContext({
  rightClickedTitle: '',
});

const INITIAL_STATE = {
  rightClickedTitle: '',
};

const ADMIN_ACTION_TYPES = {
  SET_RIGHT_CLICKED_TITLE: 'SET_RIGHT_CLICKED_TITLE',
};

const AdminReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_ACTION_TYPES.SET_RIGHT_CLICKED_TITLE:
      return {
        ...state,
        rightClickedTitle: payload,
      };
    default:
      return state;
  }
};

export function AdminProvider({ children }) {
  const [{ rightClickedTitle }, dispatch] = useReducer(
    AdminReducer,
    INITIAL_STATE
  );

  const setRightClickedTitle = (newState) => {
    dispatch(
      createAction(ADMIN_ACTION_TYPES.SET_RIGHT_CLICKED_TITLE, newState)
    );
  };

  const value = {
    rightClickedTitle,
    setRightClickedTitle,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}
