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

  const util = ons._util;
  const SPLIT_MODE = 'split';
  const COLLAPSE_MODE = 'collapse';

  class CollapseDetection {
    activate(element) {}
    inactivate() {}
  }

  class OrientationCollapseDetection extends CollapseDetection {
    /**
     * @param {String} orientation
     */
    constructor(orientation) {
      super();

      if (orientation !== 'portrait' && orientation !== 'landscape') {
        throw new Error(`Invalid orientation: ${orientation}`);
      }

      this._boundOnOrientationChange = this._onOrientationChange.bind(this);
      this._targetOrientation = orientation;
    }

    activate(element) {
      this._element = element;
      ons.orientation.on('change', this._boundOnOrientationChange);
      this._update(ons.orientation.isPortrait());
    }

    _onOrientationChange(info) {
      this._update(info.isPortrait);
    }

    _update(isPortrait) {
      if (isPortrait && this._targetOrientation === 'portrait') {
        this._element._updateMode(COLLAPSE_MODE);
      } else if (!isPortrait && this._targetOrientation === 'landscape') {
        this._element._updateMode(COLLAPSE_MODE);
      } else {
        this._element._updateMode(SPLIT_MODE);
      }
    }

    inactivate() {
      this._element = null;
      ons.orientation.off('change', this._boundOnOrientationChange);
    }
  }

  class StaticCollapseDetection extends CollapseDetection {
    activate(element) {
      element._updateMode(COLLAPSE_MODE);
    }
  }

  class MediaQueryCollapseDetection extends CollapseDetection {
    /**
     * @param {String} query
     */
    constructor(query) {
      super();

      this._mediaQueryString = query;
      this._boundOnChange = this._onChange.bind(this);
    }

    _onChange(queryList) {
      this._element._updateMode(queryList.matches ? COLLAPSE_MODE : SPLIT_MODE);
    }

    activate(element) {
      this._element = element;
      this._queryResult = window.matchMedia(this._mediaQueryString);
      this._queryResult.addListener(this._boundOnChange);
      this._onChange(this._queryResult);
    }

    inactivate() {
      this._element = null;
      this._queryResult.removeListener(this._boundOnChange);
      this._queryResult = null;
    }
  }

  class BaseMode {
    isOpened() {}
    openMenu() {
      return false;
    }
    closeMenu() {
      return false;
    }
    enterMode() {}
    exitMode() {}
    handleGesture() {}
  }

  class SplitMode extends BaseMode {

    constructor(element) {
      super();
      this._element = element;
    }

    isOpened() {
      return false;
    }

    /**
     * @param {Element} element
     */
    layout() {
      const element = this._element;
      element.style.width = element._getWidth();

      if (element._isLeftSide()) {
        element.style.left = '0';
        element.style.right = 'auto';
      } else {
        element.style.left = 'auto';
        element.style.right = '0';
      }
    }

    enterMode() {
      this.layout();
    }

    exitMode() {
      const element = this._element;

      element.style.left = '';
      element.style.right = '';
      element.style.width = '';
    }
  }

  class CollapseMode extends BaseMode {

    static get CLOSED_STATE() {
      return 'closed';
    }

    static get OPENED_STATE() {
      return 'opened';
    }

    constructor(element) {
      super();

      this._state = CollapseMode.CLOSED_STATE;
      this._distance = 0;
      this._element = element;
      this._lock = new DoorLock();
    }

    _isLocked() {
      return this._lock.isLocked();
    }

    isOpened() {
      return this._state !== CollapseMode.CLOSED_STATE;
    }

    handleGesture(event) {
      if (this._isLocked()) {
        return;
      }

      if (event.type === 'dragleft' || event.type === 'dragright') {
        this._onDrag(event);
      } else if (event.type === 'dragstart') {
        this._onDragStart(event);
      } else if (event.type === 'dragend') {
        this._onDragEnd(event);
      } else {
        throw new Error('Invalid state');
      }
    }

    _onDragStart(event) {
      this._ignoreDrag = false;

      if (this._element._swipeTargetWidth > 0) {
        const distance = this._element._isLeftSide()
          ? event.gesture.center.clientX
          : window.innerWidth - event.gesture.center.clientX;
        if (distance > this._element._swipeTargetWidth) {
          this._ignoreDrag = true;
        }
      }
    }

    _onDrag(event) {
      if (this._ignoreDrag) {
        return;
      }

      event.gesture.preventDefault();

      const deltaX = event.gesture.deltaX;
      const deltaDistance = this._element._isLeftSide() ? deltaX : -deltaX;

      const startEvent = event.gesture.startEvent;

      if (!('isOpened' in startEvent)) {
        startEvent.isOpened = this.isOpened();
      }

      if (deltaDistance < 0 && !this.isOpened()) {
        return;
      }

      if (deltaDistance > 0 && this.isOpened()) {
        return;
      }

      const width = this._element._getWidthInPixel();
      const distance = startEvent.isOpened ? deltaDistance + width : deltaDistance;

      this._translate(Math.min(width, distance));
    }

    /**
     * @param {Number} distance
     */
    _translate(distance) {

      const element = this._element;

      if (element._isLeftSide()) {
        element.style.transform = 'translateX(' + distance + 'px)';
      } else {
        element.style.transform = 'translateX(-' + distance + 'px)';
      }

      element.style.transition = '';
    }

    _onDragEnd(event) {
      if (this._ignoreDrag) {
        return;
      }

      const deltaX = event.gesture.deltaX;
      const deltaDistance = this._element._isLeftSide() ? deltaX : -deltaX;
      const width = this._element._getWidthInPixel();
      const distance = event.gesture.startEvent.isOpened ? deltaDistance + width : deltaDistance;

      const shouldOpen = distance > width / 2;

      if (shouldOpen) {
        this.openMenu({
          withoutAnimation: distance >= width
        });
      } else {
        this.closeMenu({
          withoutAnimation: distance === 0
        });
      }
    }

    layout() {
      const element = this._element;
      const mask = util.findChild(element.parentElement, 'ons-splitter-mask');

      element.style.width = element._getWidth();

      if (this._state === CollapseMode.CLOSED_STATE) {

        animit(this._element)
          .queue({tranform: 'translateX(0%)'})
          .play();

        mask.style.display = 'none';

      } else if (this._state === CollapseMode.OPENED_STATE) {

        animit(this._element)
          .queue({tranform: element._isLeftSide() ? 'translateX(100%)' : 'translateX(-100%)'})
          .play();

        mask.style.display = 'block';
      } else {
        throw new Error('Invalid state');
      }

    }

    // enter collapse mode
    enterMode() {
      this._element.style.zIndex = 3;
      this._element.style.display = 'block';

      if (this._element._isLeftSide()) {
        this._element.style.left = 'auto';
        this._element.style.right = '100%';
      } else {
        this._element.style.left = '100%';
        this._element.style.right = 'auto';
      }

      this.layout();
    }

    // exit collapse mode
    exitMode() {
      this._clearLayout();
    }

    _clearLayout() {
      this._element.style.zIndex = '';
      this._element.style.right = '';
      this._element.style.left = '';
      this._element.style.transform = this._element.style.webkitTransform = '';
      this._element.style.transition = this._element.style.webkitTransition = '';
      this._element.style.width = '';
    }

    /**
     * @param {Object} [options]
     * @param {Function} [options.callback]
     * @param {Boolean} [options.withoutAnimation]
     */
    openMenu(options = {}) {
      options.callback = options.callback instanceof Function ? options.callback : () => {};

      if (this._isLocked()) {
        setImmediate(options.callback);
        return false;
      }

      if (options.withoutAnimation) {
        this._state = CollapseMode.OPENED_STATE;
        this.layout();
      } else {
        const unlock = this._lock.lock();
        this._state = CollapseMode.OPENED_STATE;
        this._runOpenAnimation(() => {
          this.layout();
          unlock();
          options.callback();
        });
      }

      return true;
    }

    /**
     * @param {Function} done
     */
    _runOpenAnimation(done) {
      const tranform = this._element._isLeftSide() ? 'translate3d(100%, 0px, 0px)' : 'translate3d(-100%, 0px, 0px)';
      const mask = this._element.parentElement._getMaskElement();

      animit.runAll(
        animit(this._element)
          .queue({
            transform: 'translate3d(0px, 0px, 0px)'
          })
          .queue({
            transform: tranform
          }, {
            duration: 0.3,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          })
          .queue(callback => {
            callback();
            this._element.style.webkitTransition = '';
            done();
          }),

        animit(mask)
          .queue({
            display: 'block',
            opacity: '0',
            delay: 0
          })
          .queue({
            opacity: '1'
          }, {
            duration: 0.3,
            timing: 'linear',
          })
      );
    }

    /**
     * @param {Function} done
     */
    _runCloseAnimation(done) {
      const mask = this._element.parentElement._getMaskElement();

      animit.runAll(
        animit(this._element)
          .queue({
            transform: 'translate3d(0px, 0px, 0px)'
          }, {
            duration: 0.3,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          })
          .queue(callback => {
            callback();
            this._element.style.webkitTransition = '';
            done();
          }),

        animit(mask)
          .queue({
            opacity: '0'
          }, {
            duration: 0.3,
            timing: 'linear',
          })
          .queue({
            display: 'none'
          })
      );
    }

    closeMenu(options = {}) {
      if (this._isLocked()) {
        setImmediate(options.callback);
        return false;
      }

      options.callback = options.callback instanceof Function ? options.callback : () => {};

      if (options.withoutAnimation) {
        this._state = CollapseMode.CLOSED_STATE;
        this.layout();
      } else {
        const unlock = this._lock.lock();
        this._state = CollapseMode.CLOSED_STATE;
        this._runCloseAnimation(() => {
          this.layout();
          unlock();
          options.callback();
        });
      }

      return true;
    }
  }

  class SplitterSideElement extends ons._BaseElement {

    get page() {
      return this._page;
    }

    get mode() {
      this._mode;
    }

    _updateForAnimationOptionsAttribute() {
      this._animationOptions = util.parseJSONObjectSafely(this.getAttribute('animation-options'), {});
    }

    _getModeStrategy() {
      if (this._mode === COLLAPSE_MODE) {
        return this._collapseMode;
      } else if (this._mode === SPLIT_MODE) {
        return this._splitMode;
      }
    }

    createdCallback() {
      this._mode = null;
      this._page = null;
      this._isAttached = false;
      this._collapseStrategy = new CollapseDetection();

      this._collapseMode = new CollapseMode(this);
      this._splitMode = new SplitMode(this);

      this._boundHandleGesture = this._handleGesture.bind(this);

      this._cancelModeDetection = () => {};

      this._updateMode(SPLIT_MODE);

      this._updateForWidthAttribute();
      this._updateForSideAttribute();
      this._updateForCollapseAttribute();
      this._updateForSwipeableAttribute();
      this._updateForSwipeTargetWidthAttribute();
      this._updateForAnimationOptionsAttribute();
    }

    /**
     * @return {Boolean}
     */
    isSwipeable() {
      return this.hasAttribute('swipeable');
    }

    _considerOrientation() {
      if (!this._consideringOrientation) {
        return;
      }

    }

    _considerMediaQuery() {

    }

    _updateForCollapseAttribute() {
      if (!this.hasAttribute('collapse')) {
        this._updateMode(SPLIT_MODE);
        return;
      }

      const collapse = this.getAttribute('collapse');

      if (collapse === '') {
        this._updateCollapseStrategy(new StaticCollapseDetection());
      } else if (collapse === 'portrait' || collapse === 'landscape') {
        this._updateCollapseStrategy(new OrientationCollapseDetection(collapse));
      } else {
        this._updateCollapseStrategy(new MediaQueryCollapseDetection(collapse));
      }
    }

    /**
     * @param {CollapseDetection} strategy
     */
    _updateCollapseStrategy(strategy) {
      if (this._isAttached) {
        this._collapseStrategy.inactivate();
        strategy.activate(this);
      }

      this._collapseStrategy = strategy;
    }

    /**
     * @param {String} mode
     */
    _updateMode(mode) {

      if (mode !== COLLAPSE_MODE && mode !== SPLIT_MODE) {
        throw new Error(`invalid mode: ${mode}`);
      }

      if (mode === this._mode) {
        return;
      }

      const lastMode = this._getModeStrategy();

      if (lastMode) {
        lastMode.exitMode();
      }

      this._mode = mode;
      const currentMode = this._getModeStrategy();

      currentMode.enterMode();
      this.setAttribute('mode', mode);

      const event = new CustomEvent('modechange', {bubbles: true});
      this.dispatchEvent(event);
    }

    _layout() {
      this._getModeStrategy().layout();
    }

    _updateForSwipeTargetWidthAttribute() {
      if (this.hasAttribute('swipe-target-width')) {
        this._swipeTargetWidth = Math.max(0, parseInt(this.getAttribute('swipe-target-width'), 10));
      } else {
        this._swipeTargetWidth = -1;
      }
    }

    /**
     * @return {String} \d+(px|%)
     */
    _getWidth() {
      return this.hasAttribute('width') ? normalize(this.getAttribute('width')) : '80%';

      function normalize(width) {
        width = width.trim();

        if (width.match(/^\d+(px|%)$/)) {
          return width;
        }

        return '80%';
      }
    }

    _getWidthInPixel() {
      const width = this._getWidth();

      const [, num, unit] = width.match(/^(\d+)(px|%)$/);

      if (unit === 'px') {
        return parseInt(num, 10);
      }

      if (unit === '%') {
        const percent = parseInt(num, 10);

        return Math.round(this.parentElement.offsetWidth * percent / 100);
      }

      throw new Error('Invalid state');
    }

    /**
     * @return {String} 'left' or 'right'.
     */
    _getSide() {
      return normalize(this.getAttribute('side'));

      function normalize(side) {
        side = ('' + side).trim();
        return side === 'left' || side === 'right' ? side : 'left';
      }
    }

    _isLeftSide() {
      return this._getSide() === 'left';
    }

    _updateForWidthAttribute() {
      this._getModeStrategy().layout();
    }

    _updateForSideAttribute() {
      this._getModeStrategy().layout();
    }

    /**
     * @return {String}
     */
    getCurrentMode() {
      return this._mode;
    }

    /**
     * @return {Boolean}
     */
    isOpened() {
      return this._getModeStrategy().isOpened();
    }

    /**
     * @param {Object} [options]
     * @return {Boolean}
     */
    open(options = {}) {
      return this._getModeStrategy().openMenu(options);
    }

    /**
     * @param {Object} [options]
     * @return {Boolean}
     */
    close(options = {}) {
      return this._getModeStrategy().closeMenu(options);
    }

    /**
     * @param {Object} [options]
     * @return {Boolean}
     */
    toggle(options = {}) {
      const mode = this._getModeStrategy();

      return mode.isOpened() ? mode.closeMenu(options) : mode.openMenu(options);
    }

    /**
     * @param {String} page
     * @param {Object} [options]
     * @param {Function} [options.callback]
     */
    load(page, options = {}) {
      this._page = page;

      options.callback = options.callback instanceof Function ? options.callback : () => {};
      ons._internal.getPageHTMLAsync(page).then((html) => {
        this.appendChild(util.createFragment(html));
        options.callback();
      });
    }

    /**
     * @param {Object} [options]
     */
    toggle(options = {}) {
      return this.isOpened() ? this.close(options) : this.open(options);
    }

    attributeChangedCallback(name, last, current) {
      if (name === 'width') {
        this._updateForWidthAttribute();
      } else if (name === 'side') {
        this._updateForSideAttribute();
      } else if (name === 'collapse') {
        this._updateForCollapseAttribute();
      } else if (name === 'swipeable') {
        this._updateForSwipeableAttribute();
      } else if (name === 'swipe-target-width') {
        this._updateForSwipeTargetWidthAttribute();
      } else if (name === 'animation-options') {
        this._updateForAnimationOptionsAttribute();
      }
    }

    _updateForSwipeableAttribute() {
      if (this._gestureDetector) {
        if (this.isSwipeable()) {
          this._gestureDetector.on('dragstart dragleft dragright dragend', this._boundHandleGesture);
        } else {
          this._gestureDetector.off('dragstart dragleft dragright dragend', this._boundHandleGesture);
        }
      }
    }

    _assertParent() {
      const parentElementName = this.parentElement.nodeName.toLowerCase();
      if (parentElementName !== 'ons-splitter') {
        throw new Error(`"${parentElementName}" element is not allowed as parent element.`);
      }
    }

    attachedCallback() {
      this._isAttached = true;
      this._collapseStrategy.activate(this);
      this._assertParent();

      this._gestureDetector = new ons.GestureDetector(this.parentElement, {dragMinDistance: 1});
      this._updateForSwipeableAttribute();

      if (this.hasAttribute('page')) {
        OnsSplitterSideElement.ready(this, () => this.load(this.getAttribute('page')));
      }
    }

    detachedCallback() {
      this._isAttached = false;
      this._collapseStrategy.inactivate();

      this._gestureDetector.dispose();
      this._gestureDetector = null;

      this._updateForSwipeableAttribute();
    }

    _handleGesture(event) {
      return this._getModeStrategy().handleGesture(event);
    }

  }

  if (!window.OnsSplitterSideElement) {
    window.OnsSplitterSideElement = document.registerElement('ons-splitter-side', {
      prototype: SplitterSideElement.prototype
    });

    window.OnsSplitterSideElement.ready = function(element, callback) {
      setImmediate(callback);
    };
  }

})();
