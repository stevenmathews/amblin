#!/bin/bash

# Calling this script will the command line args "run test"
# will execute `npm run test` for each package.

exitstatus=0

for d in server client; do
  echo "> ($d)";
  echo "> npm $@";
  echo "";
  cd $d;
  npm $@ || exitstatus=$?;
  cd ..;
  if [ $exitstatus -ne 0 ]; then
    break;
    exit $exitstatus;
  fi
done

exit $exitstatus