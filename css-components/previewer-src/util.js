
export function getQueryParams() {
  var params = [];
  var pairs = window.location.search.slice(1).split('&');    
  var pair;
  for (var i = 0; i < pairs.length; i++) {
    pair = pairs[i].split('=');
    params[pair[0]] = pair[1];
  }

  return params;
}
