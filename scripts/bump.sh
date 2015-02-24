#!/usr/bin/env bash

# Bump version
# Updates CHANGELOG.md, bower.json, and package.json
#
# Example
#
#     ./scripts/bump.sh 1.2.3-beta

DIR=$(dirname $0)
source $DIR/utils.inc

replaceVersion $DIR/../package.json $1
replaceVersion $DIR/../bower.json $1
