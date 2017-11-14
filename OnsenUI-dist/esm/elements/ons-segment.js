import _Promise from 'babel-runtime/core-js/promise';
import _setImmediate from 'babel-runtime/core-js/set-immediate';
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

var defaultClassName = 'segment';
var scheme = {
  '': 'segment--*',
  '.segment__item': 'segment--*__item',
  '.segment__input': 'segment--*__input',
  '.segment__button': 'segment--*__button'
};

var generateId = function () {
  var i = 0;
  return function () {
    return 'ons-segment-gen-' + i++;
  };
}();

/**
 * @element ons-segment
 * @category control
 * @modifier material
 *   [en]Material Design segment[/en]
 *   [ja][/ja]
 * @description
 *   [en]
 *     Segment component. Use this component to have a button bar with automatic styles that switch on click of another button.
 *
 *     Will automatically display as a Material Design segment on Android.
 *   [/en]
 *   [ja][/ja]
 * @codepen hLayx
 * @tutorial vanilla/Reference/segment
 * @guide theming.html#modifiers [en]More details about the `modifier` attribute[/en][ja]modifier属性の使い方[/ja]
 * @guide theming.html#cross-platform-styling-autostyling [en]Information about cross platform styling[/en][ja]Information about cross platform styling[/ja]
 * @example
 * <ons-segment>
 *   <ons-button>Label 1</ons-button>
 *   <ons-button>Label 2</ons-button>
 *   <ons-button>Label 3</ons-button>
 * </ons-segment>
 */

