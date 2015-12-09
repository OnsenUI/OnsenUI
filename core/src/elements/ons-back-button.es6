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
import BaseElement from 'ons/base-element';

const iOSTemplateElement = util.createElement(`
  <span
    class="toolbar-button--quiet"
    style="height: 44px; line-height: 0; padding: 0 10px 0 0; position: relative;">

    <i class="ion-ios-arrow-back ons-back-button__icon"
      style="
        vertical-align: top;
        background-color: transparent;
        height: 44px;
        line-height: 44px;
        font-size: 36px;
        margin-left: 8px;
        margin-right: 2px;
        width: 16px;
        display: inline-block;
        padding-top: 1px;"></i>

    <span
      style="vertical-align: top; display: inline-block; line-height: 44px; height: 44px;"
      class="back-button__label"></span>
  </span>
`);

const MaterialTemplateElement = util.createElement(`
  <span class="toolbar-button toolbar-button--material">
    <i class="zmdi zmdi-arrow-left"></i>

    <span class="back-button__label"></span>
  </span>
`);

const scheme = {
  '.toolbar-button--quiet': 'toolbar-button--*'
};

class BackButtonElement extends BaseElement {

  createdCallback() {
    this._compile();
    this._boundOnClick = this._onClick.bind(this);
    ModifierUtil.initModifier(this, scheme);
  }

  _compile() {
    const toolbar = ons._util.findParent(this, 'ons-toolbar');

    let template;

    if (toolbar && ons._util.hasModifier(toolbar, 'material')) {
      template = MaterialTemplateElement.cloneNode(true);
    }
    else {
      template = iOSTemplateElement.cloneNode(true);
    }

    const inner = template.querySelector('.back-button__label');
    while (this.childNodes[0]) {
      inner.appendChild(this.childNodes[0]);
    }
    this.appendChild(template);
  }

  _onClick() {
    const navigator = util.findParent(this, 'ons-navigator');
    if (navigator) {
      navigator.popPage({cancelIfRunning: true});
    }
  }

  attachedCallback() {
    this.addEventListener('click', this._boundOnClick, false);
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'modifier') {
      return ModifierUtil.onModifierChanged(last, current, this, scheme);
    }
  }

  detachedCallback() {
    this.removeEventListener('click', this._boundOnClick, false);
  }
}

window.OnsBackButtonElement = document.registerElement('ons-back-button', {
  prototype: BackButtonElement.prototype
});
