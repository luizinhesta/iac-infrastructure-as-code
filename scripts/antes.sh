#!/bin/bash
set -e
apt-get update -y
DEBIAN_FRONTEND=noninteractive apt-get upgrade -y
apt-get install -y apache2
systemctl enable apache2
systemctl start apache2

mkdir -p /var/www/html
rm -rf /var/www/html/*
