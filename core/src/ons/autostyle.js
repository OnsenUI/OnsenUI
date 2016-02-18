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

const modifiersMap = {
  'quiet': 'material--flat',
  'light': 'material--flat',
  'outline': 'material--flat',
  'cta': '',
  'large--quiet': 'material--flat large',
  'large--cta': 'large',
  'noborder': '',
  'chevron': '',
  'tappable': ''
};

const platforms = {};

platforms.android = element => {

  // Modifiers
  if (!/ons-fab|ons-speed-dial|ons-progress/.test(element.tagName.toLowerCase()) &&
    !/material/.test(element.getAttribute('modifier'))) {

    const oldModifier = element.getAttribute('modifier') || '';
    element.setAttribute('modifier', '');

    let newModifier = oldModifier.trim().split(/\s+/).map(e => modifiersMap.hasOwnProperty(e) ? modifiersMap[e] : e);
    newModifier.unshift('material');

    element.setAttribute('modifier', newModifier.join(' ').trim());
  }

  // Effects
  if (/ons-button|ons-list-item|ons-fab|ons-speed-dial-item|ons-tab$/.test(element.tagName.toLowerCase())
    && !element.hasAttribute('ripple')
    && !util.findChild(element, 'ons-ripple')) {

    if (element.tagName.toLowerCase() === 'ons-list-item') {
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

    if (util.removeModifier(element, 'material--flat')) {
      util.addModifier(element, (util.removeModifier(element, 'large')) ? 'large--quiet' : 'quiet');
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

const prepareAutoStyle = element => {
  if (autoStyleEnabled && !element.hasAttribute('disable-auto-styling')) {
    let mobileOS = onsPlatform.getMobileOS();
    if (platforms.hasOwnProperty(mobileOS)) {
      platforms[mobileOS](element);
    }
  }
};

export default {
  isEnabled: () => autoStyleEnabled,
  enable: () => autoStyleEnabled = true,
  disable: () => autoStyleEnabled = false,
  prepare: prepareAutoStyle
};
