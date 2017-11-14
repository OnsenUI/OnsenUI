import _extends from 'babel-runtime/helpers/extends';
import _setImmediate from 'babel-runtime/core-js/set-immediate';
import _Object$keys from 'babel-runtime/core-js/object/keys';
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
import contentReady from './content-ready';
import ToastQueue from './internal/toast-queue';

var _setAttributes = function _setAttributes(element, options) {
  ['id', 'class', 'animation'].forEach(function (a) {
    return options.hasOwnProperty(a) && element.setAttribute(a, options[a]);
  });

  if (options.modifier) {
    util.addModifier(element, options.modifier);
  }
};

/**
 * @object ons.notification
 * @category dialog
 * @tutorial vanilla/Reference/dialog
 * @description
 *   [en]
 *     Utility methods to create different kinds of notifications. There are three methods available:
 *
 *     * `ons.notification.alert()`
 *     * `ons.notification.confirm()`
 *     * `ons.notification.prompt()`
 *     * `ons.notification.toast()`
 *
 *     It will automatically display a Material Design dialog on Android devices.
 *   [/en]
 *   [ja]いくつかの種類のアラートダイアログを作成するためのユーティリティメソッドを収めたオブジェクトです。[/ja]
 * @example
 * ons.notification.alert('Hello, world!');
 *
 * ons.notification.confirm('Are you ready?')
 *   .then(
 *     function(answer) {
 *       if (answer === 1) {
 *         ons.notification.alert('Let\'s go!');
 *       }
 *     }
 *   );
 *
 * ons.notification.prompt('How old are ?')
 *   .then(
 *     function(age) {
 *       ons.notification.alert('You are ' + age + ' years old.');
 *     }
 *   );
 */
var notification = {};

notification._createAlertDialog = function (options) {
  // Prompt input string
  var inputString = '';
  if (options.isPrompt) {
    inputString = '\n      <input\n        class="text-input text-input--underbar"\n        type="' + (options.inputType || 'text') + '"\n        placeholder="' + (options.placeholder || '') + '"\n        value="' + (options.defaultValue || '') + '"\n        style="width: 100%; margin-top: 10px;"\n      />\n    ';
  }

  // Buttons string
  var buttons = '';
  options.buttonLabels.forEach(function (label, index) {
    buttons += '\n      <ons-alert-dialog-button\n        class="\n          ' + (index === options.primaryButtonIndex ? ' alert-dialog-button--primal' : '') + '\n          ' + (options.buttonLabels.length <= 2 ? ' alert-dialog-button--rowfooter' : '') + '\n        " \n        style="position: relative;">\n        ' + label + '\n      </ons-alert-dialog-button>\n    ';
  });

  // Dialog Element
  var el = {};
  var _destroyDialog = function _destroyDialog() {
    if (el.dialog.onDialogCancel) {
      el.dialog.removeEventListener('dialog-cancel', el.dialog.onDialogCancel);
    }

    _Object$keys(el).forEach(function (key) {
      return delete el[key];
    });
    el = null;

    if (options.destroy instanceof Function) {
      options.destroy();
    }
  };

  el.dialog = document.createElement('ons-alert-dialog');
  el.dialog.innerHTML = '\n    <div class="alert-dialog-mask"></div>\n    <div class="alert-dialog">\n      <div class="alert-dialog-container">\n        <div class="alert-dialog-title">\n          ' + (options.title || '') + '\n        </div>\n        <div class="alert-dialog-content">\n          ' + (options.message || options.messageHTML) + '\n          ' + inputString + '\n        </div>\n        <div class="\n          alert-dialog-footer\n          ' + (options.buttonLabels.length <= 2 ? ' alert-dialog-footer--rowfooter' : '') + '\n        ">\n          ' + buttons + '\n        </div>\n      </div>\n    </div>\n  ';
  contentReady(el.dialog);

  // Set attributes
  _setAttributes(el.dialog, options);

  var deferred = util.defer();

  // Prompt events
  if (options.isPrompt && options.submitOnEnter) {
    el.input = el.dialog.querySelector('.text-input');
    el.input.onkeypress = function (event) {
      if (event.keyCode === 13) {
        el.dialog.hide().then(function () {
          if (el) {
            var resolveValue = el.input.value;
            _destroyDialog();
            options.callback(resolveValue);
            deferred.resolve(resolveValue);
          }
        });
      }
    };
  }

  // Button events
  el.footer = el.dialog.querySelector('.alert-dialog-footer');
  util.arrayFrom(el.dialog.querySelectorAll('.alert-dialog-button')).forEach(function (buttonElement, index) {
    buttonElement.onclick = function () {
      el.dialog.hide().then(function () {
        if (el) {
          var resolveValue = index;
          if (options.isPrompt) {
            resolveValue = index === options.primaryButtonIndex ? el.input.value : null;
          }
          el.dialog.remove();
          _destroyDialog();
          options.callback(resolveValue);
          deferred.resolve(resolveValue);
        }
      });
    };

    el.footer.appendChild(buttonElement);
  });

  // Cancel events
  if (options.cancelable) {
    el.dialog.cancelable = true;
    el.dialog.onDialogCancel = function () {
      _setImmediate(function () {
        el.dialog.remove();
        _destroyDialog();
      });
      var resolveValue = options.isPrompt ? null : -1;
      options.callback(resolveValue);
      deferred.resolve(resolveValue);
    };
    el.dialog.addEventListener('dialog-cancel', el.dialog.onDialogCancel, false);
  }

  // Show dialog
  document.body.appendChild(el.dialog);
  options.compile(el.dialog);
  _setImmediate(function () {
    el.dialog.show().then(function () {
      if (el.input && options.isPrompt && options.autofocus) {
        el.input.focus();
      }
    });
  });

  return deferred.promise;
};

