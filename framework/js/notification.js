/*
Copyright 2013-2014 ASIAL CORPORATION

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

window.ons.notification = (function() {
  var createAlertDialog = function(title, message, buttonLabels, primaryButtonIndex, modifier, animation, callback, messageIsHTML, cancelable, promptDialog, autofocus, placeholder) {
    var dialogEl = angular.element('<ons-alert-dialog>'),
      titleEl = angular.element('<div>').addClass('alert-dialog-title').text(title),
      messageEl = angular.element('<div>').addClass('alert-dialog-content'),
      footerEl = angular.element('<div>').addClass('alert-dialog-footer'),
      inputEl;

    if (modifier) {
      dialogEl.attr('modifier', modifier);
    }

    dialogEl.attr('animation', animation);

    if (messageIsHTML) {
      messageEl.html(message);
    } else {
      messageEl.text(message);
    }

    dialogEl.append(titleEl).append(messageEl);

    if (promptDialog) {
      inputEl = angular.element('<input>')
        .addClass('text-input')
        .attr('placeholder', placeholder)
        .css({width: '100%', marginTop: '10px'});
      messageEl.append(inputEl);
    }

    dialogEl.append(footerEl);

    angular.element(document.body).append(dialogEl);
    ons.compile(dialogEl[0]);
    var alertDialog = dialogEl.data('ons-alert-dialog');

    if (buttonLabels.length <= 2) {
      footerEl.addClass('alert-dialog-footer--one');
    }

    var createButton = function(buttonLabel, cancel) {
      var buttonEl = angular.element('<button>').addClass('alert-dialog-button').text(buttonLabel);
      
      if (i == primaryButtonIndex) {
        buttonEl.addClass('alert-dialog-button--primal');
      }

      if (buttonLabels.length <= 2) {
        buttonEl.addClass('alert-dialog-button--one');
      }

      buttonEl.on('click', function() {
        alertDialog.hide({
          callback: function() {
             if(cancel !== true){
               if (promptDialog) {
                 callback(inputEl.val());
               } else {
                 callback(i);
               }
             }else{
                callback(false);
             }
            alertDialog.destroy();
            alertDialog = null;
            inputEl = null;
          }
        });
      });
      footerEl.append(buttonEl);
      buttonEl = null;
    };
    
    if (cancelable !== undefined && cancelable !== "" && cancelable !== false){
    	if(cancelable === true){
    		cancelable = "Cancel";
    	}
    	createButton(cancelable, true);
    }
    
    for (var i = 0; i < buttonLabels.length; i++) {
      createButton(buttonLabels[i]);
    }

    alertDialog.show({
      callback: function() {
        if(promptDialog && autofocus) {
          inputEl[0].focus();
        }
      }
    });

    dialogEl = titleEl = messageEl = footerEl = null; 
  };

  return {
    /**
     * @param {Object} options
     * @param {String} [options.message]
     * @param {String} [options.messageHTML]
     * @param {String} [options.buttonLabel]
     * @param {String} [options.animation]
     * @param {String} [options.title]
     * @param {String} [options.modifier]
     * @param {Function} [options.callback]
     */
    alert: function(options) {
      var defaults = {
        buttonLabel: 'OK',
        animation: 'default',
        title: 'Alert',
        callback: function() {}
      };
    
      options = angular.extend({}, defaults, options);
      if (!options.message && !options.messageHTML) {
        throw new Error('Alert dialog must contain a message.');
      }
      createAlertDialog(
        options.title, 
        options.message || options.messageHTML, 
        [options.buttonLabel], 
        0,
        options.modifier,
        options.animation,
        options.callback,
        !options.message ? true : false,
        false, false, false
      );
    },

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
     */
    confirm: function(options) {
      var defaults = {
        buttonLabels: ['Cancel', 'OK'],
        primaryButtonIndex: 1,
        animation: 'default',
        title: 'Confirm',
        callback: function() {},
        cancelable: false
      };

      options = angular.extend({}, defaults, options);
      if (!options.message && !options.messageHTML) {
        throw new Error('Confirm dialog must contain a message.');
      }

      createAlertDialog(
        options.title,
        options.message || options.messageHTML,
        options.buttonLabels,
        options.primaryButtonIndex,
        options.modifier,
        options.animation,
        options.callback,
        !options.message ? true : false,
        options.cancelable,
        false, false
      );
    },

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
     */
    prompt: function(options) {
      var defaults = {
        buttonLabels: ['OK'],
        animation: 'default',
        title: 'Alert',
        placeholder: '',
        callback: function() {},
        cancelable: false,
        autofocus: true,
      };

      options = angular.extend({}, defaults, options);
      if (!options.message && !options.messageHTML) {
        throw new Error('Prompt dialog must contain a message.');
      }
      
      createAlertDialog(
        options.title,
        options.message || options.messageHTML,
        options.buttonLabels,
        0,
        options.modifier,
        options.animation,
        options.callback,
        !options.message ? true : false,
        options.cancelable,
        true,
        options.autofocus,
        options.placeholder
      );
    }
  };
})();

