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
var iosBackButtonIcon = '<?xml version="1.0" encoding="UTF-8"?>\n<svg width="13px" height="21px" viewBox="0 0 13 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <title>ios-back-button-icon</title>\n    <desc>Created with Sketch.</desc>\n    <defs></defs>\n    <g id="toolbar-back-button" stroke="none" stroke-width="1" fill-rule="evenodd">\n        <g id="ios" transform="translate(-34.000000, -30.000000)">\n            <polygon id="ios-back-button-icon" points="34 40.5 44.5 30 46.5 32 38 40.5 46.5 49 44.5 51"></polygon>\n        </g>\n    </g>\n</svg>\n';
var mdBackButtonIcon = '<?xml version="1.0" encoding="UTF-8"?>\n<svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <title>md-back-button-icon</title>\n    <desc>Created with Sketch.</desc>\n    <defs></defs>\n    <g id="toolbar-back-button" stroke="none" stroke-width="1" fill-rule="evenodd">\n        <g id="android" transform="translate(-32.000000, -32.000000)" fill-rule="nonzero">\n            <polygon id="md-back-button-icon" points="48 39 35.83 39 41.42 33.41 40 32 32 40 40 48 41.41 46.59 35.83 41 48 41"></polygon>\n        </g>\n    </g>\n</svg>\n';

var defaultClassName = 'back-button';

var scheme = {
  '': 'back-button--*',
  '.back-button__icon': 'back-button--*__icon',
  '.back-button__label': 'back-button--*__label'
};

/**
 * @element ons-back-button
 * @category navigation
 * @description
 *   [en]
 *     Back button component for `<ons-toolbar>`. Put it in the left part of the `<ons-toolbar>`.
 *
 *     It will find the parent `<ons-navigator>` element and pop a page when clicked. This behavior can be overriden by specifying the `onClick` property.
 *   [/en]
 *   [ja][/ja]
 * @codepen aHmGL
 * @tutorial vanilla/Reference/navigator
 * @modifier material
 *   [en]Material Design style[/en]
 *   [ja][/ja]
 * @seealso ons-toolbar
 *   [en]ons-toolbar component[/en]
 *   [ja]ons-toolbarコンポーネント[/ja]
 * @seealso ons-navigator
 *   [en]ons-navigator component[/en]
 *   [ja]ons-navigatorコンポーネント[/ja]
 * @example
 * <ons-toolbar>
 *   <div class="left">
 *     <ons-back-button>Back</ons-back-button>
 *   </div>
 *   <div class="center">
 *     Title
 *   <div>
 * </ons-toolbar>
 */

var BackButtonElement = function (_BaseElement) {
  _inherits(BackButtonElement, _BaseElement);

  /**
   * @attribute modifier
   * @type {String}
   * @description
   *  [en]The appearance of the back button.[/en]
   *  [ja]バックボタンの見た目を指定します。[/ja]
   */

  function BackButtonElement() {
    _classCallCheck(this, BackButtonElement);

    var _this = _possibleConstructorReturn(this, (BackButtonElement.__proto__ || _Object$getPrototypeOf(BackButtonElement)).call(this));

    contentReady(_this, function () {
      _this._compile();
    });

    _this._options = {};
    _this._boundOnClick = _this._onClick.bind(_this);
    return _this;
  }

  _createClass(BackButtonElement, [{
    key: '_updateIcon',
    value: function _updateIcon() {
      var icon = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : util.findChild(this, '.back-button__icon');

      icon.innerHTML = autoStyle.getPlatform(this) === 'android' || util.hasModifier(this, 'material') ? mdBackButtonIcon : iosBackButtonIcon;
    }
  }, {
    key: '_compile',
    value: function _compile() {
      autoStyle.prepare(this);

      this.classList.add(defaultClassName);

      if (!util.findChild(this, '.back-button__label')) {
        var label = util.create('span.back-button__label');

        while (this.childNodes[0]) {
          label.appendChild(this.childNodes[0]);
        }
        this.appendChild(label);
      }

      if (!util.findChild(this, '.back-button__icon')) {
        var icon = util.create('span.back-button__icon');
        this._updateIcon(icon);

        this.insertBefore(icon, this.children[0]);
      }

      util.updateRipple(this, undefined, { center: '', 'size': 'contain', 'background': 'transparent' });

      ModifierUtil.initModifier(this, scheme);
    }

    /**
     * @property options
     * @type {Object}
     * @description
     *   [en]Options object.[/en]
     *   [ja]オプションを指定するオブジェクト。[/ja]
     */

    /**
     * @property options.animation
     * @type {String}
     * @description
     *   [en]Animation name. Available animations are "slide", "lift", "fade" and "none".
     *     These are platform based animations. For fixed animations, add "-ios" or "-md"
     *     suffix to the animation name. E.g. "lift-ios", "lift-md". Defaults values are "slide-ios" and "fade-md".
     *   [/en]
     *   [ja][/ja]
     */

    /**
     * @property options.animationOptions
     * @type {String}
     * @description
     *   [en]Specify the animation's duration, delay and timing. E.g.  `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`[/en]
     *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}` [/ja]
     */

    /**
     * @property options.callback
     * @type {String}
     * @description
     *   [en]Function that is called when the transition has ended.[/en]
     *   [ja]このメソッドによる画面遷移が終了した際に呼び出される関数オブジェクトを指定します。[/ja]
     */

  }, {
    key: '_onClick',


    /**
     * @property onClick
     * @type {Function}
     * @description
     *   [en]Used to override the default back button behavior.[/en]
     *   [ja][/ja]
     */
    value: function _onClick() {
      if (this.onClick) {
        this.onClick.apply(this);
      } else {
        var navigator = util.findParent(this, 'ons-navigator');
        if (navigator) {
          navigator.popPage(this.options);
        }
      }
    }
  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      this.addEventListener('click', this._boundOnClick, false);
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, last, current) {
      switch (name) {
        case 'class':
          util.restoreClass(this, defaultClassName, scheme);
          break;

        case 'modifier':
          {
            ModifierUtil.onModifierChanged(last, current, this, scheme) && this._updateIcon();
            break;
          }
      }
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      this.removeEventListener('click', this._boundOnClick, false);
    }
  }, {
    key: 'show',
    value: function show() {
      this.style.display = 'inline-block';
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.style.display = 'none';
    }
  }, {
    key: 'options',
    get: function get() {
      return this._options;
    },
    set: function set(object) {
      this._options = object;
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['modifier', 'class'];
    }
  }]);

  return BackButtonElement;
}(BaseElement);

export default BackButtonElement;


ons.elements.BackButton = BackButtonElement;
customElements.define('ons-back-button', BackButtonElement);