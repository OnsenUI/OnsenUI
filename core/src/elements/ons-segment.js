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

import util from '../ons/util';
import autoStyle from '../ons/autostyle';
import ModifierUtil from '../ons/internal/modifier-util';
import BaseElement from './base/base-element';
import contentReady from '../ons/content-ready';

const defaultClassName = 'segment';
const scheme = {
  '': 'segment--*',
  '.segment__item': 'segment--*__item',
  '.segment__input': 'segment--*__input',
  '.segment__button': 'segment--*__button'
};

const generateId = (() => {
  let i = 0;
  return () => 'ons-segment-gen-' + (i++);
})();

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
 * @guide using-modifier [en]More details about the `modifier` attribute[/en][ja]modifier属性の使い方[/ja]
 * @guide cross-platform-styling [en]Information about cross platform styling[/en][ja]Information about cross platform styling[/ja]
 * @example
 * <ons-segment>
 *   <ons-button>Label 1</ons-button>
 *   <ons-button>Label 2</ons-button>
 *   <ons-button>Label 3</ons-button>
 * </ons-segment>
 */

export default class SegmentElement extends BaseElement {

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
   *  [en]ID of the `<ons-tabbar>` to "connect" to the segment.[/en]
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

  constructor() {
    super();

    this._segmentId = generateId();
    this._tabbar = null;

    contentReady(this, () => {
      this._compile()
      this._lastActiveIndex = this.getActiveButtonIndex();
    });
  }

  _compile() {
    autoStyle.prepare(this);

    this.classList.add(defaultClassName);

    for (let index = this.children.length - 1; index >= 0; index--) {
      const button = this.children[index];
      if (button.tagName !== 'BUTTON') {
        throw new Error('<ons-segment> error: all elements inside <ons-segment> should be <button> elements.');
      }

      const segmentItem = util.createElement(`
        <div class="segment__item">
          <input type="radio" class="segment__input"
            name="${this._segmentId}"
            ${!this.hasAttribute('tabbar-id') && index === (parseInt(this.getAttribute('active-index')) || 0) ? 'checked' : ''}>
        </div>
      `);

      this.replaceChild(segmentItem, button);
      button.classList.add('segment__button');
      segmentItem.appendChild(button);
    }

    if (this.hasAttribute('tabbar-id')) {
      this._tabbar = document.getElementById(this.getAttribute('tabbar-id'));
      if (!this._tabbar) {
        throw new Error(`<ons-segment> error: no tabbar with id ${this.getAttribute('tabbar-id')} was found.`);
      }

      this._tabbar.hide();
      setImmediate(() => this._inputs[this._tabbar.getActiveTabIndex()].checked = true);

      this._tabbar.addEventListener('prechange', e => setImmediate(() => {
        if (!e.detail.canceled) {
          this._inputs[e.index].checked = true;
        }
      }));
    }

    this.addEventListener('change', this._onChange.bind(this));

    ModifierUtil.initModifier(this, scheme);
  }

  get _inputs() {
    return Array.prototype.map.call(this.children, e => e.firstElementChild);
  }

  /**
   * @property tabbar
   * @readonly
   * @default null
   * @type {Element}
   * @description
   *   [en]<ons-tabbar> element connected to the <ons-segment>.[/en]
   *   [ja]タブバーが見える場合に`true`。[/ja]
   */
  get tabbar() {
    return this._tabbar;
  }

  /**
   * @method setActiveButton
   * @signature setActiveButton(index, [options])
   * @param {Number} index
   *   [en]Button index.[/en]
   *   [ja][/ja]
   * @param {Object} [options]
   *   [en]Parameter object, works only if there is no connected tabbar.[/en]
   *   [ja][/ja]
   * @param {String} [options.animation]
   *   [en]Animation name. Available animations are `"fade"`, `"slide"` and `"none"`.[/en]
   *   [ja]アニメーション名を指定します。`"fade"`、`"slide"`、`"none"`のいずれかを指定できます。[/ja]
   * @param {String} [options.animationOptions]
   *   [en]Specify the animation's duration, delay and timing. E.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. {duration: 0.2, delay: 0.4, timing: 'ease-in'}[/ja]
   * @description
   *   [en]Make button with the specified index active. If there is a connected tabbar it shows the corresponding tab page. In this case animations and their options can be specified by the second parameter.[/en]
   *   [ja][/ja]
   * @return {Promise}
   *   [en]Resolves to the selected index or to the new page element if there is a connected tabbar.[/en]
   *   [ja][/ja]
   */
  setActiveButton(index, options = {}) {
    if (this._tabbar) {
      return this._tabbar.setActiveTab(index, options);
    }

    this._inputs[index].checked = true;
    this._postChange(index);
    return Promise.resolve(index);
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
  getActiveButtonIndex() {
    return this._inputs.findIndex(i => i.checked);
  }

  _onChange(event) {
    event.stopPropagation();
    this._tabbar
      ? this._tabbar.setActiveTab(this.getActiveButtonIndex(), { reject: false })
      : this._postChange(this.getActiveButtonIndex());
  }

  _postChange(index) {
    index = parseInt(index, 10);
    util.triggerElementEvent(this, 'postchange', {
      index,
      activeIndex: index,
      lastActiveIndex: this._lastActiveIndex,
      segmentItem: this.children[index]
    });
    this._lastActiveIndex = index;
  }

  static get observedAttributes() {
    return ['class', 'modifier'];
  }

  attributeChangedCallback(name, last, current) {
    switch (name) {
      case 'class':
        util.restoreClass(this, defaultClassName, scheme);
        break;
      case 'modifier':
        ModifierUtil.onModifierChanged(last, current, this, scheme);
        break;
    }
  }

  static get events() {
    return ['postchange'];
  }
}

customElements.define('ons-segment', SegmentElement);
