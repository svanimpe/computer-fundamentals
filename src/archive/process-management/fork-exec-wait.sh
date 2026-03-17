# /usr/bin/env bash

if [[ ! -f "fork-exec-wait.cpp" ]]; then
  echo "Error: fork-exec-wait.cpp not found!"
  echo "Please make sure you have downloaded the correct files for this course."
  exit 1
fi

gcc fork-exec-wait.cpp -o fork-exec-wait
./fork-exec-wait
rm fork-exec-wait