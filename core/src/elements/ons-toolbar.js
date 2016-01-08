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
import BaseElement from 'ons/base-element';

const scheme = {
  '': 'navigation-bar--*',
  '.navigation-bar__left': 'navigation-bar--*__left',
  '.navigation-bar__center': 'navigation-bar--*__center',
  '.navigation-bar__right': 'navigation-bar--*__right'
};

class ToolbarElement extends BaseElement {

  createdCallback() {
    this._compile();
    ModifierUtil.initModifier(this, scheme);

    this._tryToEnsureNodePosition();
    setImmediate(() => this._tryToEnsureNodePosition());
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      return ModifierUtil.onModifierChanged(last, current, this, scheme);
    }
  }

  attachedCallback() {
    this._tryToEnsureNodePosition();
    setImmediate(() => this._tryToEnsureNodePosition());
  }

  _tryToEnsureNodePosition() {
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
    return this.querySelector('.left') || internal.nullElement;
  }

  /**
   * @return {HTMLElement}
   */
  _getToolbarCenterItemsElement() {
    return this.querySelector('.center') || internal.nullElement;
  }

  /**
   * @return {HTMLElement}
   */
  _getToolbarRightItemsElement() {
    return this.querySelector('.right') || internal.nullElement;
  }

  /**
   * @return {HTMLElement}
   */
  _getToolbarBackButtonLabelElement() {
    return this.querySelector('ons-back-button .back-button__label') || internal.nullElement;
  }

  _compile() {
    var inline = this.hasAttribute('inline');

    this.classList.add('navigation-bar');

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
    var container = util.findChild(this, '.' + name);

    if (!container) {
      container = document.createElement('div');
      container.classList.add(name);
    }

    container.classList.add('navigation-bar__' + name);
    return container;
  }

}

window.OnsToolbarElement = document.registerElement('ons-toolbar', {
  prototype: ToolbarElement.prototype
});
