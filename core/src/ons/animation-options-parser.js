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

const unwrap = string => string.slice(1, -1);
const isObjectString = string => string.startsWith('{') && string.endsWith('}');
const isArrayString = string => string.startsWith('[') && string.endsWith(']');
const isQuotedString = string => (string.startsWith('\'') && string.endsWith('\'')) || (string.startsWith('"') && string.endsWith('"'));

const error = (token, string, originalString) => {
  throw new Error('Unexpected token \'' + token + '\' at position ' + (originalString.length - string.length - 1) + ' in string: \'' + originalString + '\'');
};

const processToken = (token, string, originalString) => {
  if (token === 'true' || token === 'false') {
    return token === 'true';
  } else if (isQuotedString(token)) {
    return unwrap(token);
  } else if (!isNaN(token)) {
    return +(token);
  } else if (isObjectString(token)) {
    return parseObject(unwrap(token));
  } else if (isArrayString(token)) {
    return parseArray(unwrap(token));
  } else {
    error(token, string, originalString);
  }
};

const nextToken = (string) => {
  string = string.trimLeft();
  let limit = string.length;

  if (string[0] === ':' || string[0] === ',') {

    limit = 1;

  } else if (string[0] === '{' || string[0] === '[') {

    const c = string.charCodeAt(0);
    let nestedObject = 1;
    for (let i = 1; i < string.length; i++) {
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

  } else if (string[0] === '\'' || string[0] === '\"') {

    for (let i = 1; i < string.length; i++) {
      if (string[i] === string[0]) {
        limit = i + 1;
        break;
      }
    }

  } else {

    for (let i = 1; i < string.length; i++) {
      if ([' ', ',', ':'].indexOf(string[i]) !== -1) {
        limit = i;
        break;
      }
    }

  }

  return string.slice(0, limit);
};

const parseObject = (string) => {
  const isValidKey = key => /^[A-Z_\$][A-Z0-9_\$]*$/i.test(key);

  string = string.trim();
  const originalString = string;
  const object = {};
  let readingKey = true, key, previousToken, token;

  while(string.length > 0) {
    previousToken = token;
    token = nextToken(string);
    string = string.slice(token.length, string.length).trimLeft();

    if ((token === ':' && (!readingKey || !previousToken || previousToken === ','))
       || (token === ',' && readingKey)
       || (token !== ':' && token !== ',' && (previousToken && previousToken !== ',' && previousToken !== ':'))) {
      error(token, string, originalString);
    } else if (token === ':' && readingKey && previousToken) {
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

const parseArray = (string) => {
  string = string.trim();
  const originalString = string;
  const array = [];
  let previousToken, token;

  while(string.length > 0) {
    previousToken = token;
    token = nextToken(string);
    string = string.slice(token.length, string.length).trimLeft();

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

const parse = (string) => {
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
