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

import util from '../../ons/util';
import GestureDetector from '../../ons/gesture-detector';

const widthToPx = (width) => {
  const [value, px] = [parseInt(width, 10), /px/.test(width)];
  return px ? value : Math.round(document.body.offsetWidth * value / 100);
};

export default class SwipeReveal {

  constructor(params) {
    this.element = params.element;
    this.elementHandler = params.elementHandler || params.element;
    this.animator = params.animator;
    this.getThreshold = params.getThreshold;
    this.ignoreSwipe = params.ignoreSwipe;
    this.getAnimationElements = params.getAnimationElements;
    this.onDragCallback = params.onDrag;
    this.swipeMax = params.swipeMax;
    this.swipeMin = params.swipeMin || (() => this.animator.restore(...this.getAnimationElements()));
    this.swipeMid = params.swipeMid || (() => this.animator.translate(this._distance, this._width, ...this.getAnimationElements()));
    this.side = params.side || 'left';

    this.boundHandleGesture = this.handleGesture.bind(this);
  }

  update(swipeable = this.element.hasAttribute('swipeable')) {
    if (!this.gestureDetector) {
      this.gestureDetector = new GestureDetector(this.elementHandler, {dragMinDistance: 1});
    }

    const action = swipeable ? 'on' : 'off';
    this.gestureDetector[action]('drag dragstart dragend', this.boundHandleGesture);
  }

  handleGesture(e) {
    if (e.gesture) {
      if (e.type === 'dragstart') {
        this.onDragStart(e);
      } else if (!this._ignoreDrag) {
        e.type === 'dragend' ? this.onDragEnd(e) : this.onDrag(e);
      }
    }
  }

  onDragStart(event) {
    const scrolling = !/left|right/.test(event.gesture.direction);
    const distance = this.side === 'left' ? event.gesture.center.clientX : window.innerWidth - event.gesture.center.clientX;
    this._ignoreDrag = scrolling || event.consumed || this.ignoreSwipe(event, distance);

    if (!this._ignoreDrag) {
      event.consume && event.consume();
      event.consumed = true;

      this._width = widthToPx(this.element._width || '100%');
      this._startDistance = this._distance = 0;

      util.preventScroll(this.gestureDetector);
    }
  }

  onDrag(event) {
    event.stopPropagation();

    event.gesture.preventDefault();
    const delta = this.side === 'left' ? event.gesture.deltaX : -event.gesture.deltaX;
    const distance = Math.max(0, Math.min(this._width, this._startDistance + delta));
    if (distance !== this._distance) {
      this._distance = distance;
      this.swipeMid(this._distance, this._width);
      this.onDragCallback && this.onDragCallback();
    }
  }

  onDragEnd(event) {
    event.stopPropagation();

    const direction = event.gesture.interimDirection;
    const isSwipeMax = this.side !== direction && this._distance > this._width * this.getThreshold();
    isSwipeMax ? this.swipeMax(this.animator) : this.swipeMin(this.animator);
  }

  dispose() {
    this.gestureDetector && this.gestureDetector.dispose();
    this.gestureDetector = this.element = this.elementHandler = this.animator = null;
  }
}
