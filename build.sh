#!/usr/bin/env bash

echo "Compile coffeescript files..."
coffee -o ./lib/ -c ./src/*.coffee
coffee -o ./test/ -c ./src/*.coffee

echo "Finish."
