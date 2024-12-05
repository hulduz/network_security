const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const loginRoute = require('./routes/login');
const randomFlagLinkRoute = require('./routes/randomFlagLink'); // Path to your random-flag-link route
const registerRoute = require('./routes/register');
const setCookieRoute = require('./routes/setCookie');

const app = express();
const PORT = 8081;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/login', loginRoute); // Login route to authenticate users and set cookies
app.use('/api/random-flag-link', randomFlagLinkRoute); 
app.use('/register', registerRoute); // Add the register route
app.use('/set-cookie', setCookieRoute); // Add the set-cookie route

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Handle 404s
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
