# 🎄 Network Security CTF Challenge
Team: Bizou Bizou

## 🎁 Description
The North Pole is buzzing with last-minute preparations, but disaster has struck: Santa’s magical servers are malfunctioning, threatening to ruin Christmas! 

Once you arrive to The North Pole, your mission will be to simply follow the instructions, where you will encounter various problems such as restricted accesses and finding the right port through clues. 

## 🎯 Level
```easy```
This challenge faces common cryptography and network security concerns.

## 💻 Environment Setup
Follow these steps to pull the Docker image from DockerHub and run it locally.

---

### **1. Pull the Docker Image**  
```bash
docker pull fredyy455/encrypted_holiday:latest
```

---

### **2. Run the Docker Container**  
```bash
docker run -d -p 8081:8081 fredyy455/encrypted_holiday:latest
```

---

### **3. Verify the Running Container**  
```bash
docker ps
```
*Ensure the container is running correctly.*

---

### **4. Access the Application**  
- Open your browser and navigate to:  
  **`http://localhost:8081`**  
---

While solving this CTF, you may find the following tools helpful:

- **Postman**: Great for testing APIs and making HTTP requests.
- **A Network Scanner**: You might need something that helps you inspect ports and services.
- **A Password Cracking Tool**: Consider using a wordlist to try common passwords


## 🚩 Flag Format
The format of the flag is FLAG{3ncrypt3d_H0liday}

---


Happy Hacking and Merry Christmas! 🎅🎄✨