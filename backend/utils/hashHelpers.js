const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const PASSWORD_FILE = path.join(__dirname, '../passwords.txt');

const generateSalt = () => crypto.randomBytes(8).toString('hex');

const hashPassword = (password, salt) => {
  return crypto.createHash('sha256').update(salt + password).digest('hex');
};

const doesUserExist = (username) => {
  if (!fs.existsSync(PASSWORD_FILE)) return false;
  const users = fs.readFileSync(PASSWORD_FILE, 'utf8').split('\n');
  return users.some((line) => line.startsWith(`${username}:`));
};


const saveUser = (username, salt, hashedPassword) => {
  const userEntry = `${username}:${salt}:${hashedPassword}\n`;
  fs.appendFileSync(PASSWORD_FILE, userEntry);
};

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
};