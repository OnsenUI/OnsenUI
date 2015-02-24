function replaceVersion {
  sed -i'' "s/\"version\": \".*\"/\"version\": \"$2\"/" $1
}

function getVersion {
  echo `grep -e \"version\": $1 | sed 's/\"version\": \"\(.*\)\",/\1/' | xargs`
}

