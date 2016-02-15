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

/**
 * @object ons.notification
 * @category dialog
 * @codepen Qwwxyp
 * @description
 *   [en]Utility methods to create different kinds of alert dialogs. There are three methods available: alert, confirm and prompt.[/en]
 *   [ja]いくつかの種類のアラートダイアログを作成するためのユーティリティメソッドを収めたオブジェクトです。[/ja]
 * @example
 * <script>
 *   ons.notification.alert({
 *     message: 'Hello, world!'
 *   });
 *
 *   // Show a Material Design alert dialog.
 *   ons.notification.alert({
 *    message: 'Hello, world!',
 *    modifier: 'material'
 *   });
 *
 *   ons.notification.confirm({
 *     message: 'Are you ready?',
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
const notification = {};

notification._createAlertDialog = function(title, message,
  buttonLabels, primaryButtonIndex, modifier, animation, id, callback,
  messageIsHTML, cancelable, promptDialog, autofocus, placeholder,
  defaultValue, submitOnEnter, compile) {

  compile = compile || function(object) { return object; };

  const titleElementHTML = typeof title === 'string' ? '<div class="alert-dialog-title"></div>' : '';


  let dialogElement = util.createElement(`
  <ons-alert-dialog>
    ${titleElementHTML}
    <div class="alert-dialog-content"></div>
    <div class="alert-dialog-footer"></div>
  </ons-alert-dialog>`);

  if (id) {
    dialogElement.setAttribute('id', id);
  }

  let titleElement = dialogElement.querySelector('.alert-dialog-title');
  let messageElement = dialogElement.querySelector('.alert-dialog-content');
  let footerElement = dialogElement.querySelector('.alert-dialog-footer');
  let inputElement, result = {};

  result.promise = new Promise((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });

  if (typeof title === 'string') {
    titleElement.textContent = title;
  }

  titleElement = null;

  dialogElement.setAttribute('animation', animation);

  if (messageIsHTML) {
    messageElement.innerHTML = message;
  } else {
    messageElement.textContent = message;
  }

  if (promptDialog) {
    inputElement = util.createElement('<input class="text-input" type="text"></input>');

    if (modifier) {
      inputElement.classList.add(`text-input--${modifier}`);
    }

    inputElement.setAttribute('placeholder', placeholder);
    inputElement.value = defaultValue;
    inputElement.style.width = '100%';
    inputElement.style.marginTop = '10px';

    messageElement.appendChild(inputElement);

    if (submitOnEnter) {
      inputElement.addEventListener('keypress', function(event) {
        if (event.keyCode === 13) {
          dialogElement.hide({
            callback: function() {
              callback(inputElement.value);
              result.resolve(inputElement.value);
              dialogElement.destroy();
              dialogElement = null;
            }
          });
        }
      }, false);
    }
  }

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
            result.resolve(inputElement.value);
          } else {
            callback(i);
            result.resolve(i);
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
        result.reject(null);
      } else {
        callback(-1);
        result.reject(-1);
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

  messageElement = footerElement = null;

  if (modifier) {
    dialogElement.setAttribute('modifier', modifier);
  }

  return result.promise;
};

notification._alertOriginal = function(options) {
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

  return notification._createAlertDialog(
    options.title,
    options.message || options.messageHTML,
    [options.buttonLabel],
    0,
    options.modifier,
    options.animation,
    options.id,
    options.callback,
    !options.message ? true : false,
    false, false, false, '', '', false,
    options.compile
  );
};

/**
 * @method alert(options)
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
 * @param {String} [options.id]
 *   [en]ons-alert-dialog element's ID.[/en]
 *   [ja]ons-alert-dialog要素のID。[/ja]
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
notification.alert = notification._alertOriginal;

notification._confirmOriginal = function(options) {
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

  return notification._createAlertDialog(
    options.title,
    options.message || options.messageHTML,
    options.buttonLabels,
    options.primaryButtonIndex,
    options.modifier,
    options.animation,
    options.id,
    options.callback,
    !options.message ? true : false,
    options.cancelable,
    false, false, '', '', false,
    options.compile
  );
};

/**
 * @method confirm
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
 * @param {String} [options.id]
 *   [en]ons-alert-dialog element's ID.[/en]
 *   [ja]ons-alert-dialog要素のID。[/ja]
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
notification.confirm = notification._confirmOriginal;

notification._promptOriginal = function(options) {
  var defaults = {
    buttonLabel: 'OK',
    animation: 'default',
    title: 'Alert',
    defaultValue: '',
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

  return notification._createAlertDialog(
    options.title,
    options.message || options.messageHTML,
    [options.buttonLabel],
    0,
    options.modifier,
    options.animation,
    options.id,
    options.callback,
    !options.message ? true : false,
    options.cancelable,
    true,
    options.autofocus,
    options.placeholder,
    options.defaultValue,
    options.submitOnEnter,
    options.compile
  );
};

/**
 * @method prompt
 * @signature prompt(options)
 * @return {Promise}
 * @param {Object} options
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクトです。[/ja]
 * @param {String} [options.message]
 *   [en]Prompt question.[/en]
 *   [ja]ダイアログに表示するメッセージを指定します。[/ja]
 * @param {String} [options.messageHTML]
 *   [en]Dialog content in HTML.[/en]
 *   [ja]ダイアログに表示するHTMLを指定します。[/ja]
 * @param {String} [options.buttonLabel]
 *   [en]Label for confirmation button. Default is "OK".[/en]
 *   [ja]確認ボタンのラベルを指定します。"OK"がデフォルトです。[/ja]
 * @param {Number} [options.primaryButtonIndex]
 *   [en]Index of primary button. Default is 1.[/en]
 *   [ja]プライマリボタンのインデックスを指定します。デフォルトは 1 です。[/ja]
 * @param {Boolean} [options.cancelable]
 *   [en]Whether the dialog is cancelable or not. Default is false.[/en]
 *   [ja]ダイアログがキャンセル可能かどうかを指定します。デフォルトは false です。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "none", "fade" and "slide".[/en]
 *   [ja]アニメーション名を指定します。"none", "fade", "slide"のいずれかを指定します。[/ja]
 * @param {String} [options.id]
 *   [en]ons-alert-dialog element's ID.[/en]
 *   [ja]ons-alert-dialog要素のID。[/ja]
 * @param {String} [options.title]
 *   [en]Dialog title. Default is "Alert".[/en]
 *   [ja]ダイアログのタイトルを指定します。デフォルトは "Alert" です。[/ja]
 * @param {String} [options.placeholder]
 *   [en]Placeholder for the text input.[/en]
 *   [ja]テキスト欄のプレースホルダに表示するテキストを指定します。[/ja]
 * @param {String} [options.defaultValue]
 *   [en]Default value for the text input.[/en]
 *   [ja]テキスト欄のデフォルトの値を指定します。[/ja]
 * @param {Boolean} [options.autofocus]
 *   [en]Autofocus the input element. Default is true.[/en]
 *   [ja]input要素に自動的にフォーカスするかどうかを指定します。デフォルトはtrueです。[/ja]
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
 * @param {Boolean} [options.submitOnEnter]
 *   [en]Submit automatically when enter is pressed. Default is "true".[/en]
 *   [ja]Enterが押された際にそのformをsubmitするかどうかを指定します。デフォルトはtrueです。[/ja]
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
notification.prompt = notification._promptOriginal;

export default notification;
