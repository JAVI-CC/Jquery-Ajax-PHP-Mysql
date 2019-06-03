FROM ubuntu:latest

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update \
        && apt-get install -y --no-install-recommends \
        dos2unix \
        nginx \
        mysql-server \
        mysql-client \
        php-fpm \
        php-mysql

COPY Calderas.sql /var/www/html
COPY index.html /var/www/html
COPY style.css /var/www/html
COPY run.sh /home/run.sh

ADD PHP /var/www/html/PHP
ADD Jquery /var/www/html/Jquery

RUN chmod -R 777 /var/www/html/PHP && \
        chmod -R 777 /var/lib/mysql && \
        service mysql start && \
        mysql -u root -e "CREATE DATABASE calderas" && \
		mysql -u root -e "CREATE USER 'admin'@'localhost' IDENTIFIED BY '12345678';" && \
		mysql -u root -e "GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost';" && \
		mysql -u root -e "FLUSH PRIVILEGES;" && \
        mysql -u root -D calderas < /var/www/html/Calderas.sql && \
        rm /var/www/html/index.nginx-debian.html && \
        sed -i '47i location ~ \.php$ { include snippets/fastcgi-php.conf; fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;}' /etc/nginx/sites-available/default

CMD ["/bin/bash", "/home/run.sh"]