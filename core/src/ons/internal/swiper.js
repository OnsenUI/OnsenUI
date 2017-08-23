import util from '../util';
import animit from '../animit';
import GestureDetector from '../gesture-detector';

const directionMap = {
  vertical: {
    axis: 'Y',
    size: 'height',
    t3d: ['0px, ', 'px, 0px']
  },
  horizontal: {
    axis: 'X',
    size: 'width',
    t3d: ['', 'px, 0px, 0px']
  }
};

export default class SwipeReveal {
  constructor(params) {
    const NOOP = (() => {});

    // Parameters
    this.element = params.element;
    this.initialIndex = Number(params.initialIndex) || 0;
    this.isVertical = params.isVertical || NOOP;
    this.isOverScrollable = params.isOverScrollable || NOOP;
    this.isCentered = params.isCentered || NOOP;
    this.isAutoScrollable = params.isAutoScrollable || NOOP;
    this.refreshHook = params.refreshHook || NOOP;
    this.preChangeHook = params.preChangeHook || NOOP;
    this.postChangeHook = params.postChangeHook || NOOP;
    this.overScrollHook = params.overScrollHook || NOOP;
    this.getAutoScrollRatio = params.getAutoScrollRatio || (() => .5);
    this.itemSize = params.itemSize || '100%';

    // Setup interanl variables
    this._scroll = 0;
    this._offset = 0;
    this._lastActiveIndex = 0;

    // Bind handlers
    this.onDragStart = this.onDragStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onResize = this.onResize.bind(this);

    // Update directional traits
    this._updateDirections();
  }

  init() {
    this.element.classList.add('ons-swiper');
    this.target = util.findChild(this.element, '.target');
    if (!this.target) {
      throw new Error('Expected "target" element to exist before initializing Swiper.')
    }
    this.target.classList.add('ons-swiper-target');

    this._prepareEventListeners();
    this._setup();
    this._setupInitialIndex();
    setImmediate(() => this._setupInitialIndex());

    // Fix rendering glitch on Android 4.1
    if (this.offsetHeight === 0) {
      setImmediate(() => this.refresh());
    }
  }

  dispose() {
    this._gestureDetector.dispose();
    this._gestureDetector = null;

    this._mutationObserver.disconnect();
    this._mutationObserver = null;

    this.resizeOff();
  }

  onResize() {
    const i = this._scroll / this.targetSize;
    this._targetSize = undefined; // Reset
    this.setActiveIndex(i);
    this.refresh();
  }

  get itemCount() {
    return this.target.children.length;
  }

  _getNumericItemSize() {
    const sizeAttr = this.itemSize;
    const sizeInfo = this._decomposeSizeString(sizeAttr);
    const elementSize = this._getTargetSize();

    if (sizeInfo.unit === '%') {
      return Math.round(sizeInfo.number / 100 * elementSize);
    } else if (sizeInfo.unit === 'px') {
      return sizeInfo.number;
    } else {
      throw new Error('Invalid state');
    }
  }

  get itemNumSize() {
    if (typeof this._itemNumSize !== 'number' || this._itemNumSize !== this._itemNumSize) {
      this._itemNumSize = this._calculateItemSize();
    }
    return this._itemNumSize;
  }

  get maxScroll() {
    const max = this.itemCount * this.itemNumSize - this.targetSize;
    return Math.ceil(max < 0 ? 0 : max); // Need to return an integer value.
  }

  _calculateItemSize() {
    const matches = this.itemSize.match(/^(\d+)(px|%)/);
    const value = parseInt(matches[1], 10);
    const unit = matches[2];

    switch (unit) {
      case '%':
        return Math.round(value / 100 * this.targetSize);
      case 'px':
        return value;
    }

    throw new Error(`Invalid state: swiper's size unit must be '%' or 'px'`);
  }

  _setupInitialIndex() {
    this._targetSize = this._itemNumSize = undefined;
    this._lastActiveIndex = Math.max(Math.min(this.initialIndex, this.itemCount), 0);
    this._scroll = this._offset + this.itemNumSize * this._lastActiveIndex;
    this._scrollTo(this._scroll);
  }

