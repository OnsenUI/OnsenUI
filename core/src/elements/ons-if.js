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

import orientation from 'ons/orientation';
import platform from 'ons/platform';
import BaseElement from 'ons/base-element';

class ConditionalElement extends BaseElement {

  createdCallback() {
    if (platform._renderPlatform !== null) {
      this._platformUpdate();
    } else if (!this._isAllowedPlatform()){
      this.innerHTML = '';
    }

    this._onOrientationChange();
  }

  attachedCallback() {
    orientation.on('change', this._onOrientationChange.bind(this));
  }

  attributeChangedCallback(name) {
    if (name === 'orientation') {
      this._onOrientationChange();
    }
  }

  detachedCallback() {
    orientation.off('change', this._onOrientationChange);
  }

  _platformUpdate() {
    this.style.display = this._isAllowedPlatform() ? '' : 'none';
  }

  _isAllowedPlatform() {
    return !this.getAttribute('platform') || this.getAttribute('platform').split(/\s+/).indexOf(platform.getMobileOS()) >= 0;
  }

  _onOrientationChange() {
    if (this.hasAttribute('orientation') && this._isAllowedPlatform()) {
      const conditionalOrientation = this.getAttribute('orientation').toLowerCase();
      const currentOrientation = orientation.isPortrait() ? 'portrait' : 'landscape';

      this.style.display = (conditionalOrientation === currentOrientation) ? '' : 'none';
    }
  }
}

window.OnsConditionalElement = document.registerElement('ons-if', {
  prototype: ConditionalElement.prototype
});
