// OutfitContext.js
import React, { createContext, useState } from 'react';

// Crea un contesto per gestire gli outfit
export const OutfitContext = createContext();

// Componente che fornisce il contesto agli altri componenti
export const OutfitProvider = ({ children }) => {
  // Stato per memorizzare la lista degli outfit
  const [outfits, setOutfits] = useState([]);

  // Funzione per aggiungere un nuovo outfit alla lista
  const saveOutfit = (outfit) => {
    // Aggiungi l'outfit alla lista esistente e aggiorna lo stato
    setOutfits((prevOutfits) => {
      // Crea una nuova lista con gli outfit precedenti e il nuovo outfit
      const updatedOutfits = [...prevOutfits, outfit];
      return updatedOutfits; // Ritorna la nuova lista per aggiornare lo stato
    });
  };
  

  // Fornisce il contesto ai componenti figli
  return (
    <OutfitContext.Provider value={{ outfits, saveOutfit }}>
      {children}
    </OutfitContext.Provider>
  );
};