var _normalizeArguments = function _normalizeArguments(message) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var defaults = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  options = _extends({}, options);
  typeof message === 'string' ? options.message = message : options = message;
  if (!options.message && !options.messageHTML) {
    throw new Error('Notifications must contain a message.');
  }

  if (options.hasOwnProperty('buttonLabels') || options.hasOwnProperty('buttonLabel')) {
    options.buttonLabels = options.buttonLabels || options.buttonLabel;
    if (!Array.isArray(options.buttonLabels)) {
      options.buttonLabels = [options.buttonLabels || ''];
    }
  }

  return util.extend({
    compile: function compile(param) {
      return param;
    },
    callback: function callback(param) {
      return param;
    },
    animation: 'default',
    cancelable: false,
    primaryButtonIndex: (options.buttonLabels || defaults.buttonLabels || []).length - 1
  }, defaults, options);
};

/**
 * @method alert
 * @signature alert(message [, options] | options)
 * @return {Promise}
 *   [en]Will resolve to the index of the button that was pressed or `-1` when canceled.[/en]
 *   [ja][/ja]
 * @param {String} message
 *   [en]Notification message. This argument is optional but if it's not defined either `options.message` or `options.messageHTML` must be defined instead.[/en]
 *   [ja][/ja]
 * @param {Object} options
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクトです。[/ja]
 * @param {String} [options.message]
 *   [en]Notification message.[/en]
 *   [ja]アラートダイアログに表示する文字列を指定します。[/ja]
 * @param {String} [options.messageHTML]
 *   [en]Notification message in HTML.[/en]
 *   [ja]アラートダイアログに表示するHTMLを指定します。[/ja]
 * @param {String | Array} [options.buttonLabels]
 *   [en]Labels for the buttons. Default is `"OK"`.[/en]
 *   [ja]確認ボタンのラベルを指定します。"OK"がデフォルトです。[/ja]
 * @param {Number} [options.primaryButtonIndex]
 *   [en]Index of primary button. Default is the last one.[/en]
 *   [ja]プライマリボタンのインデックスを指定します。デフォルトは 0 です。[/ja]
 * @param {Boolean} [options.cancelable]
 *   [en]Whether the dialog is cancelable or not. Default is `false`. If the dialog is cancelable it can be closed by clicking the background or pressing the Android back button.[/en]
 *   [ja]ダイアログがキャンセル可能かどうかを指定します。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are `none` and `fade`. Default is `fade`.[/en]
 *   [ja]アラートダイアログを表示する際のアニメーション名を指定します。"none", "fade"のいずれかを指定できます。[/ja]
 * @param {String} [options.id]
 *   [en]The `<ons-alert-dialog>` element's ID.[/en]
 *   [ja]ons-alert-dialog要素のID。[/ja]
 * @param {String} [options.class]
 *   [en]The `<ons-alert-dialog>` element's class.[/en]
 *   [ja]ons-alert-dialog要素のclass。[/ja]
 * @param {String} [options.title]
 *   [en]Dialog title. Default is `"Alert"`.[/en]
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
 *
 *     The content of the message can be either simple text or HTML.
 *
 *     It can be called in the following ways:
 *
 *     ```
 *     ons.notification.alert(message, options);
 *     ons.notification.alert(options);
 *     ```
 *
 *     Must specify either `message` or `messageHTML`.
 *   [/en]
 *   [ja]
 *     ユーザーへメッセージを見せるためのアラートダイアログを表示します。
 *     表示するメッセージは、テキストかもしくはHTMLを指定できます。
 *     このメソッドの引数には、options.messageもしくはoptions.messageHTMLのどちらかを必ず指定する必要があります。
 *   [/ja]
 */
