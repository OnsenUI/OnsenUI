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
 * @object ons.platform
 * @category util
 * @description
 *   [en]Utility methods to detect current platform.[/en]
 *   [ja]現在実行されているプラットフォームを検知するためのユーティリティメソッドを収めたオブジェクトです。[/ja]
 */
class Platform {

  /**
   * All elements will be rendered as if the app was running on this platform.
   * @type {String}
   */
  constructor() {
    this._renderPlatform = null;
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
  select(platform) {
    if (typeof platform === 'string') {
      this._renderPlatform = platform.trim().toLowerCase();
    }
  }

  /**
   * @method isWebView
   * @signature isWebView()
   * @description
   *   [en]Returns whether app is running in Cordova.[/en]
   *   [ja]Cordova内で実行されているかどうかを返します。[/ja]
   * @return {Boolean}
   */
  isWebView() {
    if (document.readyState === 'loading' || document.readyState == 'uninitialized') {
      throw new Error('isWebView() method is available after dom contents loaded.');
    }

    return !!(window.cordova || window.phonegap || window.PhoneGap);
  }

  /**
   * @method isIOS
   * @signature isIOS()
   * @description
   *   [en]Returns whether the OS is iOS.[/en]
   *   [ja]iOS上で実行されているかどうかを返します。[/ja]
   * @return {Boolean}
   */
  isIOS() {
    if (this._renderPlatform) {
      return this._renderPlatform === 'ios';
    } else if (typeof device === 'object' && !/browser/i.test(device.platform)) {
      return /iOS/i.test(device.platform);
    } else {
      return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    }
  }

  /**
   * @method isAndroid
   * @signature isAndroid()
   * @description
   *   [en]Returns whether the OS is Android.[/en]
   *   [ja]Android上で実行されているかどうかを返します。[/ja]
   * @return {Boolean}
   */
  isAndroid() {
    if (this._renderPlatform) {
      return this._renderPlatform === 'android';
    } else if (typeof device === 'object' && !/browser/i.test(device.platform)) {
      return /Android/i.test(device.platform);
    } else {
      return /Android/i.test(navigator.userAgent);
    }
  }

  /**
   * @method isAndroidPhone
   * @signature isAndroidPhone()
   * @description
   *   [en]Returns whether the device is Android phone.[/en]
   *   [ja]Android携帯上で実行されているかどうかを返します。[/ja]
   * @return {Boolean}
   */
  isAndroidPhone() {
    return /Android/i.test(navigator.userAgent) && /Mobile/i.test(navigator.userAgent);
  }

  /**
   * @method isAndroidTablet
   * @signature isAndroidTablet()
   * @description
   *   [en]Returns whether the device is Android tablet.[/en]
   *   [ja]Androidタブレット上で実行されているかどうかを返します。[/ja]
   * @return {Boolean}
   */
  isAndroidTablet() {
    return /Android/i.test(navigator.userAgent) && !/Mobile/i.test(navigator.userAgent);
  }

  /**
   * @return {Boolean}
   */
  isWP() {
    if (this._renderPlatform) {
      return this._renderPlatform === 'wp';
    } else if (typeof device === 'object' && !/browser/i.test(device.platform)) {
      return /Win32NT|WinCE/i.test(device.platform);
    } else {
      return /Windows Phone|IEMobile|WPDesktop/i.test(navigator.userAgent);
    }
  }

  /**
   * @methos isIPhone
   * @signature isIPhone()
   * @description
   *   [en]Returns whether the device is iPhone.[/en]
   *   [ja]iPhone上で実行されているかどうかを返します。[/ja]
   * @return {Boolean}
   */
  isIPhone() {
    return /iPhone/i.test(navigator.userAgent);
  }

  /**
   * @method isIPad
   * @signature isIPad()
   * @description
   *   [en]Returns whether the device is iPad.[/en]
   *   [ja]iPad上で実行されているかどうかを返します。[/ja]
   * @return {Boolean}
   */
  isIPad() {
    return /iPad/i.test(navigator.userAgent);
  }

  /**
   * @return {Boolean}
   */
  isIPod() {
    return /iPod/i.test(navigator.userAgent);
  }

  /**
   * @method isBlackBerry
   * @signature isBlackBerry()
   * @description
   *   [en]Returns whether the device is BlackBerry.[/en]
   *   [ja]BlackBerry上で実行されているかどうかを返します。[/ja]
   * @return {Boolean}
   */
  isBlackBerry() {
    if (this._renderPlatform) {
      return this._renderPlatform === 'blackberry';
    } else if (typeof device === 'object' && !/browser/i.test(device.platform)) {
      return /BlackBerry/i.test(device.platform);
    } else {
      return /BlackBerry|RIM Tablet OS|BB10/i.test(navigator.userAgent);
    }
  }

  /**
   * @method isOpera
   * @signature isOpera()
   * @description
   *   [en]Returns whether the browser is Opera.[/en]
   *   [ja]Opera上で実行されているかどうかを返します。[/ja]
   * @return {Boolean}
   */
  isOpera() {
    if (this._renderPlatform) {
      return this._renderPlatform === 'opera';
    } else {
      return (!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0);
    }
  }

  /**
   * @method isFirefox
   * @signature isFirefox()
   * @description
   *   [en]Returns whether the browser is Firefox.[/en]
   *   [ja]Firefox上で実行されているかどうかを返します。[/ja]
   * @return {Boolean}
   */
  isFirefox() {
    if (this._renderPlatform) {
      return this._renderPlatform === 'firefox';
    } else {
      return (typeof InstallTrigger !== 'undefined');
    }
  }

  /**
   * @method isSafari
   * @signature isSafari()
   * @description
   *   [en]Returns whether the browser is Safari.[/en]
   *   [ja]Safari上で実行されているかどうかを返します。[/ja]
   * @return {Boolean}
   */
  isSafari() {
    if (this._renderPlatform) {
      return this._renderPlatform === 'safari';
    } else {
      return (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0) || (function (p) { return p.toString() === '[object SafariRemoteNotification]' })(!window['safari'] || safari.pushNotification);
    }
  }

  /**
   * @method isChrome
   * @signature isChrome()
   * @description
   *   [en]Returns whether the browser is Chrome.[/en]
   *   [ja]Chrome上で実行されているかどうかを返します。[/ja]
   * @return {Boolean}
   */
  isChrome() {
    if (this._renderPlatform) {
      return this._renderPlatform === 'chrome';
    } else {
      return (!!window.chrome && !(!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) && !(navigator.userAgent.indexOf(' Edge/') >= 0));
    }
  }

  /**
   * @method isIE
   * @signature isIE()
   * @description
   *   [en]Returns whether the browser is Internet Explorer.[/en]
   *   [ja]Internet Explorer上で実行されているかどうかを返します。[/ja]
   * @return {Boolean}
   */
  isIE() {
    if (this._renderPlatform) {
      return this._renderPlatform === 'ie';
    } else {
      return false || !!document.documentMode;
    }
  }

  /**
   * @method isEdge
   * @signature isEdge()
   * @description
   *   [en]Returns whether the browser is Edge.[/en]
   *   [ja]Edge上で実行されているかどうかを返します。[/ja]
   * @return {Boolean}
   */
  isEdge() {
    if (this._renderPlatform) {
      return this._renderPlatform === 'edge';
    } else {
      return navigator.userAgent.indexOf(' Edge/') >= 0;
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
  isIOS7above() {
    if (typeof device === 'object' && !/browser/i.test(device.platform)) {
      return (/iOS/i.test(device.platform) && (parseInt(device.version.split('.')[0]) >= 7));
    } else if(/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      const ver = (navigator.userAgent.match(/\b[0-9]+_[0-9]+(?:_[0-9]+)?\b/) || [''])[0].replace(/_/g, '.');
      return (parseInt(ver.split('.')[0]) >= 7);
    }
    return false;
  }

  /**
   * @return {String}
   */
  getMobileOS() {
    if (this.isAndroid()) {
      return 'android';
    }
    else if (this.isIOS()) {
      return 'ios';
    }
    else if (this.isWP()) {
      return 'wp';
    }
    else {
      return 'other';
    }
  }

  /**
   * @return {String}
   */
  getIOSDevice() {
    if (this.isIPhone()) {
      return 'iphone';
    }
    else if (this.isIPad()) {
      return 'ipad';
    }
    else if (this.isIPod()) {
      return 'ipod';
    }
    else {
      return 'na';
    }
  }
}


export default new Platform();
