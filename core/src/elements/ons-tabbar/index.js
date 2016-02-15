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
import BaseElement from 'ons/base-element';
import {TabbarAnimator, TabbarFadeAnimator, TabbarNoneAnimator, TabbarSlideAnimator} from './animator';

const scheme = {
  '.tab-bar__content': 'tab-bar--*__content',
  '.tab-bar': 'tab-bar--*'
};

const _animatorDict = {
  'default': TabbarNoneAnimator,
  'fade': TabbarFadeAnimator,
  'slide': TabbarSlideAnimator,
  'none': TabbarNoneAnimator
};

const rewritables = {
  /**
   * @param {Element} tabbarElement
   * @param {Function} callback
   */
  ready(tabbarElement, callback) {
    callback();
  },

  /**
   * @param {Element} tabbarElement
   * @param {Element} target
   * @param {Object} options
   * @param {Function} callback
   */
  link(tabbarElement, target, options, callback) {
    callback(target);
  },

  /**
   * @param {Element} tabbarElement
   * @param {Element} target
   * @param {Object} options
   * @param {Function} callback
   */

  loadPage(page, callback),

  /**
   * @param {Element} tabbarElement
   * @param {Element} target
   * @param {Function} callback
   */
  unlink(tabbarElement, target, callback) {
    callback(target);
  }
};

const generateId = (() => {
  var i = 0;
  return () => 'ons-tabbar-gen-' + (i++);
})();

class TabbarElement extends BaseElement {

  createdCallback() {
    this._tabbarId = generateId();

    if (!this.hasAttribute('_compiled')) {
      this._compile();
      ModifierUtil.initModifier(this, scheme);

      this.setAttribute('_compiled', '');
    }

    this._contentElement = util.findChild(this, '.tab-bar__content');

    this._animatorFactory = new AnimatorFactory({
      animators: _animatorDict,
      baseClass: TabbarAnimator,
      baseClassName: 'TabbarAnimator',
      defaultAnimation: this.getAttribute('animation')
    });
  }

  _compile() {
    var wrapper = document.createDocumentFragment();

    var content = document.createElement('div');
    content.classList.add('ons-tab-bar__content');
    content.classList.add('tab-bar__content');

    var tabbar = document.createElement('div');
    tabbar.classList.add('tab-bar');
    tabbar.classList.add('ons-tab-bar__footer');
    tabbar.classList.add('ons-tabbar-inner');

    wrapper.appendChild(content);
    wrapper.appendChild(tabbar);

    while (this.childNodes[0]) {
      tabbar.appendChild(this.removeChild(this.childNodes[0]));
    }

    this.appendChild(wrapper);

    if (this._hasTopTabbar()) {
      this._prepareForTopTabbar();
    }
  }

  _hasTopTabbar() {
    return this.getAttribute('position') === 'top';
  }

  _prepareForTopTabbar() {

    var content = util.findChild(this, '.tab-bar__content');
    var tabbar = util.findChild(this, '.tab-bar');

    content.setAttribute('no-status-bar-fill', '');

    content.classList.add('tab-bar--top__content');
    tabbar.classList.add('tab-bar--top');

    var page = util.findParent(this, 'ons-page');
    if (page) {
      this.style.top = window.getComputedStyle(page._getContentElement(), null).getPropertyValue('padding-top');
    }

    internal.shouldFillStatusBar(this)
      .then(() => {
        let fill = this.querySelector('.tab-bar__status-bar-fill');

        if (fill instanceof HTMLElement) {
          return fill;
        }

        fill = document.createElement('div');
        fill.classList.add('tab-bar__status-bar-fill');
        fill.style.width = '0px';
        fill.style.height = '0px';

        this.insertBefore(fill, this.children[0]);

        return fill;
      })
      .catch(() => {
        const el = this.querySelector('.tab-bar__status-bar-fill');
        if (el instanceof HTMLElement) {
          el.remove();
        }
      });
  }

  _getTabbarElement() {
    return util.findChild(this, '.tab-bar');
  }

  /**
   * @param {String} page
   * @param {Object} [options]
   * @param {Object} [options.animation]
   * @param {Object} [options.callback]
   * @return {Promise} Resolves to the new page element.
   */
  loadPage(page, options = {}) {
    options._removeElement = true;
    return this._loadPage(page, options);
  }

