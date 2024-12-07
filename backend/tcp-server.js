require('dotenv').config();
const net = require('net');

const correctPort = process.env.FLAG_PORT;

if (!correctPort) {
  console.error('ERROR: FLAG_PORT is not defined. Please contant the admins.');
  process.exit(1);  
} else {
  const server = net.createServer((socket) => {
    console.log('A user has connected to the server.');
    
    socket.write("🎅 You've saved Christmas! Here is your flag: FLAG{Christmas_Magic_Found}\n");
    socket.end();
  });

  server.listen(correctPort, () => {
    console.log(`Server running`);
  });
}
