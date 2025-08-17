#!/bin/bash

# PRODUCTION

nvm use 20 || nvm install 20 && nvm use 20

git reset --hard
git checkout master
git pull origin master

npm i --legacy-peer-deps
npm run build
pm2 start "npm run start:prod" --name=FURNIXAR-REACT