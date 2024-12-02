FROM python:3.10-slim

RUN apt-get update && apt-get install -y apache2

# Web server 
RUN mkdir /var/www/html/private && echo "FLAG{this_is_the_flag}" > /var/www/html/private/flag.txt
RUN chmod 777 /var/www/html/private/flag.txt  # Mauvaise pratique intentionnelle

# Apache server
COPY ./index.html /var/www/html/index.html
CMD ["apachectl", "-D", "FOREGROUND"]

EXPOSE 80
