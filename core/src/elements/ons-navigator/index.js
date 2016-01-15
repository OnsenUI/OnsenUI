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
import internal from 'ons/internal';
import ModifierUtil from 'ons/internal/modifier-util';
import AnimatorFactory from 'ons/internal/animator-factory';
import NavigatorTransitionAnimator from './animator';
import IOSSlideNavigatorTransitionAnimator from './ios-slide-animator';
import SimpleSlideNavigatorTransitionAnimator from './simple-slide-animator';
import LiftNavigatorTransitionAnimator from './lift-animator';
import FadeNavigatorTransitionAnimator from './fade-animator';
import NoneNavigatorTransitionAnimator from './none-animator';
import platform from 'ons/platform';
import BaseElement from 'ons/base-element';
import NavigatorPage from './navigator-page';
import deviceBackButtonDispatcher from 'ons/device-back-button-dispatcher';
import DoorLock from 'ons/doorlock';

const _animatorDict = {
  'default': platform.isAndroid() ? SimpleSlideNavigatorTransitionAnimator : IOSSlideNavigatorTransitionAnimator,
  'slide': platform.isAndroid() ? SimpleSlideNavigatorTransitionAnimator : IOSSlideNavigatorTransitionAnimator,
  'simpleslide': SimpleSlideNavigatorTransitionAnimator,
  'lift': LiftNavigatorTransitionAnimator,
  'fade': FadeNavigatorTransitionAnimator,
  'none': NoneNavigatorTransitionAnimator
};

const rewritables = {
  /**
   * @param {Element} navigatorSideElement
   * @param {Function} callback
   */
  ready(navigatorElement, callback) {
    callback();
  },

  /**
   * @param {Element} navigatorElement
   * @param {Element} target
   * @param {Object} options
   * @param {Function} callback
   */
  link(navigatorElement, target, options, callback) {
    callback(target);
  }
};

class NavigatorElement extends BaseElement {

  createdCallback() {
    this._doorLock = new DoorLock();
    this._pages = [];
    this._boundOnDeviceBackButton = this._onDeviceBackButton.bind(this);
    this._isPushing = this._isPopping = false;

    this._initialHTML = this.innerHTML;
    this.innerHTML = '';

    this._animatorFactory = new AnimatorFactory({
      animators: _animatorDict,
      baseClass: NavigatorTransitionAnimator,
      baseClassName: 'NavigatorTransitionAnimator',
      defaultAnimation: this.getAttribute('animation')
    });
  }

  /**
   * @return {Boolean}
   */
  canPopPage() {
    return this._pages.length > 1;
  }

  /**
   * Replaces the current page with the specified one.
   *
   * @param {String} page
   * @param {Object} [options]
   */
  replacePage(page, options = {}) {

    const onTransitionEnd = options.onTransitionEnd || function() {};

    if (this._pages.length === 1) {
      options._forceHideBackButton = true;
    }

    options.onTransitionEnd = () => {
      if (this._pages.length > 1) {
        this._pages[this._pages.length - 2].destroy();
      }
      onTransitionEnd();
    };

    return this.pushPage(page, options);
  }

  /**
   * Pops current page from the page stack.
   *
   * @param {Object} [options]
   * @param {String} [options.animation]
   * @param {Object} [options.animationOptions]
   * @param {Boolean} [options.refresh]
   * @param {Function} [options.onTransitionEnd]
   * @param {Boolean} [options.cancelIfRunning]
   */
  popPage(options = {}) {

    if (options.cancelIfRunning && this._isPopping) {
      return;
    }

    options.animationOptions = util.extend(
      options.animationOptions || {},
      AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options'))
    );

    this._doorLock.waitUnlock(() => {
      if (this._pages.length <= 1) {
        throw new Error('ons-navigator\'s page stack is empty.');
      }

      if (this._emitPrePopEvent()) {
        return;
      }

      const unlock = this._doorLock.lock();

      if (options.refresh) {
        const index = this._pages.length - 2;

        if (!this._pages[index].page) {
          throw new Error('Refresh option cannot be used with pages directly inside the Navigator. Use ons-template instead.');
        }

        internal.getPageHTMLAsync(this._pages[index].page).then(templateHTML => {
          const element = this._createPageElement(templateHTML);
          const pageObject = this._createPageObject(this._pages[index].page, element, this._pages[index].options);

          rewritables.link(this, element, this._pages[index].options, element => {
            this.insertBefore(element, this._pages[index] ? this._pages[index].element : null);
            this._pages.splice(index, 0, pageObject);

            this._pages[index + 1].destroy();
            this._popPage(options, unlock);
          });
        });

      } else {
        this._popPage(options, unlock);
      }

    });
  }

