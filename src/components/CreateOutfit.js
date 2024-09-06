import React, { useState, useContext, useEffect, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Box, Button, ThemeProvider, Alert, Slider, Checkbox, FormControlLabel, Fade } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import theme from './Theme';
import './CreateOutfit.css';
import { OutfitContext } from './OutfitContext';
import axios from 'axios';

import Male from './model3D/Male';
import AirForce from './model3D/AirForce';
import Jordan4 from './model3D/Jordan4';
import BaggyJeans from './model3D/BaggyJeans';
import CargoJeans from './model3D/CargoJeans';
import Cap from './model3D/Cap';
import RayBan from './model3D/RayBan';
import RayBan1 from './model3D/RayBan1';
import TankTop from './model3D/TankTop';

export default function CreateOutfit() {
  const { saveOutfit } = useContext(OutfitContext);
  const [selectedItems, setSelectedItems] = useState({});
  const [activeCategory, setActiveCategory] = useState('shirts');
  const [showAlert, setShowAlert] = useState(false);
  const [items, setItems] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200]); 
  const [selectedColors, setSelectedColors] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const filtersRef = useRef(null); 
  const iconRef = useRef(null); 

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`/api/items/${activeCategory}`);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
  
    fetchItems();
  }, [activeCategory]);

  const handleSelect = (category, item) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [category]: prevState[category] === item ? null : item,
    }));
  };

  const handleSaveOutfit = () => {
    saveOutfit(selectedItems);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleColorChange = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };
  

  const toggleFilters = () => {
    setShowFilters((prev) => !prev); //viene invertito lo stato di showFilters
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Verifica se il clic è fuori dalla finestra dei filtri e dall'icona
      if (
        filtersRef.current && !filtersRef.current.contains(event.target) &&
        iconRef.current && !iconRef.current.contains(event.target)
      ) {
        setShowFilters(false); // Chiude i filtri se clicchi fuori
      }
    };

    // Aggiungi il listener quando il componente viene montato
    document.addEventListener('mousedown', handleClickOutside);
    
    // Rimuovi il listener quando il componente viene smontato
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderItemsByCategory = () => {
    if (!items || items.length === 0) {
      return <div>No items found for this category.</div>;
    }
  
    const filteredItems = items.filter((item) => {
      // Verifica il prezzo
      const isPriceInRange = item.price >= priceRange[0] && item.price <= priceRange[1];
  
      // Verifica se i colori selezionati sono presenti nella stringa color dell'item
      const isColorMatch = selectedColors.length === 0 || 
        selectedColors.some(color => item.color.split(', ').includes(color));
  
      return isPriceInRange && isColorMatch;
    });
  
    return filteredItems.map((item) => (
      <Box
        key={item._id}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: '30%',
          height: '30vh',
          borderRadius: '15px',
          cursor: 'pointer',
          border: '3px solid #FFFDD0',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            bgcolor: '#12635a',
          },
          marginLeft: '1%',
        }}
        className={`category-box ${selectedItems[activeCategory] === item.name ? 'selected' : ''}`}
        onClick={() => handleSelect(activeCategory, item.name)}
      >
        <img 
          src={item.image} 
          alt={item.name}
          style={{ 
            width: '100%', 
            height: 'auto', 
            objectFit: 'cover', 
            borderRadius: '15px' 
          }} 
        />
        <Button
          className="canvas-text"
          variant="contained"
          sx={{
            bgcolor: '#FFFDD0',
            color: '#13665D',
            fontFamily: 'FS Kim Bold, sans-serif',
            fontSize: '2vh',
            '&:hover': {
              backgroundColor: '#dedcb6',
            },
          }}
        >
          {item.name}
        </Button>
      </Box>
    ));
  };
  

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        {showAlert && (
          <Alert 
            severity="success" 
            variant='filled'
            onClose={handleCloseAlert}
            sx={{ 
              position: 'fixed',
              top: 0, 
              left: '50%', 
              transform: 'translateX(-50%)', 
              display: 'flex', 
              zIndex: 1000, 
              maxWidth: '90%', 
              height: 'auto', 
              maxHeight: '60px', 
              alignItems: 'center', 
              justifyContent: 'center',
              overflow: 'hidden',
              margin: '10px', 
            }}
          >
            Outfit saved successfully!
          </Alert>
        )}
        <div className="menu-content">
          <div className="toolbar-container">
            <div className="toolbar">
              {['shirts', 'pants', 'shoes', 'hats', 'glasses'].map((key) => (
                <Button 
                key={key} 
                onClick={() => setActiveCategory(key)} 
                variant={activeCategory === key ? "contained" : "text"}
              >
                {key[0].toUpperCase() + key.slice(1)}
              </Button>
              ))}
            </div>
          </div>
          <div className="category-content">{renderItemsByCategory()}</div>
          <div className="save-button-container">
            <Button
              sx={{
                bgcolor: '#FFFDD0',
                color: '#13665D',
                fontFamily: 'FS Kim Bold, sans-serif',
                fontSize: '2vh',
                '&:hover': {
                  backgroundColor: '#dedcb6',
                },
              }} 
              variant="contained" color="primary" onClick={handleSaveOutfit}>
              Save Outfit
            </Button>
          </div>
        </div>
        <div className='side-content'>
          <TuneIcon 
          ref={iconRef}
            onClick={toggleFilters}
            sx={{
              color: 'background.default',
              mt: '1.8vh',
              fontSize: '30px',
              cursor: 'pointer',
            }}
          />
          <Fade in={showFilters}>
            <Box 
            ref={filtersRef}
              sx={{ 
                position: 'absolute', 
                top: '10%', 
                right: '10%', 
                bgcolor: 'background.paper', 
                borderRadius: '8px',
                boxShadow: 24, 
                p: 2,
                zIndex: 1500 
              }}
            >
              <div>
                <h4>Price Range</h4>
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={500} 
                  sx={{ width: 200 }}
                />
              </div>
              <div>
                <h4>Colors</h4>
                {['black', 'white', 'red', 'blue', 'lightblue'].map((color) => (
                  <FormControlLabel
                    key={color}
                    control={
                      <Checkbox
                        checked={selectedColors.includes(color)}
                        onChange={() => handleColorChange(color)}
                        name={color}
                        sx={{ color }}
                      />
                    }
                    label={color}
                  />
                ))}
              </div>
            </Box>
          </Fade>
        </div>
        <Canvas className="canvas-container">
          <ambientLight intensity={1} />
          <OrbitControls enablePan={false} minDistance={1} maxDistance={6} />
          <Suspense fallback={null}>
            {selectedItems.pants === 'Baggy Jeans' && <BaggyJeans />}
            {selectedItems.pants === 'Cargo Jeans' && <CargoJeans />}
            {selectedItems.shoes === 'Air Force 1' && <AirForce />}
            {selectedItems.shoes === 'Jordan 4' && <Jordan4 />}
            {selectedItems.hats === 'Cap' && <Cap />}
            {selectedItems.glasses === 'RayBan New Wayfarer' && <RayBan />}
            {selectedItems.glasses === 'RayBan Round Metal' && <RayBan1 />}
            {selectedItems.shirts === 'Tank Top' && <TankTop />}
            <Environment preset="sunset" />
          </Suspense>
        </Canvas>
      </div>
    </ThemeProvider>
  );
}
