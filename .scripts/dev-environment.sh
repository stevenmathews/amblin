#!/bin/bash

rethinkdb &
sleep 2
cd server
npm run dev &
cd ../client
npm run dev
trap 'kill $(jobs -pr) -9' SIGINT SIGTERM EXIT