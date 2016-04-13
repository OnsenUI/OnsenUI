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

/**
 * @element ons-if
 * @category util
 * @description
 *   [en]Conditionally display content depending on the platform, device orientation or both.[/en]
 *   [ja][/ja]
 * @codepen yrhtv
 * @guide UtilityAPIs
 *   [en]Other utility APIs[/en]
 *   [ja]他のユーティリティAPI[/ja]
 * @example
 * <ons-page>
 *   <ons-if orientation="landscape">
 *     Landscape view!
 *   </ons-if>
 *   <ons-if platform="android">
 *     This is Android.
 *   </ons-if>
 *   <ons-if platform="ios other">
 *     This is not Android.
 *   </ons-if>
 * </ons-page>
 */
class ConditionalElement extends BaseElement {

  /**
   * @attribute platform
   * @initonly
   * @type {string}
   * @description
   *  [en]Space-separated platform names. Possible values are "ios", "android", "windows" and "other".[/en]
   *  [ja][/ja]
   *
   * @attribute orientation
   * @type {string}
   * @description
   *  [en]Either "portrait" or "landscape".[/en]
   *  [ja]portraitもしくはlandscapeを指定します[/ja]
   */

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
