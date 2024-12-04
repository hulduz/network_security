const express = require('express');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 8081;

app.use(express.json());
app.use(cookieParser());

// Route pour définir le cookie d'accès
app.get('/set-cookie', (req, res) => {
  res.cookie('accessFlag', 'secretCookieValue', { httpOnly: true, secure: false }); 
  res.status(200).send('Cookie set. Access the flag now.');
});

// Middleware pour vérifier le cookie d'accès
app.use((req, res, next) => {
  // Ne pas vérifier le cookie sur la route /set-cookie
  if (req.path === '/set-cookie' || (req.cookies && req.cookies['accessFlag'])) {
    next();
  } else {
    res.status(403).json({ message: 'Access forbidden. You need the correct cookie to access the flag (try going to /set-cookie path).' });
  }
});

// Middleware pour servir des fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Route pour créer un lien vers le flag
app.get('/api/random-flag-link', (req, res) => {
  const randomPath = crypto.randomBytes(8).toString('hex');
  const flagPath = path.join(__dirname, 'public', randomPath);
  const flagContent = 'FLAG{You_found_the_flag!}';

  // Créer le fichier flag s'il n'existe pas déjà
  if (!fs.existsSync(flagPath)) {
    fs.writeFileSync(flagPath, `<html><body>${flagContent}</body></html>`);
  }

  // Retourner le lien vers le fichier flag
  const flagLink = `http://localhost:${PORT}/${randomPath}`;
  res.status(200).json({ link: flagLink });
});

// Route pour accéder au flag à partir du lien
app.get('/:token', (req, res) => {
  const token = req.params.token;
  const flagPath = path.join(__dirname, 'public', token);

  if (fs.existsSync(flagPath)) {
    res.status(200).sendFile(flagPath);
  } else {
    res.status(404).json({ message: 'The flag is not at this path. Ensure you have set the correct cookie by visiting /set-cookie and try again.' });
  }
});

// Assurer la création des répertoires et des fichiers initiaux
const publicDir = path.join(__dirname, 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Créer des fichiers de distraction initiaux
fs.writeFileSync(path.join(publicDir, 'flag.html'), '<html><body>Not the flag, just a distraction.</body></html>');

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
