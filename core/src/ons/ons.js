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
import animit from './animit'
import GestureDetector from './gesture-detector';
import platform from './platform';
import notification from './notification';
import actionSheet from './action-sheet';
import internal from './internal';
import orientation from './orientation';
import modifier from './modifier';
import softwareKeyboard from './software-keyboard';
import PageAttributeExpression from './page-attribute-expression';
import deviceBackButtonDispatcher from './device-back-button-dispatcher';
import animationOptionsParser from './animation-options-parser';
import autoStyle from './autostyle';
import DoorLock from './doorlock';
import contentReady from './content-ready';
import {defaultPageLoader, PageLoader} from './page-loader';
import BaseAnimator from './base-animator';

/**
 * @object ons
 * @category util
 * @description
 *   [ja]Onsen UIで利用できるグローバルなオブジェクトです。[/ja]
 *   [en]A global object that's used in Onsen UI. [/en]
 */
const ons = {};

ons._util = util;
ons.animit = animit;
ons._deviceBackButtonDispatcher = deviceBackButtonDispatcher;
ons._internal = internal;
ons.GestureDetector = GestureDetector;
ons.platform = platform;
ons.softwareKeyboard = softwareKeyboard;
ons.pageAttributeExpression = PageAttributeExpression;
ons.orientation = orientation;
ons.notification = notification;
ons.modifier = modifier;
ons._animationOptionsParser = animationOptionsParser;
ons._autoStyle = autoStyle;
ons._DoorLock = DoorLock;
ons._contentReady = contentReady;
ons.defaultPageLoader = defaultPageLoader;
ons.PageLoader = PageLoader;
ons._BaseAnimator = BaseAnimator;

ons._readyLock = new DoorLock();

ons.platform.select((window.location.search.match(/platform=([\w-]+)/) || [])[1]);

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
ons.isWebView = ons.platform.isWebView;

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
  ons._deviceBackButtonDispatcher.disable();
};

/**
 * @method enableDeviceBackButtonHandler
 * @signature enableDeviceBackButtonHandler()
 * @description
 * [en]Enable device back button event handler.[/en]
 * [ja]デバイスのバックボタンのイベントを受け付けるようにします。[/ja]
 */
ons.enableDeviceBackButtonHandler = function() {
  ons._deviceBackButtonDispatcher.enable();
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
  ons._internal.config.autoStatusBarFill = true;
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
  ons._internal.config.autoStatusBarFill = false;
};

/**
 * @method disableAnimations
 * @signature disableAnimations()
 * @description
 *   [en]Disable all animations. Could be handy for testing and older devices.[/en]
 *   [ja]アニメーションを全て無効にします。テストの際に便利です。[/ja]
 */
ons.disableAnimations = () => {
  ons._internal.config.animationsDisabled = true;
};

/**
 * @method enableAnimations
 * @signature enableAnimations()
 * @description
 *   [en]Enable animations (default).[/en]
 *   [ja]アニメーションを有効にします。[/ja]
 */
ons.enableAnimations = () => {
  ons._internal.config.animationsDisabled = false;
};

ons._disableWarnings = () => {
  ons._internal.config.warningsDisabled = true;
};

ons._enableWarnings = () => {
  ons._internal.config.warningsDisabled = false;
};

/**
 * @method disableAutoStyling
 * @signature disableAutoStyling()
 * @description
 *   [en]Disable automatic styling.[/en]
 *   [ja][/ja]
 */
ons.disableAutoStyling = ons._autoStyle.disable;

/**
 * @method enableAutoStyling
 * @signature enableAutoStyling()
 * @description
 *   [en]Enable automatic styling based on OS (default).[/en]
 *   [ja][/ja]
 */
ons.enableAutoStyling = ons._autoStyle.enable;

/**
 * @method forcePlatformStyling
 * @signature forcePlatformStyling(platform)
 * @description
 *   [en]Refresh styling for the given platform. Only useful for demos. Use `ons.platform.select(...)` for development and production.[/en]
 *   [ja][/ja]
 * @param {string} platform New platform to style the elements.
 */
ons.forcePlatformStyling = newPlatform => {
  ons.enableAutoStyling();
  ons.platform.select(newPlatform || 'ios');

  ons._util.arrayFrom(document.querySelectorAll('*'))
    .forEach(function(element) {
      if (element.tagName.toLowerCase() === 'ons-if') {
        element._platformUpdate();
      } else if (element.tagName.match(/^ons-/i)) {
        ons._autoStyle.prepare(element, true);
        if (element.tagName.toLowerCase() === 'ons-tabbar') {
          element._updatePosition();
        }
      }
    });
};

/**
 * @method preload
 * @signature preload(templatePaths)
 * @param {String|Array} templatePaths
 *   [en]Set of HTML file paths containing 'ons-page' elements.[/en]
 *   [ja][/ja]
 * @return {Promise}
 *   [en]Promise that resolves when all the templates are cached.[/en]
 *   [ja][/ja]
 * @description
 *   [en]Separated files need to be requested on demand and this can slightly delay pushing new pages. This method requests and caches templates for later use.[/en]
 *   [ja][/ja]
 */
