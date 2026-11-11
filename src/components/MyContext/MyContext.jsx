import { createContext, useEffect, useState } from "react";

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const dataFetch = async () => {
      try {
        const response = await fetch("/data/journeyData.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch journeyData.json (${response.status})`);
        }
        const responseData = await response.json();
        if (isMounted) {
          setJsonData(responseData);
        }
      } catch (error) {
        console.error("Unable to fetch journey data:", error);
        if (isMounted) {
          setJsonData([]);
        }
      }
    };
    dataFetch();
    return () => {
      isMounted = false;
    };
  }, []);

  return <MyContext.Provider value={jsonData}>{children}</MyContext.Provider>;
};
