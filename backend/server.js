require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const loginRoute = require('./routes/login');
const snowyPathRoute = require('./routes/snowyPath');
//const registerRoute = require('./routes/register');
const setCookieRoute = require('./routes/setCookie');
const paths = require('./routes/magicalPaths')

const app = express();
const PORT = process.env.PORT || 8081;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/login', loginRoute);
app.use('/api/snowy-path', snowyPathRoute); 
//app.use('/register', registerRoute);
app.use('/set-cookie', setCookieRoute);
app.use('/', paths);

app.get('/', (req, res) => {
  res.status(200).json({ message: '🎄 Welcome to the North Pole! Santa’s servers are running overtime preparing for Christmas and they need your help. Otherwise the presents won\'t get delivered. But first, start by grabbing some cookies at /set-cookie. 🎅' });
});

app.get('*', (req, res) => {
  res.status(404).json({ message: 'Uh-oh! You seem to have wandered off the sleigh route. 🚫' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