  setActiveIndex(index, options = {}) {
    index = Math.max(0, Math.min(index, this.itemCount - 1));
    const scroll = this._offset + this.itemNumSize * index;
    const max = this.maxScroll;

    this._scroll = Math.max(0, Math.min(max, scroll));
    return this._scrollTo(this._scroll, options).then(() => this.tryPostchange());
  }

  getActiveIndex() {
    const scroll = this._scroll - this._offset,
      count = this.itemCount,
      size = this.itemNumSize;

    if (scroll < 0) {
      return 0;
    }

    for (let i = 0; i < count; i++) {
      if (size * i <= scroll && size * (i + 1) > scroll) {
        return i;
      }
    }

    return count - 1;
  }

  resizeOn() {
    window.addEventListener('resize', this.onResize, true);
  }

  resizeOff() {
    window.removeEventListener('resize', this.onResize, true);
  }

  _prepareEventListeners() {
    this._gestureDetector = new GestureDetector(this.target, {
      dragMinDistance: 1,
      dragLockToAxis: true
    });
    this._mutationObserver = new MutationObserver(() => this.refresh());

    this.updateSwipeable(true);
    this.updateAutoRefresh();

    this.resizeOn();
  }

  updateSwipeable(shouldUpdate) {
    if (this._gestureDetector) {
      const action = shouldUpdate ? 'on' : 'off';
      this._gestureDetector[action]('drag', this.onDrag);
      this._gestureDetector[action]('dragstart', this.onDragStart);
      this._gestureDetector[action]('dragend', this.onDragEnd);
    }
  }

  updateAutoRefresh(shouldWatch) {
    if (this._mutationObserver) {
      shouldWatch
        ? this._mutationObserver.observe(this.target, {childList: true})
        : this._mutationObserver.disconnect();
    }
  }

  updateItemSize(newSize) {
    this.itemSize = newSize || '100%';
    this.refresh();
  }

  tryPostchange() {
    const activeIndex = this.getActiveIndex();
    if (this._lastActiveIndex !== activeIndex) {
      const lastActiveIndex = this._lastActiveIndex;
      this._lastActiveIndex = activeIndex;
      this.postChangeHook({ activeIndex, lastActiveIndex });
    }
  }

  _canConsumeGesture(gesture) {
    const d = gesture.direction;
    const isFirst = this._scroll === 0 && !this.isOverScrollable();
    const isLast = this._scroll === this.maxScroll && !this.isOverScrollable();

    return this.isVertical()
      ? ((d === 'down' && !isFirst) || (d === 'up' && !isLast))
      : ((d === 'right' && !isFirst) || (d === 'left' && !isLast));
  }

  onDragStart(event) {
    this._ignoreDrag = event.consumed;

    if (event.gesture && !this._ignoreDrag) {
      const consume = event.consume;
      event.consume = () => { consume && consume(); this._ignoreDrag = true; };
      if (this._canConsumeGesture(event.gesture)) {
        consume && consume();
        event.consumed = true;
        this._started = true; // Avoid starting drag from outside
      }
    }
  }

  onDrag(event) {
    if (!event.gesture || this._ignoreDrag || !this._canConsumeGesture(event.gesture) || !this._started) {
      return;
    }

    event.stopPropagation();

    const scroll = this._scroll - this._getScrollDelta(event);
    this._scrollTo(scroll);
    event.gesture.preventDefault();
  }

  onDragEnd(event) {
    this._started = false;
    if (!event.gesture || this._ignoreDrag) {
      return;
    }

    event.stopPropagation();

    this._scroll = this._scroll - this._getScrollDelta(event);

    if (this._isOverScroll(this._scroll)) {
      const direction = this.isVertical() ? (this._scroll <= 0 ? 'up' : 'down') : (this._scroll <= 0 ? 'left' : 'right');
      if (!this.overScrollHook({ direction, killOverscroll: this._killOverScroll.bind(this) })) {
        this._killOverScroll();
      }
    } else {
      this._startMomentumScroll(event);
    }

    event.gesture.preventDefault();
  }

  _updateDirections() {
    this.dM = directionMap[this.isVertical() ? 'vertical' : 'horizontal'];
  }

