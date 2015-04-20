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

(ons => {
  'use strict';

  ons.platform = {
    /**
     * All elements will be rendered as if the app was running on this platform.
     * @type {String}
     */
    _renderPlatform: '',
    /**
     * Sets the platform used to render the elements.
     * @param  {string} platform Name of the platform
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
      if (!ons.platform._renderPlatform) {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
      } else {
        return ons.platform._renderPlatform === 'ios';
      }
    },

    /**
     * @return {Boolean}
     */
    isAndroid: function() {
      if (!ons.platform._renderPlatform) {
        return /Android/i.test(navigator.userAgent);
      } else {
        return ons.platform._renderPlatform === 'android';
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
      if (!ons.platform._renderPlatform) {
        return /BlackBerry|RIM Tablet OS|BB10/i.test(navigator.userAgent);
      } else {
        return ons.platform._renderPlatform === 'blackberry';
      }
    },

    /**
     * @return {Boolean}
     */
    isOpera: function() {
      if (!ons.platform._renderPlatform) {
        return (!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0);
      } else {
        return ons.platform._renderPlatform === 'opera';
      }
    },

    /**
     * @return {Boolean}
     */
    isFirefox: function() {
      if (!ons.platform._renderPlatform) {
        return (typeof InstallTrigger !== 'undefined');
      } else {
        return ons.platform._renderPlatform === 'firefox';
      }
    },

    /**
     * @return {Boolean}
     */
    isSafari: function() {
      if (!ons.platform._renderPlatform) {
        return (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0);
      } else {
        return ons.platform._renderPlatform === 'safari';
      }
    },

    /**
     * @return {Boolean}
     */
    isChrome: function() {
      if (!ons.platform._renderPlatform) {
        return (!!window.chrome && !(!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0));
      } else {
        return ons.platform._renderPlatform === 'chrome';
      }
    },

    /**
     * @return {Boolean}
     */
    isIE: function() {
      if (!ons.platform._renderPlatform) {
        return false || !!document.documentMode;
      } else {
        return ons.platform._renderPlatform === 'ie';
      }
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
})(window.ons = window.ons || {});
