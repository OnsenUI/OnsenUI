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
import autoStyle from '../../ons/autostyle';
import ModifierUtil from '../../ons/internal/modifier-util';
import contentReady from '../../ons/content-ready';

var INPUT_ATTRIBUTES = ['autocapitalize', 'autocomplete', 'autocorrect', 'autofocus', 'disabled', 'inputmode', 'max', 'maxlength', 'min', 'minlength', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'size', 'step', 'validator', 'value'];

var BaseInputElement = function (_BaseElement) {
  _inherits(BaseInputElement, _BaseElement);

  _createClass(BaseInputElement, [{
    key: '_update',
    value: function _update() {} // Optionally implemented

  }, {
    key: '_scheme',
    get: function get() {
      throw new Error('_scheme getter must be implemented.');
    }
  }, {
    key: '_template',
    get: function get() {
      throw new Error('_template getter must be implemented.');
    }
  }, {
    key: 'type',
    get: function get() {
      throw new Error('type getter must be implemented.');
    }
  }]);

  function BaseInputElement() {
    _classCallCheck(this, BaseInputElement);

    var _this = _possibleConstructorReturn(this, (BaseInputElement.__proto__ || _Object$getPrototypeOf(BaseInputElement)).call(this));

    contentReady(_this, function () {
      return _this._compile();
    });
    _this._boundDelegateEvent = _this._delegateEvent.bind(_this);
    return _this;
  }

  _createClass(BaseInputElement, [{
    key: '_compile',
    value: function _compile() {
      autoStyle.prepare(this);
      this._defaultClassName && this.classList.add(this._defaultClassName);

      if (this.children.length !== 0) {
        return;
      }

      this.appendChild(util.createFragment(this._template));

      this._setInputId();
      this._updateBoundAttributes();

      ModifierUtil.initModifier(this, this._scheme);
    }
  }, {
    key: '_updateBoundAttributes',
    value: function _updateBoundAttributes() {
      var _this2 = this;

      INPUT_ATTRIBUTES.forEach(function (attr) {
        if (_this2.hasAttribute(attr)) {
          _this2._input.setAttribute(attr, _this2.getAttribute(attr));
        } else {
          _this2._input.removeAttribute(attr);
        }
      });

      this._update();
    }
  }, {
    key: '_delegateEvent',
    value: function _delegateEvent(event) {
      var e = new CustomEvent(event.type, {
        bubbles: false,
        cancelable: true
      });

      return this.dispatchEvent(e);
    }
  }, {
    key: '_setInputId',
    value: function _setInputId() {
      if (this.hasAttribute('input-id')) {
        this._input.id = this.getAttribute('input-id');
      }
    }
  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      var _this3 = this;

      contentReady(this, function () {
        _this3._input.addEventListener('focus', _this3._boundDelegateEvent);
        _this3._input.addEventListener('blur', _this3._boundDelegateEvent);
      });
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      var _this4 = this;

      contentReady(this, function () {
        _this4._input.removeEventListener('focus', _this4._boundDelegateEvent);
        _this4._input.removeEventListener('blur', _this4._boundDelegateEvent);
      });
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, last, current) {
      var _this5 = this;

      switch (name) {
        case 'modifier':
          contentReady(this, function () {
            return ModifierUtil.onModifierChanged(last, current, _this5, _this5._scheme);
          });
          break;
        case 'input-id':
          contentReady(this, function () {
            return _this5._setInputId();
          });
          break;
        case 'class':
          util.restoreClass(this, this._defaultClassName, this._scheme);
          break;
      }

      if (INPUT_ATTRIBUTES.indexOf(name) >= 0) {
        contentReady(this, function () {
          return _this5._updateBoundAttributes();
        });
      }
    }
  }, {
    key: '_defaultClassName',
    get: function get() {
      return '';
    }
  }, {
    key: '_input',
    get: function get() {
      return this.querySelector('input');
    }
  }, {
    key: 'value',
    get: function get() {
      return this._input === null ? this.getAttribute('value') : this._input.value;
    },
    set: function set(val) {
      var _this6 = this;

      contentReady(this, function () {
        if (val instanceof Date) {
          val = val.toISOString().substring(0, 10);
        }
        _this6._input.value = val;
        _this6._update();
      });
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
      return ['modifier', 'input-id', 'class'].concat(INPUT_ATTRIBUTES);
    }
  }]);

  return BaseInputElement;
}(BaseElement);

export default BaseInputElement;