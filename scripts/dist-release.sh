#!/bin/bash

set -e

distrepo='OnsenUI-dist'

cd ..

if [[ ! ( -d $distrepo && -d $distrepo/.git ) ]]
then
	echo "* $(tput setaf 3)Cloning OnsenUI/$distrepo$(tput setaf 7)..."
	git clone https://github.com/OnsenUI/$distrepo.git
	echo "** $(tput setaf 2)Finished$(tput setaf 7)!"
else
	echo "* $(tput setaf 3)Fetching OnsenUI/$distrepo$(tput setaf 7)..."
	(cd $distrepo && git fetch --tags)
	echo "** $(tput setaf 2)Finished$(tput setaf 7)!"
fi

(cd $distrepo && git rm -r * --cached --ignore-unmatch 1>/dev/null && rm -rf *)

echo "* $(tput setaf 3)Installing dependencies of css-components$(tput setaf 7)..."
(cd css-components && npm install)
echo "** $(tput setaf 2)Finished$(tput setaf 7)!"

echo "* $(tput setaf 3)Preparing OnsenUI$(tput setaf 7)..."
if [ "$1" == "no-build" ]
then
	npm run dist
else
	npm install
	npm run build
	npm run dist
fi
echo "** $(tput setaf 2)Finished$(tput setaf 7)!"

echo "* $(tput setaf 3)Running tests$(tput setaf 7)..."
npm run test
echo "** $(tput setaf 2)Finished$(tput setaf 7)!"

echo "* $(tput setaf 3)Preparing new release$(tput setaf 7)..."
files=(`ls -A $distrepo | sed -e 's/\/$distrepo//'`)
newtag=`perl -ne 'print $1 if /"version":\s*"(.*?[^\\\\])",/' package.json`
cd $distrepo
git add -f "${files[@]}"
git commit -m "Version ${newtag} release."
git tag -a ${newtag} -m "Version ${newtag} release."
git push origin ${newtag}
echo "** $(tput setaf 2)Finished$(tput setaf 7)!"

echo $"\nDon't forget to create a new tag $newtag in the main repo including the generated docs!"