  _startMomentumScroll(event) {
    const duration = 0.3;
    const scrollDelta = duration * 100 * this._getScrollVelocity(event);
    this._scroll = this._getAutoScroll(this._scroll + scrollDelta * (Math.sign(this._getScrollDelta(event)) || 1));

    animit(this.target)
      .queue({
        transform: this._getTransform(this._scroll)
      }, {
        duration,
        timing: 'cubic-bezier(.1, .7, .1, 1)'
      })
      .queue(done => {
        this.tryPostchange();
        done();
      })
      .play();
  }

  _getAutoScroll(scroll) {
    const max = this.maxScroll,
      offset = this._offset,
      size = this.itemNumSize;

    if (!this.isAutoScrollable()) {
      return Math.max(0, Math.min(max, scroll));
    }

    let arr = [];
    for (let i = 0, count = this.itemCount; i < count; i++) {
      if (i * size + offset < max) {
        arr.push(i * size + offset);
      }
    }
    arr.push(max);

    arr = arr
      .sort((left, right) => Math.abs(left - scroll) - Math.abs(right - scroll))
      .filter((item, pos) => !pos || item != arr[pos - 1]);

    let result = arr[0];
    const lastScroll = this._lastActiveIndex * size + offset;
    const scrollRatio = Math.abs(scroll - lastScroll) / size;

    if (scrollRatio <= this.getAutoScrollRatio()) {
      result = lastScroll;
    } else if (scrollRatio < 1.0 && arr[0] === lastScroll && arr.length > 1) {
      result = arr[1];
    }

    return Math.max(0, Math.min(max, result));
  }

  _scrollTo(scroll, options = {}) {
    const ratio = 0.35;

    if (scroll < 0) {
      scroll = this.isOverScrollable() ? Math.round(scroll * ratio) : 0;
    } else {
      const maxScroll = this.maxScroll;
      if (maxScroll < scroll) {
        scroll = this.isOverScrollable() ? maxScroll + Math.round((scroll - maxScroll) * ratio) : maxScroll;
      }
    }

    return new Promise(resolve => {
      animit(this.target)
        .queue({
          transform: this._getTransform(scroll)
        }, options.animation  !== 'none' ? options.animationOptions : {})
        .play(() => {
          options.callback instanceof Function && options.callback();
          resolve();
        });
    });
  }

  _isOverScroll(scroll) {
    return scroll < 0 || scroll > this.maxScroll;
  }

  _killOverScroll() {
    const restoreScroll = this._scroll < 0 ? 0 : this.maxScroll;

    animit(this.target)
      .queue({
        transform: this._getTransform(restoreScroll)
      }, {
        duration: 0.4,
        timing: 'cubic-bezier(.1, .4, .1, 1)'
      })
      .queue(done => {
        this.tryPostchange();
        done();
      })
      .play();

    this._scroll = restoreScroll;
  }

  refresh() {
    this._itemNumSize = undefined; // Reset
    this._updateDirections();
    this._setup();

    let scroll = this._scroll;// - this._offset;

    if (this._isOverScroll(scroll)) {
      this._killOverScroll();
    } else {
      if (this.isAutoScrollable()) {
        scroll = this._getAutoScroll(scroll);
      }

      this._scrollTo(scroll);
    }

    this.refreshHook();
  }

  //// Directional traits

  get targetSize() {
    if (!this._targetSize) {
      const styling = window.getComputedStyle(this.target, null);
      this._targetSize = this.target.getBoundingClientRect()[this.dM.size];
    }
    return this._targetSize;
  }

  _getScrollDelta(event) {
    return event.gesture[`delta${this.dM.axis}`];
  }

  _getScrollVelocity(event) {
    return event.gesture[`velocity${this.dM.axis}`];
  }

  _getTransform(scroll) {
    return `translate3d(${this.dM.t3d[0]}${-scroll}${this.dM.t3d[1]})`;
  }

  _layoutItems() {
    for (let c = this.target.children[0]; c; c = c.nextElementSibling) {
      c.style[this.dM.size] = this.itemSize;
    }
  }

  _setup() {
    this.target.classList.toggle('ons-swiper-target--vertical', this.isVertical());
    this._layoutItems();

    if (this.isCentered()) {
      this._offset = (this.targetSize - this.itemNumSize) / -2 || 0;
    }
  }
}

