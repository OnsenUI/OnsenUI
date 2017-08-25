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
    this.itemSize = params.itemSize || '100%';
    this.getAutoScrollRatio = ({ getAutoScrollRatio } = params) => {
      let ratio = getAutoScrollRatio && getAutoScrollRatio();
      ratio = typeof ratio === 'number' && ratio === ratio ? ratio : .5;
      if (ratio < 0.0 || ratio > 1.0) {
        throw new Error('Invalid auto-scroll-ratio ' + ratio + '. Must be between 0 and 1');
      }
      return ratio;
    };

    // Bind handlers
    this.onDragStart = this.onDragStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  init() {
    // Add classes
    this.element.classList.add('ons-swiper');
    this.target = util.findChild(this.element, '.target');
    if (!this.target) {
      throw new Error('Expected "target" element to exist before initializing Swiper.')
    }
    this.target.classList.add('ons-swiper-target');

    // Setup listeners
    this._gestureDetector = new GestureDetector(this.target, { dragMinDistance: 1, dragLockToAxis: true });
    this._mutationObserver = new MutationObserver(() => this.refresh());
    this.updateSwipeable(true);
    this.updateAutoRefresh(true);
    this.resizeOn();

    // Setup initial layout
    this._scroll = this._offset = this._lastActiveIndex = 0;
    this._updateLayout();
    this._setupInitialIndex();
    setImmediate(() => this._setupInitialIndex());

    // Fix rendering glitch on Android 4.1
    if (this.offsetHeight === 0) {
      setImmediate(() => this.refresh());
    }
  }

  dispose() {
    this.updateSwipeable(false);
    this._gestureDetector.dispose();
    this._gestureDetector = null;

    this.updateAutoRefresh(false);
    this._mutationObserver = null;

    this.resizeOff();
  }

  onResize() {
    const i = this._scroll / this.targetSize;
    this._reset();
    this.setActiveIndex(i);
    this.refresh();
  }

  get itemCount() {
    return this.target.children.length;
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

    if (!matches) {
      throw new Error(`Invalid state: swiper's size unit must be '%' or 'px'`);
    }

    const value = parseInt(matches[1], 10);
    return matches[2] === '%' ? Math.round(value / 100 * this.targetSize) : value;
  }

  _setupInitialIndex() {
    this._reset();
    this._lastActiveIndex = Math.max(Math.min(this.initialIndex, this.itemCount), 0);
    this._scroll = this._offset + this.itemNumSize * this._lastActiveIndex;
    this._scrollTo(this._scroll);
  }

  setActiveIndex(index, options = {}) {
    index = Math.max(0, Math.min(index, this.itemCount - 1));
    this._scroll = Math.max(0, Math.min(this.maxScroll, this._offset + this.itemNumSize * index));
    return this._scrollTo(this._scroll, { ...options, postchange: true });
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
        ? this._mutationObserver.observe(this.target, { childList: true })
        : this._mutationObserver.disconnect();
    }
  }

  updateItemSize(newSize) {
    this.itemSize = newSize || '100%';
    this.refresh();
  }

  tryPostChange() {
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
    event.gesture.preventDefault();
    this._scrollTo(this._scroll - this._getDelta(event));
  }

  onDragEnd(event) {
    this._started = false;
    if (!event.gesture || this._ignoreDrag) {
      return;
    }

    event.stopPropagation();
    event.gesture.preventDefault();

    this._scroll = this._scroll - this._getDelta(event);

    if (!this._isOverScrolling(this._scroll)) {
      this._startMomentumScroll(event);
    } else {
      const direction = this.isVertical() ? (this._scroll <= 0 ? 'up' : 'down') : (this._scroll <= 0 ? 'left' : 'right');
      if (!this.overScrollHook({ direction, killOverscroll: this._killOverScroll.bind(this) })) {
        this._killOverScroll();
      }
    }
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
        }, options.animation  === 'none' ? {} :  options.animationOptions)
        .play(() => {
          options.callback instanceof Function && options.callback();
          options.postchange && this.tryPostChange();
          resolve();
        });
    });
  }

  _startMomentumScroll(event) {
    const duration = 0.3;
    const velocity = duration * 100 * this._getVelocity(event);
    this._scroll = this._getAutoScroll(this._scroll + velocity * (Math.sign(this._getDelta(event)) || 1));

    this._scrollTo(this._scroll, { postchange: true, animationOptions: { duration, timing: 'cubic-bezier(.1, .7, .1, 1)' } });
  }

  _getAutoScroll(scroll) {
    const max = this.maxScroll,
      offset = this._offset,
      size = this.itemNumSize;

    if (!this.isAutoScrollable()) {
      return Math.max(0, Math.min(max, scroll));
    }

    let arr = [];
    for (let i = 0, s = offset; s < max; s = ++i * size + offset) {
      arr.push(s);
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

  _isOverScrolling(scroll) {
    return scroll < 0 || scroll > this.maxScroll;
  }

  _killOverScroll() {
    this._scroll = this._scroll < 0 ? 0 : this.maxScroll;
    this._scrollTo(this._scroll, { postchange: true, animationOptions: { duration: .4, timing: 'cubic-bezier(.1, .4, .1, 1)' } });
  }

  _reset() {
    this._targetSize = this._itemNumSize = undefined;
  }

  refresh() {
    this._reset();
    this._updateLayout();

    this._isOverScrolling(this._scroll)
      ? this._killOverScroll()
      : this._scrollTo(this.isAutoScrollable() ? this._getAutoScroll(this._scroll) : this._scroll);

    this.refreshHook();
  }

  get targetSize() {
    if (!this._targetSize) {
      this._targetSize = this.target.getBoundingClientRect()[this.dM.size];
    }
    return this._targetSize;
  }

  _getDelta(event) {
    return event.gesture[`delta${this.dM.axis}`];
  }

  _getVelocity(event) {
    return event.gesture[`velocity${this.dM.axis}`];
  }

  _getTransform(scroll) {
    return `translate3d(${this.dM.t3d[0]}${-scroll}${this.dM.t3d[1]})`;
  }

  _updateLayout() {
    this.dM = directionMap[this.isVertical() ? 'vertical' : 'horizontal'];
    this.target.classList.toggle('ons-swiper-target--vertical', this.isVertical());

    for (let c = this.target.children[0]; c; c = c.nextElementSibling) {
      c.style[this.dM.size] = this.itemSize;
    }

    if (this.isCentered()) {
      this._offset = (this.targetSize - this.itemNumSize) / -2 || 0;
    }
  }
}

