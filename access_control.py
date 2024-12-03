from http.server import BaseHTTPRequestHandler, HTTPServer
import random

flag = "FLAG{hidden_flag_secret_code}"
secret_key = ''.join(random.choices('abcdefghijklmnopqrstuvwxyz0123456789', k=8))  # Génération aléatoire d'une clé secrète

class CTFRequestHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == "/login":
            # Ajoutez les en-têtes CORS
            self.send_header('Access-Control-Allow-Origin', 'http://localhost:5173')  # URL de votre frontend
            self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            
            # Ajoutez ici le reste de la logique de traitement pour la connexion
            # Exemple : authentification, validation, etc.
            # Pour l'instant, un exemple de réponse
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b"Login successful")

    def do_GET(self):
        if self.path == "/":
            # Page d'accueil avec un indice subtil
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b"Welcome to the CTF Challenge. Explore to find the hidden flag.")
            self.wfile.write(b"\nHint: Look at the server's hidden endpoints.")
        elif self.path == f"/secret/{secret_key}":
            # Endpoint caché pour récupérer le flag
            self.send_response(200)
            self.end_headers()
            self.wfile.write(f"The flag is: {flag}".encode())
        elif self.path == "/robots.txt":
            # Ajout d'une fausse piste dans robots.txt
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b"User-agent: *\nDisallow: /admin/\nDisallow: /hidden_area/")
        elif self.path == "/admin/":
            # Fausse route
            self.send_response(403)
            self.end_headers()
            self.wfile.write(b"Access Denied. This area is off-limits.")
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"File Not Found")

if __name__ == "__main__":
    PORT = 8081
    print(f"Server running on port {PORT}...")
    print(f"Secret key for the CTF is: /secret/{secret_key}")
    server = HTTPServer(("", PORT), CTFRequestHandler)
    server.serve_forever()
