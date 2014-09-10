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

window.ons.orientation = (function() {
  return create()._init();

  function create() {
    var obj = {
      // actual implementation to detect if whether current screen is portrait or not
      _isPortrait: false,

      /**
       * @return {Boolean}
       */
      isPortrait: function() {
        return this._isPortrait();
      },

      /**
       * @return {Boolean}
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
        this._installIsPortraintImplementation();
        this.emit('change', {isPortrait: this.isPortrait()});
      },

      _installIsPortraintImplementation: function() {
        var isPortrait = window.innerWidth < window.innerHeight;

        if (!('orientation' in window)) {
          this._isPortrait = function() {
            return window.innerHeight > window.innerWidth;
          };
        } else if (window.orientation % 180 === 0) {
          this._isPortrait = function() {
            return window.orientation % 180 === 0 ? isPortrait : !isPortrait;
          };
        } else {
          this._isPortrait = function() {
            return window.orientation % 180 === 90 ? isPortrait : !isPortrait;
          };
        }
      },

      _onOrientationChange: function() {
        // We use setImmediate because window's dimention information is not updated on "orientationchange" in some cases.
        setImmediate(function() {
          this.emit('change', {isPortrait: this.isPortrait()});
        }.bind(this));
      },

      // Run on not mobile browser.
      _onResize: function() {
        if ('_lastScreenIsPortraitOrNot' in this) {
          if (this.isPortrait() !== this._lastScreenIsPortraitOrNot) {
            this.emit('change', {isPortrait: this.isPortrait()});
          }
        } else {
          this.emit('change', {isPortrait: this.isPortrait()});
        }

        this._lastScreenIsPortraitOrNot = this.isPortrait();
      }
    };

    MicroEvent.mixin(obj);

    return obj;
  }
})();

