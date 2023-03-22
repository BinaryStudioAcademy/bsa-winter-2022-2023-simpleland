#!/bin/bash

mkdir -p ./build/backend/; cp ./backend/build/* ./build/backend/; rm -rf ./backend/build/;
mkdir ./build/shared/; cp ./shared/build ./build/shared/
mkdir ./build/backend/public; cp ./frontend/build/* ./build/backend/public; rm -rf ./frontend/build
cp package.json package-lock.json ./build
