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

import DeviceBackButtonDispatcher from './device-back-button-dispatcher';
import DoorLock from './doorlock';

/**
 * @object ons
 * @category util
 * @description
 *   [ja]Onsen UIで利用できるグローバルなオブジェクトです。[/ja]
 *   [en]A global object that's used in Onsen UI. [/en]
 */
const ons = {};

ons._readyLock = new DoorLock();
ons._config = {
  autoStatusBarFill: true,
  animationsDisabled: false
};

waitDeviceReady();

/**
 * @method isReady
 * @signature isReady()
 * @return {Boolean}
 *   [en]Will be true if Onsen UI is initialized.[/en]
 *   [ja]初期化されているかどうかを返します。[/ja]
 * @description
 *   [en]Returns true if Onsen UI is initialized.[/en]
 *   [ja]Onsen UIがすでに初期化されているかどうかを返すメソッドです。[/ja]
 */
ons.isReady = () => {
  return !ons._readyLock.isLocked();
};

/**
 * @method isWebView
 * @signature isWebView()
 * @return {Boolean}
 *   [en]Will be true if the app is running in Cordova.[/en]
 *   [ja]Cordovaで実行されている場合にtrueになります。[/ja]
 * @description
 *   [en]Returns true if running inside Cordova.[/en]
 *   [ja]Cordovaで実行されているかどうかを返すメソッドです。[/ja]
 */
ons.isWebView = () => {
  if (document.readyState === 'loading' || document.readyState == 'uninitialized') {
    throw new Error('isWebView() method is available after dom contents loaded.');
  }

  return !!(window.cordova || window.phonegap || window.PhoneGap);
};

/**
 * @method ready
 * @signature ready(callback)
 * @description
 *   [ja]アプリの初期化に利用するメソッドです。渡された関数は、Onsen UIの初期化が終了している時点で必ず呼ばれます。[/ja]
 *   [en]Method used to wait for app initialization. The callback will not be executed until Onsen UI has been completely initialized.[/en]
 * @param {Function} callback
 *   [en]Function that executes after Onsen UI has been initialized.[/en]
 *   [ja]Onsen UIが初期化が完了した後に呼び出される関数オブジェクトを指定します。[/ja]
 */
ons.ready = callback => {
  if (ons.isReady()) {
    callback();
  } else {
    ons._readyLock.waitUnlock(callback);
  }
};

/**
 * @method setDefaultDeviceBackButtonListener
 * @signature setDefaultDeviceBackButtonListener(listener)
 * @param {Function} listener
 *   [en]Function that executes when device back button is pressed.[/en]
 *   [ja]デバイスのバックボタンが押された時に実行される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Set default handler for device back button.[/en]
 *   [ja]デバイスのバックボタンのためのデフォルトのハンドラを設定します。[/ja]
 */
ons.setDefaultDeviceBackButtonListener = function(listener) {
  ons._defaultDeviceBackButtonHandler.setListener(listener);
};

/**
 * @method disableDeviceBackButtonHandler
 * @signature disableDeviceBackButtonHandler()
 * @description
 * [en]Disable device back button event handler.[/en]
 * [ja]デバイスのバックボタンのイベントを受け付けないようにします。[/ja]
 */
ons.disableDeviceBackButtonHandler = function() {
  DeviceBackButtonDispatcher.disable();
};

/**
 * @method enableDeviceBackButtonHandler
 * @signature enableDeviceBackButtonHandler()
 * @description
 * [en]Enable device back button event handler.[/en]
 * [ja]デバイスのバックボタンのイベントを受け付けるようにします。[/ja]
 */
ons.enableDeviceBackButtonHandler = function() {
  DeviceBackButtonDispatcher.enable();
};


/**
 * @method enableAutoStatusBarFill
 * @signature enableAutoStatusBarFill()
 * @description
 *   [en]Enable status bar fill feature on iOS7 and above.[/en]
 *   [ja]iOS7以上で、ステータスバー部分の高さを自動的に埋める処理を有効にします。[/ja]
 */
ons.enableAutoStatusBarFill = () => {
  if (ons.isReady()) {
    throw new Error('This method must be called before ons.isReady() is true.');
  }
  ons._config.autoStatusBarFill = true;
};

