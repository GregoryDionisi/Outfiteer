import React, { useState, useContext, useEffect, useRef } from 'react';
import { Box, Button, ThemeProvider, Alert, Slider, Checkbox, FormControlLabel, Fade } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import theme from './Theme';
import './CreateOutfit.css';
import { OutfitContext } from './OutfitContext';
import axios from 'axios';

export default function CreateOutfit() {
  const { saveOutfit } = useContext(OutfitContext);
  const [selectedItems, setSelectedItems] = useState({});
  const [activeCategory, setActiveCategory] = useState('shirts');
  const [showAlert, setShowAlert] = useState(false);
  const [items, setItems] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});
  const [itemStyles, setItemStyles] = useState({
    shirts: { top: '10%', left: '10%', width: '30%', height: '30%' },
    pants: { top: '40%', left: '10%', width: '30%', height: '30%' },
    shoes: { top: '70%', left: '10%', width: '30%', height: '30%' },
    hats: { top: '0%', left: '0%', width: '20%', height: '20%' },
    glasses: { top: '10%', left: '20%', width: '30%', height: '20%' }
  });
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
      [category]: prevState[category] === item.name ? null : item.name,
    }));
    setSelectedImage((prevState) => ({
      ...prevState,
      [category]: prevState[category] === item.image ? null : item.image,
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
    setShowFilters((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filtersRef.current && !filtersRef.current.contains(event.target) &&
        iconRef.current && !iconRef.current.contains(event.target)
      ) {
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderItemsByCategory = () => {
    if (!items || items.length === 0) {
      return <div>No items found for this category.</div>;
    }

    const filteredItems = items.filter((item) => {
      const isPriceInRange = item.price >= priceRange[0] && item.price <= priceRange[1];

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
        onClick={() => handleSelect(activeCategory, item)}
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
        <Box className="canvas-container">
    {Object.keys(selectedImage).map((category) => (
      selectedImage[category] && (
        <img 
          key={category} 
          src={selectedImage[category]} 
          alt={`Selected item from ${category}`} 
          style={{ 
            position: 'absolute',
            top: itemStyles[category].top,
            left: itemStyles[category].left,
            width: itemStyles[category].width,
            height: itemStyles[category].height,
            objectFit: 'contain',
          }} 
        />
      )
    ))}
  </Box>
      </div>
    </ThemeProvider>
  );
}
