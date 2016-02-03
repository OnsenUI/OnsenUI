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

import BaseElement from 'ons/base-element';

class ConditionalElement extends BaseElement {

  createdCallback() {
    if (this.getAttribute('platform') && this.getAttribute('platform').split(/\s+/).indexOf(ons.platform.getMobileOS()) === -1) {
      while (this.firstChild) {
        this.removeChild(this.firstChild);
      }
    } else {
      this._allowedPlatform = true;
      this._onOrientationChange();
    }
  }

  attachedCallback() {
    if (this._allowedPlatform){
      ons.orientation.on('change', this._onOrientationChange.bind(this));
    }
  }

  attributeChangedCallback() {
    if (name === 'orientation') {
      this._onOrientationChange();
    }
  }

  detachedCallback() {
    ons.orientation.off('change', this._onOrientationChange);
  }

  _onOrientationChange() {
    if (this.hasAttribute('orientation')) {
      const conditionalOrientation = this.getAttribute('orientation').toLowerCase();
      const currentOrientation = ons.orientation.isPortrait() ? 'portrait' : 'landscape';

      if(conditionalOrientation === currentOrientation) {
        this.style.display = '';
      } else {
        this.style.display = 'none';
      }
    }
  }
}

window.OnsConditionalElement = document.registerElement('ons-if', {
  prototype: ConditionalElement.prototype
});