/**
 * @method disableAutoStatusBarFill
 * @signature disableAutoStatusBarFill()
 * @description
 *   [en]Disable status bar fill feature on iOS7 and above.[/en]
 *   [ja]iOS7以上で、ステータスバー部分の高さを自動的に埋める処理を無効にします。[/ja]
 */
ons.disableAutoStatusBarFill = () => {
  if (ons.isReady()) {
    throw new Error('This method must be called before ons.isReady() is true.');
  }
  ons._config.autoStatusBarFill = false;
};

/**
 * @method disableAnimations
 * @signature disableAnimations()
 * @description
 *   [en]Disable all animations. Could be handy for testing and older devices.[/en]
 *   [ja]アニメーションを全て無効にします。テストの際に便利です。[/ja]
 */
ons.disableAnimations = () => {
  ons._config.animationsDisabled = true;
};

/**
 * @method enableAnimations
 * @signature enableAnimations()
 * @description
 *   [en]Enable animations (default).[/en]
 *   [ja]アニメーションを有効にします。[/ja]
 */
ons.enableAnimations = () => {
  ons._config.animationsDisabled = false;
};

/**
 * @param {String} page
 * @param {Object} [options]
 * @param {Function} [options.link]
 * @return {Promise}
 */
ons._createPopoverOriginal = function(page, options = {}) {

  if (!page) {
    throw new Error('Page url must be defined.');
  }

  return ons._internal.getPageHTMLAsync(page).then(html => {
    html = html.match(/<ons-popover/gi) ? `<div>${html}</div>` : `<ons-popover>${html}</ons-popover>`;
    const div = ons._util.createElement('<div>' + html + '</div>');

    const popover = div.querySelector('ons-popover');
    CustomElements.upgrade(popover);
    document.body.appendChild(popover);

    if (options.link instanceof Function) {
      options.link(popover);
    }

    return popover;
  });
};

/**
 * @method createPopover
 * @signature createPopover(page, [options])
 * @param {String} page
 *   [en]Page name. Can be either an HTML file or an <ons-template> containing a <ons-dialog> component.[/en]
 *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Object} [options.parentScope]
 *   [en]Parent scope of the dialog. Used to bind models and access scope methods from the dialog.[/en]
 *   [ja]ダイアログ内で利用する親スコープを指定します。ダイアログからモデルやスコープのメソッドにアクセスするのに使います。このパラメータはAngularJSバインディングでのみ利用できます。[/ja]
 * @return {Promise}
 *   [en]Promise object that resolves to the popover component object.[/en]
 *   [ja]ポップオーバーのコンポーネントオブジェクトを解決するPromiseオブジェクトを返します。[/ja]
 * @description
 *   [en]Create a popover instance from a template.[/en]
 *   [ja]テンプレートからポップオーバーのインスタンスを生成します。[/ja]
 */
ons.createPopover = ons._createPopoverOriginal;

/**
 * @param {String} page
 * @param {Object} [options]
 * @param {Function} [options.link]
 * @return {Promise}
 */
ons._createDialogOriginal = function(page, options = {}) {

  if (!page) {
    throw new Error('Page url must be defined.');
  }

  return ons._internal.getPageHTMLAsync(page).then(html => {
    html = html.match(/<ons-dialog/gi) ? `<div>${html}</div>` : `<ons-dialog>${html}</ons-dialog>`;
    const div = ons._util.createElement('<div>' + html + '</div>');

    const dialog = div.querySelector('ons-dialog');
    CustomElements.upgrade(dialog);
    document.body.appendChild(dialog);

    if (options.link instanceof Function) {
      options.link(dialog);
    }

    return dialog;
  });
};

/**
 * @method createDialog
 * @signature createDialog(page, [options])
 * @param {String} page
 *   [en]Page name. Can be either an HTML file or an <ons-template> containing a <ons-dialog> component.[/en]
 *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @return {Promise}
 *   [en]Promise object that resolves to the dialog component object.[/en]
 *   [ja]ダイアログのコンポーネントオブジェクトを解決するPromiseオブジェクトを返します。[/ja]
 * @description
 *   [en]Create a dialog instance from a template.[/en]
 *   [ja]テンプレートからダイアログのインスタンスを生成します。[/ja]
 */
