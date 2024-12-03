# Utiliser l'image Node.js comme base
FROM node:18

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier le fichier package.json et package-lock.json (si présent)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port utilisé par votre serveur Node.js (8081)
EXPOSE 8081

# Commande pour démarrer l'application
CMD ["node", "server.js"]
