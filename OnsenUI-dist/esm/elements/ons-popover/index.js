import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _extends from 'babel-runtime/helpers/extends';
import _typeof from 'babel-runtime/helpers/typeof';
import _setImmediate from 'babel-runtime/core-js/set-immediate';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import _Object$keys from 'babel-runtime/core-js/object/keys';
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
import autoStyle from '../../ons/autostyle';
import ModifierUtil from '../../ons/internal/modifier-util';
import AnimatorFactory from '../../ons/internal/animator-factory';
import { PopoverAnimator, IOSFadePopoverAnimator, MDFadePopoverAnimator } from './animator';
import platform from '../../ons/platform';
import iPhoneXPatch from '../../ons/iphonex-patch';
import BaseDialogElement from '../base/base-dialog';
import contentReady from '../../ons/content-ready';

var scheme = {
  '.popover': 'popover--*',
  '.popover-mask': 'popover-mask--*',
  '.popover__content': 'popover--*__content',
  '.popover__arrow': 'popover--*__arrow'
};

var _animatorDict = {
  'default': function _default() {
    return platform.isAndroid() ? MDFadePopoverAnimator : IOSFadePopoverAnimator;
  },
  'none': PopoverAnimator,
  'fade-ios': IOSFadePopoverAnimator,
  'fade-md': MDFadePopoverAnimator
};

var positions = {
  up: 'bottom',
  left: 'right',
  down: 'top',
  right: 'left'
};

var directions = _Object$keys(positions);
/**
 * @element ons-popover
 * @category dialog
 * @description
 *  [en]
 *    A component that displays a popover next to an element. The popover can be used to display extra information about a component or a tooltip.
 *
 *    To use the element it can either be attached directly to the `<body>` element or dynamically created from a template using the `ons.createPopover(template)` utility function and the `<ons-template>` tag.
 *
 *    Another common way to use the popover is to display a menu when a button on the screen is tapped. For Material Design, popover looks exactly as a dropdown menu.
 *  [/en]
 *  [ja]ある要素を対象とするポップオーバーを表示するコンポーネントです。[/ja]
 * @codepen ZYYRKo
 * @tutorial vanilla/Reference/popover
 * @guide theming.html#modifiers [en]More details about the `modifier` attribute[/en][ja]modifier属性の使い方[/ja]
 * @example
 * <ons-button onclick="showPopover(this)">
 *   Click me!
 * </ons-button>
 *
 * <ons-popover direction="down" id="popover">
 *   <p>This is a popover!</p>
 * </ons-popover>
 *
 * <script>
 *   var showPopover = function(element) {
 *     var popover = document.getElementById('popover');
 *     popover.show(element);
 *   };
 * </script>
 */