ons.createDialog = ons._createDialogOriginal;

/**
 * @param {String} page
 * @param {Object} [options]
 * @param {Function} [options.link]
 * @return {Promise}
 */
ons._createAlertDialogOriginal = function(page, options = {}) {

  if (!page) {
    throw new Error('Page url must be defined.');
  }

  return ons._internal.getPageHTMLAsync(page).then(html => {
    html = html.match(/<ons-alert-dialog/gi) ? `<div>${html}</div>` : `<ons-alert-dialog>${html}</ons-alert-dialog>`;
    const div = ons._util.createElement('<div>' + html + '</div>');

    const alertDialog = div.querySelector('ons-alert-dialog');
    CustomElements.upgrade(alertDialog);
    document.body.appendChild(alertDialog);

    if (options.link instanceof Function) {
      options.link(alertDialog);
    }

    return alertDialog;
  });
};

/**
 * @method createAlertDialog
 * @signature createAlertDialog(page, [options])
 * @param {String} page
 *   [en]Page name. Can be either an HTML file or an <ons-template> containing a <ons-alert-dialog> component.[/en]
 *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @return {Promise}
 *   [en]Promise object that resolves to the alert dialog component object.[/en]
 *   [ja]ダイアログのコンポーネントオブジェクトを解決するPromiseオブジェクトを返します。[/ja]
 * @description
 *   [en]Create a alert dialog instance from a template.[/en]
 *   [ja]テンプレートからアラートダイアログのインスタンスを生成します。[/ja]
 */
ons.createAlertDialog = ons._createAlertDialogOriginal;

/**
 * @param {String} page
 * @param {Function} link
 */
ons._resolveLoadingPlaceholderOriginal = function(page, link) {
  const elements = ons._util.arrayFrom(window.document.querySelectorAll('[ons-loading-placeholder]'));

  if (elements.length > 0) {
    elements
      .filter(element => !element.getAttribute('page'))
      .forEach(element => {
        element.setAttribute('ons-loading-placeholder', page);
        ons._resolveLoadingPlaceholder(element, page, link);
      });
  } else {
    throw new Error('No ons-loading-placeholder exists.');
  }
};

/**
 * @method resolveLoadingPlaceholder
 * @signature resolveLoadingPlaceholder(page)
 * @param {String} page
 *   [en]Page name. Can be either an HTML file or an <ons-template> element.[/en]
 *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
 * @description
 *   [en]If no page is defined for the `ons-loading-placeholder` attribute it will wait for this method being called before loading the page.[/en]
 *   [ja]ons-loading-placeholderの属性値としてページが指定されていない場合は、ページロード前に呼ばれるons.resolveLoadingPlaceholder処理が行われるまで表示されません。[/ja]
 */
ons.resolveLoadingPlaceholder = ons._resolveLoadingPlaceholderOriginal;

ons._setupLoadingPlaceHolders = function() {
  ons.ready(() => {
    const elements = ons._util.arrayFrom(window.document.querySelectorAll('[ons-loading-placeholder]'));

    elements.forEach(element => {
      const page = element.getAttribute('ons-loading-placeholder');
      if (typeof page === 'string') {
        ons._resolveLoadingPlaceholder(element, page);
      }
    });
  });
};

ons._resolveLoadingPlaceholder = function(element, page, link) {
  link = link || function(element, done) { done(); };
  ons._internal.getPageHTMLAsync(page).then(html => {

    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

    const contentElement = ons._util.createElement('<div>' + html + '</div>');
    contentElement.style.display = 'none';

    element.appendChild(contentElement);

    link(contentElement, function() {
      contentElement.style.display = '';
    });

  }).catch(error => {
    throw new Error('Unabled to resolve placeholder: ' + error);
  });
};

function waitDeviceReady() {
  const unlockDeviceReady = ons._readyLock.lock();
  window.addEventListener('DOMContentLoaded', () => {
    if (ons.isWebView()) {
      window.document.addEventListener('deviceready', unlockDeviceReady, false);
    } else {
      unlockDeviceReady();
    }
  }, false);
}

export default ons;
