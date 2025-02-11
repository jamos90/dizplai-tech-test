#!/bin/bash
cd ./backend || exit
echo 'Starting backend server'
npm i
nodemon server.js &

cd ../front-end || exit
echo 'Starting frontend server'
npm i
ng serve &

wait

