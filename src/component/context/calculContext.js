// DataContext.js
import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [healthResult, setHealthResult] = useState(null);

  const handleResultReceived = (result) => {
    setHealthResult(result);
  };

  return (
    <DataContext.Provider value={{ healthResult, handleResultReceived }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