  /**
   * @param {String} page
   * @param {Object} [options]
   * @param {Object} [options.animation]
   * @param {Object} [options.callback]
   * @return {Promise} Resolves to the new page element.
   */
  _loadPage(page, options) {
    return new Promise(resolve => {
      OnsTabElement.prototype._createPageElement(page, pageElement => {
        resolve(this._loadPageDOMAsync(pageElement, options));
      });
    });
  }

  /**
   * @param {Element} pageElement
   * @param {Object} [options]
   * @param {Object} [options.animation]
   * @param {Object} [options.callback]
   * @return {Promise} Resolves to the new page element.
   */
  _loadPageDOMAsync(pageElement, options = {}) {
    return new Promise(resolve => {
      rewritables.link(this, pageElement, options, pageElement => {
        this._contentElement.appendChild(pageElement);

        if (this.getActiveTabIndex() !== -1) {
          resolve(this._switchPage(pageElement, options));
        } else {
          if (options.callback instanceof Function) {
              options.callback();
          }

          resolve(pageElement);
        }
      });
    });
  }

  /**
   * @return {String}
   */
  getTabbarId() {
    return this._tabbarId;
  }

  /**
   * @return {Element/null}
   */
  _getCurrentPageElement() {
    var pages = this._contentElement.children;
    var page = null;
    for (var i = 0; i < pages.length; i++) {
      if (pages[i].style.display !== 'none') {
        page = pages[i];
        break;
      }
    }

    if (page && page.nodeName.toLowerCase() !== 'ons-page') {
      throw new Error('Invalid state: page element must be a "ons-page" element.');
    }

    return page;
  }

  /**
   * @param {Element} element
   * @param {Object} options
   * @param {String} [options.animation]
   * @param {Function} [options.callback]
   * @param {Object} [options.animationOptions]
   * @param {Boolean} options._removeElement
   * @param {Number} options.selectedTabIndex
   * @param {Number} options.previousTabIndex
   * @return {Promise} Resolves to the new page element.
   */
  _switchPage(element, options) {

    var oldPageElement = this._oldPageElement || internal.nullElement;
    this._oldPageElement = element;
    var animator = this._animatorFactory.newAnimator(options);

    return new Promise(resolve => {
      if (oldPageElement !== internal.nullElement) {
        oldPageElement._hide();
      }

      animator.apply(element, oldPageElement, options.selectedTabIndex, options.previousTabIndex, function() {
        if (oldPageElement !== internal.nullElement) {
          if (options._removeElement) {
            rewritables.unlink(this, oldPageElement, pageElement => {
              pageElement._destroy();
            });
          } else {
            oldPageElement.style.display = 'none';
          }
        }

        element.style.display = 'block';
        element._show();

        if (options.callback instanceof Function) {
          options.callback();
        }

        resolve(element);
      });
    });
  }

