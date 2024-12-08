require('dotenv').config();

const net = require('net');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const { doesUserExist } = require('./utils/hashHelpers');

const JWT_SECRET = process.env.JWT_SECRET;
const FLAG_PORT_PATH = '/run/secrets/flag_port';

let FLAG_PORT;

if (fs.existsSync(FLAG_PORT_PATH)) {
  FLAG_PORT = fs.readFileSync(FLAG_PORT_PATH, 'utf8').trim();
} else {
  console.error("FLAG_PORT secret not found, contact the admins");
  process.exit(1);
}


const authenticate = (socket) => {
  socket.once('data', (data) => {
    const token = data.toString().trim();

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        socket.write('Invalid token, access denied.\n');
        socket.end();
      } else {
        const { username } = decoded;

        if (doesUserExist(username)) {
          console.log(`User ${username} authenticated successfully.`);
          socket.write("🎅 You've saved Christmas! The North Pole’s servers are now working as expected, and Santa’s sleigh is ready to take over the winter skies. Thanks to you, the presents will reach every home in time for Christmas morning! As a token of our gratitude, here’s your very special gift: FLAG{3ncrypt3d_H0liday}. May your holidays be filled with warmth and joy! 🎅🎁");
          socket.end();
        } else {
          socket.write('Username not found, access denied.\n');
          socket.end();
        }
      }
    });
  });
};

const server = net.createServer((socket) => {
  console.log('A user has connected to the server.');
  authenticate(socket);
});

server.listen(FLAG_PORT, () => {
  console.log(`Server running...`);
});
