
export function getQueryParams() {
  return parseQueryString(window.location.search);
}

export function parseQueryString(queryString) {
  if (queryString.length <= 1) {
    return {};
  }

  const params = [];
  const pairs = queryString.slice(1).split('&');    
  let pair;
  for (var i = 0; i < pairs.length; i++) {
    pair = pairs[i].split('=');
    params[pair[0]] = pair[1];
  }

  return params;
}

/**
 * @param {string} prefer
 * @param {string} base
 */
export function mergeQueryString(prefer, base) {
  const params = Object.assign({}, parseQueryString(base), parseQueryString(prefer));
  const result = '?' + Object.keys(params).map(key => `${key}=${params[key]}`).join('&');

  return result === '?' ? '' : result;
}
