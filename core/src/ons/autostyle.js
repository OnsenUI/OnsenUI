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

let autoStyleEnabled = true;

// Modifiers
const modifiersMap = {
  'quiet': 'material-flat',
  'light': 'material-flat',
  'outline': 'material-flat',
  'cta': '',
  'large-quiet': 'material-flat large',
  'large-cta': 'large',
  'noborder': '',
  'tappable': ''
};

const platforms = {};

platforms.android = element => {

  const elementName = element.tagName.toLowerCase();

  if (!/ons-speed-dial/.test(elementName) &&
    !/material/.test(element.getAttribute('modifier'))) {

    const oldModifier = element.getAttribute('modifier') || '';

    const newModifier = oldModifier.trim().split(/\s+/).map(e => modifiersMap.hasOwnProperty(e) ? modifiersMap[e] : e);
    newModifier.unshift('material');

    element.setAttribute('modifier', newModifier.join(' ').trim());
  }

  const elements = [
    'ons-alert-dialog-button',
    'ons-toolbar-button',
    'ons-back-button',
    'ons-button',
    'ons-list-item',
    'ons-fab',
    'ons-speed-dial',
    'ons-speed-dial-item',
    'ons-tab'
  ];


  // Effects
  if (elements.indexOf(elementName) !== -1
    && !element.hasAttribute('ripple')
    && !element.querySelector('ons-ripple')) {

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

platforms.ios = element => {

 // Modifiers
 if (/material/.test(element.getAttribute('modifier'))) {
   util.removeModifier(element, 'material');

   if (util.removeModifier(element, 'material-flat')) {
     util.addModifier(element, (util.removeModifier(element, 'large')) ? 'large-quiet' : 'quiet');
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

const unlocked = {
  android: true
};

const prepareAutoStyle = (element, force) => {
  if (autoStyleEnabled && !element.hasAttribute('disable-auto-styling')) {
    const mobileOS = onsPlatform.getMobileOS();
    if (platforms.hasOwnProperty(mobileOS) && (unlocked.hasOwnProperty(mobileOS) || force)) {
      platforms[mobileOS](element);
    }
  }
};

/**
 * @param {Element} element
 * @param {Object} object
 */
const caseOf = (element, object) => {
  if (autoStyleEnabled && !element.hasAttribute('disable-auto-styling')) {
    const mobileOS = onsPlatform.getMobileOS();
    if (object.hasOwnProperty(mobileOS) && unlocked.hasOwnProperty(mobileOS)) {
      return object[mobileOS];
    }
  }

  return object['default'];
}

const mapModifier = (modifier, element, force) => {
  if (autoStyleEnabled && !element.hasAttribute('disable-auto-styling')) {
    const mobileOS = onsPlatform.getMobileOS();
    if (platforms.hasOwnProperty(mobileOS) && (unlocked.hasOwnProperty(mobileOS) || force)) {
      return modifiersMap.hasOwnProperty(modifier) ? modifiersMap[modifier] : modifier;
    }
  }

  return modifier;
};

export default {
  isEnabled: () => autoStyleEnabled,
  enable: () => autoStyleEnabled = true,
  disable: () => autoStyleEnabled = false,
  prepare: prepareAutoStyle,
  mapModifier,
  caseOf
};
