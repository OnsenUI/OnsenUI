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

  ons._internal = ons.internal || {};

  /**
   * @return {Boolean}
   */
  ons._internal.isEnabledAutoStatusBarFill = () => {
    return !!ons._config.autoStatusBarFill;
  };

  ons._internal.waitDOMContentLoaded = (callback) => {
    if (document.readyState === 'loading' || document.readyState == 'uninitialized') {
      window.document.addEventListener('DOMContentLoaded', callback);
    } else {
      setImmediate(callback);
    } 
  };

  /**
   * @param {HTMLElement} element
   * @return {Boolean}
   */
  ons._internal.shouldFillStatusBar = (element) => {
    if (ons._internal.isEnabledAutoStatusBarFill() && ons.platform.isWebView() && ons.platform.isIOS7Above()) {
      if (!(element instanceof HTMLElement)) {
        throw new Error('element must be an instance of HTMLElement');
      }

      for (;;) {
        if (element.hasAttribute('no-status-bar-fill')) {
          return false;
        }

        element = element.parentNode;
        if (!element || !element.hasAttribute) {
          return true;
        }
      }
    }
    return false;
  };

})(window.ons = window.ons || {});
