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

import util from './util.js';

// Validate parameters
const checkOptions = options => {
  const err = (prop, type = 'Function') => util.throw(`"options.${prop}" must be an instance of ${type}`);
  const hasOwnProperty = prop => Object.hasOwnProperty.call(options, prop);
  const instanceOf = (prop, type = Function) => options[prop] instanceof type;

  const b = 'buttons', cb = 'callback', c = 'compile', d = 'destroy';
  (!hasOwnProperty(b) || !instanceOf(b, Array)) && err(b, 'Array');
  (hasOwnProperty(cb) && !instanceOf(cb)) && err(cb);
  (hasOwnProperty(c) && !instanceOf(c)) && err(c);
  (hasOwnProperty(d) && !instanceOf(d)) && err(d);
};

// Action Sheet
export default (options = {}) => new Promise(resolve => {
  util.checkMissingImport('ActionSheet');
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
  const finish = (event, index = -1) => {
    if (actionSheet) {
      options.destroy && options.destroy(actionSheet);

      actionSheet.removeEventListener('dialogcancel', finish, false);
      actionSheet.remove();
      actionSheet = null;

      options.callback && options.callback(index);
      resolve(index);
    }
  };

  // Link cancel handler
  actionSheet.addEventListener('dialogcancel', finish, false);

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

    button.onclick = event => actionSheet.hide().then(() => finish(event, index));
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
});