notification.alert = function (message, options) {
  options = _normalizeArguments(message, options, {
    buttonLabels: ['OK'],
    title: 'Alert'
  });

  return notification._createAlertDialog(options);
};

/**
 * @method confirm
 * @signature confirm(message [, options] | options)
 * @return {Promise}
 *   [en]Will resolve to the index of the button that was pressed or `-1` when canceled.[/en]
 *   [ja][/ja]
 * @param {String} message
 *   [en]Notification message. This argument is optional but if it's not defined either `options.message` or `options.messageHTML` must be defined instead.[/en]
 *   [ja][/ja]
 * @param {Object} options
 *   [en]Parameter object.[/en]
 * @param {Array} [options.buttonLabels]
 *   [en]Labels for the buttons. Default is `["Cancel", "OK"]`.[/en]
 *   [ja]ボタンのラベルの配列を指定します。["Cancel", "OK"]がデフォルトです。[/ja]
 * @param {Number} [options.primaryButtonIndex]
 *   [en]Index of primary button. Default is the last one.[/en]
 *   [ja]プライマリボタンのインデックスを指定します。デフォルトは 1 です。[/ja]
 * @description
 *   [en]
 *     Display a dialog to ask the user for confirmation. Extends `alert()` parameters.
 *     The default button labels are `"Cancel"` and `"OK"` but they can be customized.
 *
 *     It can be called in the following ways:
 *
 *     ```
 *     ons.notification.confirm(message, options);
 *     ons.notification.confirm(options);
 *     ```
 *
 *     Must specify either `message` or `messageHTML`.
 *   [/en]
 *   [ja]
 *     ユーザに確認を促すダイアログを表示します。
 *     デオルとのボタンラベルは、"Cancel"と"OK"ですが、これはこのメソッドの引数でカスタマイズできます。
 *     このメソッドの引数には、options.messageもしくはoptions.messageHTMLのどちらかを必ず指定する必要があります。
 *   [/ja]
 */
notification.confirm = function (message, options) {
  options = _normalizeArguments(message, options, {
    buttonLabels: ['Cancel', 'OK'],
    title: 'Confirm'
  });

  return notification._createAlertDialog(options);
};

/**
 * @method prompt
 * @signature prompt(message [, options] | options)
 * @param {String} message
 *   [en]Notification message. This argument is optional but if it's not defined either `options.message` or `options.messageHTML` must be defined instead.[/en]
 *   [ja][/ja]
 * @return {Promise}
 *   [en]Will resolve to the input value when the dialog is closed or `null` when canceled.[/en]
 *   [ja][/ja]
 * @param {Object} options
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクトです。[/ja]
 * @param {String | Array} [options.buttonLabels]
 *   [en]Labels for the buttons. Default is `"OK"`.[/en]
 *   [ja]確認ボタンのラベルを指定します。"OK"がデフォルトです。[/ja]
 * @param {Number} [options.primaryButtonIndex]
 *   [en]Index of primary button. Default is the last one.[/en]
 *   [ja]プライマリボタンのインデックスを指定します。デフォルトは 0 です。[/ja]
 * @param {String} [options.placeholder]
 *   [en]Placeholder for the text input.[/en]
 *   [ja]テキスト欄のプレースホルダに表示するテキストを指定します。[/ja]
 * @param {String} [options.defaultValue]
 *   [en]Default value for the text input.[/en]
 *   [ja]テキスト欄のデフォルトの値を指定します。[/ja]
 * @param {String} [options.inputType]
 *   [en]Type of the input element (`password`, `date`...). Default is `text`.[/en]
 *   [ja][/ja]
 * @param {Boolean} [options.autofocus]
 *   [en]Autofocus the input element. Default is `true`. In Cordova, `KeyboardDisplayRequiresUserAction` in `config.xml` must be `false` to activate this feature.[/en]
 *   [ja]input要素に自動的にフォーカスするかどうかを指定します。デフォルトはtrueです。Cordova環境では、この機能を有効にするためには `config.xml` で `KeyboardDisplayRequiresUserAction` を `false` に設定する必要があります。[/ja]
 * @param {Boolean} [options.submitOnEnter]
 *   [en]Submit automatically when enter is pressed. Default is `true`.[/en]
 *   [ja]Enterが押された際にそのformをsubmitするかどうかを指定します。デフォルトはtrueです。[/ja]
 * @description
 *   [en]
 *     Display a dialog with a prompt to ask the user a question. Extends `alert()` parameters.
 *
 *     It can be called in the following ways:
 *
 *     ```
 *     ons.notification.prompt(message, options);
 *     ons.notification.prompt(options);
 *     ```
 *
 *     Must specify either `message` or `messageHTML`.
 *   [/en]
 *   [ja]
 *     ユーザーに入力を促すダイアログを表示します。
 *     このメソッドの引数には、options.messageもしくはoptions.messageHTMLのどちらかを必ず指定する必要があります。
 *   [/ja]
 */
