import React, { useContext, useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // Usa il navigatore per reindirizzare
import axios from 'axios';  // Per chiamate API
import { OutfitContext } from './OutfitContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function MyOutfits() {
  const { deleteOutfit, editOutfit } = useContext(OutfitContext);
  const [outfits, setOutfits] = useState([]); // Stato locale per memorizzare gli outfit
  const [itemStyles, setItemStyles] = useState({
    shirts: { top: '10%', left: '30%', width: '40%', height: '40%' },
    pants: { top: '45%', left: '25%', width: '50%', height: '50%' },
    shoes: { top: '85%', left: '45%', width: '20%', height: '20%' },
    hats: { top: '-3%', left: '42.5%', width: '15%', height: '15%' },
    glasses: { top: '7%', left: '45%', width: '10%', height: '10%' }
  });
  const navigate = useNavigate(); // Usa il navigatore per reindirizzare

  // Funzione per caricare gli outfit dell'utente loggato
  const fetchUserOutfits = async () => {
    try {
      const token = localStorage.getItem('token'); // Recupera il token salvato
      const response = await axios.get('/api/outfits', {
        headers: {
          Authorization: `Bearer ${token}` // Invia il token per autenticare la richiesta
        }
      });
      setOutfits(response.data); // Imposta gli outfit dell'utente
    } catch (err) {
      console.error('Error fetching outfits:', err);
    }
  };

  useEffect(() => {
    fetchUserOutfits(); // Carica gli outfit una volta montato il componente
  }, []);

  const handleEdit = (index) => {
    editOutfit(index);  // Imposta l'outfit da modificare
    navigate('/create-outfit');  // Reindirizza alla pagina di creazione
  };

  const handleDelete = async (index) => {
    try {
      const token = localStorage.getItem('token'); // Recupera il token salvato
      await axios.delete(`/api/outfits/${outfits[index]._id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Invia il token per autenticare la richiesta
        }
      });
      setOutfits(outfits.filter((_, i) => i !== index)); // Aggiorna la lista degli outfit
    } catch (err) {
      console.error('Error deleting outfit:', err);
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        My Outfits
      </Typography>

      {outfits.length > 0 ? (
        outfits.map((outfit, index) => (
          <Box key={index} sx={{ marginBottom: '20px', position: 'relative' }}>
            <Typography variant="h6">Outfit {index + 1}</Typography>

            {Object.keys(outfit).map((category) => (
              <Box key={category} sx={{ marginBottom: '10px' }}>
                <img 
                  src={outfit[category].image} 
                  alt={outfit[category].name} 
                  style={{ 
                    position: 'absolute',
                    top: itemStyles[category].top,
                    left: itemStyles[category].left,
                    width: itemStyles[category].width,
                    height: itemStyles[category].height,
                    objectFit: 'contain',
                  }} 
                />
              </Box>
            ))}
            
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ marginRight: '10px' }}
              onClick={() => handleEdit(index)}
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
            <Button 
              variant="contained" 
              onClick={() => handleDelete(index)}
              sx={{bgcolor: "red", '&:hover': {
                backgroundColor: '#aa0000',
              },}}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Box>
        ))
      ) : (
        <Typography variant="body1">No outfits saved yet.</Typography>
      )}
    </Box>
  );
}
