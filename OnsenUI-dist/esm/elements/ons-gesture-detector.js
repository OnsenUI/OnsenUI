import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
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

import ons from '../ons';
import BaseElement from './base/base-element';
import GestureDetector from '../ons/gesture-detector';

/**
 * @element ons-gesture-detector
 * @category gesture
 * @description
 *   [en]
 *     Component to detect finger gestures within the wrapped element. Following gestures are supported:
 *     - Drag gestures: `drag`, `dragleft`, `dragright`, `dragup`, `dragdown`
 *     - Hold gestures: `hold`, `release`
 *     - Swipe gestures: `swipe`, `swipeleft`, `swiperight`, `swipeup`, `swipedown`
 *     - Tap gestures: `tap`, `doubletap`
 *     - Pinch gestures: `pinch`, `pinchin`, `pinchout`
 *     - Other gestures: `touch`, `transform`, `rotate`
 *   [/en]
 *   [ja]要素内のジェスチャー操作を検知します。詳しくはガイドを参照してください。[/ja]
 * @guide features.html#gesture-detection
 *   [en]Detecting finger gestures[/en]
 *   [ja]ジェスチャー操作の検知[/ja]
 * @example
 * <ons-gesture-detector>
 *   <div id="detect-area" style="width: 100px; height: 100px;">
 *     Swipe Here
 *   </div>
 * </ons-gesture-detector>
 *
 * <script>
 *   document.addEventListener('swipeleft', function(event) {
 *     if (event.target.matches('#detect-area')) {
 *       console.log('Swipe left is detected.');
 *     }
 *   });
 * </script>
 */

var GestureDetectorElement = function (_BaseElement) {
  _inherits(GestureDetectorElement, _BaseElement);

  function GestureDetectorElement() {
    _classCallCheck(this, GestureDetectorElement);

    var _this = _possibleConstructorReturn(this, (GestureDetectorElement.__proto__ || _Object$getPrototypeOf(GestureDetectorElement)).call(this));

    _this._gestureDetector = new GestureDetector(_this);
    return _this;
  }

  return GestureDetectorElement;
}(BaseElement);

export default GestureDetectorElement;


ons.elements.GestureDetector = GestureDetectorElement;
customElements.define('ons-gesture-detector', GestureDetectorElement);