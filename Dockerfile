FROM python:3.10-slim

RUN apt-get update && apt-get install -y apache2 apache2-utils python3

RUN mkdir -p /var/www/html/private/x9y8z7 && echo "FLAG{you_found_the_flag}" > /var/www/html/private/x9y8z7/flag.txt
RUN chmod 777 /var/www/html/private/x9y8z7/flag.txt  

RUN mkdir -p /var/www/html/distraction && echo "This is not the flag." > /var/www/html/distraction/fake1.txt

RUN htpasswd -cb /etc/apache2/.htpasswd admin admin123

RUN echo '<Directory "/var/www/html/private">\
    AuthType Basic\
    AuthName "Restricted Access"\
    AuthUserFile /etc/apache2/.htpasswd\
    Require valid-user\
</Directory>' >> /etc/apache2/apache2.conf

COPY ./access_control.py /var/www/html/access_control.py
RUN chmod +x /var/www/html/access_control.py

CMD ["sh", "-c", "apachectl -D FOREGROUND & python3 /var/www/html/access_control.py"]

EXPOSE 80
