#!/usr/bin/env bash

value=$(cat counter.txt)
sleep 0.1
echo $((value + 1)) > counter.txt
