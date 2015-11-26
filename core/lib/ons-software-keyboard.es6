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

((ons) => {
  'use strict';

  ons.softwareKeyboard = new MicroEvent();
  ons.softwareKeyboard._visible = false;

  const onShow = () => {
    ons.softwareKeyboard._visible = true;
    ons.softwareKeyboard.emit('show');
  };

  const onHide = () => {
    ons.softwareKeyboard._visible = false;
    ons.softwareKeyboard.emit('hide');
  };

  const bindEvents = () => {
    if (typeof Keyboard !== 'undefined') {
      // https://github.com/martinmose/cordova-keyboard/blob/95f3da3a38d8f8e1fa41fbf40145352c13535a00/README.md
      Keyboard.onshow = onShow;
      Keyboard.onhide = onHide;
      ons.softwareKeyboard.emit('init', {visible: Keyboard.isVisible});

      return true;
    } else if (typeof cordova.plugins !== 'undefined' && typeof cordova.plugins.Keyboard !== 'undefined') {
      // https://github.com/driftyco/ionic-plugins-keyboard/blob/ca27ecf/README.md
      window.addEventListener('native.keyboardshow', onShow);
      window.addEventListener('native.keyboardhide', onHide);
      ons.softwareKeyboard.emit('init', {visible: cordova.plugins.Keyboard.isVisible});

      return true;
    }

    return false;
  };

  const noPluginError = () => {
    console.warn('ons-keyboard: Cordova Keyboard plugin is not present.');
  };

  document.addEventListener('deviceready', () => {
    if (!bindEvents()) {
      if (document.querySelector('[ons-keyboard-active]') ||
        document.querySelector('[ons-keyboard-inactive]')) {
        noPluginError();
      }

      ons.softwareKeyboard.on = noPluginError;
    }
  });
})(window.ons = window.ons || {});

