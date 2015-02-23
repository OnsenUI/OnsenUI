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

/**
 * @ngdoc object
 * @name ons.notification
 * @category alert
 * @description 
 *   [en]Utility methods to create different kinds of alert dialogs. There are three methods available: alert, confirm and prompt.[/en]
 *   [ja]いくつかの種類のアラートダイアログを作成するためのユーティリティメソッドを収めたオブジェクトです。[/ja]
 * @example
 * <script>
 *   ons.notification.alert({
 *     message: 'Hello, world!'
 *   });
 *
 *   ons.notification.confirm({
 *     message: 'Are you ready?'
 *     callback: function(answer) {
 *       // Do something here.
 *     }
 *   });
 *
 *   ons.notification.prompt({
 *     message: 'How old are you?',
 *     callback: function(age) {
 *       ons.notification.alert({
 *         message: 'You are ' + age + ' years old.'
 *       });
 *     });
 *   });
 * </script>
 */

/**
 * @ngdoc method
 * @signature alert(options)
 * @param {Object} options
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクトです。[/ja]
 * @param {String} [options.message]
 *   [en]Alert message.[/en]
 *   [ja]アラートダイアログに表示する文字列を指定します。[/ja]
 * @param {String} [options.messageHTML]
 *   [en]Alert message in HTML.[/en]
 *   [ja]アラートダイアログに表示するHTMLを指定します。[/ja]
 * @param {String} [options.buttonLabel]
 *   [en]Label for confirmation button. Default is "OK".[/en]
 *   [ja]確認ボタンのラベルを指定します。"OK"がデフォルトです。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "none", "fade" and "slide".[/en]
 *   [ja]アラートダイアログを表示する際のアニメーション名を指定します。"none", "fade", "slide"のいずれかを指定できます。[/ja]
 * @param {String} [options.title]
 *   [en]Dialog title. Default is "Alert".[/en]
 *   [ja]アラートダイアログの上部に表示するタイトルを指定します。"Alert"がデフォルトです。[/ja]
 * @param {String} [options.modifier]
 *   [en]Modifier for the dialog.[/en]
 *   [ja]アラートダイアログのmodifier属性の値を指定します。[/ja]
 * @param {Function} [options.callback]
 *   [en]Function that executes after dialog has been closed.[/en]
 *   [ja]アラートダイアログが閉じられた時に呼び出される関数オブジェクトを指定します。[/ja]
 * @description 
 *   [en]
 *     Display an alert dialog to show the user a message.
 *     The content of the message can be either simple text or HTML.
 *     Must specify either message or messageHTML.
 *   [/en]
 *   [ja]
 *     ユーザーへメッセージを見せるためのアラートダイアログを表示します。
 *     表示するメッセージは、テキストかもしくはHTMLを指定できます。
 *     このメソッドの引数には、options.messageもしくはoptions.messageHTMLのどちらかを必ず指定する必要があります。
 *   [/ja]
 */

/**
 * @ngdoc method
 * @signature confirm(options)
 * @param {Object} options
 *   [en]Parameter object.[/en]
 * @param {String} [options.message]
 *   [en]Confirmation question.[/en]
 *   [ja]確認ダイアログに表示するメッセージを指定します。[/ja]
 * @param {String} [options.messageHTML]
 *   [en]Dialog content in HTML.[/en]
 *   [ja]確認ダイアログに表示するHTMLを指定します。[/ja]
 * @param {Array} [options.buttonLabels]
 *   [en]Labels for the buttons. Default is ["Cancel", "OK"].[/en]
 *   [ja]ボタンのラベルの配列を指定します。["Cancel", "OK"]がデフォルトです。[/ja]
 * @param {Number} [options.primaryButtonIndex]
 *   [en]Index of primary button. Default is 1.[/en]
 *   [ja]プライマリボタンのインデックスを指定します。デフォルトは 1 です。[/ja]
 * @param {Boolean} [options.cancelable]
 *   [en]Whether the dialog is cancelable or not. Default is false.[/en]
 *   [ja]ダイアログがキャンセル可能かどうかを指定します。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "none", "fade" and "slide".[/en]
 *   [ja]アニメーション名を指定します。"none", "fade", "slide"のいずれかを指定します。[/ja]
 * @param {String} [options.title]
 *   [en]Dialog title. Default is "Confirm".[/en]
 *   [ja]ダイアログのタイトルを指定します。"Confirm"がデフォルトです。[/ja]
 * @param {String} [options.modifier]
 *   [en]Modifier for the dialog.[/en]
 *   [ja]ダイアログのmodifier属性の値を指定します。[/ja]
 * @param {Function} [options.callback]
 *   [en]
 *     Function that executes after the dialog has been closed.
 *     Argument for the function is the index of the button that was pressed or -1 if the dialog was canceled.
 *   [/en]
 *   [ja]
 *     ダイアログが閉じられた後に呼び出される関数オブジェクトを指定します。
 *     この関数の引数として、押されたボタンのインデックス値が渡されます。
 *     もしダイアログがキャンセルされた場合には-1が渡されます。
 *   [/ja]
 * @description 
 *   [en]
 *     Display a dialog to ask the user for confirmation.
 *     The default button labels are "Cancel" and "OK" but they can be customized.
 *     Must specify either message or messageHTML.
 *   [/en]
 *   [ja]
 *     ユーザに確認を促すダイアログを表示します。
 *     デオルとのボタンラベルは、"Cancel"と"OK"ですが、これはこのメソッドの引数でカスタマイズできます。
 *     このメソッドの引数には、options.messageもしくはoptions.messageHTMLのどちらかを必ず指定する必要があります。
 *   [/ja]
 */