  _popPage(options, unlock) {
    options.animationOptions = util.extend(
      options.animationOptions || {},
      AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options'))
    );

    const leavePage = this._pages.pop();
    const enterPage = this._pages[this._pages.length - 1];

    enterPage.updateBackButton();

    leavePage.element._hide();
    if (enterPage) {
      enterPage.element.style.display = 'block';
      enterPage.element._show();
    }

    // for "postpop" event
    const eventDetail = {
      leavePage: leavePage,
      enterPage: this._pages[this._pages.length - 1],
      navigator: this
    };

    const callback = () => {
      leavePage.destroy();

      this._isPopping = false;
      unlock();

      const event = util.triggerElementEvent(this, 'postpop', eventDetail);
      event.leavePage = null;

      if (typeof options.onTransitionEnd === 'function') {
        options.onTransitionEnd();
      }
    };

    this._isPopping = true;

    const animator = this._animatorFactory.newAnimator(options, leavePage.options.animator);
    animator.pop(enterPage, leavePage, callback);
  }


  /**
   * Insert page object that has the specified pageUrl into the page stack and
   * if options object is specified, apply the options.
   *
   * @param {Number} index
   * @param {String} page
   * @param {Object} [options]
   * @param {String/NavigatorTransitionAnimator} [options.animation]
   */
  insertPage(index, page, options = {}) {

    options = options || {};

    if (options && typeof options != 'object') {
      throw new Error('options must be an object. You supplied ' + options);
    }

    index = this._normalizeIndex(index);

    if (index >= this._pages.length) {
      return this.pushPage.apply(this, [].slice.call(arguments, 1));
    }

    this._doorLock.waitUnlock(() => {
      const unlock = this._doorLock.lock();

      internal.getPageHTMLAsync(page).then(templateHTML => {
        const element = this._createPageElement(templateHTML);
        const pageObject = this._createPageObject(page, element, options);

        rewritables.link(this, element, options, element => {
          element.style.display = 'none';
          this.insertBefore(element, this._pages[index].element);
          this._pages.splice(index, 0, pageObject);
          this.getCurrentPage().updateBackButton();

          setTimeout(() => {
            unlock();
            element = null;
          }, 1000 / 60);
        });
      });
    });
  }

  _normalizeIndex(index) {
    if (index < 0) {
      index = Math.abs(this._pages.length + index) % this._pages.length;
    }
    return index;
  }

  /**
   * Get current page's navigator item.
   *
   * Use this method to access options passed by pushPage() or resetToPage() method.
   * eg. ons.navigator.getCurrentPage().options
   *
   * @return {Object}
   */
  getCurrentPage() {
    if (this._pages.length <= 0) {
      throw new Error('Invalid state');
    }
    return this._pages[this._pages.length - 1];
  }

  _show() {
    if (this._pages[this._pages.length - 1]) {
      this._pages[this._pages.length - 1].element._show();
    }
  }

  _hide() {
    if (this._pages[this._pages.length - 1]) {
      this._pages[this._pages.length - 1].element._hide();
    }
  }

  _destroy() {
    for (let i = this._pages.length - 1; i >= 0; i--) {
      this._pages[i].destroy();
    }
    this.remove();
  }

  get pages() {
    return this._pages.slice(0);
  }

  _onDeviceBackButton(event) {
    if (this._pages.length > 1) {
      this.popPage();
    } else {
      event.callParentHandler();
    }
  }

