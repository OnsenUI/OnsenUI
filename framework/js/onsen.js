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
 * @name ons
 * @category util
 * @category fuga
 * @description 
 *   [ja]Onsen UIで利用できるグローバルなオブジェクトです。このオブジェクトは、AngularJSのスコープから参照することができます。 [/ja]
 *   [en]A global object that's used in Onsen UI. This object can be reached from the AngularJS scope.[/en]
 */

/**
 * @ngdoc method
 * @signature ready(callback)
 * @description 
 *   [ja]アプリの初期化に利用するメソッドです。渡された関数を、Onsen UIの初期化が終了している時点で必ず呼びます。[/ja]
 *   [en]Method used to wait for app initialization. The callback will not be executed until Onsen UI has been completely initialized.[/en]
 * @param {Function} callback
 * @return {void}
 */

/**
 * @ngdoc method
 * @signature bootstrap([moduleName, [dependencies]])
 * @description 
 *   [ja]Onsen UIの初期化を行います。Angular.jsのng-app属性を利用すること無しにOnsen UIを読み込んで初期化してくれます[/ja]
 *   [en]Initialize Onsen UI. Can be used to load Onsen UI without using the <code>ng-app</code> attribute from AngularJS.[/en]
 * @param {String} [moduleName] [ja]Angular.jsでのモジュール名[/ja]
 * @param {Array} [dependencies] [ja]依存するAngular.jsのモジュール名の配列[/ja]
 * @return {Object}
 *   [en]Returns an AngularJS module object.[/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc method
 * @signature enableAutoStatusBarFill()
 * @description 
 *   [en]Enabled status bar fill feature on iOS7 and above.[/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc method
 * @signature enableAutoStatusBarFill()
 * @description 
 *   [en]Disabled status bar fill feature on iOS7 and above.[/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc method
 * @signature findParentComponentUntil(name, [dom])
 * @param {String} name
 * @param {Object|jqLite|HTMLElement} [dom]
 *   [en]$event, jqLite or HTMLElement object.[/en]
 *   [ja][/ja]
 * @return {Object}
 * @description 
 *   [en]Find parent component object of <code>dom</code> element.[/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc method
 * @signature findComponent(selector, [dom])
 * @param {String} selector
 *   [en]CSS selector[/en]
 *   [ja]CSSセレクター[/ja]
 * @param {HTMLElement} [dom]
 * @return {Object}
 * @description 
 *   [en]Find component object using CSS selector.[/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc method
 * @signature setDefaultDeviceBackButtonListener(listener)
 * @param {Function} listener 
 * @description 
 *   [en]Set default handler for device back button.[/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc method
 * @signature disableDeviceBackButtonHandler()
 * @description 
 * [en]Disable device back button event handler.[/en]
 * [ja][/ja]
 */

/**
 * @ngdoc method
 * @signature disableDeviceBackButtonHandler()
 * @description 
 * [en]Disable device back button event handler.[/en]
 * [ja][/ja]
 */

/**
 * @ngdoc method
 * @signature isReady()
 * @return {Boolean}
 * @description 
 * [en]Returns true if Onsen UI is initialized.[/en]
 * [ja][/ja]
 */

/**
 * @ngdoc method
 * @signature compile(dom)
 * @param {HTMLElement} dom
 * @description 
 * [en]Compile Onsen UI components.[/en]
 * [ja][/ja]
 */

/**
 * @ngdoc method
 * @signature isWebView()
 * @return {Boolean}
 * @description 
 * [en]Returns true if running inside Cordova.[/en]
 * [ja][/ja]
 */

/**
 * @ngdoc method
 * @signature createAlertDialog(page)
 * @param {String} page
 * @return {Promise}
 * @description 
 * [en]Create a alert dialog instance from a template.[/en]
 * [ja][/ja]
 */

/**
 * @ngdoc method
 * @signature createDialog(page)
 * @param {String} page
 * @return {Promise}
 * @description 
 * [en]Create a dialog instance from a template.[/en]
 * [ja][/ja]
 */

/**
 * @ngdoc method
 * @signature createPopover(page)
 * @param {String} page
 * @return {Promise}
 * @description 
 * [en]Create a popover instance from a template.[/en]
 * [ja][/ja]
 */

