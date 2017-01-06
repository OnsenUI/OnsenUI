#!/bin/bash

die () {
  echo >&2 "$@"
  exit 1
}

[ "$#" -eq 3 ] || die "usage: $0 build_number commit_hash destination_dir"

DIR=$(dirname $0)

source $DIR/utils.inc

BUILD_NUMBER=$1
COMMIT_HASH=$2
VERSION=$(getVersion $DIR/../package.json)
DATE=`date +%Y%m%d`
DESTINATION_DIR=$3

BUILD_VERSION="$VERSION-build.$BUILD_NUMBER"

$DIR/bump.sh $BUILD_VERSION

pushd $DIR/../css-components
gulp build
popd

pushd $DIR/../
gulp build
popd

mv $DIR/../build/onsenui.zip $DESTINATION_DIR/onsenui.zip
mv $DIR/../build $DESTINATION_DIR/onsenui
mkdir $DESTINATION_DIR/react-onsenui
mv $DIR/../bindings/react/dist $DESTINATION_DIR/react-onsenui
mkdir $DESTINATION_DIR/angular2-onsenui
mv $DIR/../bindings/angular2/dist $DESTINATION_DIR/angular2-onsenui

