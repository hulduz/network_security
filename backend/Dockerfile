# Use Node.js as base image
FROM node:16-alpine

# Create a non-root user
RUN addgroup -S ctfgroup && adduser -S ctfuser -G ctfgroup

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./


# Set read-only permissions for passwords.txt
COPY passwords.txt .
RUN chmod 400 passwords.txt

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Switch to non-root user
USER ctfuser

# Expose the application port
EXPOSE 8081

# Start the application
CMD ["node", "main.js"]