  /**
   * Clears page stack and add the specified pageUrl to the page stack.
   * If options object is specified, apply the options.
   * the options object include all the attributes of this navigator.
   *
   * If page is undefined, navigator will push initial page contents instead of.
   *
   * @param {String/undefined} page
   * @param {Object} [options]
   */
  resetToPage(page, options = {}) {

    if (!options.animator && !options.animation) {
      options.animation = 'none';
    }

    const onTransitionEnd = options.onTransitionEnd || function() {};

    options.onTransitionEnd = () => {
      while (this._pages.length > 1) {
        this._pages.shift().destroy();
      }
      this._pages[0].updateBackButton();
      onTransitionEnd();
    };

    if (page === undefined || page === '') {
      if (this.hasAttribute('page')) {
        page = this.getAttribute('page');
      } else {
        options.pageHTML = this._initialHTML;
        page = '';
      }
    }
    this.pushPage(page, options);
  }

  attributeChangedCallback(name, last, current) {
  }

  attachedCallback() {
    this._deviceBackButtonHandler = deviceBackButtonDispatcher.createHandler(this, this._boundOnDeviceBackButton);

    rewritables.ready(this, () => {
      if (this._pages.length === 0) {
        if (!this.getAttribute('page')) {
          const element = this._createPageElement(this._initialHTML || '');

          this._pushPageDOM(this._createPageObject('', element, {}), function() {});
        } else {
          this.pushPage(this.getAttribute('page'), {animation: 'none'});
        }
      }
    });
  }

  detachedCallback() {
    this._deviceBackButtonHandler.destroy();
    this._deviceBackButtonHandler = null;
  }

  /**
   * Pushes the specified pageUrl into the page stack and
   * if options object is specified, apply the options.
   *
   * @param {String} page
   * @param {Object} [options]
   * @param {String/NavigatorTransitionAnimator} [options.animation]
   * @param {Object} [options.animationOptions]
   * @param {Function} [options.onTransitionEnd]
   * @param {Boolean} [options.cancelIfRunning]
   * @param {String} [options.pageHTML]
   */
  pushPage(page, options = {}) {

    options.animationOptions = util.extend(
      options.animationOptions || {},
      AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options'))
    );

    if (options.cancelIfRunning && this._isPushing) {
      return;
    }

    if (options && typeof options != 'object') {
      throw new Error('options must be an object. You supplied ' + options);
    }

    if (this._emitPrePushEvent()) {
      return;
    }
    
    this._isPushing = true;
    
    this._doorLock.waitUnlock(() => this._pushPage(page, options));
  }

  _pushPage(page, options) {
    const unlock = this._doorLock.lock();
    const done = function() {
      unlock();
    };

    const run = templateHTML => {
      const element = this._createPageElement(templateHTML);
      this._pushPageDOM(this._createPageObject(page, element, options), done);
    };

    if (options.pageHTML) {
      run(options.pageHTML);
    } else {
      internal.getPageHTMLAsync(page).then(run);
    }
  }

  /**
   * @param {Object} pageObject
   * @param {Function} [unlock]
   */
 _pushPageDOM(pageObject, unlock) {
    unlock = unlock || function() {};

    let element = pageObject.element;
    let options = pageObject.options;

    // for "postpush" event
    const eventDetail = {
      enterPage: pageObject,
      leavePage: this._pages[this._pages.length - 1],
      navigator: this
    };

    this._pages.push(pageObject);
    pageObject.updateBackButton();

    const done = () => {
      if (this._pages[this._pages.length - 2]) {
        this._pages[this._pages.length - 2].element.style.display = 'none';
      }

      this._isPushing = false;
      unlock();

      util.triggerElementEvent(this, 'postpush', eventDetail);

      if (typeof options.onTransitionEnd === 'function') {
        options.onTransitionEnd();
      }
      element = null;
    };

    this._isPushing = true;

    rewritables.link(this, element, options, element => {
      CustomElements.upgrade(element);

      setTimeout(() => {
        if (this._pages.length > 1) {
          const leavePage = this._pages.slice(-2)[0];
          const enterPage = this._pages.slice(-1)[0];

          this.appendChild(element);
          leavePage.element._hide();
          enterPage.element._show();

          options.animator.push(enterPage, leavePage, done);
        } else {
          this.appendChild(element);
          element._show();

          done();
        }
      }, 1000 / 60);
    });
  }

