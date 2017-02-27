#!/usr/bin/env bash

echo "Compile coffeescript files..."
coffee -o ./lib/ -c ./src/*.coffee
coffee -o ./dist/ -c ./src/*.coffee
coffee -o ./test/ -c ./src/test/*coffee
coffee -o ./test/ -c ./src/*.coffee
echo "Compile finish."

echo "======="

echo "Do basic test..."
node ./test/test.js
echo "Test finish."
