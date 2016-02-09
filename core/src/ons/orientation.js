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

const create = () => {

  /**
   * @object ons.orientation
   * @category util
   * @description
   *   [en]Utility methods for orientation detection.[/en]
   *   [ja]画面のオリエンテーション検知のためのユーティリティメソッドを収めているオブジェクトです。[/ja]
   */
  const obj = {
    /**
     * @event change
     * @description
     *   [en]Fired when the device orientation changes.[/en]
     *   [ja]デバイスのオリエンテーションが変化した際に発火します。[/ja]
     * @param {Object} event
     *   [en]Event object.[/en]
     *   [ja]イベントオブジェクトです。[/ja]
     * @param {Boolean} event.isPortrait
     *   [en]Will be true if the current orientation is portrait mode.[/en]
     *   [ja]現在のオリエンテーションがportraitの場合にtrueを返します。[/ja]
     */

    /**
     * @method on
     * @signature on(eventName, listener)
     * @description
     *   [en]Add an event listener.[/en]
     *   [ja]イベントリスナーを追加します。[/ja]
     * @param {String} eventName
     *   [en]Name of the event.[/en]
     *   [ja]イベント名を指定します。[/ja]
     * @param {Function} listener
     *   [en]Function to execute when the event is triggered.[/en]
     *   [ja]このイベントが発火された際に呼び出される関数オブジェクトを指定します。[/ja]
     */

    /**
     * @method once
     * @signature once(eventName, listener)
     * @description
     *  [en]Add an event listener that's only triggered once.[/en]
     *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
     * @param {String} eventName
     *   [en]Name of the event.[/en]
     *   [ja]イベント名を指定します。[/ja]
     * @param {Function} listener
     *   [en]Function to execute when the event is triggered.[/en]
     *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
     */

    /**
     * @method off
     * @signature off(eventName, [listener])
     * @description
     *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
     *  [ja]イベントリスナーを削除します。もしイベントリスナーを指定しなかった場合には、そのイベントに紐づく全てのイベントリスナーが削除されます。[/ja]
     * @param {String} eventName
     *   [en]Name of the event.[/en]
     *   [ja]イベント名を指定します。[/ja]
     * @param {Function} listener
     *   [en]Function to execute when the event is triggered.[/en]
     *   [ja]削除するイベントリスナーを指定します。[/ja]
     */

    // actual implementation to detect if whether current screen is portrait or not
    _isPortrait: false,

    /**
     * @method isPortrait
     * @signature isPortrait()
     * @return {Boolean}
     *   [en]Will be true if the current orientation is portrait mode.[/en]
     *   [ja]オリエンテーションがportraitモードの場合にtrueになります。[/ja]
     * @description
     *   [en]Returns whether the current screen orientation is portrait or not.[/en]
     *   [ja]オリエンテーションがportraitモードかどうかを返します。[/ja]
     */
    isPortrait: function() {
      return this._isPortrait();
    },

    /**
     * @method isLandscape
     * @signature isLandscape()
     * @return {Boolean}
     *   [en]Will be true if the current orientation is landscape mode.[/en]
     *   [ja]オリエンテーションがlandscapeモードの場合にtrueになります。[/ja]
     * @description
     *   [en]Returns whether the current screen orientation is landscape or not.[/en]
     *   [ja]オリエンテーションがlandscapeモードかどうかを返します。[/ja]
     */
    isLandscape: function() {
      return !this.isPortrait();
    },

    _init: function() {
      document.addEventListener('DOMContentLoaded', this._onDOMContentLoaded.bind(this), false);

      if ('orientation' in window) {
        window.addEventListener('orientationchange', this._onOrientationChange.bind(this), false);
      } else {
        window.addEventListener('resize', this._onResize.bind(this), false);
      }

      this._isPortrait = function() {
        return window.innerHeight > window.innerWidth;
      };

      return this;
    },

    _onDOMContentLoaded: function() {
      this._installIsPortraitImplementation();
      this.emit('change', {isPortrait: this.isPortrait()});
    },

    _installIsPortraitImplementation: function() {
      const isPortrait = window.innerWidth < window.innerHeight;

      if (!('orientation' in window)) {
        this._isPortrait = function() {
          return window.innerHeight > window.innerWidth;
        };
      } else if (window.orientation % 180 === 0) {
        this._isPortrait = function() {
          return Math.abs(window.orientation % 180) === 0 ? isPortrait : !isPortrait;
        };
      } else {
        this._isPortrait = function() {
          return Math.abs(window.orientation % 180) === 90 ? isPortrait : !isPortrait;
        };
      }
    },

    _onOrientationChange: function() {
      const isPortrait = this._isPortrait();

      // Wait for the dimensions to change because
      // of Android inconsistency.
      let nIter = 0;
      const interval = setInterval(() => {
        nIter++;

        const w = window.innerWidth;
        const h = window.innerHeight;

        if ((isPortrait && w <= h) ||
           (!isPortrait && w >= h)) {
          this.emit('change', {isPortrait: isPortrait});
          clearInterval(interval);
        } else if (nIter === 50) {
          this.emit('change', {isPortrait: isPortrait});
          clearInterval(interval);
        }
      }, 20);
    },

    // Run on not mobile browser.
    _onResize: function() {
      this.emit('change', {isPortrait: this.isPortrait()});
    }
  };

  MicroEvent.mixin(obj);

  return obj;
};

export default create()._init();
