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
  var create = () => {
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
        this._installIsPortraitImplementation();
        this.emit('change', {isPortrait: this.isPortrait()});
      },

      _installIsPortraitImplementation: function() {
        var isPortrait = window.innerWidth < window.innerHeight;

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
        var isPortrait = this._isPortrait();

        // Wait for the dimensions to change because
        // of Android inconsistency.
        var nIter = 0;
        var interval = setInterval(function() {
          nIter++;

          var w = window.innerWidth,
            h = window.innerHeight;

          if ((isPortrait && w <= h) ||
             (!isPortrait && w >= h)) {
            this.emit('change', {isPortrait: isPortrait});
            clearInterval(interval);
          } else if (nIter === 50) {
            this.emit('change', {isPortrait: isPortrait});
            clearInterval(interval);
          }
        }.bind(this), 20);
      },

      // Run on not mobile browser.
      _onResize: function() {
        this.emit('change', {isPortrait: this.isPortrait()});
      }
    };

    MicroEvent.mixin(obj);

    return obj;
  };

  ons.orientation = create()._init();
})(window.ons = window.ons || {});
