require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const loginRoute = require('./routes/login');
const randomFlagLinkRoute = require('./routes/randomFlagLink'); // Path to random-flag-link route
const registerRoute = require('./routes/register');
const setCookieRoute = require('./routes/setCookie');

const app = express();
const PORT = 8081;

// require('dotenv').config({ path:__dirname+'/.env'});
const jwtSecret = process.env.JWT_SECRET;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/login', loginRoute); // Login route to authentificate users and set cookies
app.use('/api/random-flag-link', randomFlagLinkRoute); 
app.use('/register', registerRoute); // Add the register route
app.use('/set-cookie', setCookieRoute); // Add the set-cookie route

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  console.log(jwtSecret);  // Log to check if the secret is correctly loaded
  res.status(200).json({ message: 'Ho ho ho! Welcome to the North Pole\'s Capture the Flag challenge! Santa and his elves have hidden a magical flag somewhere in our winter wonderland, and it\'s up to you to find it. But first, please go to /set-cookie to accept a special cookie baked fresh by Mrs.Claus —it might just come in handy! 🍪' });
});

// Handle 404s
app.get('*', (req, res) => {
  res.status(404).json({ message: 'Uh-oh! You seem to have wandered off the sleigh route. 🚫' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
