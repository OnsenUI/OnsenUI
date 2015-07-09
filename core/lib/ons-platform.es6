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

((ons) => {
  'use strict';

  ons.platform = {

    /**
     * All elements will be rendered as if the app was running on this platform.
     * @type {String}
     */
    _renderPlatform: null,

    /**
     * Sets the platform used to render the elements. Possible values are: "opera", "firefox", "safari", "chrome", "ie", "android", "blackberry", "ios" or "wp".
     * @param  {string} platform Name of the platform.
     */
    select: function (platform) {
      ons.platform._renderPlatform = platform.trim().toLowerCase();
    },

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
      if (ons.platform._renderPlatform) {
        return ons.platform._renderPlatform === 'ios';
      } else {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
      }
    },

    /**
     * @return {Boolean}
     */
    isAndroid: function() {
      if (ons.platform._renderPlatform) {
        return ons.platform._renderPlatform === 'android';
      } else {
        return /Android/i.test(navigator.userAgent);
      }
    },

    /**
     * @return {Boolean}
     */
    isAndroidPhone: function() {
      return /Android/i.test(navigator.userAgent) && /Mobile/i.test(navigator.userAgent);
    },

    /**
     * @return {Boolean}
     */
    isAndroidTablet: function() {
      return /Android/i.test(navigator.userAgent) && !/Mobile/i.test(navigator.userAgent);
    },

    /**
     * @return {Boolean}
     */
    isWP: function() {
      if (ons.platform._renderPlatform) {
        return ons.platform._renderPlatform === 'wp';
      } else {
        return /Windows Phone|IEMobile|WPDesktop/i.test(navigator.userAgent);
      }
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
      if (ons.platform._renderPlatform) {
        return ons.platform._renderPlatform === 'blackberry';
      } else {
        return /BlackBerry|RIM Tablet OS|BB10/i.test(navigator.userAgent);
      }
    },

    /**
     * @return {Boolean}
     */
    isOpera: function() {
      if (ons.platform._renderPlatform) {
        return ons.platform._renderPlatform === 'opera';
      } else {
        return (!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0);
      }
    },

    /**
     * @return {Boolean}
     */
    isFirefox: function() {
      if (ons.platform._renderPlatform) {
        return ons.platform._renderPlatform === 'firefox';
      } else {
        return (typeof InstallTrigger !== 'undefined');
      }
    },

    /**
     * @return {Boolean}
     */
    isSafari: function() {
      if (ons.platform._renderPlatform) {
        return ons.platform._renderPlatform === 'safari';
      } else {
        return (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0);
      }
    },

    /**
     * @return {Boolean}
     */
    isChrome: function() {
      if (ons.platform._renderPlatform) {
        return ons.platform._renderPlatform === 'chrome';
      } else {
        return (!!window.chrome && !(!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0));
      }
    },

    /**
     * @return {Boolean}
     */
    isIE: function() {
      if (ons.platform._renderPlatform) {
        return ons.platform._renderPlatform === 'ie';
      } else {
        return false || !!document.documentMode;
      }
    },

    /**
     * @return {Boolean}
     */
    isIOS7above: function() {
      if(/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        const ver = (navigator.userAgent.match(/\b[0-9]+_[0-9]+(?:_[0-9]+)?\b/) || [''])[0].replace(/_/g, '.');
        return (parseInt(ver.split('.')[0]) >= 7);
      }
      return false;
    }
  };
})(window.ons = window.ons || {});
