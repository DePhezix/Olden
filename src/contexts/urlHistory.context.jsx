import { createContext, useState, useEffect } from "react";

export const UrlHistoryContext = createContext({
  setUrlHistory: () => [],
  urlHistory: [],
});

export function UrlHistoryProvider({ children }) {
  const [urlHistory, setUrlHistory] = useState(
    localStorage.getItem("urlHistory").split(',')
  );
  
  const setHistory = (new_location) =>
    urlHistory[urlHistory - 1] === new_location
      ? null
      : setUrlHistory([...urlHistory, new_location]);
    
    useEffect(() => {
      if (urlHistory.length > 5) {
        const last5ArraySlice = urlHistory.slice(urlHistory.length - 5);
        setUrlHistory(last5ArraySlice)
      }
    }, [urlHistory])

    useEffect(() => {
      localStorage.setItem('urlHistory', urlHistory)
    }, [urlHistory]);

  const value = { urlHistory, setHistory };

  return (
    <UrlHistoryContext.Provider value={value}>
      {children}
    </UrlHistoryContext.Provider>
  );
}