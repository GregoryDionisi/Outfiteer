const express = require("express");
const cors = require("cors"); // Importa il pacchetto cors
const mongoose = require("mongoose");

const app = express();

// Usa il middleware CORS
app.use(cors());

// Usa il middleware per gestire i dati in JSON
app.use(express.json());

const mongoUrl = "mongodb+srv://gregoryd324:VBx7QKffWoYkYhph@cluster0.kb4kb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Aggiungi questa opzione
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

require("./ImageDetails");

const Images = mongoose.model("ImageDetails");

app.post("/upload-image", async (req, res) => {
  const { base64 } = req.body;
  try {
    await Images.create({ image: base64 });
    res.send({ Status: "ok" });
  } catch (error) {
    res.status(500).send({ Status: "error", data: error.message });
  }
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
