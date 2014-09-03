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
      // width and height on "orientationchange" event.
      _innerWidth: 0,
      _innerHeight: 0,

      /**
       * @return {Boolean}
       */
      isPortrait: function() {
        return this._innerWidth < this._innerHeight;
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

        this._updateDimentionInfo();

        return this;
      },

      _updateDimentionInfo: function() {
        this._innerWidth = window.innerWidth;
        this._innerHeight = window.innerHeight;
      },

      _onDOMContentLoaded: function() {
        this._updateDimentionInfo();
        this.emit('change', {isPortrait: this.isPortrait()});
      },

      _onOrientationChange: function() {
        // We use setImmediate because there is some cases that window's dimention information is not updated on "orientationchange".
        setImmediate(function() {
          this._updateDimentionInfo();
          this.emit('change', {isPortrait: this.isPortrait()});
        }.bind(this));
      },

      // Run on not mobile browser.
      _onResize: function() {
        var last = this.isPortrait();
        this._updateDimentionInfo();
        if (this.isPortrait() !== last) {
          this.emit('change', {isPortrait: this.isPortrait()});
        }
      }
    };

    MicroEvent.mixin(obj);

    return obj;
  }
})();

