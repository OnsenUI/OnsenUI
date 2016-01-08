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

const animationOptionsParser = {};

animationOptionsParser.nextToken = (string) => {
  string = string.trimLeft();
  let limit = string.length;

  if (string[0] === ':' || string[0] === ',') {

    limit = 1;

  } else if (string[0] === '{' || string[0] === '[') {

    let c = string.charCodeAt(0);
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

animationOptionsParser.parseObject = (string, isObjectString, isArrayString, isQuotedString, processToken, error) => {
  const isValidKey = key => /^[A-Z_\$][A-Z0-9_\$]*$/i.test(key);

  string = string.trim();
  let originalString = string, readingKey = true, key, previousToken, token, object = {};

  while(string.length > 0) {
    previousToken = token;
    token = animationOptionsParser.nextToken(string);
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

animationOptionsParser.parseArray = (string, isObjectString, isArrayString, isQuotedString, processToken, error) => {
  string = string.trim();
  let originalString = string, previousToken, token, array = [];

  while(string.length > 0) {
    previousToken = token;
    token = animationOptionsParser.nextToken(string);
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

animationOptionsParser.parse = (string) => {
  let methods;
  const unwrap = string => string.slice(1, -1);
  const error = (token, string, originalString) => { throw new Error('Unexpected token \'' + token + '\' at position ' + (originalString.length - string.length - 1) + ' in string: \'' + originalString + '\''); };
  const isObjectString = string => string.startsWith('{') && string.endsWith('}');
  const isArrayString = string => string.startsWith('[') && string.endsWith(']');
  const isQuotedString = string => (string.startsWith('\'') && string.endsWith('\'')) || (string.startsWith('"') && string.endsWith('"'));
  const processToken = (token, string, originalString) => {
    if (token === 'true' || token === 'false') {
      return token === 'true';
    } else if (isQuotedString(token)) {
      return unwrap(token);
    } else if (!isNaN(token)) {
      return +(token);
    } else if (isObjectString(token)) {
      return animationOptionsParser.parseObject(unwrap(token), ...methods);
    } else if (isArrayString(token)) {
      return animationOptionsParser.parseArray(unwrap(token), ...methods);
    } else {
      error(token, string, originalString);
    }
  };

  methods = [isObjectString, isArrayString, isQuotedString, processToken, error];

  string = string.trim();

  if (isObjectString(string)) {
    return animationOptionsParser.parseObject(unwrap(string), ...methods);
  } else if (isArrayString(string)) {
    return animationOptionsParser.parseArray(unwrap(string), ...methods);
  } else {
    throw new Error('Provided string must be object or array like: ' + string);
  }
};

export default animationOptionsParser;
