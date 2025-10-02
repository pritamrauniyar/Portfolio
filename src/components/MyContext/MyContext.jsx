import { createContext, useEffect, useState } from "react";

export const MyContext = createContext();
export const MyContextProvider = ({ children }) => {
  const [jsonData, setJsonData] = useState(null);
  useEffect(() => {
    const dataFetch = async () => {
      const response = await fetch("/data/journeyData.json");
      const responseData = await response.json();
      // console.log(responseData);
      setJsonData(responseData);
    };
    dataFetch();
  }, []);
  return <MyContext.Provider value={jsonData}>{children}</MyContext.Provider>;
};
