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

import util from 'ons/util';
import ModifierUtil from 'ons/internal/modifier-util';
import AnimatorFactory from 'ons/internal/animator-factory';
import PopoverAnimator from './animator';
import FadePopoverAnimator from './fade-animator';
import platform from 'ons/platform';
import BaseElement from 'ons/base-element';
import deviceBackButtonDispatcher from 'ons/device-back-button-dispatcher';
import DoorLock from 'ons/doorlock';

const scheme = {
  '.popover': 'popover--*',
  '.popover__content': 'popover__content--*'
};

const templateSource = util.createElement(`
  <div>
    <div class="popover-mask"></div>
    <div class="popover">
      <div class="popover__content"></div>
      <div class="popover__arrow"></div>
    </div>
  </div>
`);

const _animatorDict = {
  'fade': FadePopoverAnimator,
  'none': PopoverAnimator
};


class PopoverElement extends BaseElement {

  get _mask() {
    return this.children[0];
  }

  get _popover() {
    return this.children[1];
  }

  get _content() {
    return this._popover.children[0];
  }

  get _arrow() {
    return this._popover.children[1];
  }

  createdCallback() {
    if (!this.hasAttribute('_compiled')) {
      this._compile();
      ModifierUtil.initModifier(this, scheme);

      this.setAttribute('_compiled', '');
    }

    this._visible = false;
    this._doorLock = new DoorLock();
    this._boundOnChange = this._onChange.bind(this);
    this._boundCancel = this._cancel.bind(this);


    this._animatorFactory = this._createAnimatorFactory();
  }

  _createAnimatorFactory() {
    return new AnimatorFactory({
      animators: _animatorDict,
      baseClass: PopoverAnimator,
      baseClassName: 'PopoverAnimator',
      defaultAnimation: this.getAttribute('animation') || 'fade'
    });
  }

  _onDeviceBackButton(event) {
    if (this.isCancelable()) {
      this._cancel();
    } else {
      event.callParentHandler();
    }
  }

  _setDirection(direction) {
    let arrowPosition;
    if (direction === 'up') {
      arrowPosition = 'bottom';
    } else if (direction === 'left') {
      arrowPosition = 'right';
    } else if (direction === 'down') {
      arrowPosition = 'top';
    } else if (direction == 'right') {
      arrowPosition = 'left';
    } else {
      throw new Error('Invalid direction.');
    }

    const popoverClassList = this._popover.classList;
    popoverClassList.remove('popover--up');
    popoverClassList.remove('popover--down');
    popoverClassList.remove('popover--left');
    popoverClassList.remove('popover--right');
    popoverClassList.add('popover--' + direction);

    const arrowClassList = this._arrow.classList;
    arrowClassList.remove('popover__top-arrow');
    arrowClassList.remove('popover__bottom-arrow');
    arrowClassList.remove('popover__left-arrow');
    arrowClassList.remove('popover__right-arrow');
    arrowClassList.add('popover__' + arrowPosition + '-arrow');
  }

  _positionPopoverByDirection(target, direction) {
    const el = this._popover;
    const pos = target.getBoundingClientRect();
    let own = el.getBoundingClientRect();
    const arrow = el.children[1];
    const offset = 14;
    const margin = 6;
    const radius = parseInt(window.getComputedStyle(el.querySelector('.popover__content')).borderRadius);

    arrow.style.top = '';
    arrow.style.left = '';

    this._setDirection(direction);

    // Position popover next to the target.
    if (['left', 'right'].indexOf(direction) > -1) {
      if (direction == 'left') {
        el.style.left = (pos.right - pos.width - own.width - offset) + 'px';
      } else {
        el.style.left = (pos.right + offset) + 'px';
      }
      el.style.top = (pos.bottom - pos.height / 2 - own.height / 2) + 'px';
    } else {
      if (direction == 'up') {
        el.style.top = (pos.bottom - pos.height - own.height - offset) + 'px';
      } else {
        el.style.top = (pos.bottom + offset) + 'px';
      }
      el.style.left = (pos.right - pos.width / 2 - own.width / 2) + 'px';
    }

    own = el.getBoundingClientRect();

    // This is the difference between the side and the hypothenuse of the arrow.
    const diff = (function(x) {
      return (x / 2) * Math.sqrt(2) - x / 2;
    })(parseInt(window.getComputedStyle(arrow).width));

    // This is the limit for the arrow. If it's moved further than this it's outside the popover.
    const limit = margin + radius + diff + 2;


    // Keep popover inside window and arrow inside popover.
    if (['left', 'right'].indexOf(direction) > -1) {
      if (own.top < margin) {
        arrow.style.top = Math.max(own.height / 2 + own.top - margin, limit)  + 'px';
        el.style.top = margin + 'px';
      } else if (own.bottom > window.innerHeight - margin) {
        arrow.style.top = Math.min(own.height / 2 - (window.innerHeight - own.bottom) + margin, own.height - limit) + 'px';
        el.style.top = (window.innerHeight - own.height - margin) + 'px';
      }
    } else {
      if (own.left < margin) {
        arrow.style.left = Math.max(own.width / 2 + own.left - margin, limit) + 'px';
        el.style.left = margin + 'px';
      } else if (own.right > window.innerWidth - margin) {
        arrow.style.left = Math.min(own.width / 2 - (window.innerWidth - own.right) + margin, own.width - limit) + 'px';
        el.style.left = (window.innerWidth - own.width - margin) + 'px';
      }
    }

    // Prevent animit from restoring the style.
    el.removeAttribute('data-animit-orig-style');
  }

