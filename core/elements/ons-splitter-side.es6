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

  class BaseMode {
    isOpened() {}
    openMenu() {}
    closeClose() {}
    enterMode() {}
    exitMode() {}
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
  }

  class CollapseMode extends BaseMode {

    static get CLOSED_STATE() {
      return 'closed';
    }

    static get OPENED_STATE() {
      return 'opened';
    }

    static get DRAGGING_STATE() {
      return 'dragging';
    }

    static get OPENING_STATE() {
      return 'opening';
    }

    static get CLOSING_STATE() {
      return 'closing';
    }

    constructor(element) {
      super();

      this._state = CollapseMode.CLOSED_STATE;
      this._distance = 0;
      this._element = element;

      this._boundOnDrag = this._onDrag.bind(this);
      this._boundOnDragStart = this._onDragStart.bind(this);
      this._boundOnDragEnd = this._onDragEnd.bind(this);
    }

    isOpened() {
      return this._state !== CollapseMode.CLOSED_STATE;
    }

    layout() {
      const element = this._element;
      const mask = util.findChild(element.parentElement, 'ons-splitter-mask');

      if (this._state === CollapseMode.CLOSED_STATE) {
        this._layoutOnClosedState();
      } else if (this._state === CollapseMode.OPENED_STATE) {
        this._layoutOnOpenedState();
      }
    }

    _layoutOnOpenedState() {
      const element = this._element;
      const mask = element.parentElement._getMaskElement();

      if (element._isLeftSide()) {
        element.style.webkitTransform = element.style.transform = 'translateX(100%)';
        element.style.left = '0%';
        element.style.right = 'auto';
      } else {
        element.style.webkitTransform = element.style.transform = 'translateX(-100%)';
        element.style.left = '100%';
        element.style.right = 'auto';
      }

      element.style.width = element._getWidth();
      mask.style.display = 'block';
      mask.style.opacity = '1';
    }

    _layoutOnClosedState() {
      const mask = this._element.parentElement._getMaskElement();

      this._element.style.display = 'none';
      mask.style.display = 'none';
      mask.style.opacity = '0';
    }

    _onDrag() {
      console.log('on drag');
      // TODO
    }

    _onDragStart() {
      console.log('on drag start');
      // TODO
    }

    _onDragEnd() {
      console.log('on drag end');
      // TODO
    }

    // enter collapse mode
    enterMode() {
      this._addEventListeners();
      this._element.style.zIndex = 3;
      this.layout();
    }

    // exit collapse mode
    exitMode() {
      this._removeEventListeners();
      this._clearLayout();
    }

    _addEventListeners() {
      // 
    }

    _removeEventListeners() {
      //
    }

    _clearLayout() {
      this._element.style.zIndex = '';
      this._element.style.right = 'auto';
      this._element.style.left = 'auto';
      this._element.style.webkitTransform = '';
      this._element.style.transform = '';
    }

    openMenu(options = {}) {
      this._state = CollapseMode.OPENED_STATE;
      this.layout();
    }

    closeMenu(options = {}) {
      this._state = CollapseMode.CLOSED_STATE;
      this.layout();
    }
  }

  class SplitterSideElement extends ons._BaseElement {

    get page() {
      return this._page;
    }

    get mode() {
      this._mode;
    }

    _getModeStrategy() {
      if (this._mode === COLLAPSE_MODE) {
        return this._collapseMode;
      } else if (this._mode === SPLIT_MODE) {
        return this._splitMode;
      } else {
        return null;
      }
    }

    createdCallback() {
      this._mode = null;
      this._page = null;
      this._attached = false;

      this._boundOnOrientationChange = this._onOrientationChange.bind(this);
      this._boundOnResize = this._onResize.bind(this);

      this._collapseMode = new CollapseMode(this);
      this._splitMode = new SplitMode(this);
      this._cancelModeDetection = () => {};

      this._updateMode(SPLIT_MODE);

      this._updateForWidthAttribute();
      this._updateForSideAttribute();
      this._updateForCollapseAttribute();
    }

    /**
     * @return {Boolean}
     */
    isSwipeable() {
      return this.hasAttribute('swipeable');
    }

    _updateForCollapseAttribute() {
      if (!this.hasAttribute('collapse')) {
        this._updateMode(SPLIT_MODE);
        return;
      }

      const collapse = this.getAttribute('collapse');

      // mode change by screen orientation
      const considerOrientation = () => {
        // TODO
      };

      // mode change by media query
      const considerMediaQuery = () => {
        const query = window.matchMedia(collapse);
        this._updateMode(query.matches ? COLLAPSE_MODE : SPLIT_MODE);

        const listener = (queryList) => {
          this._updateMode(queryList.matches ? COLLAPSE_MODE : SPLIT_MODE);
        };

        const register = () => query.addListener(listener);
        const cancel = () => query.removeListener(listener);

        this._updateCollapseStrategy(register, cancel);
      };

      if (collapse === 'landscape' || collapse === 'portrait') {
        considerOrientation();
      } else {
        considerMediaQuery();
      }
    }

    _updateCollapseStrategy(register, cancel = null) {
      if (this._cancelModeDetection instanceof Function) {
        this._cancelModeDetection();
      }

      register();

      this._cancelModeDetection = cancel || (() => {});
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
      this._mode = mode;
      const currentMode = this._getModeStrategy();

      if (lastMode !== null) {
        lastMode.exitMode();
      }

      const event = new CustomEvent('modechange', {bubbles: true});
      this.dispatchEvent(event);

      currentMode.enterMode();
    }

    _layout() {
      this._getModeStrategy().layout();
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

    _getWidthPixel() {
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
     */
    open(options = {}) {
      return this._getModeStrategy().openMenu(options);
    }

    /**
     * @param {Object} [options]
     */
    close(options = {}) {
      return this._getModeStrategy().closeMenu(options);
    }

    /**
     * @param {Object} [options]
     */
    toggle(options = {}) {
      const mode = this._getModeStrategy();
      
      return mode.isOpened() ? mode.closeMenu(options) : mode.openMenu(options);
    }

    load(page) {
      // TODO
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
      }
    }

    attachedCallback() {
      this._attached = true;
      this._assertParent();

      // relayout on "orientationchange"
      // TODO
      ons.orientation.on('change', this._boundOnOrientationChange);

      // relayout on "resize"
      // TODO
      window.removeEventListener('resize', this._boundOnResize);
    }

    _assertParent() {
      const parentElementName = this.parentElement.nodeName.toLowerCase();
      if (parentElementName !== 'ons-splitter') {
        throw new Error(`"${parentElementName}" element is not allowed as parent element.`);
      }
    }

    detachedCallback() {
      this._attached = false;

      ons.orientation.off('change', this._boundOnOrientationChange);
      window.removeEventListener('resize', this._boundOnResize);
    }

    _onOrientationChange() {

    }

    _onResize() {

    }
  }

  if (!window.OnsSplitterSideElement) {
    window.OnsSplitterSideElement = document.registerElement('ons-splitter-side', {
      prototype: SplitterSideElement.prototype
    });
  }

})();
