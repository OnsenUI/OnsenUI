/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

'use strict';

var startsWith = function startsWith(s, c) {
  return s.substr(0, c.length) === c;
};
var endsWith = function endsWith(s, c) {
  return s.substr(s.length - c.length, c.length) === c;
};
var unwrap = function unwrap(s) {
  return s.slice(1, -1);
};
var isObjectString = function isObjectString(s) {
  return startsWith(s, '{') && endsWith(s, '}');
};
var isArrayString = function isArrayString(s) {
  return startsWith(s, '[') && endsWith(s, ']');
};
var isQuotedString = function isQuotedString(s) {
  return startsWith(s, '\'') && endsWith(s, '\'') || startsWith(s, '"') && endsWith(s, '"');
};

var error = function error(token, string, originalString) {
  throw new Error('Unexpected token \'' + token + '\' at position ' + (originalString.length - string.length - 1) + ' in string: \'' + originalString + '\'');
};

var processToken = function processToken(token, string, originalString) {
  if (token === 'true' || token === 'false') {
    return token === 'true';
  } else if (isQuotedString(token)) {
    return unwrap(token);
  } else if (!isNaN(token)) {
    return +token;
  } else if (isObjectString(token)) {
    return parseObject(unwrap(token));
  } else if (isArrayString(token)) {
    return parseArray(unwrap(token));
  } else {
    error(token, string, originalString);
  }
};

var nextToken = function nextToken(string) {
  string = string.trim();
  var limit = string.length;

  if (string[0] === ':' || string[0] === ',') {

    limit = 1;
  } else if (string[0] === '{' || string[0] === '[') {

    var c = string.charCodeAt(0);
    var nestedObject = 1;
    for (var i = 1; i < string.length; i++) {
      if (string.charCodeAt(i) === c) {
        nestedObject++;
      } else if (string.charCodeAt(i) === c + 2) {
        nestedObject--;
        if (nestedObject === 0) {
          limit = i + 1;
          break;
        }
      }
    }
  } else if (string[0] === '\'' || string[0] === '"') {

    for (var _i = 1; _i < string.length; _i++) {
      if (string[_i] === string[0]) {
        limit = _i + 1;
        break;
      }
    }
  } else {

    for (var _i2 = 1; _i2 < string.length; _i2++) {
      if ([' ', ',', ':'].indexOf(string[_i2]) !== -1) {
        limit = _i2;
        break;
      }
    }
  }

  return string.slice(0, limit);
};

var parseObject = function parseObject(string) {
  var isValidKey = function isValidKey(key) {
    return (/^[A-Z_$][A-Z0-9_$]*$/i.test(key)
    );
  };

  string = string.trim();
  var originalString = string;
  var object = {};
  var readingKey = true,
      key = void 0,
      previousToken = void 0,
      token = void 0;

  while (string.length > 0) {
    previousToken = token;
    token = nextToken(string);
    string = string.slice(token.length, string.length).trim();

    if (token === ':' && (!readingKey || !previousToken || previousToken === ',') || token === ',' && readingKey || token !== ':' && token !== ',' && previousToken && previousToken !== ',' && previousToken !== ':') {
      error(token, string, originalString);
    } else if (token === ':' && readingKey && previousToken) {
      previousToken = isQuotedString(previousToken) ? unwrap(previousToken) : previousToken;
      if (isValidKey(previousToken)) {
        key = previousToken;
        readingKey = false;
      } else {
        throw new Error('Invalid key token \'' + previousToken + '\' at position 0 in string: \'' + originalString + '\'');
      }
    } else if (token === ',' && !readingKey && previousToken) {
      object[key] = processToken(previousToken, string, originalString);
      readingKey = true;
    }
  }

  if (token) {
    object[key] = processToken(token, string, originalString);
  }

  return object;
};

var parseArray = function parseArray(string) {
  string = string.trim();
  var originalString = string;
  var array = [];
  var previousToken = void 0,
      token = void 0;

  while (string.length > 0) {
    previousToken = token;
    token = nextToken(string);
    string = string.slice(token.length, string.length).trim();

    if (token === ',' && (!previousToken || previousToken === ',')) {
      error(token, string, originalString);
    } else if (token === ',') {
      array.push(processToken(previousToken, string, originalString));
    }
  }

  if (token) {
    if (token !== ',') {
      array.push(processToken(token, string, originalString));
    } else {
      error(token, string, originalString);
    }
  }

  return array;
};

var parse = function parse(string) {
  string = string.trim();

  if (isObjectString(string)) {
    return parseObject(unwrap(string));
  } else if (isArrayString(string)) {
    return parseArray(unwrap(string));
  } else {
    throw new Error('Provided string must be object or array like: ' + string);
  }
};

export default parse;