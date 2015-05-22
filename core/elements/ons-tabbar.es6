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

(() => {
  'use strict';

  var scheme = {
    '': 'tab-bar--*',
    'tab-bar__button': 'tab-bar--*__button'
  };
  var ModifierUtil = ons._internal.ModifierUtil;
  var util = ons._util;
  var generateId = (() => {
    var i = 0;
    return () => 'ons-tabbar-gen-' + (i++);
  })();

  class TabbarElement extends ons._BaseElement {

    createdCallback() {
      this._tabbarId = generateId();
      this._compile();
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

      var content = ons._util.findChild(this, '.tab-bar__content');
      var tabbar = ons._util.findChild(this, '.tab-bar');
      
      content.setAttribute('no-status-bar-fill', '');

      setImmediate(function() {
        content.classList.add('tab-bar--top__content');
        tabbar.classList.add('tab-bar--top');
      }.bind(this));

      var page = ons._util.findParent(this, 'ons-page');
      if (page) {
        this.style.top = window.getComputedStyle(page._getContentElement(), null).getPropertyValue('padding-top') + 'px';
      }

      if (onsen._internal.shouldFillStatusBar(this)) {
        // Adjustments for IOS7
        var fill = document.createElement('div');
        fill.classList.add('tab-bar__status-bar-fill');
        fill.style.width = '0px';
        fill.style.height = '0px';

        this.insertBefore(fill, this.children[0]);
      }
    }

    getTabbarId() {
      return this._tabbarId;
    }

    /**
     * @param {Number} index
     * @param {Object} [options]
     * @param {Boolean} [options.keepPage]
     * @param {String} [options.animation]
     * @param {Object} [options.animationOptions]
     * @return {Boolean} success or not
     */
    setActiveTab(index, options) {
    }

    /**
     * @param {Boolean} visible
     */
    setTabbarVisibility(visible) {
      var position = this._hasTopTabbar() ? 'top' : 'bottom';
      this._getContentElement().style[position] = visible ? '' : '0px';
    }

    _getContentElement() {
      return ons._util.findChild(this, '.tab-bar__content');
    }

    /**
     * @return {Number} When active tab is not found, returns -1.
     */
    getActiveTabIndex() {
      var content = this._getContentElement();

      for (var i = 0; i < content.children.length; i++) {
        if (content.children[i].isActive()) {
          return i;
        }
      }

      return -1;
    }

    detachedCallback() {
    }

    atachedCallback() {
      var tabbar = this.parentNode;
      if (tabbar.nodeName.toLowerCase() !== 'ons-tabbar') {
        throw new Error('This ons-tab element is must be child of ons-tabbar element.');
      }
    }

    attributeChangedCallback(name, last, current) {
    }
  }

  if (!window.OnsTabbarElement) {
    window.OnsTabbarElement = document.registerElement('ons-tabbar', {
      prototype: TabbarElement.prototype
    });
  }
})();