ons.preload = function(templates = []) {
  return Promise.all((templates instanceof Array ? templates : [templates]).map(template => {
    if (typeof template !== 'string') {
      throw new Error ('Expected string arguments but got ' + typeof template);
    }
    return ons._internal.getTemplateHTMLAsync(template);
  }));
};

/**
 * @method createElement
 * @signature createElement(template, options)
 * @param {String} template
 *   [en]Either an HTML file path, an `<ons-template>` id or an HTML string such as `'<div id="foo">hoge</div>'`.[/en]
 *   [ja][/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Boolean|HTMLElement} [options.append]
 *   [en]Whether or not the element should be automatically appended to the DOM.  Defaults to `false`. If `true` value is given, `document.body` will be used as the target.[/en]
 *   [ja][/ja]
 * @param {HTMLElement} [options.insertBefore]
 *   [en]Reference node that becomes the next sibling of the new node (`options.append` element).[/en]
 *   [ja][/ja]
 * @return {HTMLElement|Promise}
 *   [en]If the provided template was an inline HTML string, it returns the new element. Otherwise, it returns a promise that resolves to the new element.[/en]
 *   [ja][/ja]
 * @description
 *   [en]Create a new element from a template. Both inline HTML and external files are supported although the return value differs.[/en]
 *   [ja][/ja]
 */
ons.createElement = (template, options = {}) => {
  template = template.trim();

  const create = html => {
    const element = ons._util.createElement(html);
    element.remove();

    if (options.append) {
      const target = options.append instanceof HTMLElement ? options.append : document.body;
      target.insertBefore(element, options.insertBefore || null);

      if (options.link instanceof Function) {
        options.link(element);
      }
    }

    return element;
  };

  return template.charAt(0) === '<' ? create(template) : ons._internal.getPageHTMLAsync(template).then(create);
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
ons.createPopover = ons.createDialog = ons.createAlertDialog = (template, options = {}) => ons.createElement(template, { append: true, ...options });

/**
 * @method openActionSheet
 * @signature openActionSheet(options)
 * @description
 *   [en]Shows an instant Action Sheet and lets the user choose an action.[/en]
 *   [ja][/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Array} [options.buttons]
 *   [en]Represent each button of the action sheet following the specified order. Every item can be either a string label or an object containing `label`, `icon` and `modifier` properties.[/en]
 *   [ja][/ja]
 * @param {String} [options.title]
 *   [en]Optional title for the action sheet.[/en]
 *   [ja][/ja]
 * @param {Number} [options.destructive]
 *   [en]Optional index of the "destructive" button (only for iOS). It can be specified in the button array as well.[/en]
 *   [ja][/ja]
 * @param {Boolean} [options.cancelable]
 *   [en]Whether the action sheet can be canceled by tapping on the background mask or not.[/en]
 *   [ja][/ja]
 * @param {String} [options.modifier]
 *   [en]Modifier attribute of the action sheet. E.g. `'destructive'`.[/en]
 *   [ja][/ja]
 * @param {String} [options.maskColor]
 *   [en]Optionally change the background mask color.[/en]
 *   [ja][/ja]
 * @param {String} [options.id]
 *   [en]The element's id attribute.[/en]
 *   [ja][/ja]
 * @param {String} [options.class]
 *   [en]The element's class attribute.[/en]
 *   [ja][/ja]
 * @return {Promise}
 *   [en]Will resolve when the action sheet is closed. The resolve value is either the index of the tapped button or -1 when canceled.[/en]
 *   [ja][/ja]
 */
ons.openActionSheet = actionSheet;

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
ons.resolveLoadingPlaceholder = (page, link) => {
  const elements = ons._util.arrayFrom(window.document.querySelectorAll('[ons-loading-placeholder]'));
  if (elements.length === 0) {
    throw new Error('No ons-loading-placeholder exists.');
  }

  elements
    .filter(element => !element.getAttribute('page'))
    .forEach(element => {
      element.setAttribute('ons-loading-placeholder', page);
      ons._resolveLoadingPlaceholder(element, page, link);
    });
};


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

/**
 * @method getScriptPage
 * @signature getScriptPage()
 * @description
 *   [en]Access the last created page from the current `script` scope. Only works inside `<script></script>` tags that are direct children of `ons-page` element. Use this to add lifecycle hooks to a page.[/en]
 *   [ja][/ja]
 * @return {HTMLElement}
 *   [en]Returns the corresponding page element.[/en]
 *   [ja][/ja]
 */
const getCS = 'currentScript' in document ? () => document.currentScript : () => document.scripts[document.scripts.length - 1];
ons.getScriptPage = () => getCS() && /ons-page/i.test(getCS().parentElement.tagName) && getCS().parentElement || null;

window._superSecretOns = ons;
export default ons;
