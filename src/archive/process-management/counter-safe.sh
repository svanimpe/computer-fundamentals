#!/usr/bin/env bash

LOCK=counter.lock

while ! mkdir "$LOCK" 2>/dev/null; do
  sleep 0.01
done

trap 'rmdir "$LOCK"' EXIT

value=$(cat counter.txt)
sleep 0.1
echo $((value + 1)) > counter.txt