  /**
   * Brings the given pageUrl or index to the top of the page stack
   * if already exists or pushes the page into the stack if doesn't.
   * If options object is specified, apply the options.
   *
   * @param {String|Number} item Page name or valid index.
   * @param {Object} options
   */
  bringPageTop(item, options = {}) {

    if (options && typeof options != 'object') {
      throw new Error('options must be an object. You supplied ' + options);
    }

    if (options.cancelIfRunning && this._isPushing) {
      return;
    }

    if (this._emitPrePushEvent()) {
      return;
    }


    let index, page;
    if (typeof item === 'string') {
      page = item;
      index = this._lastIndexOfPage(page);
    } else if (typeof item === 'number') {
      index = this._normalizeIndex(item);
      if (item >= this._pages.length) {
        throw new Error('The provided index does not match an existing page.');
      }
      page = this._pages[index].page;
    } else {
      throw new Error('First argument must be a page name or the index of an existing page. You supplied ' + item);
    }


    if (index < 0) {
      // Fallback pushPage
      this._doorLock.waitUnlock(() => this._pushPage(page, options));
    } else if (index < this._pages.length - 1) { // Skip when page is already the top
      // Bring to top
      this._doorLock.waitUnlock(() => {
        const unlock = this._doorLock.lock();
        const done = function() {
          unlock();
        };

        let pageObject = this._pages.splice(index, 1)[0];
        pageObject.element.style.display = 'block';
        pageObject.element.setAttribute('_skipinit', '');

        if (options.animation) {
          options.animator = this._animatorFactory.newAnimator(options);
        }

        pageObject.options = util.extend(pageObject.options, options);
        this._pushPageDOM(pageObject, done);
      });
    }
  }

  /**
   * @param {String} page
   * @return {Number} Returns the last index at which the given page
   * is found in the page-stack, or -1 if it is not present.
   */
  _lastIndexOfPage(page) {
    let index;
    for (index = this._pages.length - 1; index >= 0; index--) {
      if (this._pages[index].page === page) {
        break;
      }
    }
    return index;
  }

  /**
   * @return {Boolean} Whether if event is canceled.
   */
  _emitPrePushEvent() {
    let isCanceled = false;

    util.triggerElementEvent(this, 'prepush', {
      navigator: this,
      currentPage: this._pages.length > 0 ? this.getCurrentPage() : undefined,
      cancel: function() {
        isCanceled = true;
      }
    });

    return isCanceled;
  }

  /**
   * @return {Boolean} Whether if event is canceled.
   */
  _emitPrePopEvent() {
    let isCanceled = false;

    const leavePage = this.getCurrentPage();
    util.triggerElementEvent(this, 'prepop', {
      navigator: this,
      // TODO: currentPage will be deprecated
      currentPage: leavePage,
      leavePage: leavePage,
      enterPage: this._pages[this._pages.length - 2],
      cancel: function() {
        isCanceled = true;
      }
    });

    return isCanceled;
  }

  /**
   * @param {String} page
   * @param {Element} element
   * @param {Object} options
   */
  _createPageObject(page, element, options) {

    options.animator = this._animatorFactory.newAnimator(options);

    return new NavigatorPage({
      page: page,
      element: element,
      options: options,
      navigator: this
    });
  }

  _createPageElement(templateHTML) {
    const pageElement = util.createElement(internal.normalizePageHTML(templateHTML));

    if (pageElement.nodeName.toLowerCase() !== 'ons-page') {
      throw new Error('You must supply an "ons-page" element to "ons-navigator".');
    }

    return pageElement;
  }

}

window.OnsNavigatorElement = document.registerElement('ons-navigator', {
  prototype: NavigatorElement.prototype
});

/**
 * @param {String} name
 * @param {Function} Animator
 */
window.OnsNavigatorElement.registerAnimator = function(name, Animator) {
  if (!(Animator.prototype instanceof NavigatorTransitionAnimator)) {
    throw new Error('"Animator" param must inherit OnsNavigatorElement.NavigatorTransitionAnimator');
  }

  _animatorDict[name] = Animator;
};

window.OnsNavigatorElement.rewritables = rewritables;
window.OnsNavigatorElement.NavigatorTransitionAnimator = NavigatorTransitionAnimator;

