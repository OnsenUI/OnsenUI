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
    '': 'page--*',
    '.page__content': 'page--*__content',
    '.page__background': 'page--*__background'
  };

  class PageElement extends ons._BaseElement {

    createdCallback() {
      this.classList.add('page');
      this._compile();
      ModifierUtil.initModifier(this, scheme);
    }

    /**
     * @return {HTMLElement}
     */
    _getContentElement() {
      var result = this.querySelector('.page__content');
      if (result) {
        return result;
      }
      throw Error('fail to get ".page__content" element.');
    }

    /**
     * @return {HTMLElement}
     */
    _getBackgroundElement() {
      var result = this.querySelector('.page__background');
      if (result) {
        return result;
      }
      throw Error('fail to get ".page__background" element.');
    }

    /**
     * Register toolbar element to this page.
     *
     * @param {HTMLElement} element
     */
    _registerToolbar(element) {
      this._getContentElement().setAttribute('no-status-bar-fill', '');

      if (this.querySelector('.page__status-bar-fill')) {
        this.insertBefore(element, this.childNodes[1]);
      } else {
        this.insertBefore(element, this.childNodes[0]);
      }
    }

    /**
     * Register toolbar element to this page.
     *
     * @param {HTMLElement} element
     */
    _registerBottomToolbar(element) {
      var fill = document.createElement('div');
      fill.classList.add('page__bottom-bar-fill');
      fill.style.width = '0px';
      fill.style.height = '0px';

      this.insertBefore(fill, this.childNodes[0]);
      this.insertBefore(element, null);
    }

    attributeChangedCallback(name, last, current) {
      if (name === 'modifier') {
        return ModifierUtil.onModifierChanged(last, current, this, scheme);
      }
    }

    _compile() {
      if (this.querySelector('.page__background') && this.querySelector('.page__content')) {
        return;
      }

      var background = document.createElement('div');
      background.classList.add('page__background');

      var content = document.createElement('div');
      content.classList.add('page__content');

      while (this.childNodes[0]) {
        var node = this.childNodes[0];
        this.removeChild(node);
        content.appendChild(node);
      }

      if (this.hasAttribute('style')) {
        background.setAttribute('style', this.getAttribute('style'));
        this.removeAttribute('style', null);
      }

      this.insertBefore(background, null);
      this.insertBefore(content, null);
    }

    _registerExtraElement(element) {
      var extra = this.querySelector('.page__extra');
      if (!extra) {
        extra = document.createElement('div');
        extra.classList.add('page__extra');
        extra.style.zIndex = '10001';
        this.insertBefore(extra, null);
      }

      extra.insertBefore(element, null);
    }

    _tryToFillStatusBar() {
      if (ons._internal.shouldFillStatusBar(this)) {
        // Adjustments for IOS7
        var fill = document.createElement('div');
        fill.classList.add('page__status-bar-fill');
        fill.style.width = '0px';
        fill.style.height = '0px';

        this.insertBefore(fill, this.childNodes[0]);
      }
    }
  }

  if (!window.OnsPageElement) {
    window.OnsPageElement = document.registerElement('ons-page', {
      prototype: PageElement.prototype
    });
  }
})();
