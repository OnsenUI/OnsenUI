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
 * @name ons.platform
 * @category util
 * @description 
 *   [en]Utility methods to detect current platform.[/en]
 *   [ja]現在実行されているプラットフォームを検知するためのユーティリティメソッドを収めたオブジェクトです。[/ja]
 */

/**
 * @ngdoc method
 * @signature isWebView()
 * @description 
 *   [en]Returns whether app is running in Cordova.[/en]
 *   [ja]Cordova内で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isIOS()
 * @description 
 *   [en]Returns whether the OS is iOS.[/en]
 *   [ja]iOS上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isAndroid()
 * @description 
 *   [en]Returns whether the OS is Android.[/en]
 *   [ja]Android上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isIPhone()
 * @description 
 *   [en]Returns whether the device is iPhone.[/en]
 *   [ja]iPhone上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isIPad()
 * @description 
 *   [en]Returns whether the device is iPad.[/en]
 *   [ja]iPad上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isBlackBerry()
 * @description 
 *   [en]Returns whether the device is BlackBerry.[/en]
 *   [ja]BlackBerry上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isOpera()
 * @description 
 *   [en]Returns whether the browser is Opera.[/en]
 *   [ja]Opera上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isFirefox()
 * @description 
 *   [en]Returns whether the browser is Firefox.[/en]
 *   [ja]Firefox上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isSafari()
 * @description 
 *   [en]Returns whether the browser is Safari.[/en]
 *   [ja]Safari上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isChrome()
 * @description 
 *   [en]Returns whether the browser is Chrome.[/en]
 *   [ja]Chrome上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isIE()
 * @description 
 *   [en]Returns whether the browser is Internet Explorer.[/en]
 *   [ja]Internet Explorer上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isIOS7above()
 * @description 
 *   [en]Returns whether the iOS version is 7 or above.[/en]
 *   [ja]iOS7以上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

(function() {
  'use strict';
  window.ons.platform = {
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
  };
})();