var PopoverElement = function (_BaseDialogElement) {
  _inherits(PopoverElement, _BaseDialogElement);

  /**
   * @event preshow
   * @description
   *   [en]Fired just before the popover is displayed.[/en]
   *   [ja]ポップオーバーが表示される直前に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.popover
   *   [en]Component object.[/en]
   *   [ja]コンポーネントのオブジェクト。[/ja]
   * @param {Function} event.cancel
   *   [en]Call this function to stop the popover from being shown.[/en]
   *   [ja]この関数を呼び出すと、ポップオーバーの表示がキャンセルされます。[/ja]
   */

  /**
   * @event postshow
   * @description
   *   [en]Fired just after the popover is displayed.[/en]
   *   [ja]ポップオーバーが表示された直後に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.popover
   *   [en]Component object.[/en]
   *   [ja]コンポーネントのオブジェクト。[/ja]
   */

  /**
   * @event prehide
   * @description
   *   [en]Fired just before the popover is hidden.[/en]
   *   [ja]ポップオーバーが隠れる直前に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.popover
   *   [en]Component object.[/en]
   *   [ja]コンポーネントのオブジェクト。[/ja]
   * @param {Function} event.cancel
   *   [en]Call this function to stop the popover from being hidden.[/en]
   *   [ja]この関数を呼び出すと、ポップオーバーが隠れる処理をキャンセルします。[/ja]
   */

  /**
   * @event posthide
   * @description
   *   [en]Fired just after the popover is hidden.[/en]
   *   [ja]ポップオーバーが隠れた後に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.popover
   *   [en]Component object.[/en]
   *   [ja]コンポーネントのオブジェクト。[/ja]
   */

  /**
   * @attribute modifier
   * @type {String}
   * @description
   *  [en]The appearance of the popover.[/en]
   *  [ja]ポップオーバーの表現を指定します。[/ja]
   */

  /**
   * @attribute direction
   * @type {String}
   * @description
   *  [en]
   *    A space separated list of directions. If more than one direction is specified,
   *    it will be chosen automatically. Valid directions are `"up"`, `"down"`, `"left"` and `"right"`.
   *  [/en]
   *  [ja]
   *    ポップオーバーを表示する方向を空白区切りで複数指定できます。
   *    指定できる方向は、"up", "down", "left", "right"の4つです。空白区切りで複数指定することもできます。
   *    複数指定された場合、対象とする要素に合わせて指定した値から自動的に選択されます。
   *  [/ja]
   */

  /**
   * @attribute cancelable
   * @description
   *   [en]If this attribute is set the popover can be closed by tapping the background or by pressing the back button.[/en]
   *   [ja]この属性があると、ポップオーバーが表示された時に、背景やバックボタンをタップした時にをポップオーバー閉じます。[/ja]
   */

  /**
   * @attribute cover-target
   * @description
   *   [en]If set the popover will cover the target on the screen.[/en]
   *   [ja][/ja]
   */

  /**
   * @attribute animation
   * @type {String}
   * @description
   *   [en]The animation used when showing an hiding the popover. Can be either `"none"`, `"default"`, `"fade-ios"` or `"fade-md"`.[/en]
   *   [ja]ポップオーバーを表示する際のアニメーション名を指定します。[/ja]
   */

  /**
   * @attribute animation-options
   * @type {Expression}
   * @description
   *  [en]Specify the animation's duration, timing and delay with an object literal. E.g. `{duration: 0.2, delay: 1, timing: 'ease-in'}`.[/en]
   *  [ja]アニメーション時のduration, timing, delayをオブジェクトリテラルで指定します。e.g. {duration: 0.2, delay: 1, timing: 'ease-in'}[/ja]
   */

  /**
   * @attribute mask-color
   * @type {Color}
   * @description
   *   [en]Color of the background mask. Default is `"rgba(0, 0, 0, 0.2)"`.[/en]
   *   [ja]背景のマスクの色を指定します。デフォルトは"rgba(0, 0, 0, 0.2)"です。[/ja]
   */

  function PopoverElement() {
    _classCallCheck(this, PopoverElement);

    var _this = _possibleConstructorReturn(this, (PopoverElement.__proto__ || _Object$getPrototypeOf(PopoverElement)).call(this));

    _this._boundOnChange = _this._onChange.bind(_this);

    contentReady(_this, function () {
      _this._compile();
      _this.style.display = 'none';
    });
    return _this;
  }

  _createClass(PopoverElement, [{
    key: '_updateAnimatorFactory',
    value: function _updateAnimatorFactory() {
      return new AnimatorFactory({
        animators: _animatorDict,
        baseClass: PopoverAnimator,
        baseClassName: 'PopoverAnimator',
        defaultAnimation: this.getAttribute('animation') || 'default'
      });
    }
  }, {
    key: '_toggleStyle',
    value: function _toggleStyle(shouldShow) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (shouldShow) {
        this.style.display = 'block';
        this._currentTarget = options.target;
        this._positionPopover(options.target);
      } else {
        this.style.display = 'none';
        this._clearStyles();
      }
    }
  }, {
    key: '_positionPopover',
    value: function _positionPopover(target) {
      var radius = this._radius,
          contentElement = this._content,
          margin = this._margin;

      var safeAreaLengths = iPhoneXPatch.getSafeAreaLengths();
      var safeAreaRect = iPhoneXPatch.getSafeAreaDOMRect();
      var targetRect = target.getBoundingClientRect();
      var isMD = util.hasModifier(this, 'material');
      var cover = isMD && this.hasAttribute('cover-target');

      // Distance from each side of the safe area (with margin) to the target element
      var targetDistance = {
        top: targetRect.top - (safeAreaRect.top + margin),
        left: targetRect.left - (safeAreaRect.left + margin),
        bottom: safeAreaRect.bottom - margin - targetRect.bottom,
        right: safeAreaRect.right - margin - targetRect.right
      };

      // Distance from each side of the safe area (with margin) to the geometric center of the target element
      var targetCenterDistanceFrom = {
        top: targetRect.top + Math.round(targetRect.height / 2) - (safeAreaRect.top + margin),
        left: targetRect.left + Math.round(targetRect.width / 2) - (safeAreaRect.left + margin),
        bottom: safeAreaRect.bottom - margin - targetRect.bottom + Math.round(targetRect.height / 2),
        right: safeAreaRect.right - margin - targetRect.right + Math.round(targetRect.width / 2)
      };

      var _calculateDirections2 = this._calculateDirections(targetDistance),
          vertical = _calculateDirections2.vertical,
          primaryDirection = _calculateDirections2.primary,
          secondaryDirection = _calculateDirections2.secondary;

      this._currentDirection = primaryDirection;
      util.addModifier(this, primaryDirection);

      var sizeName = vertical ? 'width' : 'height';
      // Get .popover__content size
      var contentSize = function (style) {
        return {
          width: parseInt(style.getPropertyValue('width'), 10),
          height: parseInt(style.getPropertyValue('height'), 10)
        };
      }(window.getComputedStyle(contentElement));

      // Setting .popover position.
      var targetAndArrowLength = cover ? 0 : (vertical ? targetRect.height : targetRect.width) + (isMD ? 0 : 14);
      var primaryOffset = Math.max(safeAreaLengths[primaryDirection] + margin, safeAreaLengths[primaryDirection] + margin + targetDistance[primaryDirection] + targetAndArrowLength);
      var secondaryOffset = Math.max(safeAreaLengths[secondaryDirection] + margin, safeAreaLengths[secondaryDirection] + margin + targetCenterDistanceFrom[secondaryDirection] - contentSize[sizeName] / 2);
      this._popover.style[primaryDirection] = primaryOffset + 'px';
      this._popover.style[secondaryDirection] = secondaryOffset + 'px';

      // Setting .popover__arrow position.
      this._arrow.style[secondaryDirection] = Math.max(radius, safeAreaLengths[secondaryDirection] + margin + targetCenterDistanceFrom[secondaryDirection] - secondaryOffset) + 'px';
    }
  }, {
    key: '_calculateDirections',
    value: function _calculateDirections(distance) {
      var options = (this.getAttribute('direction') || 'up down left right').split(/\s+/).map(function (e) {
        return positions[e];
      });
      var primary = options.sort(function (a, b) {
        return distance[a] - distance[b];
      })[0];
      var vertical = 'top' == primary || 'bottom' == primary;
      var secondary = void 0;

      if (vertical) {
        secondary = distance.left < distance.right ? 'left' : 'right';
      } else {
        secondary = distance.top < distance.bottom ? 'top' : 'bottom';
      }

      return { vertical: vertical, primary: primary, secondary: secondary };
    }
  }, {
    key: '_clearStyles',
    value: function _clearStyles() {
      var _this2 = this;

      this._currentDirection = null;
      ['top', 'bottom', 'left', 'right'].forEach(function (e) {
        _this2._arrow.style[e] = _this2._content.style[e] = _this2._popover.style[e] = '';
        util.removeModifier(_this2, e);
      });
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      var _this3 = this;

      _setImmediate(function () {
        if (_this3._currentTarget) {
          _this3._positionPopover(_this3._currentTarget);
        }
      });
    }
  }, {
    key: '_compile',
    value: function _compile() {
      autoStyle.prepare(this);

      if (this._popover && this._mask) {
        return;
      }

      var hasDefaultContainer = this._popover && this._content;

      if (hasDefaultContainer) {

        if (!this._mask) {
          var mask = document.createElement('div');
          mask.classList.add('popover-mask');
          this.insertBefore(mask, this.firstChild);
        }

        if (!this._arrow) {
          var arrow = document.createElement('div');
          arrow.classList.add('popover__arrow');
          this._popover.appendChild(arrow);
        }
      } else {

        var template = util.createFragment('\n        <div class="popover-mask"></div>\n        <div class="popover">\n          <div class="popover__content"></div>\n          <div class="popover__arrow"></div>\n        </div>\n      ');
        var content = template.querySelector('.popover__content');

        while (this.childNodes[0]) {
          content.appendChild(this.childNodes[0]);
        }

        this.appendChild(template);
      }

      // FIXME!
      if (this.hasAttribute('style')) {
        this._popover.setAttribute('style', this.getAttribute('style'));
        this.removeAttribute('style');
      }

      ModifierUtil.initModifier(this, this._scheme);
    }

    /**
     * @method show
     * @signature show(target, [options])
     * @param {String|Event|HTMLElement} target
     *   [en]Target element. Can be either a CSS selector, an event object or a DOM element. It can be also provided as 'options.target' instead. [/en]
     *   [ja]ポップオーバーのターゲットとなる要素を指定します。CSSセレクタかeventオブジェクトかDOM要素のいずれかを渡せます。[/ja]
     * @param {Object} [options]
     *   [en]Parameter object.[/en]
     *   [ja]オプションを指定するオブジェクト。[/ja]
     * @param {String} [options.animation]
     *   [en]Animation name.  Use one of `"fade-ios"`, `"fade-md"`, `"none"` and `"default"`.[/en]
     *   [ja]アニメーション名を指定します。"fade-ios", "fade-md", "none", "default"のいずれかを指定できます。[/ja]
     * @param {String} [options.animationOptions]
     *   [en]Specify the animation's duration, delay and timing. E.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
     *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. {duration: 0.2, delay: 0.4, timing: 'ease-in'}[/ja]
     * @param {Function} [options.callback]
     *   [en]This function is called after the popover has been revealed.[/en]
     *   [ja]ポップオーバーが表示され終わった後に呼び出される関数オブジェクトを指定します。[/ja]
     * @description
     *   [en]Open the popover and point it at a target. The target can be either an event, a CSS selector or a DOM element..[/en]
     *   [ja]対象とする要素にポップオーバーを表示します。target引数には、$eventオブジェクトやDOMエレメントやCSSセレクタを渡すことが出来ます。[/ja]
     * @return {Promise}
     *   [en]Resolves to the displayed element[/en]
     *   [ja][/ja]
     */

  }, {
    key: 'show',
    value: function show(target) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      // Copy options and include options.target
      if (target && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && !(target instanceof Event) && !(target instanceof HTMLElement)) {
        options = _extends({}, target);
      } else {
        options = _extends({}, options, { target: target });
      }

      if (typeof options.target === 'string') {
        options.target = document.querySelector(options.target);
      } else if (options.target instanceof Event) {
        options.target = options.target.target;
      }

      if (typeof options.target === 'undefined') {
        throw new Error('A target or options.target argument must be defined for the popover.');
      }

      if (!(options.target instanceof HTMLElement)) {
        throw new Error('Invalid target for popover.');
      }

      return _get(PopoverElement.prototype.__proto__ || _Object$getPrototypeOf(PopoverElement.prototype), 'show', this).call(this, options);
    }

    /**
     * @method hide
     * @signature hide([options])
     * @param {Object} [options]
     *   [en]Parameter object.[/en]
     *   [ja]オプションを指定するオブジェクト。[/ja]
     * @param {String} [options.animation]
     *   [en]Animation name.  Use one of `"fade-ios"`, `"fade-md"`, `"none"` and `"default"`.[/en]
     *   [ja]アニメーション名を指定します。"fade-ios", "fade-md", "none", "default"のいずれかを指定できます。[/ja]
     * @param {String} [options.animationOptions]
     *   [en]Specify the animation's duration, delay and timing. E.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
     *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. {duration: 0.2, delay: 0.4, timing: 'ease-in'}[/ja]
     * @param {Function} [options.callback]
     *   [en]This functions is called after the popover has been hidden.[/en]
     *   [ja]ポップオーバーが隠れた後に呼び出される関数オブジェクトを指定します。[/ja]
     * @description
     *   [en]Close the popover.[/en]
     *   [ja]ポップオーバーを閉じます。[/ja]
     * @return {Promise}
     *   [en]Resolves to the hidden element[/en]
     *   [ja][/ja]
     */

    /**
     * @property visible
     * @readonly
     * @type {Boolean}
     * @description
     *   [en]Whether the element is visible or not.[/en]
     *   [ja]要素が見える場合に`true`。[/ja]
     */

    /**
     * @property cancelable
     * @type {Boolean}
     * @description
     *   [en]
     *     A boolean value that specifies whether the popover is cancelable or not.
     *
     *     When the popover is cancelable it can be closed by tapping the background or by pressing the back button on Android devices.
     *   [/en]
     *   [ja][/ja]
     */

    /**
     * @property onDeviceBackButton
     * @type {Object}
     * @description
     *   [en]Back-button handler.[/en]
     *   [ja]バックボタンハンドラ。[/ja]
     */

  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      var _this4 = this;

      _get(PopoverElement.prototype.__proto__ || _Object$getPrototypeOf(PopoverElement.prototype), 'connectedCallback', this).call(this);

      window.addEventListener('resize', this._boundOnChange, false);
      this._margin = this._margin || parseInt(window.getComputedStyle(this).getPropertyValue('top'));
      this._margin = this._margin || 6; // Fix for iframes

      contentReady(this, function () {
        _this4._radius = parseInt(window.getComputedStyle(_this4._content).getPropertyValue('border-top-left-radius'));
      });
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      _get(PopoverElement.prototype.__proto__ || _Object$getPrototypeOf(PopoverElement.prototype), 'disconnectedCallback', this).call(this);
      window.removeEventListener('resize', this._boundOnChange, false);
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, last, current) {
      if (name === 'direction') {
        return this._boundOnChange();
      } else if (name === 'modifier') {
        this._currentDirection && util.addModifier(this, this._currentDirection);
      }
      _get(PopoverElement.prototype.__proto__ || _Object$getPrototypeOf(PopoverElement.prototype), 'attributeChangedCallback', this).call(this, name, last, current);
    }

    /**
     * @param {String} name
     * @param {PopoverAnimator} Animator
     */

  }, {
    key: '_scheme',
    get: function get() {
      return scheme;
    }
  }, {
    key: '_mask',
    get: function get() {
      return util.findChild(this, '.popover-mask');
    }
  }, {
    key: '_popover',
    get: function get() {
      return util.findChild(this, '.popover');
    }
  }, {
    key: '_content',
    get: function get() {
      return util.findChild(this._popover, '.popover__content');
    }
  }, {
    key: '_arrow',
    get: function get() {
      return util.findChild(this._popover, '.popover__arrow');
    }
  }], [{
    key: 'registerAnimator',
    value: function registerAnimator(name, Animator) {
      if (!(Animator.prototype instanceof PopoverAnimator)) {
        throw new Error('"Animator" param must inherit PopoverAnimator');
      }
      _animatorDict[name] = Animator;
    }
  }, {
    key: 'observedAttributes',
    get: function get() {
      return [].concat(_toConsumableArray(_get(PopoverElement.__proto__ || _Object$getPrototypeOf(PopoverElement), 'observedAttributes', this)), ['direction']);
    }
  }, {
    key: 'animators',
    get: function get() {
      return _animatorDict;
    }
  }, {
    key: 'PopoverAnimator',
    get: function get() {
      return PopoverAnimator;
    }
  }]);

  return PopoverElement;
}(BaseDialogElement);

export default PopoverElement;


ons.elements.Popover = PopoverElement;
customElements.define('ons-popover', PopoverElement);