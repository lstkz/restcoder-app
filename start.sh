#!/usr/bin/env bash
export NODE_PATH="./src"
export NODE_ENV="production"
export PORT="8080"
export APIPORT="3500"
node ./bin/server.js

NODE_PATH="./src" NODE_ENV="production" PORT="8080" APIPORT="3500" pm2 start --name frontend bin/server.js