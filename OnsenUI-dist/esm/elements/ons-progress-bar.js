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
import util from '../ons/util';
import autoStyle from '../ons/autostyle';
import ModifierUtil from '../ons/internal/modifier-util';
import BaseElement from './base/base-element';
import contentReady from '../ons/content-ready';

var scheme = {
  '.progress-bar': 'progress-bar--*',
  '.progress-bar__primary': 'progress-bar--*__primary',
  '.progress-bar__secondary': 'progress-bar--*__secondary'
};

var template = util.createElement('\n  <div class="progress-bar">\n    <div class="progress-bar__secondary"></div>\n    <div class="progress-bar__primary"></div>\n  </div>\n');

var INDET = 'indeterminate';

/**
 * @element ons-progress-bar
 * @category visual
 * @description
 *   [en]
 *     The component is used to display a linear progress bar. It can either display a progress bar that shows the user how much of a task has been completed. In the case where the percentage is not known it can be used to display an animated progress bar so the user can see that an operation is in progress.
 *   [/en]
 *   [ja][/ja]
 * @codepen zvQbGj
 * @tutorial vanilla/Reference/progress
 * @seealso ons-progress-circular
 *   [en]The `<ons-progress-circular>` component displays a circular progress indicator.[/en]
 *   [ja][/ja]
 * @example
 * <ons-progress-bar
 *  value="55"
 *  secondary-value="87">
 * </ons-progress-bar>
 *
 * <ons-progress-bar
 *  indeterminate>
 * </ons-progress-bar>
 */

var ProgressBarElement = function (_BaseElement) {
  _inherits(ProgressBarElement, _BaseElement);

  /**
   * @attribute modifier
   * @type {String}
   * @description
   *   [en]Change the appearance of the progress indicator.[/en]
   *   [ja]プログレスインジケータの見た目を変更します。[/ja]
   */

  /**
   * @attribute value
   * @type {Number}
   * @description
   *   [en]Current progress. Should be a value between 0 and 100.[/en]
   *   [ja]現在の進行状況の値を指定します。0から100の間の値を指定して下さい。[/ja]
   */

  /**
   * @attribute secondary-value
   * @type {Number}
   * @description
   *   [en]Current secondary progress. Should be a value between 0 and 100.[/en]
   *   [ja]現在の２番目の進行状況の値を指定します。0から100の間の値を指定して下さい。[/ja]
   */

  /**
   * @attribute indeterminate
   * @description
   *   [en]If this attribute is set, an infinite looping animation will be shown.[/en]
   *   [ja]この属性が設定された場合、ループするアニメーションが表示されます。[/ja]
   */

  function ProgressBarElement() {
    _classCallCheck(this, ProgressBarElement);

    var _this = _possibleConstructorReturn(this, (ProgressBarElement.__proto__ || _Object$getPrototypeOf(ProgressBarElement)).call(this));

    contentReady(_this, function () {
      return _this._compile();
    });
    return _this;
  }

  _createClass(ProgressBarElement, [{
    key: '_compile',
    value: function _compile() {
      if (!this._isCompiled()) {
        this._template = template.cloneNode(true);
      } else {
        this._template = util.findChild(this, '.progress-bar');
      }

      this._primary = util.findChild(this._template, '.progress-bar__primary');
      this._secondary = util.findChild(this._template, '.progress-bar__secondary');

      this._updateDeterminate();
      this._updateValue();

      this.appendChild(this._template);

      autoStyle.prepare(this);
      ModifierUtil.initModifier(this, scheme);
    }
  }, {
    key: '_isCompiled',
    value: function _isCompiled() {
      if (!util.findChild(this, '.progress-bar')) {
        return false;
      }

      var barElement = util.findChild(this, '.progress-bar');

      if (!util.findChild(barElement, '.progress-bar__secondary')) {
        return false;
      }

      if (!util.findChild(barElement, '.progress-bar__primary')) {
        return false;
      }

      return true;
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, last, current) {
      if (name === 'modifier') {
        ModifierUtil.onModifierChanged(last, current, this, scheme);
        this.hasAttribute(INDET) && this._updateDeterminate();
      } else if (name === 'value' || name === 'secondary-value') {
        this._updateValue();
      } else if (name === INDET) {
        this._updateDeterminate();
      }
    }
  }, {
    key: '_updateDeterminate',
    value: function _updateDeterminate() {
      var _this2 = this;

      contentReady(this, function () {
        return util.toggleModifier(_this2, INDET, { force: _this2.hasAttribute(INDET) });
      });
    }
  }, {
    key: '_updateValue',
    value: function _updateValue() {
      var _this3 = this;

      contentReady(this, function () {
        _this3._primary.style.width = _this3.hasAttribute('value') ? _this3.getAttribute('value') + '%' : '0%';
        _this3._secondary.style.width = _this3.hasAttribute('secondary-value') ? _this3.getAttribute('secondary-value') + '%' : '0%';
      });
    }

    /**
     * @property value
     * @type {Number}
     * @description
     *   [en]Current progress. Should be a value between 0 and 100.[/en]
     *   [ja]現在の進行状況の値を指定します。0から100の間の値を指定して下さい。[/ja]
     */

  }, {
    key: 'value',
    set: function set(value) {
      if (typeof value !== 'number' || value < 0 || value > 100) {
        throw new Error('Invalid value');
      }

      this.setAttribute('value', Math.floor(value));
    },
    get: function get() {
      return parseInt(this.getAttribute('value') || '0');
    }

    /**
     * @property secondaryValue
     * @type {Number}
     * @description
     *   [en]Current secondary progress. Should be a value between 0 and 100.[/en]
     *   [ja]現在の２番目の進行状況の値を指定します。0から100の間の値を指定して下さい。[/ja]
     */

  }, {
    key: 'secondaryValue',
    set: function set(value) {
      if (typeof value !== 'number' || value < 0 || value > 100) {
        throw new Error('Invalid value');
      }

      this.setAttribute('secondary-value', Math.floor(value));
    },
    get: function get() {
      return parseInt(this.getAttribute('secondary-value') || '0');
    }

    /**
     * @property indeterminate
     * @type {Boolean}
     * @description
     *   [en]If this property is `true`, an infinite looping animation will be shown.[/en]
     *   [ja]この属性が設定された場合、ループするアニメーションが表示されます。[/ja]
     */

  }, {
    key: 'indeterminate',
    set: function set(value) {
      if (value) {
        this.setAttribute(INDET, '');
      } else {
        this.removeAttribute(INDET);
      }
    },
    get: function get() {
      return this.hasAttribute(INDET);
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['modifier', 'value', 'secondary-value', INDET];
    }
  }]);

  return ProgressBarElement;
}(BaseElement);

export default ProgressBarElement;


ons.elements.ProgressBar = ProgressBarElement;
customElements.define('ons-progress-bar', ProgressBarElement);