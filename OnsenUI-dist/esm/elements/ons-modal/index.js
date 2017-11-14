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

import ons from '../../ons';
import util from '../../ons/util';
import ModifierUtil from '../../ons/internal/modifier-util';
import AnimatorFactory from '../../ons/internal/animator-factory';
import ModalAnimator from './animator';
import FadeModalAnimator from './fade-animator';
import LiftModalAnimator from './lift-animator';
import platform from '../../ons/platform';
import BaseDialogElement from '../base/base-dialog';
import contentReady from '../../ons/content-ready';

var scheme = {
  '': 'modal--*',
  'modal__content': 'modal--*__content'
};

var defaultClassName = 'modal';

var _animatorDict = {
  'default': ModalAnimator,
  'fade': FadeModalAnimator,
  'lift': LiftModalAnimator,
  'none': ModalAnimator
};

/**
 * @element ons-modal
 * @category dialog
 * @description
 *   [en]
 *     Modal component that masks current screen. Underlying components are not subject to any events while the modal component is shown.
 *
 *     This component can be used to block user input while some operation is running or to show some information to the user.
 *   [/en]
 *   [ja]
 *     画面全体をマスクするモーダル用コンポーネントです。下側にあるコンポーネントは、
 *     モーダルが表示されている間はイベント通知が行われません。
 *   [/ja]
 * @seealso ons-dialog
 *   [en]The `<ons-dialog>` component can be used to create a modal dialog.[/en]
 *   [ja][/ja]
 * @codepen devIg
 * @tutorial vanilla/reference/modal
 * @example
 * <ons-modal id="modal">
 *   Modal content
 * </ons-modal>
 * <script>
 *   var modal = document.getElementById('modal');
 *   modal.show();
 * </script>
 */

