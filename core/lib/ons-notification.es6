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

  const util = ons._util;

  ons.notification = {};

  ons.notification._createAlertDialog = function(title, message,
    buttonLabels, primaryButtonIndex, modifier, animation, callback,
    messageIsHTML, cancelable, promptDialog, autofocus, placeholder,
    submitOnEnter, compile) {

    compile = compile || ((object) => object);

    let dialogElement = util.createElement('<ons-alert-dialog></ons-alert-dialog>');
    let titleElement = util.createElement('<div class="alert-dialog-title"></div>');
    let messageElement = util.createElement('<div class="alert-dialog-content"></div>');
    let footerElement = util.createElement('<div class="alert-dialog-footer"></div>');
    let inputElement;

    if (modifier) {
      dialogElement.setAttribute('modifier', modifier);
    }

    dialogElement.setAttribute('animation', animation);

    if (messageIsHTML) {
      messageElement.innerHTML = message;
    } else {
      messageElement.textContent = message;
    }

    dialogElement.appendChild(titleElement);
    dialogElement.appendChild(messageElement);

    if (promptDialog) {
      inputElement = util.createElement('<input class="text-input" type="text"></input>');
      inputElement.setAttribute('placeholder', placeholder);
      inputElement.style.width = '100%';
      inputElement.style.marginTop = '10px';

      messageElement.appendChild(inputElement);

      if (submitOnEnter) {
        inputElement.addEventListener('keypress', function(event) {
          if (event.keyCode === 13) {
            dialogElement.hide({
              callback: function() {
                callback(inputElement.value);
                dialogElement.destroy();
                dialogElement = null;
              }
            });
          }
        }, false);
      }
    }

    dialogElement.appendChild(footerElement);

    document.body.appendChild(dialogElement);

    compile(dialogElement);

    if (buttonLabels.length <= 2) {
      footerElement.classList.add('alert-dialog-footer--one');
    }

    const createButton = function(i) {
      let buttonElement = util.createElement('<button class="alert-dialog-button"></button>');
      buttonElement.textContent = buttonLabels[i];

      if (i == primaryButtonIndex) {
        buttonElement.classList.add('alert-dialog-button--primal');
      }

      if (buttonLabels.length <= 2) {
        buttonElement.classList.add('alert-dialog-button--one');
      }

      const onClick = function() {
        buttonElement.removeEventListener('click', onClick, false);

        dialogElement.hide({
          callback: function() {
            if (promptDialog) {
              callback(inputElement.value);
            } else {
              callback(i);
            }
            dialogElement.destroy();
            dialogElement = inputElement = buttonElement = null;
          }
        });
      };

      buttonElement.addEventListener('click', onClick, false);
      footerElement.appendChild(buttonElement);
    };

    for (var i = 0; i < buttonLabels.length; i++) {
      createButton(i);
    }

    if (cancelable) {
      dialogElement.setCancelable(cancelable);
      dialogElement.addEventListener('cancel', function() {
        if (promptDialog) {
          callback(null);
        } else {
          callback(-1);
        }
        setTimeout(function() {
          dialogElement.destroy();
          dialogElement = null;
          inputElement = null;
        });
      }, false);
    }

    dialogElement.show({
      callback: function() {
        if (inputElement && promptDialog && autofocus) {
          inputElement.focus();
        }
      }
    });

    titleElement = messageElement = footerElement = null;

    return Promise.resolve(dialogElement);
  };

  ons.notification._alertOriginal = function(options) {
    var defaults = {
      buttonLabel: 'OK',
      animation: 'default',
      title: 'Alert',
      callback: function() {}
    };

    options = util.extend({}, defaults, options);
    if (!options.message && !options.messageHTML) {
      throw new Error('Alert dialog must contain a message.');
    }

    return ons.notification._createAlertDialog(
      options.title,
      options.message || options.messageHTML,
      [options.buttonLabel],
      0,
      options.modifier,
      options.animation,
      options.callback,
      !options.message ? true : false,
      false, false, false,
      options.compile
    );
  };

  /**
   * @param {Object} options
   * @param {String} [options.message]
   * @param {String} [options.messageHTML]
   * @param {String} [options.buttonLabel]
   * @param {String} [options.animation]
   * @param {String} [options.title]
   * @param {String} [options.modifier]
   * @param {Function} [options.callback]
   * @param {Function} [options.compile]
   * @return {Promise}
   */
  ons.notification.alert = ons.notification._alertOriginal;

  ons.notification._confirmOriginal = function(options) {
    var defaults = {
      buttonLabels: ['Cancel', 'OK'],
      primaryButtonIndex: 1,
      animation: 'default',
      title: 'Confirm',
      callback: function() {},
      cancelable: false
    };

    options = util.extend({}, defaults, options);

    if (!options.message && !options.messageHTML) {
      throw new Error('Confirm dialog must contain a message.');
    }

    return ons.notification._createAlertDialog(
      options.title,
      options.message || options.messageHTML,
      options.buttonLabels,
      options.primaryButtonIndex,
      options.modifier,
      options.animation,
      options.callback,
      !options.message ? true : false,
      options.cancelable,
      false, false,
      options.compile
    );
  };

  /**
   * @param {Object} options
   * @param {String} [options.message]
   * @param {String} [options.messageHTML]
   * @param {Array} [options.buttonLabels]
   * @param {Number} [options.primaryButtonIndex]
   * @param {Boolean} [options.cancelable]
   * @param {String} [options.animation]
   * @param {String} [options.title]
   * @param {String} [options.modifier]
   * @param {Function} [options.callback]
   * @param {Function} [options.compile]
   * @return {Promise}
   */
  ons.notification.confirm = ons.notification._confirmOriginal;

  ons.notification._promptOriginal = function(options) {
    var defaults = {
      buttonLabel: 'OK',
      animation: 'default',
      title: 'Alert',
      placeholder: '',
      callback: function() {},
      cancelable: false,
      autofocus: true,
      submitOnEnter: true
    };

    options = util.extend({}, defaults, options);
    if (!options.message && !options.messageHTML) {
      throw new Error('Prompt dialog must contain a message.');
    }

    return ons.notification._createAlertDialog(
      options.title,
      options.message || options.messageHTML,
      [options.buttonLabel],
      0,
      options.modifier,
      options.animation,
      options.callback,
      !options.message ? true : false,
      options.cancelable,
      true,
      options.autofocus,
      options.placeholder,
      options.submitOnEnter,
      options.compile
    );
  };

  /**
   * @param {Object} options
   * @param {String} [options.message]
   * @param {String} [options.messageHTML]
   * @param {String} [options.buttonLabel]
   * @param {Boolean} [options.cancelable]
   * @param {String} [options.animation]
   * @param {String} [options.placeholder]
   * @param {String} [options.title]
   * @param {String} [options.modifier]
   * @param {Function} [options.callback]
   * @param {Boolean} [options.autofocus]
   * @param {Function} [options.compile]
   * @return {Promise}
   */
  ons.notification.prompt = ons.notification._promptOriginal;

})(window.ons = window.ons || {});
