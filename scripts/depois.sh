#!/bin/bash
set -e
chown -R www-data:www-data /var/www/html
systemctl restart apache2
