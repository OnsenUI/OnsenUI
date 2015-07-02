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
    '': 'tab-bar--*__item',
    '.tab-bar__button': 'tab-bar--*__button'
  };
  var ModifierUtil = ons._internal.ModifierUtil;
  var util = ons._util;
  var templateSource = util.createElement(`
    <div>
      <input type="radio" style="display: none">
      <button class="tab-bar__button tab-bar-inner"></button>
    </div>
  `);
  var defaultInnerTemplateSource = util.createElement(`
    <div>
      <div class="tab-bar__icon">
        <ons-icon icon="ion-cloud" style="font-size: 28px; line-height: 34px; vertical-align: top;"></ons-icon>
      </div>
      <div class="tab-bar__label">label</div>
    </div>
  `);

  class TabElement extends ons._BaseElement {

    createdCallback() {
      this._compile();
      this._boundOnClick = this._onClick.bind(this);

      ModifierUtil.initModifier(this, scheme);
    }

    _compile() {
      var fragment = document.createDocumentFragment(); 
      var hasChildren = false;

      while (this.childNodes[0]) {
        let node = this.childNodes[0];
        this.removeChild(node);
        fragment.appendChild(node);

        if (node.nodeType == Node.ELEMENT_NODE) {
          hasChildren = true;
        }
      }

      var template = templateSource.cloneNode(true);
      while (template.children[0]) {
        this.appendChild(template.children[0]);
      }
      this.classList.add('tab-bar__item');

      var button = util.findChild(this, '.tab-bar__button');

      if (hasChildren) {
        button.appendChild(fragment);
        this._hasDefaultTemplate = false;
      } else {
        this._hasDefaultTemplate = true;
        this._updateDefaultTemplate();
      }
    }

    _updateDefaultTemplate() {
      if (!this._hasDefaultTemplate) {
        return;
      }

      var button = util.findChild(this, '.tab-bar__button');

      var template = defaultInnerTemplateSource.cloneNode(true);
      while (template.children[0]) {
        button.appendChild(template.children[0]);
      }

      var self = this;
      var icon = this.getAttribute('icon');
      var label = this.getAttribute('label');

      if (typeof icon === 'string') {
        getIconElement().setAttribute('icon', icon);
      } else {
        var wrapper = button.querySelector('.tab-bar__icon');
        wrapper.parentNode.removeChild(wrapper);
      }

      if (typeof label === 'string') {
        getLabelElement().textContent = label;
      } else {
        getLabelElement().parentNode.removeChild(getLabelElement());
      }

      function getLabelElement() {
        return self.querySelector('.tab-bar__label');
      }

      function getIconElement() {
        return self.querySelector('ons-icon');
      }
    }

    _onClick() {
      var tabbar = this._findTabbarElement();
      if (tabbar) {
        tabbar.setActiveTab(this._findTabIndex());
      }
    }

    isPersistent() {
      return this.hasAttribute('persistent');
    }

    _hasDefaultTemplate() {
      return this.classList.contains('tab-bar__item--default');
    }

    setActive() {
      var radio = util.findChild(this, 'input');
      radio.checked = true;
      this.classList.add('active');

      util.arrayFrom(this.querySelectorAll('[ons-tab-inactive]'))
        .forEach(element => element.style.display = 'none');
      util.arrayFrom(this.querySelectorAll('[ons-tab-active]'))
        .forEach(element => element.style.display = 'inherit');
    }

    setInactive() {
      var radio = util.findChild(this, 'input');
      radio.checked = false;
      this.classList.remove('active');

      util.arrayFrom(this.querySelectorAll('[ons-tab-inactive]'))
        .forEach(element => element.style.display = 'inherit');
      util.arrayFrom(this.querySelectorAll('[ons-tab-active]'))
        .forEach(element => element.style.display = 'none');
    }

    /**
     * @return {Boolean}
     */
    isLoaded() {
      return false;
    }

    /**
     * @param {Function} callback
     * @param {Object} hooks
     * @param {Object} hooks.compile
     * @param {Object} hooks.link
     */
    _loadPageElement(callback, hooks) {
      if (this.isPersistent()) {
        if (!this._pageElement) {
          this._createPageElement(this.getAttribute('page'), (element) => {
            hooks.compile.run(element => {
              hooks.link.run(element => {
                this._pageElement = element;
                callback(element);
              }, element);
            }, element);
          });
        } else {
          callback(this._pageElement);
        }
      } else {
        this._pageElement = null;
        this._createPageElement(this.getAttribute('page'), callback);
      }
    }

    /**
     * @param {String} page
     * @param {Function} callback
     */
    _createPageElement(page, callback) {
      ons._internal.getPageHTMLAsync(page, (error, html) => {
        if (error) {
          throw new Error('Error: ' + error);
        }
        callback(util.createElement(html.trim()));
      });
    }

    /**
     * @return {Boolean}
     */
    isActive() {
      return this.classList.contains('active');
    }

    /**
     * @return {Boolean}
     */
    canReload() {
      return !this.hasAttribute('no-reload');
    }

    detachedCallback() {
      this.removeEventListener('click', this._boundOnClick);
    }

    attachedCallback() {
      this._ensureElementPosition();

      if (this.hasAttribute('active')) {
        var tabbar = this._findTabbarElement();
        var tabIndex = this._findTabIndex();

        window.OnsTabbarElement.ready(tabbar, () => {
          tabbar.setActiveTab(tabIndex, {animation: 'none'});
        });
      }

      this.addEventListener('click', this._boundOnClick);
    }

    _findTabbarElement() {
      if (this.parentNode && this.parentNode.nodeName.toLowerCase() === 'ons-tabbar') {
        return this.parentNode;
      }

      if (this.parentNode.parentNode && this.parentNode.parentNode.nodeName.toLowerCase() === 'ons-tabbar') {
        return this.parentNode.parentNode;
      }

      return null;
    }

    _findTabIndex() {
      var elements = this.parentNode.children;
      for (var i = 0; i < elements.length; i++) {
        if (this === elements[i]) {
          return i;
        }
      }

      throw new Error('Invalid state: tab index is not found.');
    }

    _ensureElementPosition() {
      if (!this._findTabbarElement()) {
        throw new Error('This ons-tab element is must be child of ons-tabbar element.');
      }
    }

    attributeChangedCallback(name, last, current) {
      if (this._hasDefaultTemplate) {
        if (name === 'icon' || name === 'label') {
          this._updateDefaultTemplate();
        }
      }

      if (name === 'modifier') {
        return ModifierUtil.onModifierChanged(last, current, this, scheme);
      }
    }
  }

  if (!window.OnsTabElement) {
    window.OnsTabElement = document.registerElement('ons-tab', {
      prototype: TabElement.prototype
    });
    document.registerElement('ons-tabbar-item', {
      prototype: Object.create(TabElement.prototype)
    });
  }
})();
