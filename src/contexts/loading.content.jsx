import { createContext, useState, useEffect } from "react";

export const UrlHistoryContext = createContext({
  isLoading: false,
});

export function UrlHistoryProvider({ children }) {
  const [isLoading, setIsLoading] = useState()

  const value = { isLoading };

  return (
    <UrlHistoryContext.Provider value={value}>
      {children}
    </UrlHistoryContext.Provider>
  );
}