var SegmentElement = function (_BaseElement) {
  _inherits(SegmentElement, _BaseElement);

  /**
   * @event postchange
   * @description
   *   [en]Fires after the active button is changed.[/en]
   *   [ja][/ja]
   * @param {Object} event
   *   [en]Event object.[/en]
   *   [ja][/ja]
   * @param {Number} event.index
   *   [en]Tapped button index.[/en]
   *   [ja][/ja]
   * @param {Object} event.segmentItem
   *   [en]Segment item object.[/en]
   *   [ja][/ja]
   */

  /**
   * @attribute modifier
   * @type {String}
   * @description
   *  [en]The appearance of the segment.[/en]
   *  [ja][/ja]
   */

  /**
   * @attribute tabbar-id
   * @initonly
   * @type {String}
   * @description
   *  [en]ID of the tabbar element to "connect" to the segment. Must be inside the same page.[/en]
   *  [ja][/ja]
   */

  /**
   * @attribute active-index
   * @initonly
   * @default 0
   * @type {Number}
   * @description
   *  [en]Index of the first active button, only works if there is no connected tabbar (in which case the active tab sets the active button).[/en]
   *  [ja][/ja]
   */

  /**
   * @attribute disabled
   * @description
   *   [en]Specify if segment should be disabled.[/en]
   *   [ja]ボタンを無効化する場合は指定します。[/ja]
   */

  function SegmentElement() {
    _classCallCheck(this, SegmentElement);

    var _this = _possibleConstructorReturn(this, (SegmentElement.__proto__ || _Object$getPrototypeOf(SegmentElement)).call(this));

    _this._segmentId = generateId();
    _this._tabbar = null;
    _this._onChange = _this._onChange.bind(_this);
    _this._onTabbarPreChange = _this._onTabbarPreChange.bind(_this);

    contentReady(_this, function () {
      _this._compile();
      _setImmediate(function () {
        return _this._lastActiveIndex = _this._tabbar ? _this._tabbar.getActiveTabIndex() : _this.getActiveButtonIndex();
      });
    });
    return _this;
  }

  _createClass(SegmentElement, [{
    key: '_compile',
    value: function _compile() {
      autoStyle.prepare(this);
      this.classList.add(defaultClassName);

      for (var index = this.children.length - 1; index >= 0; index--) {
        var item = this.children[index];
        item.classList.add('segment__item');

        var input = util.findChild(item, '.segment__input') || util.create('input.segment__input');
        input.type = 'radio';
        input.value = index;
        input.name = input.name || this._segmentId;
        input.checked = !this.hasAttribute('tabbar-id') && index === (parseInt(this.getAttribute('active-index')) || 0);

        var button = util.findChild(item, '.segment__button') || util.create('.segment__button');
        if (button.parentElement !== item) {
          while (item.firstChild) {
            button.appendChild(item.firstChild);
          }
        }

        item.appendChild(input);
        item.appendChild(button);
      }

      ModifierUtil.initModifier(this, scheme);
    }
  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      var _this2 = this;

      if (this.hasAttribute('tabbar-id')) {
        contentReady(this, function () {
          var page = util.findParent(_this2, 'ons-page');
          _this2._tabbar = page && page.querySelector('#' + _this2.getAttribute('tabbar-id'));
          if (!_this2._tabbar || _this2._tabbar.tagName !== 'ONS-TABBAR') {
            throw new Error('<ons-segment> error: no tabbar with id ' + _this2.getAttribute('tabbar-id') + ' was found.');
          }

          _this2._tabbar.setAttribute('hide-tabs', '');
          _setImmediate(function () {
            return _this2._setChecked(_this2._tabbar.getActiveTabIndex());
          });

          _this2._tabbar.addEventListener('prechange', _this2._onTabbarPreChange);
        });
      }

      this.addEventListener('change', this._onChange);
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      var _this3 = this;

      contentReady(this, function () {
        if (_this3._tabbar) {
          _this3._tabbar.removeEventListener('prechange', _this3._onTabbarPreChange);
          _this3._tabbar = null;
        }
      });
      this.removeEventListener('change', this._onChange);
    }
  }, {
    key: '_setChecked',
    value: function _setChecked(index) {
      this.children[index].firstElementChild.checked = true;
    }

    /**
     * @method setActiveButton
     * @signature setActiveButton(index, [options])
     * @param {Number} index
     *   [en]Button index.[/en]
     *   [ja][/ja]
     * @param {Object} [options]
     *   [en]Parameter object, works only if there is a connected tabbar. Supports the same options as `ons-tabbar`'s `setActiveTab` method.[/en]
     *   [ja][/ja]
     * @description
     *   [en]Make button with the specified index active. If there is a connected tabbar it shows the corresponding tab page. In this case animations and their options can be specified by the second parameter.[/en]
     *   [ja][/ja]
     * @return {Promise}
     *   [en]Resolves to the selected index or to the new page element if there is a connected tabbar.[/en]
     *   [ja][/ja]
     */

  }, {
    key: 'setActiveButton',
    value: function setActiveButton(index, options) {
      if (this._tabbar) {
        return this._tabbar.setActiveTab(index, options);
      }

      this._setChecked(index);
      this._postChange(index);
      return _Promise.resolve(index);
    }

    /**
     * @method getActiveButtonIndex
     * @signature getActiveButtonIndex()
     * @return {Number}
     *   [en]The index of the currently active button.[/en]
     *   [ja][/ja]
     * @description
     *   [en]Returns button index of current active button. If active button is not found, returns -1.[/en]
     *   [ja][/ja]
     */

  }, {
    key: 'getActiveButtonIndex',
    value: function getActiveButtonIndex() {
      for (var i = this.children.length - 1; i >= 0; i--) {
        // Array.findIndex
        if (this.children[i].firstElementChild.checked) {
          return i;
        }
      }
      return -1;
    }
  }, {
    key: '_onChange',
    value: function _onChange(event) {
      event.stopPropagation();
      this._tabbar ? this._tabbar.setActiveTab(this.getActiveButtonIndex(), { reject: false }) : this._postChange(this.getActiveButtonIndex());
    }
  }, {
    key: '_onTabbarPreChange',
    value: function _onTabbarPreChange(event) {
      var _this4 = this;

      _setImmediate(function () {
        if (!event.detail.canceled) {
          _this4._setChecked(event.index);
          _this4._postChange(event.index);
        }
      });
    }
  }, {
    key: '_postChange',
    value: function _postChange(index) {
      util.triggerElementEvent(this, 'postchange', {
        index: index,
        activeIndex: index,
        lastActiveIndex: this._lastActiveIndex,
        segmentItem: this.children[index]
      });
      this._lastActiveIndex = index;
    }

    /**
     * @property disabled
     * @type {Boolean}
     * @description
     *   [en]Whether the segment is disabled or not.[/en]
     *   [ja]無効化されている場合に`true`。[/ja]
     */

  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, last, current) {
      switch (name) {
        case 'class':
          util.restoreClass(this, defaultClassName, scheme);
          break;
        case 'modifier':
          ModifierUtil.onModifierChanged(last, current, this, scheme);
          break;
      }
    }
  }, {
    key: 'disabled',
    set: function set(value) {
      return util.toggleAttribute(this, 'disabled', value);
    },
    get: function get() {
      return this.hasAttribute('disabled');
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['class', 'modifier'];
    }
  }, {
    key: 'events',
    get: function get() {
      return ['postchange'];
    }
  }]);

  return SegmentElement;
}(BaseElement);

export default SegmentElement;


ons.elements.Segment = SegmentElement;
customElements.define('ons-segment', SegmentElement);