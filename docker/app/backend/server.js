const express = require('express');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 8081;

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  if (req.cookies && req.cookies['accessFlag']) {
    next();
  } else {
    res.status(403).json({ message: 'Access forbidden. You need the correct cookie to access the flag.' });
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/random-flag-link', (req, res) => {
  const randomPath = crypto.randomBytes(8).toString('hex');
  const flagPath = path.join(__dirname, 'public', randomPath);
  const flagContent = 'FLAG{You_found_the_flag!}';

  if (!fs.existsSync(flagPath)) {
    fs.writeFileSync(flagPath, `<html><body>${flagContent}</body></html>`);
  }

  const flagLink = `http://localhost:${PORT}/${randomPath}`;
  res.status(200).json({ link: flagLink });
});

app.get('/:token', (req, res) => {
  const token = req.params.token;
  const flagPath = path.join(__dirname, 'public', token);

  if (fs.existsSync(flagPath)) {
    res.status(200).sendFile(flagPath);
  } else {
    res.status(404).json({ message: 'Flag not found.' });
  }
});

app.get('/set-cookie', (req, res) => {
  res.cookie('accessFlag', 'secretCookieValue', { httpOnly: true, secure: false }); 
  res.status(200).send('Cookie set. Access the flag now.');
});

const publicDir = path.join(__dirname, 'public');
const apiDir = path.join(publicDir, 'api');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

if (!fs.existsSync(apiDir)) {
  fs.mkdirSync(apiDir);
}

fs.writeFileSync(path.join(publicDir, 'flag.html'), '<html><body>Not the flag, just a distraction.</body></html>');
fs.writeFileSync(path.join(apiDir, 'flag2.html'), '<html><body>Another fake endpoint.</body></html>');

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
