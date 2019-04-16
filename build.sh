#!/usr/bin/env bash

echo "Compile coffeescript files..."
npx coffee --transpile --output ./lib/ --compile ./src/*.coffee
npx coffee --transpile --output ./dist/ --compile ./src/*.coffee
npx coffee --transpile --output ./test/ --compile ./src/test/*.coffee
npx coffee --transpile --output ./test/ --compile ./src/*.coffee
echo "Compile finish."