window.ons = (function(){
  'use strict';

  var module = angular.module('onsen', ['templates-main']);
  angular.module('onsen.directives', ['onsen']); // for BC

  // JS Global facade for Onsen UI.
  var ons = createOnsenFacade();
  initKeyboardEvents();
  waitDeviceReady();
  waitOnsenUILoad();
  initAngularModule();

  return ons;

  function waitDeviceReady() {
    var unlockDeviceReady = ons._readyLock.lock();
    window.addEventListener('DOMContentLoaded', function() {
      if (ons.isWebView()) {
        window.document.addEventListener('deviceready', unlockDeviceReady, false);
      } else {
        unlockDeviceReady();
      }
    }, false);
  }

  function waitOnsenUILoad() {
    var unlockOnsenUI = ons._readyLock.lock();
    module.run(function($compile, $rootScope, $onsen) {
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

      if (document.querySelector('ons-alert-dialog')) {
        console.warn('Invalid usage of <ons-alert-dialog>.');
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

  function initKeyboardEvents() {
    ons.softwareKeyboard = new MicroEvent();
    ons.softwareKeyboard._visible = false;

    var onShow = function() {
      ons.softwareKeyboard._visible = true;
      ons.softwareKeyboard.emit('show');
    },
        onHide = function() {
      ons.softwareKeyboard._visible = false;
      ons.softwareKeyboard.emit('hide');
    };

    var bindEvents = function() {
      if (typeof Keyboard !== 'undefined') {
        // https://github.com/martinmose/cordova-keyboard/blob/95f3da3a38d8f8e1fa41fbf40145352c13535a00/README.md
        Keyboard.onshow = onShow;
        Keyboard.onhide = onHide;
        ons.softwareKeyboard.emit('init', {visible: Keyboard.isVisible});
        return true;
      } else if (typeof cordova.plugins !== 'undefined' && typeof cordova.plugins.Keyboard !== 'undefined') {
        // https://github.com/driftyco/ionic-plugins-keyboard/blob/ca27ecf/README.md
        window.addEventListener('native.keyboardshow', onShow);
        window.addEventListener('native.keyboardhide', onHide);
        ons.softwareKeyboard.emit('init', {visible: cordova.plugins.Keyboard.isVisible});
        return true;
      }
      return false;
    };

    var noPluginError = function() {
      console.warn('ons-keyboard: Cordova Keyboard plugin is not present.');
    };

    document.addEventListener('deviceready', function() {
      if (!bindEvents()) {
        if (document.querySelector('[ons-keyboard-active]') || 
          document.querySelector('[ons-keyboard-inactive]')) {
          noPluginError();
        }

        ons.softwareKeyboard.on = noPluginError;
      }
    });
  }

  function createOnsenFacade() {
    var ons = {

      _readyLock: new DoorLock(),

      _onsenService: null,

      _config: {
        autoStatusBarFill: true
      },

      _unlockersDict: {},

      // Object to attach component variables to when using the var="..." attribute.
      // Can be set to null to avoid polluting the global scope.
      componentBase: window,

      /**
       * Bootstrap this document as a Onsen UI application.
       *
       * @param {String} [name] optional name
       * @param {Array} [deps] optional dependency modules
       */
      bootstrap : function(name, deps) {
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
        if (doc.readyState == 'loading' || doc.readyState == 'uninitialized') {
          doc.addEventListener('DOMContentLoaded', function() {
            angular.bootstrap(doc.documentElement, [name]);
          }, false);
        } else if (doc.documentElement) {
          angular.bootstrap(doc.documentElement, [name]);
        } else {
          throw new Error('Invalid state');
        }

        return module;
      },

      /**
       * Enable status bar fill feature on iOS7 and above.
       */
      enableAutoStatusBarFill: function() {
        if (this.isReady()) {
          throw new Error('This method must be called before ons.isReady() is true.');
        }
        this._config.autoStatusBarFill = true;
      },

      /**
       * Disable status bar fill feature on iOS7 and above.
       */
      disableAutoStatusBarFill: function() {
        if (this.isReady()) {
          throw new Error('This method must be called before ons.isReady() is true.');
        }
        this._config.autoStatusBarFill = false;
      },

      /**
       * @param {String} [name]
       * @param {Object/jqLite/HTMLElement} dom $event object or jqLite object or HTMLElement object.
       * @return {Object}
       */
      findParentComponentUntil: function(name, dom) {
        var element;
        if (dom instanceof HTMLElement) {
          element = angular.element(dom);
        } else if (dom instanceof angular.element) {
          element = dom;
        } else if (dom.target) {
          element = angular.element(dom.target);
        }

        return element.inheritedData(name);
      },

      /**
       * @param {Function} listener
       */
      setDefaultDeviceBackButtonListener: function(listener) {
        this._getOnsenService().getDefaultDeviceBackButtonHandler().setListener(listener);
      },

      /**
       * Disable this framework to handle cordova "backbutton" event.
       */
      disableDeviceBackButtonHandler: function() {
        this._getOnsenService().DeviceBackButtonHandler.disable();
      },

      /**
       * Enable this framework to handle cordova "backbutton" event.
       */
      enableDeviceBackButtonHandler: function() {
        this._getOnsenService().DeviceBackButtonHandler.enable();
      },

      /**
       * Find view object correspond dom element queried by CSS selector.
       *
       * @param {String} selector CSS selector
       * @param {HTMLElement} [dom]
       * @return {Object/void}
       */
      findComponent: function(selector, dom) {
        var target = (dom ? dom : document).querySelector(selector);
        return target ? angular.element(target).data(target.nodeName.toLowerCase()) || null : null;
      },

      /**
       * @return {Boolean}
       */
      isReady: function() {
        return !ons._readyLock.isLocked();
      },

      /**
       * @param {HTMLElement} dom
       */
      compile : function(dom) {
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
      },

      _getOnsenService: function() {
        if (!this._onsenService) {
          throw new Error('$onsen is not loaded, wait for ons.ready().');
        }

        return this._onsenService;
      },

      /**
       * @param {Array} [dependencies]
       * @param {Function} callback
       */
      ready : function(/* dependencies, */callback) {
        if (callback instanceof Function) {
          if (ons.isReady()) {
            callback();
          } else {
            ons._readyLock.waitUnlock(callback);
          }
        } else if (angular.isArray(callback) && arguments[1] instanceof Function) {
          var dependencies = callback;
          callback = arguments[1];

          ons.ready(function() {
            var $onsen = ons._getOnsenService();
            $onsen.waitForVariables(dependencies, callback);
          });
        }
      },

      /**
       * @return {Boolean}
       */
      isWebView: function() {
        if (document.readyState === 'loading' || document.readyState == 'uninitialized') {
          throw new Error('isWebView() method is available after dom contents loaded.');
        }

        return !!(window.cordova || window.phonegap || window.PhoneGap);
      },

      /**
       * @param {String} page
       * @return {Promise}
       */
      createAlertDialog: function(page) {
        if (!page) {
          throw new Error('Page url must be defined.');
        }

        var alertDialog = angular.element('<ons-alert-dialog>'),
          $onsen = this._getOnsenService();
        
        angular.element(document.body).append(angular.element(alertDialog));

        return $onsen.getPageHTMLAsync(page).then(function(html) {
          var div = document.createElement('div');
          div.innerHTML = html;

          var el = angular.element(div.querySelector('ons-alert-dialog'));

          // Copy attributes and insert html.
          var attrs = el.prop('attributes');
          for (var i = 0, l = attrs.length; i < l; i++) {
            alertDialog.attr(attrs[i].name, attrs[i].value); 
          }
          alertDialog.html(el.html());
          ons.compile(alertDialog[0]);
      
          if (el.attr('disabled')) {
            alertDialog.attr('disabled', 'disabled');
          }

          return  alertDialog.data('ons-alert-dialog');
        });
      },

      /**
      * @param {String} page
      * @return {Promise}
      */
      createDialog: function(page) {
        if (!page) {
          throw new Error('Page url must be defined.');
        }

        var dialog = angular.element('<ons-dialog>'),
        $onsen = this._getOnsenService();

        angular.element(document.body).append(angular.element(dialog));

        return $onsen.getPageHTMLAsync(page).then(function(html) {
          var div = document.createElement('div');
          div.innerHTML = html;

          var el = angular.element(div.querySelector('ons-dialog'));

          // Copy attributes and insert html.
          var attrs = el.prop('attributes');
          for (var i = 0, l = attrs.length; i < l; i++) {
            dialog.attr(attrs[i].name, attrs[i].value); 
          }
          dialog.html(el.html());
          ons.compile(dialog[0]);

          if (el.attr('disabled')) {
            dialog.attr('disabled', 'disabled');
          }

          var deferred = ons._qService.defer();

          dialog.on('ons-dialog:init', function(e) {
            // Copy "style" attribute from parent.
            var child = dialog[0].querySelector('.dialog');
            if (el[0].hasAttribute('style')) {
              var parentStyle = el[0].getAttribute('style'),
              childStyle = child.getAttribute('style'),
              newStyle = (function(a, b) {
                var c =
                (a.substr(-1) === ';' ? a : a + ';') + 
                  (b.substr(-1) === ';' ? b : b + ';'); 
                return c;
              })(parentStyle, childStyle);

              child.setAttribute('style', newStyle);
            }

            deferred.resolve(e.component);
          });

          return deferred.promise;
        });
      },

      /**
       * @param {String} page
       * @return {Promise}
       */
      createPopover: function(page) {
        if (!page) {
          throw new Error('Page url must be defined.');
        }

        var popover = angular.element('<ons-popover>'),
          $onsen = this._getOnsenService();
        
        angular.element(document.body).append(angular.element(popover));

        return $onsen.getPageHTMLAsync(page).then(function(html) {
          var div = document.createElement('div');
          div.innerHTML = html;

          var el = angular.element(div.querySelector('ons-popover'));

          // Copy attributes and insert html.
          var attrs = el.prop('attributes');
          for (var i = 0, l = attrs.length; i < l; i++) {
            popover.attr(attrs[i].name, attrs[i].value); 
          }
          popover.html(el.html());
          ons.compile(popover[0]);
      
          if (el.attr('disabled')) {
            popover.attr('disabled', 'disabled');
          }

          var deferred = ons._qService.defer();

          popover.on('ons-popover:init', function(e) {
            // Copy "style" attribute from parent.
            var child = popover[0].querySelector('.popover');
            if (el[0].hasAttribute('style')) {
              var parentStyle = el[0].getAttribute('style'),
                childStyle = child.getAttribute('style'),
                newStyle = (function(a, b) {
                var c =
                  (a.substr(-1) === ';' ? a : a + ';') + 
                  (b.substr(-1) === ';' ? b : b + ';'); 
                return c;
              })(parentStyle, childStyle);
  
              child.setAttribute('style', newStyle);
            }

            deferred.resolve(e.component);
          });

          return deferred.promise;
        });
      },

      platform: {
        /**
         * @return {Boolean}
         */
        isWebView: function() {
          return ons.isWebView();
        },
        /**
         * @return {Boolean}
         */
        isIOS: function() {
          return /iPhone|iPad|iPod/i.test(navigator.userAgent);
        },
        /**
         * @return {Boolean}
         */
        isAndroid: function() {
          return /Android/i.test(navigator.userAgent);
        },
        /**
         * @return {Boolean}
         */
        isIPhone: function() {
          return /iPhone/i.test(navigator.userAgent);
        },
        /**
         * @return {Boolean}
         */
        isIPad: function() {
          return /iPad/i.test(navigator.userAgent);
        },
        /**
         * @return {Boolean}
         */
        isBlackBerry: function() {
          return /BlackBerry|RIM Tablet OS|BB10/i.test(navigator.userAgent);
        },
        /**
         * @return {Boolean}
         */
        isOpera: function() {
          return (!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0);
        },
        /**
         * @return {Boolean}
         */
        isFirefox: function() {
          return (typeof InstallTrigger !== 'undefined');
        },
        /**
         * @return {Boolean}
         */
        isSafari: function() {
          return (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0);
        },
        /**
         * @return {Boolean}
         */
        isChrome: function() {
          return (!!window.chrome && !(!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0));
        },
        /**
         * @return {Boolean}
         */
        isIE: function() {
          return false || !!document.documentMode;
        },
        /**
         * @return {Boolean}
         */
        isIOS7above: function() {
          if(/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            var ver = (navigator.userAgent.match(/\b[0-9]+_[0-9]+(?:_[0-9]+)?\b/)||[''])[0].replace(/_/g,'.');
            return (parseInt(ver.split('.')[0]) >= 7);
          }
          return false;
        }
      }
    };
    return ons;
  }

})();
