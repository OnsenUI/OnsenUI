#!/bin/bash

distrepo='OnsenUI-dist'

cd ..

if [ ! -d $distrepo ]
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

echo "* $(tput setaf 3)Building css-components$(tput setaf 7)..."
(cd css-components && npm install && node_modules/.bin/gulp build)
echo "** $(tput setaf 2)Finished$(tput setaf 7)!"

echo "* $(tput setaf 3)Preparing OnsenUI$(tput setaf 7)..."
if [ "$1" == "no-build" ]
then
	node_modules/.bin/gulp dist-no-build
else
	npm install --loglevel error
	node_modules/.bin/gulp dist
fi
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
