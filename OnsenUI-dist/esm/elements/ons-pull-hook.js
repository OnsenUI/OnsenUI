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
import styler from '../ons/styler';
import platform from '../ons/platform';
import BaseElement from './base/base-element';
import GestureDetector from '../ons/gesture-detector';
import animit from '../ons/animit';

var STATE_INITIAL = 'initial';
var STATE_PREACTION = 'preaction';
var STATE_ACTION = 'action';

/**
 * @element ons-pull-hook
 * @category control
 * @description
 *   [en]
 *     Component that adds **Pull to refresh** functionality to an `<ons-page>` element.
 *
 *     It can be used to perform a task when the user pulls down at the top of the page. A common usage is to refresh the data displayed in a page.
 *   [/en]
 *   [ja][/ja]
 * @codepen WbJogM
 * @tutorial vanilla/Reference/pull-hook
 * @example
 * <ons-page>
 *   <ons-pull-hook>
 *     Release to refresh
 *   </ons-pull-hook>
 * </ons-page>
 *
 * <script>
 *   document.querySelector('ons-pull-hook').onAction = function(done) {
 *     setTimeout(done, 1000);
 *   };
 * </script>
 */

var PullHookElement = function (_BaseElement) {
  _inherits(PullHookElement, _BaseElement);

  /**
   * @event changestate
   * @description
   *   [en]Fired when the state is changed. The state can be either "initial", "preaction" or "action".[/en]
   *   [ja]コンポーネントの状態が変わった場合に発火します。状態は、"initial", "preaction", "action"のいずれかです。[/ja]
   * @param {Object} event
   *   [en]Event object.[/en]
   *   [ja]イベントオブジェクト。[/ja]
   * @param {Object} event.pullHook
   *   [en]Component object.[/en]
   *   [ja]コンポーネントのオブジェクト。[/ja]
   * @param {String} event.state
   *   [en]Current state.[/en]
   *   [ja]現在の状態名を参照できます。[/ja]
   */

  /**
   * @attribute disabled
   * @description
   *   [en]If this attribute is set the "pull-to-refresh" functionality is disabled.[/en]
   *   [ja]この属性がある時、disabled状態になりアクションが実行されなくなります[/ja]
   */

  /**
   * @attribute height
   * @type {String}
   * @description
   *   [en]Specify the height of the component. When pulled down further than this value it will switch to the "preaction" state. The default value is "64px".[/en]
   *   [ja]コンポーネントの高さを指定します。この高さ以上にpull downすると"preaction"状態に移行します。デフォルトの値は"64px"です。[/ja]
   */

  /**
   * @attribute threshold-height
   * @type {String}
   * @description
   *   [en]Specify the threshold height. The component automatically switches to the "action" state when pulled further than this value. The default value is "96px". A negative value or a value less than the height will disable this property.[/en]
   *   [ja]閾値となる高さを指定します。この値で指定した高さよりもpull downすると、このコンポーネントは自動的に"action"状態に移行します。[/ja]
   */

  /**
   * @attribute fixed-content
   * @description
   *   [en]If this attribute is set the content of the page will not move when pulling.[/en]
   *   [ja]この属性がある時、プルフックが引き出されている時にもコンテンツは動きません。[/ja]
   */

  function PullHookElement() {
    _classCallCheck(this, PullHookElement);

    var _this = _possibleConstructorReturn(this, (PullHookElement.__proto__ || _Object$getPrototypeOf(PullHookElement)).call(this));

    _this._onDrag = _this._onDrag.bind(_this);
    _this._onDragStart = _this._onDragStart.bind(_this);
    _this._onDragEnd = _this._onDragEnd.bind(_this);
    _this._onScroll = _this._onScroll.bind(_this);
    _this._preventScroll = _this._preventScroll.bind(_this);

    _this._setState(STATE_INITIAL, true);
    _this._hide(); // Fix for transparent toolbar transitions
    return _this;
  }

  _createClass(PullHookElement, [{
    key: '_setStyle',
    value: function _setStyle() {
      var height = this.height + 'px';
      styler(this, { height: height, lineHeight: height });
      this.style.display === '' && this._show();
    }
  }, {
    key: '_onScroll',
    value: function _onScroll(event) {
      var element = this._pageElement;

      if (element.scrollTop < 0) {
        element.scrollTop = 0;
      }
    }
  }, {
    key: '_canConsumeGesture',
    value: function _canConsumeGesture(gesture) {
      return gesture.direction === 'up' || gesture.direction === 'down';
    }
  }, {
    key: '_onDragStart',
    value: function _onDragStart(event) {
      var _this2 = this;

      if (!event.gesture || this.disabled) {
        return;
      }

      this._ignoreDrag = event.consumed;

      if (!this._ignoreDrag) {
        var consume = event.consume;
        event.consume = function () {
          consume && consume();
          _this2._ignoreDrag = true;
          // This elements resizes .page__content so it is safer
          // to hide it when other components are dragged.
          _this2._hide();
        };

        if (this._canConsumeGesture(event.gesture)) {
          consume && consume();
          event.consumed = true;
          this._show(); // Not enough due to 'dragLockAxis'
        }
      }

      this._startScroll = this._pageElement.scrollTop;
    }
  }, {
    key: '_onDrag',
    value: function _onDrag(event) {
      var _this3 = this;

      if (!event.gesture || this.disabled || this._ignoreDrag || !this._canConsumeGesture(event.gesture)) {
        return;
      }

      // Necessary due to 'dragLockAxis' (25px)
      if (this.style.display === 'none') {
        this._show();
      }

      event.stopPropagation();

      // Hack to make it work on Android 4.4 WebView and iOS UIWebView. Scrolls manually
      // near the top of the page so there will be no inertial scroll when scrolling down.
      // Allowing default scrolling will kill all 'touchmove' events.
      this._pageElement.scrollTop = this._startScroll - event.gesture.deltaY;
      if (this._pageElement.scrollTop < window.innerHeight && event.gesture.direction !== 'up') {
        event.gesture.preventDefault();
      }

      var scroll = Math.max(event.gesture.deltaY - this._startScroll, 0);
      if (scroll !== this._currentTranslation) {
        if (this._thresholdHeightEnabled() && scroll >= this.thresholdHeight) {
          event.gesture.stopDetect();
          _setImmediate(function () {
            return _this3._finish();
          });
        } else if (scroll >= this.height) {
          this._setState(STATE_PREACTION);
        } else {
          this._setState(STATE_INITIAL);
        }

        this._pulling = true;
        this._translateTo(scroll);
      }
    }
  }, {
    key: '_onDragEnd',
    value: function _onDragEnd(event) {
      this._pulling = false;
      if (!event.gesture || this.disabled || this._ignoreDrag) {
        return;
      }

      event.stopPropagation();

      if (this._currentTranslation > 0) {
        var scroll = this._currentTranslation;

        if (scroll > this.height) {
          this._finish();
        } else {
          this._translateTo(0, { animate: true });
        }
      }
    }
  }, {
    key: '_preventScroll',
    value: function _preventScroll(event) {
      // Fix for Android & iOS when starting from scrollTop > 0 or pulling back
      this._pulling && event.cancelable && event.preventDefault();
    }

    /**
     * @property onAction
     * @type {Function}
     * @description
     *   [en]This will be called in the `action` state if it exists. The function will be given a `done` callback as it's first argument.[/en]
     *   [ja][/ja]
     */

  }, {
    key: '_finish',
    value: function _finish() {
      var _this4 = this;

      this._setState(STATE_ACTION);
      this._translateTo(this.height, { animate: true });
      var action = this.onAction || function (done) {
        return done();
      };
      action(function () {
        _this4._translateTo(0, { animate: true });
        _this4._setState(STATE_INITIAL);
      });
    }

    /**
     * @property height
     * @type {Number}
     * @description
     *   [en]The height of the pull hook in pixels. The default value is `64px`.[/en]
     *   [ja][/ja]
     */

  }, {
    key: '_thresholdHeightEnabled',
    value: function _thresholdHeightEnabled() {
      var th = this.thresholdHeight;
      return th > 0 && th >= this.height;
    }
  }, {
    key: '_setState',
    value: function _setState(state, noEvent) {
      var lastState = this.state;

      this.setAttribute('state', state);

      if (!noEvent && lastState !== this.state) {
        util.triggerElementEvent(this, 'changestate', {
          pullHook: this,
          state: state,
          lastState: lastState
        });
      }
    }

    /**
     * @property state
     * @readonly
     * @type {String}
     * @description
     *   [en]Current state of the element.[/en]
     *   [ja][/ja]
     */

  }, {
    key: '_show',
    value: function _show() {
      var _this5 = this;

      // Run asyncrhonously to avoid conflicts with Animit's style clean
      _setImmediate(function () {
        _this5.style.display = '';
        if (_this5._pageElement) {
          _this5._pageElement.style.marginTop = '-' + _this5.height + 'px';
        }
      });
    }
  }, {
    key: '_hide',
    value: function _hide() {
      this.style.display = 'none';
      if (this._pageElement) {
        this._pageElement.style.marginTop = '';
      }
    }

    /**
     * @param {Number} scroll
     * @param {Object} options
     * @param {Function} [options.callback]
     */

  }, {
    key: '_translateTo',
    value: function _translateTo(scroll) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this._currentTranslation == 0 && scroll == 0) {
        return;
      }

      this._currentTranslation = scroll;
      var opt = options.animate ? { duration: .3, timing: 'cubic-bezier(.1, .7, .1, 1)' } : {};
      this._onPull && this._onPull((scroll / this.height).toFixed(2), opt);
      var scrollElement = this.hasAttribute('fixed-content') ? this : this._pageElement;

      animit(scrollElement).queue({ transform: 'translate3d(0px, ' + scroll + 'px, 0px)' }, opt).play(function () {
        scroll === 0 && styler.clear(scrollElement, 'transition transform');
        options.callback instanceof Function && options.callback();
      });
    }
  }, {
    key: '_disableDragLock',
    value: function _disableDragLock() {
      // e2e tests need it
      this._dragLockDisabled = true;
      this._setupListeners(true);
    }
  }, {
    key: '_setupListeners',
    value: function _setupListeners(add) {
      var _this6 = this;

      var scrollToggle = function scrollToggle(action) {
        return _this6._pageElement[action + 'EventListener']('scroll', _this6._onScroll, false);
      };
      var gdToggle = function gdToggle(action) {
        _this6._gestureDetector[action]('drag', _this6._onDrag);
        _this6._gestureDetector[action]('dragstart', _this6._onDragStart);
        _this6._gestureDetector[action]('dragend', _this6._onDragEnd);
        _this6._gestureDetector[action]('touchmove', _this6._preventScroll);
      };

      if (this._gestureDetector) {
        gdToggle('off');
        this._gestureDetector.dispose();
        this._gestureDetector = null;
      }
      scrollToggle('remove');

      if (add) {
        this._gestureDetector = new GestureDetector(this._pageElement, {
          dragMinDistance: 1,
          dragDistanceCorrection: false,
          dragLockToAxis: !this._dragLockDisabled
        });

        gdToggle('on');
        scrollToggle('add');
      }
    }
  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      this._currentTranslation = 0;
      this._pageElement = this.parentNode;

      this._setupListeners(true);
      this._setStyle();
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      this._hide();
      this._setupListeners(false);
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, last, current) {
      if (name === 'height' && this._pageElement) {
        this._setStyle();
      }
    }
  }, {
    key: 'onAction',
    get: function get() {
      return this._onAction;
    },
    set: function set(value) {
      if (value && !(value instanceof Function)) {
        throw new Error('\'onAction\' must be a function or null');
      }
      this._onAction = value;
    }

    /**
     * @property onPull
     * @type {Function}
     * @description
     *   [en]Hook called whenever the user pulls the element. It gets the pulled distance ratio (scroll / height) and an animationOptions object as arguments.[/en]
     *   [ja][/ja]
     */

  }, {
    key: 'onPull',
    get: function get() {
      return this._onPull;
    },
    set: function set(value) {
      if (value && !(value instanceof Function)) {
        throw new Error('\'onPull\' must be a function or null.');
      }
      this._onPull = value;
    }
  }, {
    key: 'height',
    set: function set(value) {
      if (!util.isInteger(value)) {
        throw new Error('The height must be an integer');
      }

      this.setAttribute('height', value + 'px');
    },
    get: function get() {
      return parseInt(this.getAttribute('height') || '64', 10);
    }

    /**
     * @property thresholdHeight
     * @type {Number}
     * @description
     *   [en]The thresholdHeight of the pull hook in pixels. The default value is `96px`.[/en]
     *   [ja][/ja]
     */

  }, {
    key: 'thresholdHeight',
    set: function set(value) {
      if (!util.isInteger(value)) {
        throw new Error('The threshold height must be an integer');
      }

      this.setAttribute('threshold-height', value + 'px');
    },
    get: function get() {
      return parseInt(this.getAttribute('threshold-height') || '96', 10);
    }
  }, {
    key: 'state',
    get: function get() {
      return this.getAttribute('state');
    }

    /**
     * @property pullDistance
     * @readonly
     * @type {Number}
     * @description
     *   [en]The current number of pixels the pull hook has moved.[/en]
     *   [ja]現在のプルフックが引き出された距離をピクセル数。[/ja]
     */

  }, {
    key: 'pullDistance',
    get: function get() {
      return this._currentTranslation;
    }

    /**
     * @property disabled
     * @type {Boolean}
     * @description
     *   [en]Whether the element is disabled or not.[/en]
     *   [ja]無効化されている場合に`true`。[/ja]
     */

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
      return ['height'];
    }
  }, {
    key: 'events',
    get: function get() {
      return ['changestate'];
    }
  }]);

  return PullHookElement;
}(BaseElement);

export default PullHookElement;


ons.elements.PullHook = PullHookElement;
customElements.define('ons-pull-hook', PullHookElement);