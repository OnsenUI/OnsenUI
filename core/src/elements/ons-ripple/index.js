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
import internal from '../../ons/internal';
import BaseElement from '../base/base-element';
import Animator from './animator-css';
import contentReady from '../../ons/content-ready';
import ModifierUtil from '../../ons/internal/modifier-util';

const defaultClassName = 'ripple';
const scheme = {
  '': 'ripple--*',
  '.ripple__wave': 'ripple--*__wave',
  '.ripple__background': 'ripple--*__background',
};

/**
 * @element ons-ripple
 * @category visual
 * @description
 *   [en]
 *     Adds a Material Design "ripple" effect to an element. The ripple effect will spread from the position where the user taps.
 *
 *     Some elements such as `<ons-button>` and `<ons-fab>`  support a `ripple` attribute.
 *   [/en]
 *   [ja]マテリアルデザインのリップル効果をDOM要素に追加します。[/ja]
 * @codepen wKQWdZ
 * @tutorial vanilla/Reference/ripple
 * @modifier light-gray
 *   [en]Change the color of effects to light gray.[/en]
 *   [ja]エフェクトの色が明るい灰色になります。[/ja]
 * @guide theming.html#cross-platform-styling-autostyling
 *  [en]Cross platform styling[/en]
 *  [ja]Cross platform styling[/ja]
 * @example
 * <div class="my-div">
 *  <ons-ripple></ons-ripple>
 * </div>
 *
 * @example
 * <ons-button ripple>Click me!</ons-button>
 */
export default class RippleElement extends BaseElement {

  /**
   * @attribute color
   * @type {String}
   * @description
   *   [en]Color of the ripple effect.[/en]
   *   [ja]リップルエフェクトの色を指定します。[/ja]
   */

  /**
   * @attribute modifier
   * @type {String}
   * @description
   *   [en]The appearance of the ripple effect.[/en]
   *   [ja]エフェクトの表現を指定します。[/ja]
   */

  /**
   * @attribute background
   * @type {String}
   * @description
   *   [en]Color of the background.[/en]
   *   [ja]背景の色を設定します。[/ja]
   */

  /**
   * @attribute size
   * @type {String}
   * @description
   *   [en]Sizing of the wave on ripple effect. Set "cover" or "contain". Default is "cover".[/en]
   *   [ja]エフェクトのサイズを指定します。"cover"もしくは"contain"を指定します。デフォルトは"cover"です。[/ja]
   */

  /**
   * @attribute center
   * @type {Boolean}
   * @description
   *   [en]If this attribute presents, change the position of wave effect to center of the target element.[/en]
   *   [ja]この要素を設定すると、エフェクトの位置が要素の真ん中から始まります。[/ja]
   */

  /**
   * @attribute disabled
   * @description
   *   [en]If this attribute is set, the ripple effect will be disabled.[/en]
   *   [ja]この属性が設定された場合、リップルエフェクトは無効になります。[/ja]
   */

  constructor() {
    super();

    contentReady(this, () => this._compile());

    this._animator = new Animator();

    ['color', 'center', 'start-radius', 'background', 'modifier'].forEach(e => {
      this.attributeChangedCallback(e, null, this.getAttribute(e));
    });
  }

  _compile() {
    this.classList.add(defaultClassName);

    this._wave = this.getElementsByClassName('ripple__wave')[0];
    this._background = this.getElementsByClassName('ripple__background')[0];

    if (!(this._background && this._wave)) {
      this._wave = util.create('.ripple__wave');
      this._background = util.create('.ripple__background');

      this.appendChild(this._wave);
      this.appendChild(this._background);
    }

    ModifierUtil.initModifier(this, scheme);
  }

  _getEffectSize() {
    const sizes = ['cover', 'contain'];
    if (this.hasAttribute('size')) {
      const size = this.getAttribute('size');
      if (sizes.indexOf(size) !== -1) {
        return size;
      }
    }

    return 'cover';
  }

  _calculateCoords(e) {
    let x, y, h, w, r;
    const b = this.getBoundingClientRect();
    const size = this._getEffectSize();

    if (this._center) {
      x = b.width / 2;
      y = b.height / 2;

      if (size === 'cover') {
        r = Math.sqrt(x * x + y * y);
      } else if (size === 'contain') {
        r = Math.min(x, y);
      } else {
        throw Error('Invalid state. If this errors is shown, leport to GitHub issues.');
      }
    } else {
      x = (typeof e.clientX === 'number' ? e.clientX : e.changedTouches[0].clientX) - b.left;
      y = (typeof e.clientY === 'number' ? e.clientY : e.changedTouches[0].clientY) - b.top;
      h = Math.max(y, b.height - y);
      w = Math.max(x, b.width - x);

      if (size === 'cover') {
        r = Math.sqrt(h * h + w * w);
      } else if (size === 'contain') {
        r = Math.min(Math.round(h / 2), Math.round(w / 2));
      } else {
        throw Error('Invalid state. If this errors is shown, leport to GitHub issues.');
      }
    }

    return {x, y, r};
  }

