/*
Copyright 2013-2018 ASIAL CORPORATION

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

import animit from '../../ons/animit.js';
import BaseAnimator from '../../ons/base-animator.js';

export class ListItemAnimator extends BaseAnimator {
  constructor({timing = 'linear', delay = 0, duration = 0.2} = {}) {
    super({ timing, delay, duration });
  }

  showExpansion(listItem, callback) {
    callback();
  }

  hideExpansion(listItem, callback) {
    callback();
  }
}

export class SlideListItemAnimator extends ListItemAnimator {

  showExpansion(listItem, callback) {
    this._animateExpansion(listItem, true, callback);
  }

  hideExpansion(listItem, callback) {
    this._animateExpansion(listItem, false, callback);
  }

  _animateExpansion(listItem, shouldOpen, callback) {
    // To animate the opening of the expansion panel correctly, we need to know its
    // height. To calculate this, we set its height to auto, and then get the computed
    // height and padding. Once this is done, we set the height back to its original value.
    const oldHeight = listItem.expandableContent.style.height;
    const oldDisplay = listItem.expandableContent.style.display;
    listItem.expandableContent.style.height = 'auto';
    listItem.expandableContent.style.display = 'block';
    const computedStyle = window.getComputedStyle(listItem.expandableContent);

    const expansionOpenTransition = [
      { height: 0, paddingTop: 0, paddingBottom: 0 },
      {
        height: computedStyle.height,
        paddingTop: computedStyle.paddingTop,
        paddingBottom: computedStyle.paddingBottom,
      }
    ];
    const iconOpenTransition = [{transform: 'rotate(45deg)'}, {transform: 'rotate(225deg)'}];

    // Now that we have the values we need, reset the height back to its original state
    listItem.expandableContent.style.height = oldHeight;

    animit(listItem.expandableContent, { duration: this.duration, property: 'height padding-top padding-bottom' })
      .default(...(shouldOpen ? expansionOpenTransition : expansionOpenTransition.reverse()))
      .play(() => {
        listItem.expandableContent.style.display = oldDisplay;
        callback && callback();
      });

    if (listItem.expandChevron) {
      animit(listItem.expandChevron, { duration: this.duration, property: 'transform' })
        .default(...(shouldOpen ? iconOpenTransition : iconOpenTransition.reverse()))
        .play();
    }
  }

}