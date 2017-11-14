import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _createClass from 'babel-runtime/helpers/createClass';
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

import ons from '../../ons';
import util from '../../ons/util';
import ModifierUtil from '../../ons/internal/modifier-util';
import AnimatorFactory from '../../ons/internal/animator-factory';
import OverlaySplitterAnimator from './overlay-animator';
import PushSplitterAnimator from './push-animator';
import RevealSplitterAnimator from './reveal-animator';
import BaseElement from '../base/base-element';
import deviceBackButtonDispatcher from '../../ons/internal/device-back-button-dispatcher';
import contentReady from '../../ons/content-ready';

var _animatorDict = {
  default: OverlaySplitterAnimator,
  overlay: OverlaySplitterAnimator,
  push: PushSplitterAnimator,
  reveal: RevealSplitterAnimator
};

/**
 * @element ons-splitter
 * @category menu
 * @description
 *  [en]
 *    A component that enables responsive layout by implementing both a two-column layout and a sliding menu layout.
 *
 *    It can be configured to automatically expand into a column layout on large screens and collapse the menu on smaller screens. When the menu is collapsed the user can open it by swiping.
 *  [/en]
 *  [ja][/ja]
 * @codepen rOQOML
 * @tutorial vanilla/Reference/splitter
 * @guide fundamentals.html#managing-pages
 *  [en]Managing multiple pages.[/en]
 *  [ja]複数のページを管理する[/ja]
 * @seealso ons-splitter-content
 *  [en]The `<ons-splitter-content>` component contains the main content of the page.[/en]
 *  [ja]ons-splitter-contentコンポーネント[/ja]
 * @seealso ons-splitter-side
 *  [en]The `<ons-splitter-side>` component contains the menu.[/en]
 *  [ja]ons-splitter-sideコンポーネント[/ja]
 * @example
 * <ons-splitter id="splitter">
 *   <ons-splitter-content>
 *     ...
 *   </ons-splitter-content>
 *
 *   <ons-splitter-side side="left" width="80%" collapse swipeable>
 *     ...
 *   </ons-splitter-side>
 * </ons-splitter>
 *
 * <script>
 *   var splitter = document.getElementById('splitter');
 *   splitter.left.open();
 * </script>
 */

var SplitterElement = function (_BaseElement) {
  _inherits(SplitterElement, _BaseElement);

  _createClass(SplitterElement, [{
    key: '_getSide',
    value: function _getSide(side) {
      var element = util.findChild(this, function (e) {
        return util.match(e, 'ons-splitter-side') && e.getAttribute('side') === side;
      });
      return element;
    }

    /**
     * @property left
     * @readonly
     * @type {HTMLElement}
     * @description
     *   [en]Left `<ons-splitter-side>` element.[/en]
     *   [ja][/ja]
     */

  }, {
    key: '_onDeviceBackButton',
    value: function _onDeviceBackButton(event) {
      this._sides.some(function (s) {
        return s.isOpen ? s.close() : false;
      }) || event.callParentHandler();
    }
  }, {
    key: '_onModeChange',
    value: function _onModeChange(e) {
      var _this2 = this;

      if (e.target.parentNode) {
        contentReady(this, function () {
          _this2._layout();
        });
      }
    }
  }, {
    key: '_layout',
    value: function _layout() {
      var _this3 = this;

      this._sides.forEach(function (side) {
        if (_this3.content) {
          _this3.content.style[side.side] = side.mode === 'split' ? side.style.width : 0;
        }
      });
    }
  }, {
    key: 'left',
    get: function get() {
      return this._getSide('left');
    }
    /**
     * @property right
     * @readonly
     * @type {HTMLElement}
     * @description
     *   [en]Right `<ons-splitter-side>` element.[/en]
     *   [ja][/ja]
     */

  }, {
    key: 'right',
    get: function get() {
      return this._getSide('right');
    }

    /**
     * @property side
     * @readonly
     * @type {HTMLElement}
     * @description
     *   [en]First `<ons-splitter-side>` element regardless the actual side.[/en]
     *   [ja][/ja]
     */

  }, {
    key: 'side',
    get: function get() {
      return util.findChild(this, 'ons-splitter-side');
    }
  }, {
    key: '_sides',
    get: function get() {
      return [this.left, this.right].filter(function (e) {
        return e;
      });
    }
    /**
     * @property content
     * @readonly
     * @type {HTMLElement}
     * @description
     *   [en]The `<ons-splitter-content>` element.[/en]
     *   [ja][/ja]
     */

  }, {
    key: 'content',
    get: function get() {
      return util.findChild(this, 'ons-splitter-content');
    }
  }, {
    key: 'topPage',
    get: function get() {
      return this.content._content;
    }
  }, {
    key: 'mask',
    get: function get() {
      return util.findChild(this, 'ons-splitter-mask');
    }

    /**
     * @property onDeviceBackButton
     * @type {Object}
     * @description
     *   [en]Back-button handler.[/en]
     *   [ja]バックボタンハンドラ。[/ja]
     */

  }, {
    key: 'onDeviceBackButton',
    get: function get() {
      return this._backButtonHandler;
    },
    set: function set(callback) {
      if (this._backButtonHandler) {
        this._backButtonHandler.destroy();
      }

      this._backButtonHandler = deviceBackButtonDispatcher.createHandler(this, callback);
    }
  }]);

  function SplitterElement() {
    _classCallCheck(this, SplitterElement);

    var _this = _possibleConstructorReturn(this, (SplitterElement.__proto__ || _Object$getPrototypeOf(SplitterElement)).call(this));

    _this._onModeChange = _this._onModeChange.bind(_this);

    contentReady(_this, function () {
      !_this.mask && _this.appendChild(document.createElement('ons-splitter-mask'));
      _this._layout();
    });
    return _this;
  }

  _createClass(SplitterElement, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      this.onDeviceBackButton = this._onDeviceBackButton.bind(this);
      this.addEventListener('modechange', this._onModeChange, false);
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      this._backButtonHandler.destroy();
      this._backButtonHandler = null;
      this.removeEventListener('modechange', this._onModeChange, false);
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, last, current) {}
  }, {
    key: '_show',
    value: function _show() {
      util.propagateAction(this, '_show');
    }
  }, {
    key: '_hide',
    value: function _hide() {
      util.propagateAction(this, '_hide');
    }
  }, {
    key: '_destroy',
    value: function _destroy() {
      util.propagateAction(this, '_destroy');
      this.remove();
    }
  }], [{
    key: 'registerAnimator',
    value: function registerAnimator(name, Animator) {
      if (!(Animator instanceof SplitterAnimator)) {
        throw new Error('Animator parameter must be an instance of SplitterAnimator.');
      }
      _animatorDict[name] = Animator;
    }
  }, {
    key: 'SplitterAnimator',
    get: function get() {
      return SplitterAnimator;
    }
  }, {
    key: 'animators',
    get: function get() {
      return _animatorDict;
    }
  }]);

  return SplitterElement;
}(BaseElement);

export default SplitterElement;


ons.elements.Splitter = SplitterElement;
customElements.define('ons-splitter', SplitterElement);