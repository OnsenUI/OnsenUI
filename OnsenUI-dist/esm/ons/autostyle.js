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

import onsPlatform from './platform';
import util from './util';

var autoStyleEnabled = true;

// Modifiers
var modifiersMap = {
  'quiet': 'material--flat',
  'light': 'material--flat',
  'outline': 'material--flat',
  'cta': '',
  'large--quiet': 'material--flat large',
  'large--cta': 'large',
  'noborder': '',
  'tappable': ''
};

var platforms = {};

platforms.android = function (element) {

  var elementName = element.tagName.toLowerCase();

  if (!util.hasModifier(element, 'material')) {
    var oldModifier = element.getAttribute('modifier') || '';

    var newModifier = oldModifier.trim().split(/\s+/).map(function (e) {
      return modifiersMap.hasOwnProperty(e) ? modifiersMap[e] : e;
    });
    newModifier.unshift('material');

    element.setAttribute('modifier', newModifier.join(' ').trim());
  }

  var elements = ['ons-alert-dialog-button', 'ons-toolbar-button', 'ons-back-button', 'ons-button', 'ons-list-item', 'ons-fab', 'ons-speed-dial', 'ons-speed-dial-item', 'ons-tab'];

  // Effects
  if (elements.indexOf(elementName) !== -1 && !element.hasAttribute('ripple') && !element.querySelector('ons-ripple')) {

    if (elementName === 'ons-list-item') {
      if (element.hasAttribute('tappable')) {
        element.setAttribute('ripple', '');
        element.removeAttribute('tappable');
      }
    } else {
      element.setAttribute('ripple', '');
    }
  }
};

platforms.ios = function (element) {

  // Modifiers
  if (util.removeModifier(element, 'material')) {
    if (util.removeModifier(element, 'material--flat')) {
      util.addModifier(element, util.removeModifier(element, 'large') ? 'large--quiet' : 'quiet');
    }

    if (!element.getAttribute('modifier')) {
      element.removeAttribute('modifier');
    }
  }

  // Effects
  if (element.hasAttribute('ripple')) {
    if (element.tagName.toLowerCase() === 'ons-list-item') {
      element.setAttribute('tappable', '');
    }

    element.removeAttribute('ripple');
  }
};

var unlocked = {
  android: true
};

var getPlatform = function getPlatform(element, force) {
  if (autoStyleEnabled && !element.hasAttribute('disable-auto-styling')) {
    var mobileOS = onsPlatform.getMobileOS();
    if (platforms.hasOwnProperty(mobileOS) && (unlocked.hasOwnProperty(mobileOS) || force)) {
      return mobileOS;
    }
  }
  return null;
};

var prepare = function prepare(element, force) {
  var p = getPlatform(element, force);
  p && platforms[p](element);
};

var mapModifier = function mapModifier(modifier, element, force) {
  if (getPlatform(element, force)) {
    return modifier.split(/\s+/).map(function (m) {
      return modifiersMap.hasOwnProperty(m) ? modifiersMap[m] : m;
    }).join(' ');
  }
  return modifier;
};

var restoreModifier = function restoreModifier(element) {
  if (getPlatform(element) === 'android') {
    var modifier = element.getAttribute('modifier') || '';
    var newModifier = mapModifier(modifier, element);

    if (!/(^|\s+)material($|\s+)/i.test(modifier)) {
      newModifier = 'material ' + newModifier;
    }

    if (newModifier !== modifier) {
      element.setAttribute('modifier', newModifier.trim());
      return true;
    }
  }
  return false;
};

export default {
  isEnabled: function isEnabled() {
    return autoStyleEnabled;
  },
  enable: function enable() {
    return autoStyleEnabled = true;
  },
  disable: function disable() {
    return autoStyleEnabled = false;
  },
  prepare: prepare,
  mapModifier: mapModifier,
  getPlatform: getPlatform,
  restoreModifier: restoreModifier
};