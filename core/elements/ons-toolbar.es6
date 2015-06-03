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
    '': 'navigation-bar--*',
    '.navigation-bar__left': 'navigation-bar--*__left',
    '.navigation-bar__center': 'navigation-bar--*__center',
    '.navigation-bar__right': 'navigation-bar--*__right'
  };
  var ModifierUtil = ons._internal.ModifierUtil;

  class ToolbarElement extends ons._BaseElement {

    createdCallback() {
      this._compile();
      ModifierUtil.initModifier(this, scheme);
    }

    attributeChangedCallback(name, last, current) {
      if (name === 'modifier') {
        return ModifierUtil.onModifierChanged(last, current, this, scheme);
      }
    }

    attachedCallback() {
      setImmediate(this._ensureNodePosition.bind(this));
    }

    _ensureNodePosition() {
      if (!this.parentNode || this.hasAttribute('inline')) {
        return;
      }

      if (this.parentNode.nodeName.toLowerCase() !== 'ons-page') {
        var page = this;
        for (;;) {
          page = page.parentNode;

          if (!page) {
            return;
          }

          if (page.nodeName.toLowerCase() === 'ons-page') {
            break;
          }
        }
        page._registerToolbar(this);
      }
    }

    /**
     * @return {HTMLElement}
     */
    _getToolbarLeftItemsElement() {
      return this.querySelector('.left') || ons._internal.nullElement;
    }

    /**
     * @return {HTMLElement}
     */
    _getToolbarCenterItemsElement() {
      return this.querySelector('.center') || ons._internal.nullElement;
    }

    /**
     * @return {HTMLElement}
     */
    _getToolbarRightItemsElement() {
      return this.querySelector('.right') || ons._internal.nullElement;
    }

    /**
     * @return {HTMLElement}
     */
    _getToolbarBackButtonLabelElement() {
      return this.querySelector('ons-back-button .back-button__label') || ons._internal.nullElement;
    }

    _compile() {
      var shouldAppendAndroidModifier = ons.platform.isAndroid() && !this.hasAttribute('fixed-style');
      var inline = this.hasAttribute('inline');

      this.classList.add('navigation-bar');

      if (shouldAppendAndroidModifier) {
        this.classList.add('navigation-bar--android');
      }

      if (!inline) {
        this.style.position = 'absolute';
        this.style.zIndex = '10000';
        this.style.left = '0px';
        this.style.right = '0px';
        this.style.top = '0px';
      }

      this._ensureToolbarItemElements();
    }

    _ensureToolbarItemElements() {

      var hasCenterClassElementOnly = this.children.length === 1 && this.children[0].classList.contains('center');
      var center;

      for (var i = 0; i < this.childNodes.length; i++) {
        // case of not element
        if (this.childNodes[i].nodeType != 1) {
          this.removeChild(this.childNodes[i]);
        }
      }

      if (hasCenterClassElementOnly) {
        center = this._ensureToolbarItemContainer('center');
      } else {
        center = this._ensureToolbarItemContainer('center');
        var left = this._ensureToolbarItemContainer('left');
        var right = this._ensureToolbarItemContainer('right');

        if (this.children[0] !== left || this.children[1] !== center || this.children[2] !== right) {
          if (left.parentNode) {
            this.removeChild(left);
          }
          if (center.parentNode) {
            this.removeChild(center);
          }
          if (right.parentNode) {
            this.removeChild(right);
          }

          var fragment = document.createDocumentFragment();
          fragment.appendChild(left);
          fragment.appendChild(center);
          fragment.appendChild(right);

          this.appendChild(fragment);
        }
      }
      center.classList.add('navigation-bar__title');
    }

    _ensureToolbarItemContainer(name) {
      var container = ons._util.findChild(this, '.' + name);

      if (!container) {
        container = document.createElement('div');
        container.classList.add(name);
      }

      if (container.innerHTML.trim() === '') {
        container.innerHTML = '&nbsp;';
      }

      container.classList.add('navigation-bar__' + name);
      return container;
    }

  }

  if (!window.OnsToolbarElement) {
    window.OnsToolbarElement = document.registerElement('ons-toolbar', {
      prototype: ToolbarElement.prototype
    });
  }
})();
