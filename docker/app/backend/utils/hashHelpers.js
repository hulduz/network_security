const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const PASSWORD_FILE = path.join(__dirname, '../passwords.txt');

// Generate salt
const generateSalt = () => crypto.randomBytes(8).toString('hex');

// Hash password using PBKDF2
const hashPassword = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 100, 64, 'sha256').toString('hex');
};

// Check if username exists in passwords.txt
const doesUserExist = (username) => {
  if (!fs.existsSync(PASSWORD_FILE)) return false;
  const users = fs.readFileSync(PASSWORD_FILE, 'utf8').split('\n');
  return users.some((line) => line.startsWith(`${username}:`));
};

// Save user to passwords.txt
const saveUser = (username, salt, hashedPassword) => {
  const userEntry = `${username}:${salt}:${hashedPassword}\n`;
  fs.appendFileSync(PASSWORD_FILE, userEntry);
};

//const signToken = (username) => {
//return jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' }); // Set expiration time for security
//}

// Verify a password against stored credentials
const verifyPassword = (username, password) => {
  const lines = fs.readFileSync(PASSWORD_FILE, 'utf-8').split('\n');
  for (const line of lines) {
    const [storedUser, storedSalt, storedHash] = line.split(':');
    if (storedUser === username) {
      const computedHash = hashPassword(password, storedSalt);
      return computedHash === storedHash;
    }
  }
  return false;
};

module.exports = {
  generateSalt,
  hashPassword,
  doesUserExist,
  saveUser,
  verifyPassword,
  //signToken
};