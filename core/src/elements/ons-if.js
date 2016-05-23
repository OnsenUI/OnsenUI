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
import contentReady from 'ons/content-ready';

/**
 * @element ons-if
 * @category conditional
 * @tutorial vanilla/Reference/if
 * @description
 *   [en]
 *     Conditionally display content depending on the platform, device orientation or both.
 *
 *     Sometimes it is useful to conditionally hide or show certain components based on platform. When running on iOS the `<ons-if>` element can be used to hide the `<ons-fab>` element.
 *   [/en]
 *   [ja][/ja]
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
   *  [en]Space-separated platform names. Possible values are `"ios"`, `"android"`, `"windows"` and `"other"`.[/en]
   *  [ja][/ja]
   */

  /**
   * @attribute orientation
   * @type {string}
   * @description
   *  [en]Either `"portrait"` or `"landscape"`.[/en]
   *  [ja]portraitもしくはlandscapeを指定します[/ja]
   */

  createdCallback() {
    contentReady(this, () => {
      if (platform._renderPlatform !== null) {
        this._platformUpdate();
      } else if (!this._isAllowedPlatform()) {
        while (this.childNodes[0]) {
          this.childNodes[0].remove();
        }
        this._platformUpdate();
      }
    });

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
