// AppContext.js
import React, { createContext, useState } from 'react';

// Crea un contesto per gestire gli outfit
export const AppContext = createContext();

// Componente che fornisce il contesto agli altri componenti
export const AppProvider = ({ children }) => {
  // Stato per memorizzare la lista degli outfit
  const [isAnimating, setIsAnimating] = useState(true);
  // Fornisce il contesto ai componenti figli
  return (
    <AppContext.Provider value={{ isAnimating, setIsAnimating }}>
      {children}
    </AppContext.Provider>
  );
};
