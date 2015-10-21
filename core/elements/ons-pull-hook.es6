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

(() => {
  'use strict';

  const STATE_INITIAL = 'initial';
  const STATE_PREACTION = 'preaction';
  const STATE_ACTION = 'action';
  const util = ons._util;

  class PullHookElement extends ons._BaseElement {

    createdCallback() {
      this._scrollElement = this._createScrollElement();
      this._pageElement = this._scrollElement.parentElement;

      if (!this._pageElement.classList.contains('page__content') && !this._pageElement.classList.contains('ons-scroller__content')) {
        throw new Error('<ons-pull-hook> must be a direct descendant of an <ons-page> or an <ons-scroller> element.');
      }

      this._boundOnDrag = this._onDrag.bind(this);
      this._boundOnDragStart = this._onDragStart.bind(this);
      this._boundOnDragEnd = this._onDragEnd.bind(this);
      this._boundOnScroll = this._onScroll.bind(this);

      this._currentTranslation = 0;

      this._setState(STATE_INITIAL, true);
      this._setStyle();
    }

    _createScrollElement() {
      const scrollElement = util.createElement('<div class="scroll"><div>');

      const pageElement = this.parentElement;

      scrollElement.appendChild(this);
      while (pageElement.firstChild) {
        scrollElement.appendChild(pageElement.firstChild);
      }
      pageElement.appendChild(scrollElement);

      return scrollElement;
    }

    _setStyle() {
      const height = this.getHeight();

      this.style.top = '-' + height + 'px';
      this.style.height = height + 'px';
      this.style.lineHeight = height + 'px';
    }

    _onScroll(event) {
      const element = this._pageElement;

      if (element.scrollTop < 0) {
        element.scrollTop = 0;
      }
    }

    _generateTranslationTransform(scroll) {
      return 'translate3d(0px, ' + scroll + 'px, 0px)';
    }

    _onDrag(event) {
      if (this.isDisabled()) {
        return;
      }

      // Ignore when dragging left and right.
      if (event.gesture.direction === 'left' || event.gesture.direction === 'right') {
        return;
      }

      // Hack to make it work on Android 4.4 WebView. Scrolls manually near the top of the page so
      // there will be no inertial scroll when scrolling down. Allowing default scrolling will
      // kill all 'touchmove' events.
      const element = this._pageElement;
      element.scrollTop = this._startScroll - event.gesture.deltaY;
      if (element.scrollTop < window.innerHeight && event.gesture.direction !== 'up') {
        event.gesture.preventDefault();
      }

      if (this._currentTranslation === 0 && this._getCurrentScroll() === 0) {
        this._transitionDragLength = event.gesture.deltaY;

        const direction = event.gesture.interimDirection;
        if (direction === 'down') {
          this._transitionDragLength -= 1;
        } else {
          this._transitionDragLength += 1;
        }
      }

      const scroll = Math.max(event.gesture.deltaY - this._startScroll, 0);

      if (this._thresholdHeightEnabled() && scroll >= this.getThresholdHeight()) {
        event.gesture.stopDetect();

        setImmediate(() => {
          this._setState(STATE_ACTION);
          this._translateTo(this.getHeight(), {animate: true});

          this._waitForAction(this._onDone.bind(this));
        });
      } else if (scroll >= this.getHeight()) {
        this._setState(STATE_PREACTION);
      } else {
        this._setState(STATE_INITIAL);
      }

      event.stopPropagation();
      this._translateTo(scroll);
    }

    _onDragStart(event) {
      if (this.isDisabled()) {
        return;
      }

      this._startScroll = this._getCurrentScroll();
    }

    _onDragEnd(event) {
      if (this.isDisabled()) {
        return;
      }

      if (this._currentTranslation > 0) {
        const scroll = this._currentTranslation;

        if (scroll > this.getHeight()) {
          this._setState(STATE_ACTION);

          this._translateTo(this.getHeight(), {animate: true});

          this._waitForAction(this._onDone.bind(this));
        } else {
          this._translateTo(0, {animate: true});
        }
      }
    }

    /**
     * @param {Function} callback
     */
    setActionCallback(callback) {
      this._callback = callback;
    }

    _waitForAction(done) {
      if (this._callback instanceof Function) {
        this._callback.call(null, done);
      } else {
        done();
      }

    }

    _onDone(done) {
      // Check if the pull hook still exists.
      this._translateTo(0, {animate: true});
      this._setState(STATE_INITIAL);
    }

    /**
     * @return {Number}
     */
    getHeight() {
      return parseInt(this.getAttribute('height') || '64', 10);
    }

    /**
     * @param {Number} height
     */
    setHeight(height) {
      this.setAttribute('height', height + 'px');

      this._setStyle();
    }

    /**
     * @param {Number} thresholdHeight
     */
    setThresholdHeight(thresholdHeight) {
      this.setAttribute('threshold-height', thresholdHeight + 'px');
    }

    /**
     * @return {Number}
     */
    getThresholdHeight() {
      return parseInt(this.getAttribute('threshold-height') || '96', 10);
    }

    _thresholdHeightEnabled() {
      const th = this.getThresholdHeight();
      return th > 0 && th >= this.getHeight();
    }

    _setState(state, noEvent) {
      const lastState = this._getState();

      this.setAttribute('state', state);

      if (!noEvent && lastState !== this._getState()) {
        util.triggerElementEvent(this, 'changestate', {
          pullHook: this,
          state: state,
          lastState: lastState
        });
      }
    }

    _getState() {
      return this.getAttribute('state');
    }

    getCurrentState() {
      return this._getState();
    }

    _getCurrentScroll() {
      return this._pageElement.scrollTop;
    }

    getPullDistance() {
      return this._currentTranslation;
    }

    isDisabled() {
      return this.hasAttribute('disabled');
    }

    _isContentFixed() {
      return this.hasAttribute('fixed-content');
    }

    setDisabled(disabled) {
      if (disabled) {
        this.setAttribute('disabled', '');
      } else {
        this.removeAttribute('disabled');
      }
    }

    _getScrollableElement() {
      if (this._isContentFixed()) {
        return this;
      } else {
        return this._scrollElement;
      }
    }

    /**
     * @param {Number} scroll
     * @param {Object} options
     * @param {Function} [options.callback]
     */
    _translateTo(scroll, options = {}) {
      if (this._currentTranslation == 0 && scroll == 0) {
        return;
      }

      const done = () => {
        if (scroll === 0) {
          this._getScrollableElement().removeAttribute('style');
        }

        if (options.callback) {
          options.callback();
        }
      };

      this._currentTranslation = scroll;

      if (options.animate) {
        animit(this._getScrollableElement())
          .queue({
            transform: this._generateTranslationTransform(scroll)
          }, {
            duration: 0.3,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          })
          .play(done);
      } else {
        animit(this._getScrollableElement())
          .queue({
            transform: this._generateTranslationTransform(scroll)
          })
          .play(done);
      }
    }

    _getMinimumScroll() {
      const scrollHeight = this._scrollElement.getBoundingClientRect().height;
      const pageHeight = this._pageElement.getBoundingClientRect().height;

      return scrollHeight > pageHeight ? -(scrollHeight - pageHeight) : 0;
    }

    _createEventListeners() {
      this._gestureDetector = new ons.GestureDetector(this._pageElement, {
        dragMinDistance: 1,
        dragDistanceCorrection: false
      });

      // Bind listeners
      this._gestureDetector.on('drag', this._boundOnDrag);
      this._gestureDetector.on('dragstart', this._boundOnDragStart);
      this._gestureDetector.on('dragend', this._boundOnDragEnd);

      this._scrollElement.parentElement.addEventListener('scroll', this._boundOnScroll, false);
    }

    _destroyEventListeners() {
      this._gestureDetector.off('drag', this._boundOnDrag);
      this._gestureDetector.off('dragstart', this._boundOnDragStart);
      this._gestureDetector.off('dragend', this._boundOnDragEnd);

      this._gestureDetector.dispose();
      this._gestureDetector = null;

      this._scrollElement.parentElement.removeEventListener('scroll', this._boundOnScroll, false);
    }

    attachedCallback() {
      this._createEventListeners();
    }

    detachedCallback() {
      this._destroyEventListeners();
    }

    attributeChangedCallback(name, last, current) {
    }
  }

  if (!window.OnsPullHookElement) {
    window.OnsPullHookElement = document.registerElement('ons-pull-hook', {
      prototype: PullHookElement.prototype
    });

    window.OnsPullHookElement.STATE_ACTION = STATE_ACTION;
    window.OnsPullHookElement.STATE_INITIAL = STATE_INITIAL;
    window.OnsPullHookElement.STATE_PREACTION = STATE_PREACTION;
  }
})();