/**
 * @ngdoc method
 * @signature prompt(options)
 * @param {Object} options
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクトです。[/ja]
 * @param {String} [options.message]
 *   [en]Prompt question.[/en]
 *   [ja]ダイアログに表示するメッセージを指定します。[/ja]
 * @param {String} [options.messageHTML]
 *   [en]Dialog content in HTML.[/en]
 *   [ja]ダイアログに表示するHTMLを指定します。[/ja]
 * @param {Array} [options.buttonLabels]
 *   [en]Labels for the buttons. Default is "Cancel" and "OK".[/en]
 *   [ja]ボタンのラベルの配列を指定します。デフォルトは ["Cancel", "OK"] です。[/ja]
 * @param {Number} [options.primaryButtonIndex]
 *   [en]Index of primary button. Default is 1.[/en]
 *   [ja]プライマリボタンのインデックスを指定します。デフォルトは 1 です。[/ja]
 * @param {Boolean} [options.cancelable]
 *   [en]Whether the dialog is cancelable or not. Default is false.[/en]
 *   [ja]ダイアログがキャンセル可能かどうかを指定します。デフォルトは false です。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "none", "fade" and "slide".[/en]
 *   [ja]アニメーション名を指定します。"none", "fade", "slide"のいずれかを指定します。[/ja]
 * @param {String} [options.title]
 *   [en]Dialog title. Default is "Alert".[/en]
 *   [ja]ダイアログのタイトルを指定します。デフォルトは "Alert" です。[/ja]
 * @param {String} [options.modifier]
 *   [en]Modifier for the dialog.[/en]
 *   [ja]ダイアログのmodifier属性の値を指定します。[/ja]
 * @param {Function} [options.callback]
 *   [en]
 *     Function that executes after the dialog has been closed.
 *     Argument for the function is the value of the input field or null if the dialog was canceled.
 *   [/en]
 *   [ja]
 *     ダイアログが閉じられた後に実行される関数オブジェクトを指定します。
 *     関数の引数として、インプット要素の中の値が渡されます。ダイアログがキャンセルされた場合には、nullが渡されます。
 *   [/ja]
 * @description 
 *   [en]
 *     Display a dialog with a prompt to ask the user a question. 
 *     Must specify either message or messageHTML.
 *   [/en]
 *   [ja]
 *     ユーザーに入力を促すダイアログを表示します。
 *     このメソッドの引数には、options.messageもしくはoptions.messageHTMLのどちらかを必ず指定する必要があります。
 *   [/ja]
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

    var createButton = function(i) {
      var buttonEl = angular.element('<button>').addClass('alert-dialog-button').text(buttonLabels[i]);
      
      if (i == primaryButtonIndex) {
        buttonEl.addClass('alert-dialog-button--primal');
      }

      if (buttonLabels.length <= 2) {
        buttonEl.addClass('alert-dialog-button--one');
      }

      buttonEl.on('click', function() {
        alertDialog.hide({
          callback: function() {
            if (promptDialog) {
              callback(inputEl.val());
            } else {
              callback(i);
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
    for (var i = 0; i < buttonLabels.length; i++) {
      createButton(i);
    }

    if (cancelable) {
      alertDialog.setCancelable(cancelable);
      alertDialog.on('cancel', function() {
        if(promptDialog) {
          callback(null);
        } else {
          callback(-1);
        }
        setTimeout(function() {
          alertDialog.destroy();
          alertDialog = null;
          inputEl = null;
        });
      });
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
        buttonLabel: 'OK',
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
        [options.buttonLabel],
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

