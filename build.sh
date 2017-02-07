#!/usr/bin/env bash

coffee -o ./lib/ -c ./src/*.coffee
coffee -o ./test/ -c ./src/*.coffee
