# Capture the Flag Task: Vulnerable Web Server

## 1. Why I Chose This Task

We chose this task because it is a classical example of web server vulnerabilities. It shows how simple misconfigurations can lead to attacks.

## 2. Task Overview

We implemented a Dockerized web server running Apache, with a hidden flag stored in a subdirectory. The access to the flag is protected by a cookie-base authentification, which needs to be bypassed to capture the flag.

## Getting Started

1. **Clone the Repository**:
   Ensure you have the project files on your local machine. Clone the repository or navigate to the project directory.

2. **Build and Run the Docker Container**:
   Open your terminal and run the following commands to build and start the server:

   ```bash
   docker build -t ctfproject .
   docker run -p 8081:8081 ctfproject

## 3. Intended Attack Method
To capture the flag, follow these steps:

1. **Identify the Path to the Flag**:
   - Scan for hidden directories and files within the server with tools you can use on your bash.

2. **Bypass Cookie-Based Authentication**:
   - Inspect the web page source and cookies to determine the required cookie for flag access.
   - Send a request with the necessary cookie header.

3. **Access the Flag**:
   - If the path is correct and the cookie is valid, the server will respond with the contents of `flag.txt`, revealing the flag.


