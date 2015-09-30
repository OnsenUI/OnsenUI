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

/**
 * @ngdoc object
 * @name ons
 * @category util
 * @description
 *   [ja]Onsen UIで利用できるグローバルなオブジェクトです。このオブジェクトは、AngularJSのスコープから参照することができます。 [/ja]
 *   [en]A global object that's used in Onsen UI. This object can be reached from the AngularJS scope.[/en]
 */

/**
 * @ngdoc method
 * @signature ready(callback)
 * @description
 *   [ja]アプリの初期化に利用するメソッドです。渡された関数は、Onsen UIの初期化が終了している時点で必ず呼ばれます。[/ja]
 *   [en]Method used to wait for app initialization. The callback will not be executed until Onsen UI has been completely initialized.[/en]
 * @param {Function} callback
 *   [en]Function that executes after Onsen UI has been initialized.[/en]
 *   [ja]Onsen UIが初期化が完了した後に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature bootstrap([moduleName, [dependencies]])
 * @extensionOf angular
 * @description
 *   [ja]Onsen UIの初期化を行います。Angular.jsのng-app属性を利用すること無しにOnsen UIを読み込んで初期化してくれます。[/ja]
 *   [en]Initialize Onsen UI. Can be used to load Onsen UI without using the <code>ng-app</code> attribute from AngularJS.[/en]
 * @param {String} [moduleName]
 *   [en]AngularJS module name.[/en]
 *   [ja]Angular.jsでのモジュール名[/ja]
 * @param {Array} [dependencies]
 *   [en]List of AngularJS module dependencies.[/en]
 *   [ja]依存するAngular.jsのモジュール名の配列[/ja]
 * @return {Object}
 *   [en]An AngularJS module object.[/en]
 *   [ja]AngularJSのModuleオブジェクトを表します。[/ja]
 */

/**
 * @ngdoc method
 * @signature enableAutoStatusBarFill()
 * @description
 *   [en]Enable status bar fill feature on iOS7 and above.[/en]
 *   [ja]iOS7以上で、ステータスバー部分の高さを自動的に埋める処理を有効にします。[/ja]
 */

/**
 * @ngdoc method
 * @signature disableAutoStatusBarFill()
 * @description
 *   [en]Disable status bar fill feature on iOS7 and above.[/en]
 *   [ja]iOS7以上で、ステータスバー部分の高さを自動的に埋める処理を無効にします。[/ja]
 */

/**
 * @ngdoc method
 * @signature disableAnimations()
 * @description
 *   [en]Disable all animations. Could be handy for testing and older devices.[/en]
 *   [ja]アニメーションを全て無効にします。テストの際に便利です。[/ja]
 */

/**
 * @ngdoc method
 * @signature enableAnimations()
 * @description
 *   [en]Enable animations (default).[/en]
 *   [ja]アニメーションを有効にします。[/ja]
 */

/**
 * @ngdoc method
 * @signature findParentComponentUntil(name, [dom])
 * @extensionOf angular
 * @param {String} name
 *   [en]Name of component, i.e. 'ons-page'.[/en]
 *   [ja]コンポーネント名を指定します。例えばons-pageなどを指定します。[/ja]
 * @param {Object|jqLite|HTMLElement} [dom]
 *   [en]$event, jqLite or HTMLElement object.[/en]
 *   [ja]$eventオブジェクト、jqLiteオブジェクト、HTMLElementオブジェクトのいずれかを指定できます。[/ja]
 * @return {Object}
 *   [en]Component object. Will return null if no component was found.[/en]
 *   [ja]コンポーネントのオブジェクトを返します。もしコンポーネントが見つからなかった場合にはnullを返します。[/ja]
 * @description
 *   [en]Find parent component object of <code>dom</code> element.[/en]
 *   [ja]指定されたdom引数の親要素をたどってコンポーネントを検索します。[/ja]
 */

/**
 * @ngdoc method
 * @signature findComponent(selector, [dom])
 * @extensionOf angular
 * @param {String} selector
 *   [en]CSS selector[/en]
 *   [ja]CSSセレクターを指定します。[/ja]
 * @param {HTMLElement} [dom]
 *   [en]DOM element to search from.[/en]
 *   [ja]検索対象とするDOM要素を指定します。[/ja]
 * @return {Object}
 *   [en]Component object. Will return null if no component was found.[/en]
 *   [ja]コンポーネントのオブジェクトを返します。もしコンポーネントが見つからなかった場合にはnullを返します。[/ja]
 * @description
 *   [en]Find component object using CSS selector.[/en]
 *   [ja]CSSセレクタを使ってコンポーネントのオブジェクトを検索します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setDefaultDeviceBackButtonListener(listener)
 * @param {Function} listener
 *   [en]Function that executes when device back button is pressed.[/en]
 *   [ja]デバイスのバックボタンが押された時に実行される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Set default handler for device back button.[/en]
 *   [ja]デバイスのバックボタンのためのデフォルトのハンドラを設定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature disableDeviceBackButtonHandler()
 * @description
 * [en]Disable device back button event handler.[/en]
 * [ja]デバイスのバックボタンのイベントを受け付けないようにします。[/ja]
 */

