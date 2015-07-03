#!/bin/bash

echo "* $(tput setaf 3)Building css-components$(tput setaf 7)..."
(cd css-components && npm install && node_modules/.bin/gulp build)
echo "** $(tput setaf 2)Finished$(tput setaf 7)!\n"

echo "* $(tput setaf 3)Building OnsenUI$(tput setaf 7)..."
npm install --loglevel error
node_modules/.bin/gulp dist
echo "** $(tput setaf 2)Finished$(tput setaf 7)!\n"

echo "* $(tput setaf 3)Copying distribution files$(tput setaf 7)"
lasttag=`git tag -l | sort -t. -k1,1n -k2,2n -k3,3n | tail -n 1`
git checkout --detach ${lasttag} -f
files=(`ls -A dist | sed -e 's/\/dist//'`)
git rm -r * --cached --ignore-unmatch 1>/dev/null
cp -R -f dist/* dist/.* . 1>/dev/null
rm -r -f dist 1>/dev/null
echo "** $(tput setaf 2)Finished$(tput setaf 7)!"

echo "* $(tput setaf 3)Preparing new release$(tput setaf 7)..."
git add -f "${files[@]}"
newtag=`perl -ne 'print $1 if /"version":\s*"(.*?[^\\\\])",/' package.json`
git commit -m "Version ${newtag} release."
git tag -a ${newtag} -m "Version ${newtag} release."
echo "** $(tput setaf 2)Finished$(tput setaf 7)!"

echo "\n$(tput setaf 6)Complete the release with:  $(tput setaf 7)git push origin ${newtag}"
