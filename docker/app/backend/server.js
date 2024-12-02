const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 8081;

app.use(express.json());
app.use(cookieParser());

// Route de test pour vérifier si le cookie est présent
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Exemple de validation simple (à modifier selon vos besoins)
  if (username === 'admin' && password === 'password') {
    // Définir un cookie sécurisé
    res.cookie('secureFlagAccess', 'true', { httpOnly: true, secure: false });
    return res.status(200).json({ message: 'Login successful!' });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Route pour accéder au fichier flag.txt
app.get('/private/:folder/flag.txt', (req, res) => {
  if (req.cookies.secureFlagAccess === 'true') {
    return res.status(200).send('FLAG{this_is_the_flag}');
  } else {
    return res.status(403).send('Access Denied: Invalid Cookie');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