/**
 * @ngdoc method
 * @signature enableDeviceBackButtonHandler()
 * @description
 * [en]Enable device back button event handler.[/en]
 * [ja]デバイスのバックボタンのイベントを受け付けるようにします。[/ja]
 */

/**
 * @ngdoc method
 * @signature isReady()
 * @return {Boolean}
 *   [en]Will be true if Onsen UI is initialized.[/en]
 *   [ja]初期化されているかどうかを返します。[/ja]
 * @description
 *   [en]Returns true if Onsen UI is initialized.[/en]
 *   [ja]Onsen UIがすでに初期化されているかどうかを返すメソッドです。[/ja]
 */

/**
 * @ngdoc method
 * @signature compile(dom)
 * @extensionOf angular
 * @param {HTMLElement} dom
 *   [en]Element to compile.[/en]
 *   [ja]コンパイルする要素を指定します。[/ja]
 * @description
 *   [en]Compile Onsen UI components.[/en]
 *   [ja]通常のHTMLの要素をOnsen UIのコンポーネントにコンパイルします。[/ja]
 */

/**
 * @ngdoc method
 * @signature isWebView()
 * @return {Boolean}
 *   [en]Will be true if the app is running in Cordova.[/en]
 *   [ja]Cordovaで実行されている場合にtrueになります。[/ja]
 * @description
 *   [en]Returns true if running inside Cordova.[/en]
 *   [ja]Cordovaで実行されているかどうかを返すメソッドです。[/ja]
 */

/**
 * @ngdoc method
 * @signature createAlertDialog(page, [options])
 * @param {String} page
 *   [en]Page name. Can be either an HTML file or an <ons-template> containing a <ons-alert-dialog> component.[/en]
 *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Object} [options.parentScope]
 *   [en]Parent scope of the dialog. Used to bind models and access scope methods from the dialog.[/en]
 *   [ja]ダイアログ内で利用する親スコープを指定します。ダイアログからモデルやスコープのメソッドにアクセスするのに使います。このパラメータはAngularJSバインディングでのみ利用できます。[/ja]
 * @return {Promise}
 *   [en]Promise object that resolves to the alert dialog component object.[/en]
 *   [ja]ダイアログのコンポーネントオブジェクトを解決するPromiseオブジェクトを返します。[/ja]
 * @description
 *   [en]Create a alert dialog instance from a template.[/en]
 *   [ja]テンプレートからアラートダイアログのインスタンスを生成します。[/ja]
 */

/**
 * @ngdoc method
 * @signature createDialog(page, [options])
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
 *   [en]Promise object that resolves to the dialog component object.[/en]
 *   [ja]ダイアログのコンポーネントオブジェクトを解決するPromiseオブジェクトを返します。[/ja]
 * @description
 *   [en]Create a dialog instance from a template.[/en]
 *   [ja]テンプレートからダイアログのインスタンスを生成します。[/ja]
 */

/**
 * @ngdoc method
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
 * @ngdoc method
 * @signature resolveLoadingPlaceholder(page)
 * @param {String} page
 *   [en]Page name. Can be either an HTML file or an <ons-template> element.[/en]
 *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
 * @description
 *   [en]If no page is defined for the `ons-loading-placeholder` attribute it will wait for this method being called before loading the page.[/en]
 *   [ja]ons-loading-placeholderの属性値としてページが指定されていない場合は、ページロード前に呼ばれるons.resolveLoadingPlaceholder処理が行われるまで表示されません。[/ja]
 */

