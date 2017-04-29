#!/bin/bash

# This script checks each package and if it needs a new version
# released, then it publishes that new version.

needsRelease=0
exitstatus=0

for d in server client; do
  echo "> ($d)";
  echo "> ... releases new versions if needed";
  echo "";
  cd $d;
  needsRelease=0
  node ../.scripts/check-release.js $d || needsRelease=$?;
  if [ $needsRelease -eq 1 ]; then
    npm run release-patch || exitstatus=$?;
  elif [ $needsRelease -eq 2 ]; then
    npm run release-minor || exitstatus=$?;
  elif [ $needsRelease -eq 3 ]; then
    npm run release-major || exitstatus=$?;
  fi
  cd ..;
  if [ $exitstatus -ne 0 ]; then
    break;
    exit $exitstatus;
  fi
done

exit $exitstatus