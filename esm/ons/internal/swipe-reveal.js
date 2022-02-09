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

import util from '../../ons/util.js';
import GestureDetector from '../../ons/gesture-detector.js';

const widthToPx = (width) => {
  const [value, px] = [parseInt(width, 10), /px/.test(width)];
  return px ? value : Math.round(document.body.offsetWidth * value / 100);
};

export default class SwipeReveal {

  constructor(params) {
    'element ignoreSwipe isInitialState onDragCallback swipeMax swipeMin swipeMid'
      .split(/\s+/).forEach(key => this[key] = params[key]);

    this.elementHandler = params.elementHandler || params.element;
    this.getThreshold = params.getThreshold || (() => .5);
    this.getSide = params.getSide || (() => 'left');

    this.handleGesture = this.handleGesture.bind(this);

    this._shouldFixScroll = util.globals.actualMobileOS === 'ios';
  }

  update(swipeable = this.element.hasAttribute('swipeable')) {
    if (!this.gestureDetector) {
      this.gestureDetector = new GestureDetector(this.elementHandler, { dragMinDistance: 1, passive: !this._shouldFixScroll });
    }

    const action = swipeable ? 'on' : 'off';
    this.gestureDetector[action]('drag dragstart dragend', this.handleGesture);
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
    const getDistance = () => this.getSide() === 'left' ? event.gesture.center.clientX : window.innerWidth - event.gesture.center.clientX;
    this._ignoreDrag = event.consumed || !util.isValidGesture(event) || this.ignoreSwipe(event, getDistance());

    if (!this._ignoreDrag) {
      event.consume && event.consume();
      event.consumed = true;

      this._width = widthToPx(this.element.style.width || '100%');
      this._startDistance = this._distance = (!(this.isInitialState instanceof Function) || this.isInitialState()) ? 0 : this._width;

      util.iosPreventScroll(this.gestureDetector);
    }
  }

  onDrag(event) {
    event.stopPropagation();

    const delta = this.getSide() === 'left' ? event.gesture.deltaX : -event.gesture.deltaX;
    const distance = Math.max(0, Math.min(this._width, this._startDistance + delta));
    if (distance !== this._distance) {
      this._distance = distance;
      this.swipeMid(this._distance, this._width);
    }
  }

  onDragEnd(event) {
    event.stopPropagation();

    const direction = event.gesture.interimDirection;
    const isSwipeMax = this.getSide() !== direction && this._distance > this._width * this.getThreshold();
    isSwipeMax ? this.swipeMax() : this.swipeMin();
  }

  dispose() {
    this.gestureDetector && this.gestureDetector.dispose();
    this.gestureDetector = this.element = this.elementHandler = null;
  }
}
