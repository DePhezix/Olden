// loadingFeedback.context.jsx

import React, { createContext, useReducer } from "react";
import { useEffect } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

export const LoadingFeedbackContext = createContext({
  isLoading: false,
  setIsLoading: () => {}, // Initialize setIsLoading as an empty function
  isSuccessful: null,
  setIsSuccessful: () => {}, // Initialize setIsSuccessful as an empty function
});

const INITIAL_STATE = {
  isLoading: false,
  isSuccessful: null,
};

const LOADING_FEEDBACK_ACTION_TYPES = {
  SET_LOADING: "SET_LOADING",
  SET_IS_SUCCESSFUL: "SET_IS_SUCCESSFUL",
};

const LoadingReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOADING_FEEDBACK_ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case LOADING_FEEDBACK_ACTION_TYPES.SET_IS_SUCCESSFUL:
      return {
        ...state,
        isSuccessful: payload,
      };
    default:
      return state;
  }
};

export function LoadingFeedbackProvider({ children }) {
  const [{ isLoading, isSuccessful }, dispatch] = useReducer(
    LoadingReducer,
    INITIAL_STATE
  );

  const setIsLoading = (newState) => {
    dispatch(createAction(LOADING_FEEDBACK_ACTION_TYPES.SET_LOADING, newState));
  };
  const setIsSuccessful = (newState) => {
    dispatch(
      createAction(LOADING_FEEDBACK_ACTION_TYPES.SET_IS_SUCCESSFUL, newState)
    );
  };

  useEffect(() => {
      if (typeof isSuccessful === "string") {
        setIsLoading(false);
      }
  }, [isSuccessful])

  const value = {
    isLoading,
    setIsLoading,
    isSuccessful,
    setIsSuccessful,
  };

  return (
    <LoadingFeedbackContext.Provider value={value}>
      {children}
    </LoadingFeedbackContext.Provider>
  );
}
