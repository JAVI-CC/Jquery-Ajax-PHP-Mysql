#!/bin/bash

chown -R mysql:mysql /var/lib/mysql

service php7.2-fpm start

service nginx start

service mysql start

tail -f /dev/null