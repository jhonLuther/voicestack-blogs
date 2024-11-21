import React, { createContext, useContext, ReactNode } from 'react';



const GlobalDataContext = createContext<any | null>(null);

export const GlobalDataProvider = ({ data,featuredTags, children }: { data: any;featuredTags?:any; children: ReactNode }) => {
  return <GlobalDataContext.Provider value={{ data, featuredTags }}>{children}</GlobalDataContext.Provider>;
};

export const useGlobalData = () => {
  const context = useContext(GlobalDataContext);
  if (!context) {
    console.error('Error: useGlobalData must be used within a GlobalDataProvider');
    
  }
  return context;
};