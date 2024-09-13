const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { authMiddleware } = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(express.json());

const port = 5001;
const JWT_SECRET = 'mysecretkey';

// Connetti a MongoDB
mongoose.connect('mongodb+srv://gregoryd324:VBx7QKffWoYkYhph@cluster0.kb4kb.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// **Schema per gli articoli**
const itemSchema = new mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  color: String,
});
const Item = mongoose.model('Item', itemSchema, 'ImageDetails'); // Usa la collezione "ImageDetails"

// **Schema per gli utenti**
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
});
const User = mongoose.model('User', userSchema);

// **Schema per gli outfit**
const outfitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: { type: Object, required: true },  // Memorizza gli articoli dell'outfit
});
const Outfit = mongoose.model('Outfit', outfitSchema);

// **API per ottenere gli articoli filtrati per categoria**
app.get('/api/items/:category', async (req, res) => {
  const category = req.params.category;
  try {
    const items = await Item.find({ category });
    res.json(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

// **Registrazione**
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET);
    res.status(201).json({ token, user: { id: newUser._id, email: newUser.email } });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

// **Login**
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not registered' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.status(200).json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in' });
  }
});


// **Google OAuth**
passport.use(new GoogleStrategy({
  clientID: 'YOUR_GOOGLE_CLIENT_ID',
  clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
  callbackURL: '/api/auth/google/callback',
},
async (accessToken, refreshToken, profile, done) => {
  const { id, emails } = profile;
  const email = emails[0].value;
  try {
    let user = await User.findOne({ googleId: id });
    if (!user) {
      user = new User({ googleId: id, email });
      await user.save();
    }
    done(null, user);
  } catch (err) {
    done(err);
  }
}));

app.get('/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, JWT_SECRET);
    res.redirect(`/login/success?token=${token}`);
  }
);

// **Rotte per gli outfit personali (richiedono autenticazione)**
app.use('/api/outfits', authMiddleware);

// **API per ottenere gli outfit dell'utente**
app.get('/api/outfits', async (req, res) => {
  try {
    const outfits = await Outfit.find({ userId: req.userId });
    res.json(outfits);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching outfits' });
  }
});

// **API per creare un outfit**
app.post('/api/outfits', async (req, res) => {
  try {
    const newOutfit = new Outfit({ userId: req.userId, items: req.body.items });
    await newOutfit.save();
    res.status(201).json(newOutfit);
  } catch (err) {
    res.status(500).json({ message: 'Error creating outfit' });
  }
});

// **API per eliminare un outfit**
app.delete('/api/outfits/:id', async (req, res) => {
  try {
    await Outfit.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Outfit deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting outfit' });
  }
});

// Avvia il server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