  /**
   * @param {Number} index
   * @param {Object} [options]
   * @param {Boolean} [options.keepPage]
   * @param {String} [options.animation]
   * @param {Object} [options.animationOptions]
   * @return {Promise} Resolves to the new page element.
   */
  setActiveTab(index, options = {}) {

    if (options && typeof options != 'object') {
      throw new Error('options must be an object. You supplied ' + options);
    }

    options.animationOptions = util.extend(
      options.animationOptions || {},
      AnimatorFactory.parseAnimationOptionsString(this.getAttribute('animation-options'))
    );

    var previousTab = this._getActiveTabElement(),
      selectedTab = this._getTabElement(index),
      previousTabIndex = this.getActiveTabIndex(),
      selectedTabIndex = index;

    if (!selectedTab) {
      return Promise.reject('Specified index does not match any tab.');
    }

    if (selectedTabIndex === previousTabIndex) {
      util.triggerElementEvent(this, 'reactive', {
        index: selectedTabIndex,
        tabItem: selectedTab
      });

      return Promise.resolve(this._getCurrentPageElement());
    }

    var canceled = false;

    util.triggerElementEvent(this, 'prechange', {
      index: selectedTabIndex,
      tabItem: selectedTab,
      cancel: () => canceled = true
    });

    if (canceled) {
      selectedTab.setInactive();
      if (previousTab) {
        previousTab.setActive();
      }
      return Promise.reject('Canceled in prechange event.');
    }

    selectedTab.setActive();

    var needLoad = !selectedTab.isLoaded() && !options.keepPage;

    util.arrayFrom(this._getTabbarElement().children).forEach((tab) => {
      if (tab != selectedTab) {
        tab.setInactive();
      } else {
        if (!needLoad) {
          util.triggerElementEvent(this, 'postchange', {
            index: selectedTabIndex,
            tabItem: selectedTab
          });
        }
      }
    });

    if (needLoad) {
      var removeElement = true;

      if (previousTab && previousTab.isPersistent()) {
        removeElement = false;
      }

      var params = {
        callback: () => {
          util.triggerElementEvent(this, 'postchange', {
            index: selectedTabIndex,
            tabItem: selectedTab
          });

          if (options.callback instanceof Function) {
            options.callback();
          }
        },
        previousTabIndex: previousTabIndex,
        selectedTabIndex: selectedTabIndex,
        _removeElement: removeElement
      };

      if (options.animation) {
        params.animation = options.animation;
      }

      params.animationOptions = options.animationOptions || {};

      if (selectedTab.isPersistent()) {
        const link = (element, callback) => {
          rewritables.link(this, element, options, callback);
        };

        return new Promise(resolve => {
          selectedTab._loadPageElement(index, pageElement => {
            resolve(this._loadPersistentPageDOM(pageElement, params));
          }, link);
        });
      } else {
        return this._loadPage(selectedTab.getAttribute('page'), params);
      }
    }

    return Promise.resolve(this._getCurrentPageElement());
  }

  /**
   * @param {Element} element
   * @param {Object} options
   * @param {Object} options.animation
   */
  _loadPersistentPageDOM(element, options = {}) {

    if (!util.isAttached(element)) {
      this._contentElement.appendChild(element);
    }

    element.removeAttribute('style');
    return this._switchPage(element, options);
  }

  /**
   * @param {Boolean} visible
   */
  setTabbarVisibility(visible) {
    this._contentElement.style[this._hasTopTabbar() ? 'top' : 'bottom'] = visible ? '' : '0px';
    this._getTabbarElement().style.display = visible ? '' : 'none';
  }

  /**
   * @return {Number} When active tab is not found, returns -1.
   */
  getActiveTabIndex() {
    var tabs = this._getTabbarElement().children;

    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i] instanceof window.OnsTabElement && tabs[i].isActive && tabs[i].isActive()) {
        return i;
      }
    }

    return -1;
  }

  /**
   * @return {Number} When active tab is not found, returns -1.
   */
  _getActiveTabElement() {
    return this._getTabElement(this.getActiveTabIndex());
  }

  /**
   * @return {Element}
   */
  _getTabElement(index) {
    return this._getTabbarElement().children[index];
  }

  detachedCallback() { }

  attachedCallback() { }

  _show() {
    let currentPageElement = this._getCurrentPageElement();
    if (currentPageElement) {
      currentPageElement._show();
    }
  }

  _hide() {
    let currentPageElement = this._getCurrentPageElement();
    if (currentPageElement) {
      currentPageElement._hide();
    }
  }

  _destroy() {
    let pages = this._contentElement.children;
    for (let i = pages.length - 1; i >= 0; i--) {
      pages[i]._destroy();
    }
    this.remove();
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      return ModifierUtil.onModifierChanged(last, current, this, scheme);
    }
  }
}

window.OnsTabbarElement = document.registerElement('ons-tabbar', {
  prototype: TabbarElement.prototype
});

/**
 * @param {String} name
 * @param {Function} Animator
 */
window.OnsTabbarElement.registerAnimator = function(name, Animator) {
  if (!(Animator.prototype instanceof TabbarAnimator)) {
    throw new Error('"Animator" param must inherit OnsTabbarElement.TabbarAnimator');
  }
  _animatorDict[name] = Animator;
};

window.OnsTabbarElement.rewritables = rewritables;
window.OnsTabbarElement.TabbarAnimator = TabbarAnimator;

export default OnsTabbarElement;
