import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
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

import ons from '../ons';
import orientation from '../ons/orientation';
import platform from '../ons/platform';
import BaseElement from './base/base-element';
import contentReady from '../ons/content-ready';

/**
 * @element ons-if
 * @category conditional
 * @tutorial vanilla/Reference/if
 * @description
 *   [en]
 *     Conditionally display content depending on the platform, device orientation or both.
 *
 *     Sometimes it is useful to conditionally hide or show certain components based on platform. When running on iOS the `<ons-if>` element can be used to hide the `<ons-fab>` element.
 *   [/en]
 *   [ja][/ja]
 * @guide theming.html#cross-platform-styling-autostyling [en]Information about cross platform styling[/en][ja]Information about cross platform styling[/ja]
 * @example
 * <ons-page>
 *   <ons-if orientation="landscape">
 *     Landscape view!
 *   </ons-if>
 *   <ons-if platform="android">
 *     This is Android.
 *   </ons-if>
 *   <ons-if platform="ios other">
 *     This is not Android.
 *   </ons-if>
 * </ons-page>
 */

var IfElement = function (_BaseElement) {
  _inherits(IfElement, _BaseElement);

  /**
   * @attribute platform
   * @initonly
   * @type {string}
   * @description
   *  [en]Space-separated platform names. Possible values are `"ios"`, `"android"`, `"windows"` and `"other"`.[/en]
   *  [ja][/ja]
   */

  /**
   * @attribute orientation
   * @type {string}
   * @description
   *  [en]Either `"portrait"` or `"landscape"`.[/en]
   *  [ja]portraitもしくはlandscapeを指定します[/ja]
   */

  function IfElement() {
    _classCallCheck(this, IfElement);

    var _this = _possibleConstructorReturn(this, (IfElement.__proto__ || _Object$getPrototypeOf(IfElement)).call(this));

    contentReady(_this, function () {
      if (platform._getSelectedPlatform() !== null) {
        _this._platformUpdate();
      } else if (!_this._isAllowedPlatform()) {
        while (_this.childNodes[0]) {
          _this.childNodes[0].remove();
        }
        _this._platformUpdate();
      }
    });

    _this._onOrientationChange();
    return _this;
  }

  _createClass(IfElement, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      orientation.on('change', this._onOrientationChange.bind(this));
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name) {
      if (name === 'orientation') {
        this._onOrientationChange();
      }
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      orientation.off('change', this._onOrientationChange);
    }
  }, {
    key: '_platformUpdate',
    value: function _platformUpdate() {
      this.style.display = this._isAllowedPlatform() ? '' : 'none';
    }
  }, {
    key: '_isAllowedPlatform',
    value: function _isAllowedPlatform() {
      return !this.getAttribute('platform') || this.getAttribute('platform').split(/\s+/).indexOf(platform.getMobileOS()) >= 0;
    }
  }, {
    key: '_onOrientationChange',
    value: function _onOrientationChange() {
      if (this.hasAttribute('orientation') && this._isAllowedPlatform()) {
        var conditionalOrientation = this.getAttribute('orientation').toLowerCase();
        var currentOrientation = orientation.isPortrait() ? 'portrait' : 'landscape';

        this.style.display = conditionalOrientation === currentOrientation ? '' : 'none';
      }
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['orientation'];
    }
  }]);

  return IfElement;
}(BaseElement);

export default IfElement;


ons.elements.If = IfElement;
customElements.define('ons-if', IfElement);