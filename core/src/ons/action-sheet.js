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

const checkOptions = options => {
  if (!Object.hasOwnProperty.call(options, 'buttons') || !(options.buttons instanceof Array)) {
    throw new Error('"options.buttons" must be an instance of Array.')
  }
  if (Object.hasOwnProperty.call(options, 'callback') && !(options.callback instanceof Function)) {
    throw new Error('"options.callback" must be an instance of Function.')
  }
  if (Object.hasOwnProperty.call(options, 'compile') && !(options.compile instanceof Function)) {
    throw new Error('"options.compile" must be an instance of Function.')
  }
  if (Object.hasOwnProperty.call(options, 'destroy') && !(options.destroy instanceof Function)) {
    throw new Error('"options.destroy" must be an instance of Function.')
  }
};

/**
 * @method actionSheet
 * @signature actionSheet(options)
 * @return {Promise}
 *   [en]Will resolve when the action sheet is closed. The resolve value is either the index of the tapped button or -1 when canceled.[/en]
 *   [ja][/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {array} [options.buttons]
 *   [en]Represent each button of the action sheet following the specified order. Every item can be either a string label or an object containing `label`, `icon` and `modifier` properties.[/en]
 *   [ja][/ja]
 * @param {string} [options.title]
 *   [en]Optional title for the action sheet.[/en]
 *   [ja][/ja]
 * @param {number} [options.destructive]
 *   [en]Optional index of the "destructive" button (only for iOS). It can be specified in the button array as well.[/en]
 *   [ja][/ja]
 * @param {boolean} [options.cancelable]
 *   [en]Whether the action sheet can be canceled by tapping on the background mask or not.[/en]
 *   [ja][/ja]
 * @param {string} [options.modifier]
 *   [en]Modifier attribute of the action sheet. E.g. `'destructive'`.[/en]
 *   [ja][/ja]
 * @param {string} [options.maskColor]
 *   [en]Optionally change the background mask color.[/en]
 *   [ja][/ja]
 * @param {id} [options.id]
 *   [en]The element's id attribute.[/en]
 *   [ja][/ja]
 * @param {class} [options.class]
 *   [en]The element's class attribute.[/en]
 *   [ja][/ja]
 * @description
 *   [en]Shows an instant Action Sheet and lets the user choose an action.[/en]
 *   [ja][/ja]
 */

export default (options) => {
  checkOptions(options);

  // Main component
  let actionSheet = util.createElement(`
    <ons-action-sheet
      ${options.title ? `title="${options.title}"` : ''}
      ${options.cancelable ? 'cancelable' : ''}
      ${options.modifier ? `modifier="${options.modifier}"` : ''}
      ${options.maskColor ? `mask-color="${options.maskColor}"` : ''}
      ${options.id ? `id="${options.id}"` : ''}
      ${options.class ? `class="${options.class}"` : ''}
    >
      <div class="action-sheet"></div>
    </ons-action-sheet>
  `);

  // Resolve action and clean up
  const deferred = util.defer();
  const resolver = (event, index = -1) => {
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
  const buttons = document.createDocumentFragment();
  options.buttons.forEach((item, index) => {
    const buttonOptions = (typeof item === 'string') ? { label: item } : { ...item };
    if (options.destructive === index) {
      buttonOptions.modifier = (buttonOptions.modifier || '') + ' destructive';
    }

    const button = util.createElement(`
      <ons-action-sheet-button
        ${buttonOptions.icon ? `icon="${buttonOptions.icon}"` : ''}
        ${buttonOptions.modifier ? `modifier="${buttonOptions.modifier}"` : ''}
      >
        ${buttonOptions.label}
      </ons-action-sheet-button>
    `);

    button.onclick = event => actionSheet.hide().then(() => resolver(event, index));
    buttons.appendChild(button);
  });

  // Finish component and attach
  util.findChild(actionSheet, '.action-sheet').appendChild(buttons);
  document.body.appendChild(actionSheet);
  options.compile && options.compile(el.dialog);

  // Show
  setImmediate(() => actionSheet.show({
    animation: options.animation,
    animationOptions: options.animationOptions
  }));

  return deferred.promise;
};