  _positionPopover(target) {
    const directions = (() => {
      if (!this.hasAttribute('direction')) {
        return ['up', 'down', 'left', 'right'];
      } else {
        return this.getAttribute('direction').split(/\s+/);
      }
    })();

    const position = target.getBoundingClientRect();

    // The popover should be placed on the side with the most space.
    const scores = {
      left: position.left,
      right: window.innerWidth - position.right,
      up: position.top,
      down: window.innerHeight - position.bottom
    };

    const orderedDirections = Object.keys(scores).sort((a, b) => -(scores[a] - scores[b]));
    for (let i = 0, l = orderedDirections.length; i < l; i++) {
      const direction = orderedDirections[i];
      if (directions.indexOf(direction) > -1) {
        this._positionPopoverByDirection(target, direction);
        return;
      }
    }
  }

  _onChange() {
    setImmediate(() => {
      if (this._currentTarget) {
        this._positionPopover(this._currentTarget);
      }
    });
  }

  _compile() {
    const templateElement = templateSource.cloneNode(true);
    const content = templateElement.querySelector('.popover__content');
    const style = this.getAttribute('style');

    if (style) {
      this.removeAttribute('style');
    }

    while (this.childNodes[0]) {
      content.appendChild(this.childNodes[0]);
    }

    while (templateElement.children[0]) {
      this.appendChild(templateElement.children[0]);
    }

    if (style) {
      this._popover.setAttribute('style', style);
    }

    this.style.display = 'none';

    this._mask.style.zIndex = '20000';
    this._popover.style.zIndex = '20001';

    if (this.hasAttribute('mask-color')) {
      this._mask.style.backgroundColor = this.getAttribute('mask-color');
    }
  }

  /**
   * Show popover.
   *
   * @param {HTMLElement} [target] target element
   * @param {String} [target] css selector
   * @param {Event} [target] event
   * @param {Object} [options] options
   * @param {String} [options.animation] animation type
   * @param {Object} [options.animationOptions] animation options
   * @param {Function} [options.callback] callback
   * @return {Promise} Resolves to the displayed element
   */
  show(target, options = {}) {
    const callback = options.callback || function() {};

    if (typeof target === 'string') {
      target = document.querySelector(target);
    } else if (target instanceof Event) {
      target = target.target;
    }

    if (!target) {
     throw new Error('Target undefined');
    }

    options.animationOptions = util.extend(
      options.animationOptions || {},
      AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options'))
    );

    if (options.animation &&
      !(options.animation in _animatorDict)) {
      throw new Error(`Animator ${options.animation} is not registered.`);
    }

    let canceled = false;
    util.triggerElementEvent(this, 'preshow', {
      popover: this,
      cancel: function() {
        canceled = true;
      }
    });

    if (!canceled) {
      const tryShow = () => {
        const unlock = this._doorLock.lock();
        const animator = this._animatorFactory.newAnimator(options);

        this.style.display = 'block';

        this._currentTarget = target;
        this._positionPopover(target);

        return new Promise(resolve => {
          animator.show(this, () => {
            this._visible = true;
            unlock();

            util.triggerElementEvent(this, 'postshow', {popover: this});

            callback();
            resolve(this);
          });
        });
      };

      return new Promise(resolve => {
        this._doorLock.waitUnlock(() => resolve(tryShow()));
      });
    } else {
      return Promise.reject('Canceled in preshow event.');
    }
  }