var ModalElement = function (_BaseDialogElement) {
  _inherits(ModalElement, _BaseDialogElement);

  /**
   * @event preshow
   * @description
   * [en]Fired just before the modal is displayed.[/en]
   * [ja]モーダルが表示される直前に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.modal
   *   [en]Component object.[/en]
   *   [ja]コンポーネントのオブジェクト。[/ja]
   * @param {Function} event.cancel
   *   [en]Execute this function to stop the modal from being shown.[/en]
   *   [ja]この関数を実行すると、ダイアログの表示がキャンセルされます。[/ja]
   */

  /**
   * @event postshow
   * @description
   * [en]Fired just after the modal is displayed.[/en]
   * [ja]モーダルが表示された直後に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.modal
   *   [en]Component object.[/en]
   *   [ja]コンポーネントのオブジェクト。[/ja]
   */

  /**
   * @event prehide
   * @description
   * [en]Fired just before the modal is hidden.[/en]
   * [ja]モーダルが隠れる直前に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.modal
   *   [en]Component object.[/en]
   *   [ja]コンポーネントのオブジェクト。[/ja]
   * @param {Function} event.cancel
   *   [en]Execute this function to stop the modal from being hidden.[/en]
   *   [ja]この関数を実行すると、ダイアログの非表示がキャンセルされます。[/ja]
   */

  /**
   * @event posthide
   * @description
   * [en]Fired just after the modal is hidden.[/en]
   * [ja]モーダルが隠れた後に発火します。[/ja]
   * @param {Object} event [en]Event object.[/en]
   * @param {Object} event.modal
   *   [en]Component object.[/en]
   *   [ja]コンポーネントのオブジェクト。[/ja]
   */

  /**
   * @attribute animation
   * @type {String}
   * @default default
   * @description
   *  [en]The animation used when showing and hiding the modal. Can be either `"none"`, `"fade"` or `"lift"`.[/en]
   *  [ja]モーダルを表示する際のアニメーション名を指定します。"none"もしくは"fade","lift"を指定できます。[/ja]
   */

  /**
   * @attribute animation-options
   * @type {Expression}
   * @description
   *  [en]Specify the animation's duration, timing and delay with an object literal. E.g. `{duration: 0.2, delay: 1, timing: 'ease-in'}`.[/en]
   *  [ja]アニメーション時のduration, timing, delayをオブジェクトリテラルで指定します。e.g. <code>{duration: 0.2, delay: 1, timing: 'ease-in'}</code>[/ja]
   */

  function ModalElement() {
    _classCallCheck(this, ModalElement);

    var _this = _possibleConstructorReturn(this, (ModalElement.__proto__ || _Object$getPrototypeOf(ModalElement)).call(this));

    _this._defaultDBB = function () {
      return undefined;
    };
    contentReady(_this, function () {
      return _this._compile();
    });
    return _this;
  }

  _createClass(ModalElement, [{
    key: '_updateAnimatorFactory',
    value: function _updateAnimatorFactory() {
      return new AnimatorFactory({
        animators: _animatorDict,
        baseClass: ModalAnimator,
        baseClassName: 'ModalAnimator',
        defaultAnimation: this.getAttribute('animation')
      });
    }

    /**
     * @property onDeviceBackButton
     * @type {Object}
     * @description
     *   [en]Back-button handler.[/en]
     *   [ja]バックボタンハンドラ。[/ja]
     */

  }, {
    key: '_compile',
    value: function _compile() {
      this.style.display = 'none';
      this.style.zIndex = 10001;
      this.classList.add(defaultClassName);

      if (!util.findChild(this, '.modal__content')) {
        var content = document.createElement('div');
        content.classList.add('modal__content');

        while (this.childNodes[0]) {
          var node = this.childNodes[0];
          this.removeChild(node);
          content.insertBefore(node, null);
        }

        this.appendChild(content);
      }

      ModifierUtil.initModifier(this, this._scheme);
    }
  }, {
    key: '_toggleStyle',
    value: function _toggleStyle(shouldShow) {
      this.style.display = shouldShow ? 'table' : 'none';
    }
  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      _get(ModalElement.prototype.__proto__ || _Object$getPrototypeOf(ModalElement.prototype), 'connectedCallback', this).call(this);
      this.addEventListener('touchmove', _get(ModalElement.prototype.__proto__ || _Object$getPrototypeOf(ModalElement.prototype), '_preventScroll', this), false); // iOS fix
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      _get(ModalElement.prototype.__proto__ || _Object$getPrototypeOf(ModalElement.prototype), 'disconnectedCallback', this).call(this);
      this.removeEventListener('touchmove', _get(ModalElement.prototype.__proto__ || _Object$getPrototypeOf(ModalElement.prototype), '_preventScroll', this), false);
    }

    /**
     * @property visible
     * @readonly
     * @type {Boolean}
     * @description
     *   [en]Whether the element is visible or not.[/en]
     *   [ja]要素が見える場合に`true`。[/ja]
     */

    /**
     * @method show
     * @signature show([options])
     * @param {Object} [options]
     *   [en]Parameter object.[/en]
     *   [ja]オプションを指定するオブジェクト。[/ja]
     * @param {String} [options.animation]
     *   [en]Animation name. Available animations are `"none"` and `"fade"`.[/en]
     *   [ja]アニメーション名を指定します。"none", "fade"のいずれかを指定します。[/ja]
     * @param {String} [options.animationOptions]
     *   [en]Specify the animation's duration, delay and timing. E.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
     *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. {duration: 0.2, delay: 0.4, timing: 'ease-in'}[/ja]
     * @param {Function} [options.callback]
     *   [en]This function is called after the modal has been revealed.[/en]
     *   [ja]モーダルが表示され終わった後に呼び出される関数オブジェクトを指定します。[/ja]
     * @description
     *   [en]Show modal.[/en]
     *   [ja]モーダルを表示します。[/ja]
     * @return {Promise}
     *   [en]Resolves to the displayed element[/en]
     *   [ja][/ja]
     */

    /**
     * @method toggle
     * @signature toggle([options])
     * @param {Object} [options]
     *   [en]Parameter object.[/en]
     *   [ja]オプションを指定するオブジェクト。[/ja]
     * @param {String} [options.animation]
     *   [en]Animation name. Available animations are `"none"` and `"fade"`.[/en]
     *   [ja]アニメーション名を指定します。"none", "fade"のいずれかを指定します。[/ja]
     * @param {String} [options.animationOptions]
     *   [en]Specify the animation's duration, delay and timing. E.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
     *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. {duration: 0.2, delay: 0.4, timing: 'ease-in'}[/ja]
     * @param {Function} [options.callback]
     *   [en]This function is called after the modal has been revealed.[/en]
     *   [ja]モーダルが表示され終わった後に呼び出される関数オブジェクトを指定します。[/ja]
     * @description
     *   [en]Toggle modal visibility.[/en]
     *   [ja]モーダルの表示を切り替えます。[/ja]
     */

    /**
     * @method hide
     * @signature hide([options])
     * @param {Object} [options]
     *   [en]Parameter object.[/en]
     *   [ja]オプションを指定するオブジェクト。[/ja]
     * @param {String} [options.animation]
     *   [en]Animation name. Available animations are `"none"` and `"fade"`.[/en]
     *   [ja]アニメーション名を指定します。"none", "fade"のいずれかを指定します。[/ja]
     * @param {String} [options.animationOptions]
     *   [en]Specify the animation's duration, delay and timing. E.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
     *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. {duration: 0.2, delay: 0.4, timing: 'ease-in'}[/ja]
     * @param {Function} [options.callback]
     *   [en]This function is called after the modal has been revealed.[/en]
     *   [ja]モーダルが表示され終わった後に呼び出される関数オブジェクトを指定します。[/ja]
     * @description
     *   [en]Hide modal.[/en]
     *   [ja]モーダルを非表示にします。[/ja]
     * @return {Promise}
     *   [en]Resolves to the hidden element[/en]
     *   [ja][/ja]
     */

  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, last, current) {
      if (name === 'class') {
        util.restoreClass(this, defaultClassName, scheme);
      } else {
        _get(ModalElement.prototype.__proto__ || _Object$getPrototypeOf(ModalElement.prototype), 'attributeChangedCallback', this).call(this, name, last, current);
      }
    }

    /**
     * @param {String} name
     * @param {Function} Animator
     */

  }, {
    key: '_scheme',
    get: function get() {
      return scheme;
    }
  }], [{
    key: 'registerAnimator',
    value: function registerAnimator(name, Animator) {
      if (!(Animator.prototype instanceof ModalAnimator)) {
        throw new Error('"Animator" param must inherit OnsModalElement.ModalAnimator');
      }
      _animatorDict[name] = Animator;
    }
  }, {
    key: 'observedAttributes',
    get: function get() {
      return [].concat(_toConsumableArray(_get(ModalElement.__proto__ || _Object$getPrototypeOf(ModalElement), 'observedAttributes', this)), ['class']);
    }
  }, {
    key: 'animators',
    get: function get() {
      return _animatorDict;
    }
  }, {
    key: 'ModalAnimator',
    get: function get() {
      return ModalAnimator;
    }
  }]);

  return ModalElement;
}(BaseDialogElement);

export default ModalElement;


ons.elements.Modal = ModalElement;
customElements.define('ons-modal', ModalElement);