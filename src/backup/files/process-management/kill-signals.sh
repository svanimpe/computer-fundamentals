#!/usr/bin/env bash

cleanup() {
  echo "[$$] Received SIGTERM — cleaning up and exiting gracefully."
  exit 0
}

trap cleanup SIGTERM

echo "[$$] Started. PID is $$. Send SIGTERM to stop me gracefully."

while true; do
  echo "[$$] Working..."
  sleep 2
done
