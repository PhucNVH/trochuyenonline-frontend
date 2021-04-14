#!/bin/sh
git checkout main
git pull origin main
yarn
yarn build-prod
(cd build; zip -r ../build.zip *)
zip -r -9 build.zip build
scp -r ./build.zip tco@13.67.34.69:/home/trochuyenonline/builds/web
ssh tco@13.67.34.69 "sh /home/trochuyenonline/builds/web/trochuyenonline.sh"