import React, { useState } from 'react';
import axios from 'axios';

// Funzione per caricare più immagini
const uploadImages = async (imageFiles) => {
  try {
    const formData = new FormData();
    
    // Aggiungi tutte le immagini al form data
    imageFiles.forEach((imageFile) => {
      formData.append('files', imageFile); // Cambia 'file' in 'files' per rappresentare più file
    });

    const response = await axios.post('http://localhost:5003/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Assuming the response contains the URL or data of the 3D model
    return response.data;
  } catch (error) {
    console.error('Error uploading images:', error);
  }
};

const ObjectCapture = () => {
  const [selectedFiles, setSelectedFiles] = useState([]); // Usa un array per più file
  const [modelURL, setModelURL] = useState(null);

  // Gestisci il cambiamento dei file selezionati
  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files)); // Converte la FileList in array
  };

  // Funzione per caricare i file
  const handleUpload = async () => {
    if (selectedFiles.length > 0) {
      const result = await uploadImages(selectedFiles);
      setModelURL(result.modelURL); // URL del modello 3D generato
    }
  };

  return (
    <div>
      {/* Aggiungi l'attributo multiple per accettare più file */}
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Images</button>
      {modelURL && <a href={modelURL}>View 3D Model</a>}
    </div>
  );
};

export default ObjectCapture;
