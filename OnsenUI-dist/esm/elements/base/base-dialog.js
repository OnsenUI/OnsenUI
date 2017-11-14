import _Promise from 'babel-runtime/core-js/promise';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
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

import util from '../../ons/util';
import BaseElement from './base-element';
import ModifierUtil from '../../ons/internal/modifier-util';
import AnimatorFactory from '../../ons/internal/animator-factory';
import DoorLock from '../../ons/doorlock';
import deviceBackButtonDispatcher from '../../ons/internal/device-back-button-dispatcher';
import contentReady from '../../ons/content-ready';

var BaseDialogElement = function (_BaseElement) {
  _inherits(BaseDialogElement, _BaseElement);

  _createClass(BaseDialogElement, [{
    key: '_updateAnimatorFactory',
    value: function _updateAnimatorFactory() {
      throw new Error('_updateAnimatorFactory method must be implemented.');
    }
  }, {
    key: '_toggleStyle',
    value: function _toggleStyle(shouldShow) {
      this.style.display = shouldShow ? 'block' : 'none';
    }
  }, {
    key: '_scheme',
    get: function get() {
      throw new Error('_scheme getter must be implemented.');
    }
  }]);

  function BaseDialogElement() {
    _classCallCheck(this, BaseDialogElement);

    var _this = _possibleConstructorReturn(this, (BaseDialogElement.__proto__ || _Object$getPrototypeOf(BaseDialogElement)).call(this));

    _this._visible = false;
    _this._doorLock = new DoorLock();
    _this._cancel = _this._cancel.bind(_this);
    _this._selfCamelName = util.camelize(_this.tagName.slice(4));
    _this._defaultDBB = function (e) {
      return _this.cancelable ? _this._cancel() : e.callParentHandler();
    };
    _this._animatorFactory = _this._updateAnimatorFactory();
    return _this;
  }

  _createClass(BaseDialogElement, [{
    key: '_cancel',
    value: function _cancel() {
      var _this2 = this;

      if (this.cancelable && !this._running) {
        this._running = true;
        this.hide().then(function () {
          _this2._running = false;
          util.triggerElementEvent(_this2, 'dialog-cancel');
        }, function () {
          return _this2._running = false;
        });
      }
    }
  }, {
    key: '_preventScroll',
    value: function _preventScroll(event) {
      event.cancelable && event.preventDefault();
    }
  }, {
    key: 'show',
    value: function show() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return this._setVisible.apply(this, [true].concat(args));
    }
  }, {
    key: 'hide',
    value: function hide() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return this._setVisible.apply(this, [false].concat(args));
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return this._setVisible.apply(this, [!this.visible].concat(args));
    }
  }, {
    key: '_setVisible',
    value: function _setVisible(shouldShow) {
      var _util$triggerElementE,
          _this3 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var action = shouldShow ? 'show' : 'hide';

      options = _extends({}, options);
      options.animationOptions = util.extend(options.animationOptions || {}, AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options')));

      var canceled = false;
      util.triggerElementEvent(this, 'pre' + action, (_util$triggerElementE = {}, _defineProperty(_util$triggerElementE, this._selfCamelName, this), _defineProperty(_util$triggerElementE, 'cancel', function cancel() {
        return canceled = true;
      }), _util$triggerElementE));

      if (canceled) {
        return _Promise.reject('Canceled in pre' + action + ' event.');
      }

      return new _Promise(function (resolve) {
        _this3._doorLock.waitUnlock(function () {
          var unlock = _this3._doorLock.lock();
          var animator = _this3._animatorFactory.newAnimator(options);

          shouldShow && _this3._toggleStyle(true, options);

          contentReady(_this3, function () {
            animator[action](_this3, function () {
              !shouldShow && _this3._toggleStyle(false, options);
              _this3._visible = shouldShow;

              unlock();

              util.propagateAction(_this3, '_' + action);
              util.triggerElementEvent(_this3, 'post' + action, _defineProperty({}, _this3._selfCamelName, _this3)); // postshow posthide

              if (options.callback instanceof Function) {
                options.callback(_this3);
              }

              resolve(_this3);
            });
          });
        });
      });
    }
  }, {
    key: '_updateMask',
    value: function _updateMask() {
      var _this4 = this;

      contentReady(this, function () {
        if (_this4._mask && _this4.getAttribute('mask-color')) {
          _this4._mask.style.backgroundColor = _this4.getAttribute('mask-color');
        }
      });
    }
  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      var _this5 = this;

      this.onDeviceBackButton = this._defaultDBB.bind(this);

      contentReady(this, function () {
        if (_this5._mask) {
          _this5._mask.addEventListener('click', _this5._cancel, false);
          _this5._mask.addEventListener('touchmove', _this5._preventScroll, false); // iOS fix
        }
      });
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      this._backButtonHandler.destroy();
      this._backButtonHandler = null;

      if (this._mask) {
        this._mask.removeEventListener('click', this._cancel, false);
        this._mask.removeEventListener('touchmove', this._preventScroll, false);
      }
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, last, current) {
      switch (name) {
        case 'modifier':
          ModifierUtil.onModifierChanged(last, current, this, this._scheme);
          break;
        case 'animation':
          this._animatorFactory = this._updateAnimatorFactory();
          break;
        case 'mask-color':
          this._updateMask();
          break;
      }
    }
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
  }, {
    key: 'visible',
    get: function get() {
      return this._visible;
    }
  }, {
    key: 'disabled',
    set: function set(value) {
      return util.toggleAttribute(this, 'disabled', value);
    },
    get: function get() {
      return this.hasAttribute('disabled');
    }
  }, {
    key: 'cancelable',
    set: function set(value) {
      return util.toggleAttribute(this, 'cancelable', value);
    },
    get: function get() {
      return this.hasAttribute('cancelable');
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['modifier', 'animation', 'mask-color'];
    }
  }, {
    key: 'events',
    get: function get() {
      return ['preshow', 'postshow', 'prehide', 'posthide', 'dialog-cancel'];
    }
  }]);

  return BaseDialogElement;
}(BaseElement);

export default BaseDialogElement;