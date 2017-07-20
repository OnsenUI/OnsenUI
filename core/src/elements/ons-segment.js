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
   * @event change
   * @description
   *   [en]Fires when the active button is changed.[/en]
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
   *  [en]The appearance of the button.[/en]
   *  [ja]ボタンの表現を指定します。[/ja]
   */

  /**
   * @attribute ripple
   * @description
   *  [en]If this attribute is defined, the button will have a ripple effect.[/en]
   *  [ja][/ja]
   */

  /**
   * @attribute disabled
   * @description
   *   [en]Specify if button should be disabled.[/en]
   *   [ja]ボタンを無効化する場合は指定します。[/ja]
   */

  constructor() {
    super();

    this._segmentId = generateId();
    this._tabbar = null;

    contentReady(this, () => {
      this._compile();
    });
  }

  _compile() {
    autoStyle.prepare(this);

    this.classList.add(defaultClassName);

    if (this.children && this.children.length > 0) {
      const buttonArray = util.arrayFrom(this.children);
      if (buttonArray.some(elem => elem.tagName.toLowerCase() !== 'button')) {
        throw new Error('<ons-segment> error: all elements inside <ons-segment> should be <button> elements.');
      }
      buttonArray.forEach((item, index) => {
        const segmentItem = util.create('div.segment__item');
        const segmentInput = index === 0
        ? util.createElement(`<input type="radio" class="segment__input" name="${this._segmentId}" checked>`)
        : util.createElement(`<input type="radio" class="segment__input" name="${this._segmentId}">`);
        segmentInput.id = this._segmentId + '-' + index;
        segmentItem.appendChild(segmentInput);
        item.classList.add('segment__button');
        segmentItem.appendChild(item);
        this.appendChild(segmentItem);
        segmentInput.addEventListener('change', this._onTabChange.bind(this));
      });
    }

    if (this.hasAttribute('tabbar')) {
      this._tabbar = document.getElementById(this.getAttribute('tabbar'));
      if (!this._tabbar) {
        throw new Error(`<ons-segment> error: no tabbar with id ${this.getAttribute('tabbar')} was found.`);
      }
      else if (this._tabbar._getTabbarElement().children.length !== this.children.length) {
        throw new Error(`<ons-segment> error: number of tabs must be the same as number of buttons.`);
      }
      else {
        this._tabbar.setTabbarVisibility(false);
        this._tabbar.addEventListener('postchange', event => {
          this._getSegmentInput(event.index).checked = true;
          this._triggerChangeEvent(event.index);
        })
      }
    }

    ModifierUtil.initModifier(this, scheme);
  }

  static get observedAttributes() {
    return ['class', 'modifier'];
  }

  attributeChangedCallback(name, last, current) {
    switch (name) {
      case 'class':
        if (!this.classList.contains(defaultClassName)) {
          this.className = defaultClassName + ' ' + current;
        }
        break;
      case 'modifier':
        ModifierUtil.onModifierChanged(last, current, this, scheme);
        break;
    }
  }

  /**
   * @return {String}
   */
  getSegmentId() {
    return this._segmentId;
  }

  /**
   * @return {Element}
   */
  get tabbar() {
    return this._tabbar;
  }

  /**
   * @method setActiveButton
   * @signature setActiveButton(index, [options])
   * @param {Number} index
   *   [en]Tab index.[/en]
   *   [ja]タブのインデックスを指定します。[/ja]
   * @param {Object} [options]
   *   [en]Parameter object.[/en]
   *   [ja]オプションを指定するオブジェクト。[/ja]
   * @param {Boolean} [options.keepPage]
   *   [en]If true the page will not be changed.[/en]
   *   [ja]タブバーが現在表示しているpageを変えない場合にはtrueを指定します。[/ja]
   * @param {String} [options.animation]
   *   [en]Animation name. Available animations are `"fade"`, `"slide"` and `"none"`.[/en]
   *   [ja]アニメーション名を指定します。`"fade"`、`"slide"`、`"none"`のいずれかを指定できます。[/ja]
   * @param {String} [options.animationOptions]
   *   [en]Specify the animation's duration, delay and timing. E.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   *   [ja]アニメーション時のduration, delay, timingを指定します。e.g. {duration: 0.2, delay: 0.4, timing: 'ease-in'}[/ja]
   * @description
   *   [en]Show specified tab page. Animations and other options can be specified by the second parameter.[/en]
   *   [ja]指定したインデックスのタブを表示します。アニメーションなどのオプションを指定できます。[/ja]
   * @return {Promise}
   *   [en]Resolves to the new page element.[/en]
   *   [ja][/ja]
   */
  setActiveButton(index, options = {}) {
    if (this._tabbar) {
      this._tabbar.setActiveTab(index, options);
    } else {
      this._getSegmentInput(index).checked = true;
      this._triggerChangeEvent(index);
    }
  }

  _getSegmentInput(index) {
    return this.querySelector('#' + this._segmentId + '-' + index);
  }

  _onTabChange(event) {
    event.stopPropagation();
    if (this._tabbar) {
      this._tabbar.setActiveTab(event.target.id.slice(-1));
    }
    this._triggerChangeEvent(event.target.id.slice(-1));
  }

  _triggerChangeEvent(index) {
    util.triggerElementEvent(this, 'change', {
      index: index,
      segmentItem: this.children[index]
    });
  }

  static get events() {
    return ['change'];
  }
}

customElements.define('ons-segment', SegmentElement);
