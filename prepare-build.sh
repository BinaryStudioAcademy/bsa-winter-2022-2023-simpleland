#!/bin/bash

mkdir -p ./build/backend/; mv ./backend/build/* ./build/backend/;
mkdir ./build/shared/; mv ./shared/build ./build/shared/
mkdir ./build/backend/public; mv ./frontend/build/* ./build/backend/public;
# mkdir ./build/node_modules; mv ./node_modules/* ./build/node_modules;
cp package.json package-lock.json ./build;

