import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
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
import BaseCheckboxElement from './base/base-checkbox';
import contentReady from '../ons/content-ready';
import GestureDetector from '../ons/gesture-detector';

var scheme = {
  '': 'switch--*',
  '.switch__input': 'switch--*__input',
  '.switch__handle': 'switch--*__handle',
  '.switch__toggle': 'switch--*__toggle'
};

var locations = {
  ios: [1, 21],
  material: [0, 16]
};

/**
 * @element ons-switch
 * @category form
 * @description
 *   [en]
 *     Switch component. The switch can be toggled both by dragging and tapping.
 *
 *     Will automatically displays a Material Design switch on Android devices.
 *   [/en]
 *   [ja]スイッチを表示するコンポーネントです。[/ja]
 * @modifier material
 *   [en]Material Design switch[/en]
 *   [ja][/ja]
 * @codepen LpXZQQ
 * @tutorial vanilla/Reference/switch
 * @guide theming.html#modifiers [en]More details about the `modifier` attribute[/en][ja]modifier属性の使い方[/ja]
 * @example
 * <ons-switch checked></ons-switch>
 * <ons-switch disabled></ons-switch>
 * <ons-switch modifier="material"></ons-switch>
 */

var SwitchElement = function (_BaseCheckboxElement) {
  _inherits(SwitchElement, _BaseCheckboxElement);

  function SwitchElement() {
    _classCallCheck(this, SwitchElement);

    var _this = _possibleConstructorReturn(this, (SwitchElement.__proto__ || _Object$getPrototypeOf(SwitchElement)).call(this));

    contentReady(_this, function () {
      _this.attributeChangedCallback('modifier', null, _this.getAttribute('modifier'));
    });

    _this._boundOnChange = _this._onChange.bind(_this);
    _this._boundOnRelease = _this._onRelease.bind(_this);
    return _this;
  }

  _createClass(SwitchElement, [{
    key: '_getPosition',


    /* Own props */

    value: function _getPosition(e) {
      var l = this._locations;
      return Math.min(l[1], Math.max(l[0], this._startX + e.gesture.deltaX));
    }
  }, {
    key: '_emitChangeEvent',
    value: function _emitChangeEvent() {
      util.triggerElementEvent(this, 'change', {
        value: this.checked,
        switch: this,
        isInteractive: true
      });
    }
  }, {
    key: '_onChange',
    value: function _onChange(event) {
      if (event && event.stopPropagation) {
        event.stopPropagation();
      }

      this._emitChangeEvent();
    }
  }, {
    key: '_onClick',
    value: function _onClick(ev) {
      if (ev.target.classList.contains(this.defaultElementClass + '__touch')) {
        ev.preventDefault();
      }
    }
  }, {
    key: '_onHold',
    value: function _onHold(e) {
      if (!this.disabled) {
        ModifierUtil.addModifier(this, 'active');
        document.addEventListener('release', this._boundOnRelease);
      }
    }
  }, {
    key: '_onDragStart',
    value: function _onDragStart(e) {
      if (this.disabled || ['left', 'right'].indexOf(e.gesture.direction) === -1) {
        ModifierUtil.removeModifier(this, 'active');
        return;
      }

      e.consumed = true;

      ModifierUtil.addModifier(this, 'active');
      this._startX = this._locations[this.checked ? 1 : 0]; // - e.gesture.deltaX;

      this.addEventListener('drag', this._onDrag);
      document.addEventListener('release', this._boundOnRelease);
    }
  }, {
    key: '_onDrag',
    value: function _onDrag(e) {
      e.stopPropagation();
      e.gesture.preventDefault();
      this._handle.style.left = this._getPosition(e) + 'px';
    }
  }, {
    key: '_onRelease',
    value: function _onRelease(e) {
      var l = this._locations;
      var position = this._getPosition(e);
      var previousValue = this.checked;

      this.checked = position >= (l[0] + l[1]) / 2;

      if (this.checked !== previousValue) {
        this._emitChangeEvent();
      }

      this.removeEventListener('drag', this._onDrag);
      document.removeEventListener('release', this._boundOnRelease);

      this._handle.style.left = '';
      ModifierUtil.removeModifier(this, 'active');
    }
  }, {
    key: 'click',
    value: function click() {
      if (!this.disabled) {
        this.checked = !this.checked;
        this._emitChangeEvent();
      }
    }
  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      var _this2 = this;

      contentReady(this, function () {
        _this2._input.addEventListener('change', _this2._boundOnChange);
      });

      this.addEventListener('dragstart', this._onDragStart);
      this.addEventListener('hold', this._onHold);
      this.addEventListener('tap', this.click);
      this.addEventListener('click', this._onClick);
      this._gestureDetector = new GestureDetector(this, { dragMinDistance: 1, holdTimeout: 251 });
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      var _this3 = this;

      contentReady(this, function () {
        _this3._input.removeEventListener('change', _this3._boundOnChange);
      });

      this.removeEventListener('dragstart', this._onDragStart);
      this.removeEventListener('hold', this._onHold);
      this.removeEventListener('tap', this.click);
      this.removeEventListener('click', this._onClick);
      if (this._gestureDetector) {
        this._gestureDetector.dispose();
      }
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, last, current) {
      if (name === 'modifier') {
        var md = (current || '').indexOf('material') !== -1;
        this._locations = locations[md ? 'material' : 'ios'];
      }

      _get(SwitchElement.prototype.__proto__ || _Object$getPrototypeOf(SwitchElement.prototype), 'attributeChangedCallback', this).call(this, name, last, current);
    }

    /**
     * @event change
     * @description
     *   [en]Fired when the switch is toggled.[/en]
     *   [ja]ON/OFFが変わった時に発火します。[/ja]
     * @param {Object} event
     *   [en]Event object.[/en]
     *   [ja]イベントオブジェクト。[/ja]
     * @param {Object} event.switch
     *   [en]Switch object.[/en]
     *   [ja]イベントが発火したSwitchオブジェクトを返します。[/ja]
     * @param {Boolean} event.value
     *   [en]Current value.[/en]
     *   [ja]現在の値を返します。[/ja]
     * @param {Boolean} event.isInteractive
     *   [en]True if the change was triggered by the user clicking on the switch.[/en]
     *   [ja]タップやクリックなどのユーザの操作によって変わった場合にはtrueを返します。[/ja]
     */

    /**
     * @attribute modifier
     * @type {String}
     * @description
     *  [en]The appearance of the switch.[/en]
     *  [ja]スイッチの表現を指定します。[/ja]
     */

    /**
     * @attribute disabled
     * @description
     *   [en]Whether the switch is be disabled.[/en]
     *   [ja]スイッチを無効の状態にする場合に指定します。[/ja]
     */

    /**
     * @attribute checked
     * @description
     *   [en]Whether the switch is checked.[/en]
     *   [ja]スイッチがONの状態にするときに指定します。[/ja]
     */

    /**
     * @attribute input-id
     * @type {String}
     * @description
     *   [en]Specify the `id` attribute of the inner `<input>` element. This is useful when using `<label for="...">` elements.[/en]
     *   [ja][/ja]
     */

    /**
     * @property checked
     * @type {Boolean}
     * @description
     *   [en]This value is `true` if the switch is checked.[/en]
     *   [ja]スイッチがONの場合に`true`。[/ja]
     */

    /**
     * @property value
     * @type {String}
     * @description
     *   [en]The current value of the input.[/en]
     *   [ja][/ja]
     */

    /**
     * @property disabled
     * @type {Boolean}
     * @description
     *   [en]Whether the element is disabled or not.[/en]
     *   [ja]無効化されている場合に`true`。[/ja]
     */

    /**
     * @property checkbox
     * @readonly
     * @type {HTMLElement}
     * @description
     *   [en]The underlying checkbox element.[/en]
     *   [ja]コンポーネント内部のcheckbox要素になります。[/ja]
     */

  }, {
    key: '_scheme',
    get: function get() {
      return scheme;
    }
  }, {
    key: '_defaultClassName',
    get: function get() {
      return 'switch';
    }
  }, {
    key: '_template',
    get: function get() {
      return '\n      <input type="' + this.type + '" class="' + this._defaultClassName + '__input">\n      <div class="' + this._defaultClassName + '__toggle">\n        <div class="' + this._defaultClassName + '__handle">\n          <div class="' + this._defaultClassName + '__touch"></div>\n        </div>\n      </div>\n    ';
    }
  }, {
    key: 'type',
    get: function get() {
      return 'checkbox';
    }
  }, {
    key: '_handle',
    get: function get() {
      return this.querySelector('.' + this._defaultClassName + '__handle');
    }
  }, {
    key: 'checkbox',
    get: function get() {
      return this._input;
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return [].concat(_toConsumableArray(_get(SwitchElement.__proto__ || _Object$getPrototypeOf(SwitchElement), 'observedAttributes', this)), ['modifier']);
    }
  }]);

  return SwitchElement;
}(BaseCheckboxElement);

export default SwitchElement;


ons.elements.Switch = SwitchElement;
customElements.define('ons-switch', SwitchElement);