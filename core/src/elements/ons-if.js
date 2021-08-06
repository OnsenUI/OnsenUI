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

import onsElements from '../ons/elements.js';
import orientation from '../ons/orientation.js';
import platform from '../ons/platform.js';
import BaseElement from './base/base-element.js';
import contentReady from '../ons/content-ready.js';

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
 * @guide theming.html#cross-platform-styling-autostyling [en]Information about cross platform styling[/en][ja]Information about cross platform styling[/ja]
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
export default class IfElement extends BaseElement {

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

  constructor() {
    super();

    contentReady(this, () => {
      if (platform._getSelectedPlatform() !== null) {
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

  connectedCallback() {
    orientation.on('change', this._onOrientationChange.bind(this));
  }

  static get observedAttributes() {
    return ['orientation'];
  }

  attributeChangedCallback(name) {
    if (name === 'orientation') {
      this._onOrientationChange();
    }
  }

  disconnectedCallback() {
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

onsElements.If = IfElement;
customElements.define('ons-if', IfElement);
