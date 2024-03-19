import { createContext, useState } from "react";

export const UrlHistoryContext = createContext({
  setUrlHistory: () => [],
  urlHistory: [],
});

export function UrlHistoryProvider({ children }) {
  const [urlHistory, setUrlHistory] = useState([]);
  
  const setHistory = (new_location) =>
    urlHistory[urlHistory - 1] === new_location
      ? null
      : setUrlHistory([...urlHistory, new_location]);

  const value = { urlHistory, setHistory };

  return (
    <UrlHistoryContext.Provider value={value}>
      {children}
    </UrlHistoryContext.Provider>
  );
}