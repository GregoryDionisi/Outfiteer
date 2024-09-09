const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const app = express();
const port = 5003;

app.use(cors());

// Percorso della cartella che contiene le immagini caricate
const imagesDir = path.join(__dirname, 'uploads');

// Route per inviare le immagini come archivio .zip
app.get('/download-images', (req, res) => {
    const zipFileName = 'images.zip';
    const zipPath = path.join(__dirname, zipFileName);

    // Creare un archivio zip delle immagini
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', {
        zlib: { level: 9 }
    });

    output.on('close', () => {
        res.download(zipPath, zipFileName, (err) => {
            if (err) {
                console.error('Errore nel download del file:', err);
            }
            fs.unlinkSync(zipPath); // Cancella il file zip dopo il download
        });
    });

    archive.on('error', (err) => {
        throw err;
    });

    archive.pipe(output);

    // Aggiunge tutti i file nella cartella 'uploads' all'archivio zip
    archive.directory(imagesDir, false);
    archive.finalize();
});

app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});
