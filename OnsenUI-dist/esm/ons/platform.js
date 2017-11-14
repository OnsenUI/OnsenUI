import _typeof from 'babel-runtime/helpers/typeof';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
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

// Save HTMLElement object before Custom Elements polyfill patch global HTMLElement.
var NativeHTMLElement = window.HTMLElement;

/**
 * @object ons.platform
 * @category util
 * @description
 *   [en]Utility methods to detect current platform.[/en]
 *   [ja]現在実行されているプラットフォームを検知するためのユーティリティメソッドを収めたオブジェクトです。[/ja]
 */

var Platform = function () {

  /**
   * All elements will be rendered as if the app was running on this platform.
   * @type {String}
   */
  function Platform() {
    _classCallCheck(this, Platform);

    this._selectedPlatform = null;
    this._ignorePlatformSelect = false;
  }

  /**
   * @method select
   * @signature select(platform)
   * @param  {string} platform Name of the platform.
   *   [en]Possible values are: "opera", "firefox", "safari", "chrome", "ie", "android", "blackberry", "ios" or "wp".[/en]
   *   [ja]"opera", "firefox", "safari", "chrome", "ie", "android", "blackberry", "ios", "wp"のいずれかを指定します。[/ja]
   * @description
   *   [en]Sets the platform used to render the elements. Useful for testing.[/en]
   *   [ja]要素を描画するために利用するプラットフォーム名を設定します。テストに便利です。[/ja]
   */


  _createClass(Platform, [{
    key: 'select',
    value: function select(platform) {
      if (typeof platform === 'string') {
        this._selectedPlatform = platform.trim().toLowerCase();
      }
    }
  }, {
    key: '_getSelectedPlatform',
    value: function _getSelectedPlatform() {
      return this._ignorePlatformSelect ? null : this._selectedPlatform;
    }
  }, {
    key: '_runOnActualPlatform',
    value: function _runOnActualPlatform(fn) {
      this._ignorePlatformSelect = true;
      var result = fn();
      this._ignorePlatformSelect = false;

      return result;
    }

    //----------------
    // General
    //----------------
    /**
     * @method isWebView
     * @signature isWebView()
     * @description
     *   [en]Returns whether app is running in Cordova.[/en]
     *   [ja]Cordova内で実行されているかどうかを返します。[/ja]
     * @return {Boolean}
     */

  }, {
    key: 'isWebView',
    value: function isWebView() {
      if (document.readyState === 'loading' || document.readyState == 'uninitialized') {
        throw new Error('isWebView() method is available after dom contents loaded.');
      }

      return !!(window.cordova || window.phonegap || window.PhoneGap);
    }

    //----------------
    // iOS devices
    //----------------
    /**
     * @method isIPhone
     * @signature isIPhone()
     * @description
     *   [en]Returns whether the device is iPhone.[/en]
     *   [ja]iPhone上で実行されているかどうかを返します。[/ja]
     * @return {Boolean}
     */

  }, {
    key: 'isIPhone',
    value: function isIPhone() {
      return (/iPhone/i.test(navigator.userAgent)
      );
    }

    /**
     * @method isIPhoneX
     * @signature isIPhoneX()
     * @description
     *   [en]Returns whether the device is iPhone X.[/en]
     *   [ja]iPhone X上で実行されているかどうかを返します。[/ja]
     * @return {Boolean}
     */

  }, {
    key: 'isIPhoneX',
    value: function isIPhoneX() {
      // iPhone 8 and iPhone X have a same user agent. We cannot avoid using window.screen.
      // This works well both in iOS Safari and (UI|WK)WebView of iPhone X.
      return this.isIPhone() && window.screen.width === 375 && window.screen.height === 812;
    }

    /**
     * @method isIPad
     * @signature isIPad()
     * @description
     *   [en]Returns whether the device is iPad.[/en]
     *   [ja]iPad上で実行されているかどうかを返します。[/ja]
     * @return {Boolean}
     */

  }, {
    key: 'isIPad',
    value: function isIPad() {
      return (/iPad/i.test(navigator.userAgent)
      );
    }

    /**
     * @return {Boolean}
     */

  }, {
    key: 'isIPod',
    value: function isIPod() {
      return (/iPod/i.test(navigator.userAgent)
      );
    }

    //----------------
    // iOS versions
    //----------------
    /**
     * @method isIOS
     * @signature isIOS()
     * @description
     *   [en]Returns whether the OS is iOS.[/en]
     *   [ja]iOS上で実行されているかどうかを返します。[/ja]
     * @return {Boolean}
     */

  }, {
    key: 'isIOS',
    value: function isIOS() {
      if (this._getSelectedPlatform()) {
        return this._getSelectedPlatform() === 'ios';
      }

      if ((typeof device === 'undefined' ? 'undefined' : _typeof(device)) === 'object' && !/browser/i.test(device.platform)) {
        return (/iOS/i.test(device.platform)
        );
      } else {
        return (/iPhone|iPad|iPod/i.test(navigator.userAgent)
        );
      }
    }

    /**
     * @method isIOS7above
     * @signature isIOS7above()
     * @description
     *   [en]Returns whether the iOS version is 7 or above.[/en]
     *   [ja]iOS7以上で実行されているかどうかを返します。[/ja]
     * @return {Boolean}
     */

  }, {
    key: 'isIOS7above',
    value: function isIOS7above() {
      if ((typeof device === 'undefined' ? 'undefined' : _typeof(device)) === 'object' && !/browser/i.test(device.platform)) {
        return (/iOS/i.test(device.platform) && parseInt(device.version.split('.')[0]) >= 7
        );
      } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        var ver = (navigator.userAgent.match(/\b[0-9]+_[0-9]+(?:_[0-9]+)?\b/) || [''])[0].replace(/_/g, '.');
        return parseInt(ver.split('.')[0]) >= 7;
      }
      return false;
    }

    //----------------
    // iOS browsers
    //----------------
    /**
     * @method isIOSSafari
     * @signature isIOSSafari()
     * @description
     *   [en]Returns whether app is running in iOS Safari.[/en]
     *   [ja]iOS Safariで実行されているかどうかを返します。[/ja]
     * @return {Boolean}
     */

  }, {
    key: 'isIOSSafari',
    value: function isIOSSafari() {
      var navigator = window.navigator;
      var ua = navigator.userAgent;

      return !!(this.isIOS() && ua.indexOf('Safari') !== -1 && ua.indexOf('Version') !== -1 && !navigator.standalone);
    }

    /**
     * @method isWKWebView
     * @signature isWKWebView()
     * @description
     *   [en]Returns whether app is running in WKWebView.[/en]
     *   [ja]WKWebViewで実行されているかどうかを返します。[/ja]
     * @return {Boolean}
     */

  }, {
    key: 'isWKWebView',
    value: function isWKWebView() {
      var lte9 = /constructor/i.test(NativeHTMLElement);
      return !!(this.isIOS() && window.webkit && window.webkit.messageHandlers && window.indexedDB && !lte9);
    }

    /**
     * @method isUIWebView
     * @signature isUIWebView()
     * @description
     *   [en]Returns whether app is running in UIWebView.[/en]
     *   [ja]UIWebViewで実行されているかどうかを返します。[/ja]
     * @return {Boolean}
     */

  }, {
    key: 'isUIWebView',
    value: function isUIWebView() {
      return !!(this.isIOS() && !this.isIOSSafari() && !this.isWKWebView());
    }

    //----------------
    // Android devices
    //----------------
    /**
     * @method isAndroidPhone
     * @signature isAndroidPhone()
     * @description
     *   [en]Returns whether the device is Android phone.[/en]
     *   [ja]Android携帯上で実行されているかどうかを返します。[/ja]
     * @return {Boolean}
     */

  }, {
    key: 'isAndroidPhone',
    value: function isAndroidPhone() {
      return (/Android/i.test(navigator.userAgent) && /Mobile/i.test(navigator.userAgent)
      );
    }

    /**
     * @method isAndroidTablet
     * @signature isAndroidTablet()
     * @description
     *   [en]Returns whether the device is Android tablet.[/en]
     *   [ja]Androidタブレット上で実行されているかどうかを返します。[/ja]
     * @return {Boolean}
     */

  }, {
    key: 'isAndroidTablet',
    value: function isAndroidTablet() {
      return (/Android/i.test(navigator.userAgent) && !/Mobile/i.test(navigator.userAgent)
      );
    }

    //----------------
    // Android versions
    //----------------
    /**
     * @method isAndroid
     * @signature isAndroid()
     * @description
     *   [en]Returns whether the OS is Android.[/en]
     *   [ja]Android上で実行されているかどうかを返します。[/ja]
     * @return {Boolean}
     */

  }, {
    key: 'isAndroid',
    value: function isAndroid() {
      if (this._getSelectedPlatform()) {
        return this._getSelectedPlatform() === 'android';
      }

      if ((typeof device === 'undefined' ? 'undefined' : _typeof(device)) === 'object' && !/browser/i.test(device.platform)) {
        return (/Android/i.test(device.platform)
        );
      } else {
        return (/Android/i.test(navigator.userAgent)
        );
      }
    }

    //----------------
    // Other devices
    //----------------
    /**
     * @return {Boolean}
     */

  }, {
    key: 'isWP',
    value: function isWP() {
      if (this._getSelectedPlatform()) {
        return this._getSelectedPlatform() === 'wp';
      }

      if ((typeof device === 'undefined' ? 'undefined' : _typeof(device)) === 'object' && !/browser/i.test(device.platform)) {
        return (/Win32NT|WinCE/i.test(device.platform)
        );
      } else {
        return (/Windows Phone|IEMobile|WPDesktop/i.test(navigator.userAgent)
        );
      }
    }

    /**
     * @method isBlackBerry
     * @signature isBlackBerry()
     * @description
     *   [en]Returns whether the device is BlackBerry.[/en]
     *   [ja]BlackBerry上で実行されているかどうかを返します。[/ja]
     * @return {Boolean}
     */

  }, {
    key: 'isBlackBerry',
    value: function isBlackBerry() {
      if (this._getSelectedPlatform()) {
        return this._getSelectedPlatform() === 'blackberry';
      }

      if ((typeof device === 'undefined' ? 'undefined' : _typeof(device)) === 'object' && !/browser/i.test(device.platform)) {
        return (/BlackBerry/i.test(device.platform)
        );
      } else {
        return (/BlackBerry|RIM Tablet OS|BB10/i.test(navigator.userAgent)
        );
      }
    }

    //----------------
    // Other browsers
    //----------------
    /**
     * @method isOpera
     * @signature isOpera()
     * @description
     *   [en]Returns whether the browser is Opera.[/en]
     *   [ja]Opera上で実行されているかどうかを返します。[/ja]
     * @return {Boolean}
     */

  }, {
    key: 'isOpera',
    value: function isOpera() {
      if (this._getSelectedPlatform()) {
        return this._getSelectedPlatform() === 'opera';
      }

      return !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    }

    /**
     * @method isFirefox
     * @signature isFirefox()
     * @description
     *   [en]Returns whether the browser is Firefox.[/en]
     *   [ja]Firefox上で実行されているかどうかを返します。[/ja]
     * @return {Boolean}
     */

  }, {
    key: 'isFirefox',
    value: function isFirefox() {
      if (this._getSelectedPlatform()) {
        return this._getSelectedPlatform() === 'firefox';
      }

      return typeof InstallTrigger !== 'undefined';
    }

    /**
     * @method isSafari
     * @signature isSafari()
     * @description
     *   [en]Returns whether the browser is Safari.[/en]
     *   [ja]Safari上で実行されているかどうかを返します。[/ja]
     * @return {Boolean}
     */

  }, {
    key: 'isSafari',
    value: function isSafari() {
      if (this._getSelectedPlatform()) {
        return this._getSelectedPlatform() === 'safari';
      }

      return Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || function (p) {
        return p.toString() === '[object SafariRemoteNotification]';
      }(!window['safari'] || safari.pushNotification);
    }

    /**
     * @method isChrome
     * @signature isChrome()
     * @description
     *   [en]Returns whether the browser is Chrome.[/en]
     *   [ja]Chrome上で実行されているかどうかを返します。[/ja]
     * @return {Boolean}
     */

  }, {
    key: 'isChrome',
    value: function isChrome() {
      if (this._getSelectedPlatform()) {
        return this._getSelectedPlatform() === 'chrome';
      }

      return !!window.chrome && !(!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) && !(navigator.userAgent.indexOf(' Edge/') >= 0);
    }

    /**
     * @method isIE
     * @signature isIE()
     * @description
     *   [en]Returns whether the browser is Internet Explorer.[/en]
     *   [ja]Internet Explorer上で実行されているかどうかを返します。[/ja]
     * @return {Boolean}
     */

  }, {
    key: 'isIE',
    value: function isIE() {
      if (this._getSelectedPlatform()) {
        return this._getSelectedPlatform() === 'ie';
      }

      return false || !!document.documentMode;
    }

    /**
     * @method isEdge
     * @signature isEdge()
     * @description
     *   [en]Returns whether the browser is Edge.[/en]
     *   [ja]Edge上で実行されているかどうかを返します。[/ja]
     * @return {Boolean}
     */

  }, {
    key: 'isEdge',
    value: function isEdge() {
      if (this._getSelectedPlatform()) {
        return this._getSelectedPlatform() === 'edge';
      }

      return navigator.userAgent.indexOf(' Edge/') >= 0;
    }

    //----------------
    // Utility functions
    //----------------
    /**
     * @return {String}
     */

  }, {
    key: 'getMobileOS',
    value: function getMobileOS() {
      if (this.isAndroid()) {
        return 'android';
      } else if (this.isIOS()) {
        return 'ios';
      } else if (this.isWP()) {
        return 'wp';
      } else {
        return 'other';
      }
    }

    /**
     * @return {String}
     */

  }, {
    key: 'getIOSDevice',
    value: function getIOSDevice() {
      if (this.isIPhone()) {
        return 'iphone';
      } else if (this.isIPad()) {
        return 'ipad';
      } else if (this.isIPod()) {
        return 'ipod';
      } else {
        return 'na';
      }
    }
  }]);

  return Platform;
}();

export default new Platform();