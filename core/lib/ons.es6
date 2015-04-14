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

  ons._readyLock = new DoorLock();
  ons._config = {autoStatusBarFill: true};

  waitDeviceReady();

  /**
   * @return {Boolean}
   */
  ons.isReady = () => {
    return !ons._readyLock.isLocked();
  };

  /**
   * @return {Boolean}
   */
  ons.isWebView = () => {
    if (document.readyState === 'loading' || document.readyState == 'uninitialized') {
      throw new Error('isWebView() method is available after dom contents loaded.');
    }

    return !!(window.cordova || window.phonegap || window.PhoneGap);
  };

  /**
   * @param {Function} callback
   */
  ons.ready = callback => {
    if (ons.isReady()) {
      callback();
    } else {
      ons._readyLock.waitUnlock(callback);
    }
  };

  /**
   * Enable status bar fill feature on iOS7 and above.
   */
  ons.enableAutoStatusBarFill = () => {
    if (this.isReady()) {
      throw new Error('This method must be called before ons.isReady() is true.');
    }
    this._config.autoStatusBarFill = true;
  };

  /**
   * Disable status bar fill feature on iOS7 and above.
   */
  ons.disableAutoStatusBarFill = () => {
    if (this.isReady()) {
      throw new Error('This method must be called before ons.isReady() is true.');
    }
    this._config.autoStatusBarFill = false;
  };

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

})(window.ons = window.ons || {});
