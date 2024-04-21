import { createContext, useReducer } from "react";

export const UrlHistoryContext = createContext({
  isLoading: false,
});

const INITIAL_STATE = {
  isLoading: false,
}

const LOADING_ACTION_TYPES = {
  SET_LOADING: "SET_LOADING",
};

const LoadingReducer = {

}

export function UrlHistoryProvider({ children }) {
  const {isLoading} = useReducer()

  const value = { isLoading };

  return (
    <UrlHistoryContext.Provider value={value}>
      {children}
    </UrlHistoryContext.Provider>
  );
}