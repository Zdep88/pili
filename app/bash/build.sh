#!/bin/bash

git pull
npm i
cp .env.example .env
sudo nano .env
set -a
source ./.env
set +a
sudo -i -u postgres psql -c "CREATE ROLE \"$DATABASE_USER\" WITH LOGIN PASSWORD '$DATABASE_PASSWORD'" &&
sudo -i -u postgres psql -c "CREATE DATABASE \"$DATABASE_NAME\" OWNER \"$DATABASE_USER\""