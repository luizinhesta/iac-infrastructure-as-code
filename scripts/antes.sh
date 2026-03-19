#!/bin/bash
set -e

apt-get update -y
DEBIAN_FRONTEND=noninteractive apt-get upgrade -y
apt-get install -y apache2 ruby wget curl

# Instala o agente do CodeDeploy (região detectada via metadata)
IMDS_TOKEN=$(curl -sX PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 60" || true)
if [ -n "$IMDS_TOKEN" ]; then
  REGION=$(curl -s -H "X-aws-ec2-metadata-token: $IMDS_TOKEN" http://169.254.169.254/latest/dynamic/instance-identity/document | grep region | awk -F\" '{print $4}')
else
  REGION=$(curl -s http://169.254.169.254/latest/dynamic/instance-identity/document | grep region | awk -F\" '{print $4}')
fi
REGION=${REGION:-us-east-1}

CODEDEPLOY_URL="https://aws-codedeploy-${REGION}.s3.${REGION}.amazonaws.com/latest/install"
wget -q -O /tmp/codedeploy-install "$CODEDEPLOY_URL"
chmod +x /tmp/codedeploy-install
/tmp/codedeploy-install auto

systemctl enable codedeploy-agent
systemctl start codedeploy-agent

systemctl enable apache2
systemctl start apache2

mkdir -p /var/www/html
rm -rf /var/www/html/*
