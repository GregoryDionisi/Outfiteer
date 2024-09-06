const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(cors());
const port = 5001;

// Connetti a MongoDB
mongoose.connect('mongodb+srv://gregoryd324:VBx7QKffWoYkYhph@cluster0.kb4kb.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definisci lo schema degli articoli
const itemSchema = new mongoose.Schema({
  name: String,
  category: String,
  image: String, 
  price: String,
  color: String,
});

// Modello MongoDB per la collezione esistente "ImageDetails"
const Item = mongoose.model('Item', itemSchema, 'ImageDetails'); // Usa la collezione esistente "ImageDetails"


// API per ottenere gli articoli filtrati per categoria
app.get('/api/items/:category', async (req, res) => {
  const category = req.params.category;
  try {
    const items = await Item.find({ category: category });
    res.json(items);
  } catch (error) {
    res.status(500).send(error);
  }
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
