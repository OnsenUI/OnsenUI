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

class IconElement extends BaseElement {

  createdCallback() {
    this._update();
  }

  attributeChangedCallback(name, last, current) {
    if (['icon', 'size'].indexOf(name) !== -1) {
      this._update();
    }
  }

  _update() {
    this._cleanClassAttribute();

    const builded = this._buildClassAndStyle(this);

    for (let key in builded.style) {
      if (builded.style.hasOwnProperty(key)) {
        this.style[key] = builded.style[key];
      }
    }

    builded.classList.forEach(className => this.classList.add(className));
  }

  get _iconName() {
    return '' + this.getAttribute('icon');
  }

  /**
   * Remove unneeded class value.
   */
  _cleanClassAttribute() {
    const classList = this.classList;

    Array.apply(null, this.classList).filter(klass => {
      return klass === 'fa' || klass.indexOf('fa-') === 0 || klass.indexOf('ion-') === 0 || klass.indexOf('zmdi-') === 0;
    }).forEach(className => {
      classList.remove(className);
    });

    classList.remove('zmdi');
    classList.remove('ons-icon--ion');
  }

  _buildClassAndStyle() {
    const classList = ['ons-icon'];
    const style = {};

    // icon
    const iconName = this._iconName;
    if (iconName.indexOf('ion-') === 0) {
      classList.push(iconName);
      classList.push('ons-icon--ion');
    } else if (iconName.indexOf('fa-') === 0) {
      classList.push(iconName);
      classList.push('fa');
    } else if(iconName.indexOf('md-') === 0)  {
      classList.push('zmdi');
      classList.push('zmdi-' + iconName.split(/\-(.+)?/)[1]);
    } else {
      classList.push('fa');
      classList.push('fa-' + iconName);
    }

    // size
    const size = '' + this.getAttribute('size');
    if (size.match(/^[1-5]x|lg$/)) {
      classList.push('fa-' + size);
      this.style.removeProperty('font-size');
    } else {
      style.fontSize = size;
    }

    return {
      classList: classList,
      style: style
    };
  }
}

window.OnsIconElement = document.registerElement('ons-icon', {
  prototype: IconElement.prototype
});