  _rippleAnimation(e, duration = 300) {
    const {_animator, _wave, _background, _minR} = this;
    const {x, y, r} = this._calculateCoords(e);

    _animator.stopAll({stopNext: 1});
    _animator.animate(_background, {opacity: 1}, duration);

    util.extend(_wave.style, {
      opacity: 1,
      top: y - _minR + 'px',
      left: x - _minR + 'px',
      width: 2 * _minR + 'px',
      height: 2 * _minR + 'px'
    });

    return _animator.animate(_wave, {
      top: y - r,
      left: x - r,
      height: 2 * r,
      width: 2 * r
    }, duration);
  }

  _updateParent() {
    if (!this._parentUpdated && this.parentNode) {
      const computedStyle = window.getComputedStyle(this.parentNode);
      if (computedStyle.getPropertyValue('position') === 'static') {
        this.parentNode.style.position = 'relative';
      }
      this._parentUpdated = true;
    }
  }

  _onTap(e) {
    if (!this.disabled) {
      this._updateParent();
      this._rippleAnimation(e.gesture.srcEvent).then(() => {
        this._animator.fade(this._wave);
        this._animator.fade(this._background);
      });
    }
  }

  _onHold(e) {
    if (!this.disabled) {
      this._updateParent();
      this._holding = this._rippleAnimation(e.gesture.srcEvent, 2000);
      document.addEventListener('release', this._boundOnRelease);
    }
  }

  _onRelease(e) {
    if (this._holding) {
      this._holding.speed(300).then(() => {
        this._animator.stopAll({stopNext: true});
        this._animator.fade(this._wave);
        this._animator.fade(this._background);
      });

      this._holding = false;
    }

    document.removeEventListener('release', this._boundOnRelease);
  }

  _onDragStart(e) {
    if (this._holding) {
      return this._onRelease(e);
    }
    if (['left', 'right'].indexOf(e.gesture.direction) != -1) {
      this._onTap(e);
    }
  }

  connectedCallback() {
    this._parentNode = this.parentNode;
    this._boundOnTap = this._onTap.bind(this);
    this._boundOnHold = this._onHold.bind(this);
    this._boundOnDragStart = this._onDragStart.bind(this);
    this._boundOnRelease = this._onRelease.bind(this);

    if (internal.config.animationsDisabled) {
      this.disabled = true;
    } else {
      this._parentNode.addEventListener('tap', this._boundOnTap);
      this._parentNode.addEventListener('hold', this._boundOnHold);
      this._parentNode.addEventListener('dragstart', this._boundOnDragStart);
    }
  }

  disconnectedCallback() {
    const pn = this._parentNode || this.parentNode;
    pn.removeEventListener('tap', this._boundOnTap);
    pn.removeEventListener('hold', this._boundOnHold);
    pn.removeEventListener('dragstart', this._boundOnDragStart);
  }

  static get observedAttributes() {
    return ['start-radius', 'color', 'background', 'center', 'class', 'modifier'];
  }

  attributeChangedCallback(name, last, current) {
    switch (name) {

      case 'class':
        util.restoreClass(this, defaultClassName, scheme);
        break;

      case 'modifier':
        ModifierUtil.onModifierChanged(last, current, this, scheme);
        break;

      case 'start-radius':
        this._minR = Math.max(0, parseFloat(current) || 0);
        break;

      case 'color':
        if (current) {
          contentReady(this, () => {
            this._wave.style.background = current;
            if (!this.hasAttribute('background')) {
              this._background.style.background = current;
            }
          });
        }
        break;

      case 'background':
        if (current || last) {
          if (current === 'none') {
            contentReady(this, () => {
              this._background.setAttribute('disabled', 'disabled');
              this._background.style.background = 'transparent';
            });
          } else {
            contentReady(this, () => {
              if (this._background.hasAttribute('disabled')) {
                this._background.removeAttribute('disabled');
              }
              this._background.style.background = current;
            });
          }
        }
        break;

      case 'center':
        if (name === 'center') {
          this._center = current != null && current != 'false';
        }
        break;

    }
  }

  /**
   * @property disabled
   * @type {Boolean}
   * @description
   *   [en]Whether the element is disabled or not.[/en]
   *   [ja]無効化されている場合に`true`。[/ja]
   */
  set disabled(value) {
    return util.toggleAttribute(this, 'disabled', value);
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }
}

customElements.define('ons-ripple', RippleElement);
