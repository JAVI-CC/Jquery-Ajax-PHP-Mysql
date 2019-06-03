#!/bin/bash

chown -R mysql:mysql /var/lib/mysql

sed -i '92d' /etc/nginx/sites-enabled/default

service php7.2-fpm start

service nginx start

service mysql start

tail -f /dev/null