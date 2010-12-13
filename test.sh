#!/bin/bash

for test in tests/*_tests.js
do 
  out=$(node "$test")
  fails=$(echo "$out"|grep '^FAIL')
  if [ -n "$fails" ]
  then
    echo "FAIL $test"
    fails_occured=true
  fi
  if [  "$1" = "-v" ]
  then
    echo $test
    echo "$out"
    echo
  fi
done
if [ $fails_occured ]
then
  exit 1
fi