  /**
   * Hide popover.
   *
   * @param {Object} [options] options
   * @param {String} [options.animation] animation type
   * @param {Object} [options.animationOptions] animation options
   * @param {Function} [options.callback] callback
   * @return {Promise} Resolves to the hidden element
   */
  hide(options = {}) {
    const callback = options.callback || function() {};

    options.animationOptions = util.extend(
      options.animationOptions || {},
      AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options'))
    );

    if (options.animation &&
      !(options.animation in _animatorDict)) {
      throw new Error(`Animator ${options.animation} is not registered.`);
    }

    let canceled = false;
    util.triggerElementEvent(this, 'prehide', {
      popover: this,
      cancel: function() {
        canceled = true;
      }
    });

    if (!canceled) {
      const tryHide = () => {
        const unlock = this._doorLock.lock();
        const animator = this._animatorFactory.newAnimator(options);

        return new Promise(resolve => {
          animator.hide(this, () => {
            this.style.display = 'none';
            this._visible = false;
            unlock();

            util.triggerElementEvent(this, 'posthide', {popover: this});

            callback();
            resolve(this);
          });
        });
      };

      return new Promise(resolve => {
        this._doorLock.waitUnlock(() => resolve(tryHide()));
      });
    } else {
      return Promise.reject('Canceled in prehide event.');
    }
  }

  /**
   * Returns whether the popover is visible or not.
   *
   * @return {Boolean}
   */
  isShown() {
    return this._visible;
  }

  attachedCallback() {
    this._mask.addEventListener('click', this._boundCancel, false);

    this._deviceBackButtonHandler = deviceBackButtonDispatcher.createHandler(this, this._onDeviceBackButton.bind(this));

    this._popover.addEventListener('DOMNodeInserted', this._boundOnChange, false);
    this._popover.addEventListener('DOMNodeRemoved', this._boundOnChange, false);

    window.addEventListener('resize', this._boundOnChange, false);
  }

  detachedCallback() {
    this._mask.removeEventListener('click', this._boundCancel, false);

    this._deviceBackButtonHandler.destroy();
    this._deviceBackButtonHandler = null;

    this._popover.removeEventListener('DOMNodeInserted', this._boundOnChange, false);
    this._popover.removeEventListener('DOMNodeRemoved', this._boundOnChange, false);

    window.removeEventListener('resize', this._boundOnChange, false);
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      return ModifierUtil.onModifierChanged(last, current, this, scheme);
    }
    else if (name === 'direction') {
      this._boundOnChange();
    }
    else if (name === 'animation' || name === 'animation-options') {
      this._animatorFactory = this._createAnimatorFactory();
    }
  }

  /**
   * Set whether the popover should be cancelable or not.
   *
   * @param {Boolean}
   */
  setCancelable(cancelable) {
    if (typeof cancelable !== 'boolean') {
      throw new Error('Argument must be a boolean.');
    }

    if (cancelable) {
      this.setAttribute('cancelable', '');
    } else {
      this.removeAttribute('cancelable');
    }
  }

  /**
   * Return whether the popover is cancelable or not.
   *
   * @return {Boolean}
   */
  isCancelable() {
    return this.hasAttribute('cancelable');
  }

  /**
   * Destroy the popover and remove it from the DOM tree.
   */
  destroy() {
    if (this.parentElement) {
      this.parentElement.removeChild(this);
    }
  }

  _cancel() {
    if (this.isCancelable()) {
      this.hide();
    }
  }
}

window.OnsPopoverElement = document.registerElement('ons-popover', {
  prototype: PopoverElement.prototype
});

/**
 * @param {String} name
 * @param {PopoverAnimator} Animator
 */
window.OnsPopoverElement.registerAnimator = function(name, Animator) {
  if (!(Animator.prototype instanceof PopoverAnimator)) {
    throw new Error('"Animator" param must inherit PopoverAnimator');
  }
  _animatorDict[name] = Animator;
};

window.OnsPopoverElement.PopoverAnimator = PopoverAnimator;

