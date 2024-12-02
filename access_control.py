from http.server import BaseHTTPRequestHandler, HTTPServer
import time
import sys

flag_path = '/var/www/html/private/x9y8z7/flag.txt'
valid_cookie = 'secureFlagAccess=true'

class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Verify the cookie
        cookie = self.headers.get('Cookie')
        if cookie != valid_cookie:
            # If it is incorrect : delay is introduced
            time.sleep(5)
            self.send_response(403)
            self.end_headers()
            self.wfile.write(b'Access Denied: Invalid Cookie')
            return

        if self.path == '/private/x9y8z7/flag.txt':
            # If the path is correct : show the flag
            self.send_response(200)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            with open(flag_path, 'r') as file:
                self.wfile.write(file.read().encode())
        else:
            # Else : error
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'File Not Found')

if __name__ == "__main__":
    server_address = ('', 8081)
    httpd = HTTPServer(server_address, RequestHandler)
    print("Server running on port 8081...")
    httpd.serve_forever()
