// MyOutfits.js
import React, { useContext, useState } from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { OutfitContext } from './OutfitContext';
import Male from './model3D/Male'; // Assicurati che questo componente esista e funzioni
import TankTop from './model3D/TankTop';
import BaggyJeans from './model3D/BaggyJeans';
import AirForce from './model3D/AirForce';
import Cap from './model3D/Cap';
import RayBan from './model3D/RayBan';

const OutfitPreview = ({ outfit, onEdit }) => {
  return (
    <Card sx={{ maxWidth: 345, marginBottom: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Anteprima Outfit
        </Typography>
        <Box sx={{ height: '300px', width: '100%', position: 'relative' }}>
          <Male />
          {outfit.shirts === 'TankTop' && <TankTop />}
          {outfit.pants === 'BaggyJeans' && <BaggyJeans />}
          {outfit.shoes === 'AirForce' && <AirForce />}
          {outfit.hats === 'Cap' && <Cap />}
          {outfit.glasses === 'RayBan' && <RayBan />}
        </Box>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => onEdit(outfit)}>
          Modifica
        </Button>
      </CardContent>
    </Card>
  );
};

export default function MyOutfits() {
  const { outfits } = useContext(OutfitContext);
  const [editingOutfit, setEditingOutfit] = useState(null);

  const handleEditOutfit = (outfit) => {
    setEditingOutfit(outfit);
    alert('Funzionalità di modifica non implementata'); // Placeholder
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        I Miei Outfit
      </Typography>
      {outfits.length > 0 ? (
        outfits.map((outfit, index) => (
          <OutfitPreview key={index} outfit={outfit} onEdit={handleEditOutfit} />
        ))
      ) : (
        <Typography variant="h6">
          Nessun outfit salvato
        </Typography>
      )}
      {editingOutfit && (
        <Box sx={{ marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Modifica l'Outfit
          </Typography>
          {/* Qui potresti inserire un modulo di modifica per l'outfit */}
          <Button variant="contained" onClick={() => alert('Implementa la logica di salvataggio')}>
            Salva Modifiche
          </Button>
        </Box>
      )}
    </Box>
  );
}