notification.prompt = function (message, options) {
  options = _normalizeArguments(message, options, {
    buttonLabels: ['OK'],
    title: 'Alert',
    isPrompt: true,
    autofocus: true,
    submitOnEnter: true
  });

  return notification._createAlertDialog(options);
};

/**
 * @method toast
 * @signature toast(message [, options] | options)
 * @return {Promise}
 *   [en]Will resolve when the toast is hidden.[/en]
 *   [ja][/ja]
 * @param {String} message
 *   [en]Toast message. This argument is optional but if it's not defined then `options.message` must be defined instead.[/en]
 *   [ja][/ja]
 * @param {Object} options
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクトです。[/ja]
 * @param {String} [options.message]
 *   [en]Notification message.[/en]
 *   [ja]トーストに表示する文字列を指定します。[/ja]
 * @param {String} [options.buttonLabel]
 *   [en]Label for the button.[/en]
 *   [ja]確認ボタンのラベルを指定します。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are `none`, `fade`, `ascend`, `lift` and `fall`. Default is `ascend` for Android and `lift` for iOS.[/en]
 *   [ja]トーストを表示する際のアニメーション名を指定します。"none", "fade", "ascend", "lift", "fall"のいずれかを指定できます。[/ja]
 * @param {Number} [options.timeout]
 *   [en]Number of miliseconds where the toast is visible before hiding automatically.[/en]
 *   [ja][/ja]
 * @param {Boolean} [options.force]
 *   [en]If `true`, the toast skips the notification queue and is shown immediately. Defaults to `false`.[/en]
 *   [ja][/ja]
 * @param {String} [options.id]
 *   [en]The `<ons-toast>` element's ID.[/en]
 *   [ja]ons-toast要素のID。[/ja]
 * @param {String} [options.class]
 *   [en]The `<ons-toast>` element's class.[/en]
 *   [ja]ons-toast要素のclass。[/ja]
 * @param {String} [options.modifier]
 *   [en]Modifier for the element.[/en]
 *   [ja]トーストのmodifier属性の値を指定します。[/ja]
 * @param {Function} [options.callback]
 *   [en]Function that executes after toast has been hidden.[/en]
 *   [ja]トーストが閉じられた時に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]
 *     Display a simple notification toast with an optional button that can be used for simple actions.
 *
 *     It can be called in the following ways:
 *
 *     ```
 *     ons.notification.toast(message, options);
 *     ons.notification.toast(options);
 *     ```
 *   [/en]
 *   [ja][/ja]
 */
notification.toast = function (message, options) {
  options = _normalizeArguments(message, options, {
    timeout: 0,
    force: false
  });

  var toast = util.createElement('\n    <ons-toast>\n      ' + options.message + '\n      ' + (options.buttonLabels ? '<button>' + options.buttonLabels[0] + '</button>' : '') + '\n    </ons-toast>\n  ');

  _setAttributes(toast, options);

  var deferred = util.defer();
  var resolve = function resolve(value) {
    if (toast) {
      toast.hide().then(function () {
        if (toast) {
          toast.remove();
          toast = null;
          options.callback(value);
          deferred.resolve(value);
        }
      });
    }
  };

  if (options.buttonLabels) {
    util.findChild(toast._toast, 'button').onclick = function () {
      return resolve(0);
    };
  }

  document.body.appendChild(toast);
  options.compile(toast);

  var show = function show() {
    toast.parentElement && toast.show(options).then(function () {
      if (options.timeout) {
        setTimeout(function () {
          return resolve(-1);
        }, options.timeout);
      }
    });
  };

  options.force ? show() : ToastQueue.add(show, deferred.promise);

  return deferred.promise;
};

export default notification;