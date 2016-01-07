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

import BaseElement from '../ons/base-element';

class ColumnElement extends BaseElement {

  createdCallback() {
    if (this.getAttribute('width')) {
      this._updateWidth();
    }
  }

  attributeChangedCallback(name, last, current) {
    if (name === 'width') {
      this._updateWidth();
    }
  }

  _updateWidth() {
    let width = this.getAttribute('width');
    if (typeof width  === 'string') {
      width = ('' + width).trim();
      width = width.match(/^\d+$/) ? width + '%' : width;

      this.style.webkitBoxFlex = '0';
      this.style.webkitFlex = '0 0 ' + width;
      this.style.mozBoxFlex = '0';
      this.style.mozFlex = '0 0 ' + width;
      this.style.msFlex = '0 0 ' + width;
      this.style.flex = '0 0 ' + width;
      this.style.maxWidth = width;
    }
  }
}

window.OnsColElement = document.registerElement('ons-col', {
  prototype: ColumnElement.prototype
});
