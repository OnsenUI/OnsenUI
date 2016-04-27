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
import GestureDetector from 'ons/gesture-detector';

/**
 * @element ons-gesture-detector
 * @category gesture
 * @description
 *   [en]Component to detect finger gestures within the wrapped element. See the guide for more details.[/en]
 *   [ja]要素内のジェスチャー操作を検知します。詳しくはガイドを参照してください。[/ja]
 * @guide DetectingFingerGestures
 *   [en]Detecting finger gestures[/en]
 *   [ja]ジェスチャー操作の検知[/ja]
 * @example
 * <ons-gesture-detector style="height: 100%; width: 100%;">
 *   ...
 * </ons-gesture-detector>
 */
class GestureDetectorElement extends BaseElement {
  createdCallback() {
    this._gestureDetector = new GestureDetector(this);
  }
}

window.OnsGestureDetectorElement = document.registerElement('ons-gesture-detector', {
  prototype: GestureDetectorElement.prototype
});
