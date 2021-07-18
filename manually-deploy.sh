#!/bin/sh
git checkout main
git pull origin main
yarn
yarn build-prod
(cd build; zip -r ../build.zip *)
zip -r -9 build.zip build
scp -r ./build.zip tco@52.221.183.205:/home/tco/builds/tco/web
ssh tco@52.221.183.205 "sh /home/tco/builds/tco/web/tco.sh"