(function(ons){
  'use strict';

  var module = angular.module('onsen', ['templates-main']);
  angular.module('onsen.directives', ['onsen']); // for BC

  // JS Global facade for Onsen UI.
  initOnsenFacade();
  waitOnsenUILoad();
  initAngularModule();

  function waitOnsenUILoad() {
    var unlockOnsenUI = ons._readyLock.lock();
    module.run(function($compile, $rootScope) {
      // for initialization hook.
      if (document.readyState === 'loading' || document.readyState == 'uninitialized') {
        window.addEventListener('DOMContentLoaded', function() {
          document.body.appendChild(document.createElement('ons-dummy-for-init'));
        });
      } else if (document.body) {
        document.body.appendChild(document.createElement('ons-dummy-for-init'));
      } else {
        throw new Error('Invalid initialization state.');
      }

      $rootScope.$on('$ons-ready', unlockOnsenUI);
    });
  }

  function initAngularModule() {
    module.value('$onsGlobal', ons);
    module.run(function($compile, $rootScope, $onsen, $q) {
      ons._onsenService = $onsen;
      ons._qService = $q;

      $rootScope.ons = window.ons;
      $rootScope.console = window.console;
      $rootScope.alert = window.alert;

      ons.$compile = $compile;
    });
  }

  function initOnsenFacade() {
    ons._onsenService = null;

    // Object to attach component variables to when using the var="..." attribute.
    // Can be set to null to avoid polluting the global scope.
    ons.componentBase = window;

    /**
     * Bootstrap this document as a Onsen UI application.
     *
     * @param {String} [name] optional name
     * @param {Array} [deps] optional dependency modules
     */
    ons.bootstrap = function(name, deps) {
      if (angular.isArray(name)) {
        deps = name;
        name = undefined;
      }

      if (!name) {
        name = 'myOnsenApp';
      }

      deps = ['onsen'].concat(angular.isArray(deps) ? deps : []);
      var module = angular.module(name, deps);

      var doc = window.document;
      if (doc.readyState == 'loading' || doc.readyState == 'uninitialized' || doc.readyState == 'interactive') {
        doc.addEventListener('DOMContentLoaded', function() {
          angular.bootstrap(doc.documentElement, [name]);
        }, false);
      } else if (doc.documentElement) {
        angular.bootstrap(doc.documentElement, [name]);
      } else {
        throw new Error('Invalid state');
      }

      return module;
    };

    /**
     * @param {String} [name]
     * @param {Object/jqLite/HTMLElement} dom $event object or jqLite object or HTMLElement object.
     * @return {Object}
     */
    ons.findParentComponentUntil = function(name, dom) {
      var element;
      if (dom instanceof HTMLElement) {
        element = angular.element(dom);
      } else if (dom instanceof angular.element) {
        element = dom;
      } else if (dom.target) {
        element = angular.element(dom.target);
      }

      return element.inheritedData(name);
    };

    /**
     * Find view object correspond dom element queried by CSS selector.
     *
     * @param {String} selector CSS selector
     * @param {HTMLElement} [dom]
     * @return {Object/void}
     */
    ons.findComponent = function(selector, dom) {
      var target = (dom ? dom : document).querySelector(selector);
      return target ? angular.element(target).data(target.nodeName.toLowerCase()) || null : null;
    };

    /**
     * @param {HTMLElement} dom
     */
    ons.compile = function(dom) {
      if (!ons.$compile) {
        throw new Error('ons.$compile() is not ready. Wait for initialization with ons.ready().');
      }

      if (!(dom instanceof HTMLElement)) {
        throw new Error('First argument must be an instance of HTMLElement.');
      }

      var scope = angular.element(dom).scope();
      if (!scope) {
        throw new Error('AngularJS Scope is null. Argument DOM element must be attached in DOM document.');
      }

      ons.$compile(dom)(scope);
    };

    ons._getOnsenService = function() {
      if (!this._onsenService) {
        throw new Error('$onsen is not loaded, wait for ons.ready().');
      }

      return this._onsenService;
    };

    /**
     * @param {String} page
     * @param {Object} [options]
     * @param {Object} [options.parentScope]
     * @return {Promise}
     */
    ons.createAlertDialog = function(page, options) {
      options = options || {};

      options.link = function(element) {
        if (options.parentScope) {
          ons.$compile(angular.element(element))(options.parentScope.$new());
        } else {
          ons.compile(element);
        }
      };

      return ons._createAlertDialogOriginal(page, options).then(function(alertDialog) {
        return angular.element(alertDialog).data('ons-alert-dialog');
      });
    };

    /**
     * @param {String} page
     * @param {Object} [options]
     * @param {Object} [options.parentScope]
     * @return {Promise}
     */
    ons.createDialog = function(page, options) {
      options = options || {};

      options.link = function(element) {
        if (options.parentScope) {
          ons.$compile(angular.element(element))(options.parentScope.$new());
        } else {
          ons.compile(element);
        }
      };

      return ons._createDialogOriginal(page, options).then(function(dialog) {
        return angular.element(dialog).data('ons-dialog');
      });
    };

    /**
     * @param {String} page
     * @param {Object} [options]
     * @param {Object} [options.parentScope]
     * @return {Promise}
     */
    ons.createPopover = function(page, options) {
      options = options || {};

      options.link = function(element) {
        if (options.parentScope) {
          ons.$compile(angular.element(element))(options.parentScope.$new());
        } else {
          ons.compile(element);
        }
      };

      return ons._createPopoverOriginal(page, options).then(function(popover) {
        return angular.element(popover).data('ons-popover');
      });
    };

    /**
     * @param {String} page
     */
    ons.resolveLoadingPlaceholder = function(page) {
      return ons._resolveLoadingPlaceholderOriginal(page, function(element, done) {
        ons.compile(element);
        angular.element(element).scope().$evalAsync(function() {
          setImmediate(done);
        });
      });
    };

    ons._setupLoadingPlaceHolders = function() {
      // Do nothing
    };
  }

})(window.ons = window.ons || {});
