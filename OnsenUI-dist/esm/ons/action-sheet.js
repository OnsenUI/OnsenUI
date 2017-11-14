import _setImmediate from 'babel-runtime/core-js/set-immediate';
import _extends from 'babel-runtime/helpers/extends';
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

import util from './util';

// Validate parameters
var checkOptions = function checkOptions(options) {
  if (!Object.hasOwnProperty.call(options, 'buttons') || !(options.buttons instanceof Array)) {
    throw new Error('"options.buttons" must be an instance of Array.');
  }
  if (Object.hasOwnProperty.call(options, 'callback') && !(options.callback instanceof Function)) {
    throw new Error('"options.callback" must be an instance of Function.');
  }
  if (Object.hasOwnProperty.call(options, 'compile') && !(options.compile instanceof Function)) {
    throw new Error('"options.compile" must be an instance of Function.');
  }
  if (Object.hasOwnProperty.call(options, 'destroy') && !(options.destroy instanceof Function)) {
    throw new Error('"options.destroy" must be an instance of Function.');
  }
};

// Action Sheet
export default (function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  checkOptions(options);

  // Main component
  var actionSheet = util.createElement('\n    <ons-action-sheet\n      ' + (options.title ? 'title="' + options.title + '"' : '') + '\n      ' + (options.cancelable ? 'cancelable' : '') + '\n      ' + (options.modifier ? 'modifier="' + options.modifier + '"' : '') + '\n      ' + (options.maskColor ? 'mask-color="' + options.maskColor + '"' : '') + '\n      ' + (options.id ? 'id="' + options.id + '"' : '') + '\n      ' + (options.class ? 'class="' + options.class + '"' : '') + '\n    >\n      <div class="action-sheet"></div>\n    </ons-action-sheet>\n  ');

  // Resolve action and clean up
  var deferred = util.defer();
  var resolver = function resolver(event) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

    if (actionSheet) {
      options.destroy && options.destroy(actionSheet);

      actionSheet.removeEventListener('dialog-cancel', resolver, false);
      actionSheet.remove();
      actionSheet = null;

      options.callback && options.callback(index);
      deferred.resolve(index);
    }
  };

  // Link cancel handler
  actionSheet.addEventListener('dialog-cancel', resolver, false);

  // Create buttons and link action handler
  var buttons = document.createDocumentFragment();
  options.buttons.forEach(function (item, index) {
    var buttonOptions = typeof item === 'string' ? { label: item } : _extends({}, item);
    if (options.destructive === index) {
      buttonOptions.modifier = (buttonOptions.modifier || '') + ' destructive';
    }

    var button = util.createElement('\n      <ons-action-sheet-button\n        ' + (buttonOptions.icon ? 'icon="' + buttonOptions.icon + '"' : '') + '\n        ' + (buttonOptions.modifier ? 'modifier="' + buttonOptions.modifier + '"' : '') + '\n      >\n        ' + buttonOptions.label + '\n      </ons-action-sheet-button>\n    ');

    button.onclick = function (event) {
      return actionSheet.hide().then(function () {
        return resolver(event, index);
      });
    };
    buttons.appendChild(button);
  });

  // Finish component and attach
  util.findChild(actionSheet, '.action-sheet').appendChild(buttons);
  document.body.appendChild(actionSheet);
  options.compile && options.compile(el.dialog);

  // Show
  _setImmediate(function () {
    return actionSheet.show({
      animation: options.animation,
      animationOptions: options.animationOptions
    });
  });

  return deferred.promise;
});