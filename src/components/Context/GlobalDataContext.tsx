import React, { createContext, useContext, ReactNode } from 'react'

const GlobalDataContext = createContext<any | null>(null)

export const GlobalDataProvider = ({
  data,
  featuredTags,
  eventCards,
  homeSettings,
  children,
}: {
  data?: any
  featuredTags?: any
  eventCards?: any
  homeSettings?: any
  children: ReactNode
}) => {
  return (
    <GlobalDataContext.Provider value={{ data, featuredTags, eventCards, homeSettings }}>
      {children}
    </GlobalDataContext.Provider>
  )
}

export const useGlobalData = () => {
  const context = useContext(GlobalDataContext)
  if (!context) {
    console.error(
      'Error: useGlobalData must be used within a GlobalDataProvider',
    )
  }
  return context
}
