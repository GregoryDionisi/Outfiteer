import React, { createContext, useState } from 'react';

export const OutfitContext = createContext();

export const OutfitProvider = ({ children }) => {
  const [outfits, setOutfits] = useState([]);
  const [currentOutfitIndex, setCurrentOutfitIndex] = useState(null); // Indice dell'outfit da modificare

  // Funzione per aggiungere o aggiornare un outfit
  const saveOutfit = (outfit) => {
    setOutfits((prevOutfits) => {
      if (currentOutfitIndex !== null) {
        // Modifica l'outfit esistente
        const updatedOutfits = [...prevOutfits];
        updatedOutfits[currentOutfitIndex] = outfit;
        setCurrentOutfitIndex(null);  // Reimposta l'indice dopo il salvataggio
        return updatedOutfits;
      } else {
        // Aggiungi un nuovo outfit
        return [...prevOutfits, outfit];
      }
    });
  };

  // Funzione per eliminare un outfit
  const deleteOutfit = (index) => {
    setOutfits((prevOutfits) => prevOutfits.filter((_, i) => i !== index));
  };

  // Funzione per selezionare l'outfit da modificare
  const editOutfit = (index) => {
    setCurrentOutfitIndex(index);
  };

  return (
    <OutfitContext.Provider value={{ outfits, saveOutfit, deleteOutfit, editOutfit }}>
      {children}
    </OutfitContext.Provider>
  );
};
