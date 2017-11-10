import util from '../util';
import platform from '../platform';
import animit from '../animit';
import GestureDetector from '../gesture-detector';

const directionMap = {
  vertical: {
    axis: 'Y',
    size: 'Height',
    dir: ['up', 'down'],
    t3d: ['0px, ', 'px, 0px']
  },
  horizontal: {
    axis: 'X',
    size: 'Width',
    dir: ['left', 'right'],
    t3d: ['', 'px, 0px, 0px']
  }
};

export default class Swiper {
  constructor(params) {
    // Parameters
    const FALSE = (() => false);
    `getInitialIndex getBubbleWidth isVertical isOverScrollable isCentered
    isAutoScrollable refreshHook preChangeHook postChangeHook overScrollHook`
      .split(/\s+/)
      .forEach(key => this[key] = params[key] || FALSE);

    this.getElement = params.getElement; // Required
    this.scrollHook = params.scrollHook; // Optional
    this.itemSize = params.itemSize || '100%';

    this.getAutoScrollRatio = (...args) => {
      let ratio = params.getAutoScrollRatio && params.getAutoScrollRatio(...args);
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

  init({ swipeable, autoRefresh } = {}) {
    this.initialized = true;
    this.target = this.getElement().children[0];
    this.blocker = this.getElement().children[1];
    if (!this.target || !this.blocker) {
      throw new Error('Expected "target" and "blocker" elements to exist before initializing Swiper.');
    }

    // Add classes
    this.getElement().classList.add('ons-swiper');
    this.target.classList.add('ons-swiper-target');
    this.blocker.classList.add('ons-swiper-blocker');

    // Setup listeners
    this._gestureDetector = new GestureDetector(this.getElement(), { dragMinDistance: 1, dragLockToAxis: true });
    this._mutationObserver = new MutationObserver(() => this.refresh());
    this.updateSwipeable(swipeable);
    this.updateAutoRefresh(autoRefresh);

    // Setup initial layout
    this._scroll = this._offset = this._lastActiveIndex = 0;
    this._updateLayout();
    this._setupInitialIndex();
    setImmediate(() => this.initialized && this._setupInitialIndex());

    // Fix rendering glitch on Android 4.1
    if (this.offsetHeight === 0) {
      setImmediate(() => this.refresh());
    }
  }

  dispose() {
    this.initialized = false;
    this.updateSwipeable(false);
    this.updateAutoRefresh(false);

    this._gestureDetector && this._gestureDetector.dispose();
    this.target = this.blocker = this._gestureDetector = this._mutationObserver = null;

    this.setupResize(false);
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
    this._lastActiveIndex = Math.max(Math.min(Number(this.getInitialIndex()), this.itemCount), 0);
    this._scroll = this._offset + this.itemNumSize * this._lastActiveIndex;
    this._scrollTo(this._scroll);
  }

  setActiveIndex(index, options = {}) {
    index = Math.max(0, Math.min(index, this.itemCount - 1));
    const scroll = Math.max(0, Math.min(this.maxScroll, this._offset + this.itemNumSize * index));

    if (platform.isUIWebView()) {
      /* Dirty fix for #2231(https://github.com/OnsenUI/OnsenUI/issues/2231). begin */
      const concat = arrayOfArray => Array.prototype.concat.apply([], arrayOfArray);
      const contents = concat(
        util.arrayFrom(this.target.children).map(page => {
          return util.arrayFrom(page.children)
            .filter(child => child.classList.contains('page__content'));
        })
      );

      const map = new Map();
      return (
        new Promise(resolve => {
          contents.forEach(content => {
            map.set(content, content.getAttribute('class'));
            content.classList.add('page__content--suppress-layer-creation')
          });
          requestAnimationFrame(resolve);
        })
        .then(() => this._changeTo(scroll, options))
        .then(() => new Promise(resolve => {
          contents.forEach(content => {
            content.setAttribute('class', map.get(content));
          });
          requestAnimationFrame(resolve);
        }))
      );
      /* end */
    } else {
      return this._changeTo(scroll, options);
    }
  }

  getActiveIndex(scroll = this._scroll) {
    scroll -= this._offset;
    const count = this.itemCount,
      size = this.itemNumSize;

    if (scroll <= 0) {
      return 0;
    }

    for (let i = 0; i < count; i++) {
      if (size * i <= scroll && size * (i + 1) > scroll) {
        return i;
      }
    }

    return count - 1;
  }

  setupResize(add) {
    window[(add ? 'add' : 'remove') + 'EventListener']('resize', this.onResize, true);
  }

  show() {
    this.setupResize(true);
    this.onResize();
  }

  hide() {
    this.setupResize(false);
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

  toggleBlocker(block) {
    this.blocker.style.pointerEvents = block ? 'auto' : 'none';
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
    this._ignoreDrag = event.consumed || !util.isValidGesture(event);

    if (!this._ignoreDrag) {
      const consume = event.consume;
      event.consume = () => { consume && consume(); this._ignoreDrag = true; };

      if (this._canConsumeGesture(event.gesture)) {
        const startX = event.gesture.center && event.gesture.center.clientX || 0,
          distFromEdge = this.getBubbleWidth() || 0,
          start = () => {
            consume && consume();
            event.consumed = true;
            this._started = true; // Avoid starting drag from outside
            this.toggleBlocker(true);
            util.preventScroll(this._gestureDetector);
          };

        // Let parent elements consume the gesture or consume it right away
        startX < distFromEdge || startX > (this.targetSize - distFromEdge)
          ? setImmediate(() => !this._ignoreDrag && start())
          : start();
      }
    }
  }

  onDrag(event) {
    if (!event.gesture || this._ignoreDrag || !this._started) {
      return;
    }

    this._continued = true; // Fix for random 'dragend' without 'drag'
    event.stopPropagation();

    this._scrollTo(this._scroll - this._getDelta(event), { throttle: true });
  }

  onDragEnd(event) {
    this._started = false;
    if (!event.gesture || this._ignoreDrag || !this._continued) {
      this._ignoreDrag = true; // onDragEnd might fire before onDragStart's setImmediate
      return;
    }

    this._continued = false;
    event.stopPropagation();

    const scroll = this._scroll - this._getDelta(event);
    const normalizedScroll = this._normalizeScroll(scroll);
    scroll === normalizedScroll ? this._startMomentumScroll(scroll, event) : this._killOverScroll(normalizedScroll);
    this.toggleBlocker(false);
  }

  _startMomentumScroll(scroll, event) {
    const velocity = this._getVelocity(event),
      matchesDirection = event.gesture.interimDirection === this.dM.dir[this._getDelta(event) < 0 ? 0 : 1];

    const nextScroll = this._getAutoScroll(scroll, velocity, matchesDirection);
    let duration = Math.abs(nextScroll - scroll) / (velocity + 0.01) / 1000;
    duration = Math.min(.25, Math.max(.1, duration));

    this._changeTo(nextScroll, { swipe: true, animationOptions: { duration, timing: 'cubic-bezier(.4, .7, .5, 1)' } });
  }

  _killOverScroll(scroll) {
    this._scroll = scroll;
    const direction = this.dM.dir[Number(scroll > 0)];
    const killOverScroll = () => this._changeTo(scroll, { animationOptions: { duration: .4, timing: 'cubic-bezier(.1, .4, .1, 1)' } });
    this.overScrollHook({ direction, killOverScroll }) || killOverScroll();
  }

  _changeTo(scroll, options = {}) {
    const e = { activeIndex: this.getActiveIndex(scroll), lastActiveIndex: this._lastActiveIndex, swipe: options.swipe || false };
    const change = e.activeIndex !== e.lastActiveIndex;
    const canceled = change ? this.preChangeHook(e) : false;

    this._scroll = canceled ? this._offset + e.lastActiveIndex * this.itemNumSize : scroll;
    this._lastActiveIndex = canceled ? e.lastActiveIndex : e.activeIndex;

    return this._scrollTo(this._scroll, options).then(() => {
      if (scroll === this._scroll && !canceled) {
        change && this.postChangeHook(e);
      } else if (options.reject) {
        return Promise.reject('Canceled');
      }
    });
  }

  _scrollTo(scroll, options = {}) {
    if (options.throttle) {
      const ratio = 0.35;
      if (scroll < 0) {
        scroll = this.isOverScrollable() ? Math.round(scroll * ratio) : 0;
      } else {
        const maxScroll = this.maxScroll;
        if (maxScroll < scroll) {
          scroll = this.isOverScrollable() ? maxScroll + Math.round((scroll - maxScroll) * ratio) : maxScroll;
        }
      }
    }

    const opt = options.animation  === 'none' ? {} : options.animationOptions;
    this.scrollHook && this.itemNumSize > 0 && this.scrollHook((scroll / this.itemNumSize).toFixed(2), options.animationOptions || {});

    return new Promise(resolve =>
      animit(this.target)
        .queue({ transform: this._getTransform(scroll) }, opt)
        .play(resolve)
    );
  }

  _getAutoScroll(scroll, velocity, matchesDirection) {
    const max = this.maxScroll,
      offset = this._offset,
      size = this.itemNumSize;

    if (!this.isAutoScrollable()) {
      return Math.max(0, Math.min(max, scroll));
    }

    let arr = [];
    for (let s = offset; s < max; s += size) {
      arr.push(s);
    }
    arr.push(max);

    arr = arr
      .sort((left, right) => Math.abs(left - scroll) - Math.abs(right - scroll))
      .filter((item, pos) => !pos || item !== arr[pos - 1]);

    let result = arr[0];
    const lastScroll = this._lastActiveIndex * size + offset;
    const scrollRatio = Math.abs(scroll - lastScroll) / size;

    if (scrollRatio <= this.getAutoScrollRatio(matchesDirection, velocity, size)) {
      result = lastScroll;
    } else {
      if (scrollRatio < 1.0 && arr[0] === lastScroll && arr.length > 1) {
        result = arr[1];
      }
    }
    return Math.max(0, Math.min(max, result));
  }

  _reset() {
    this._targetSize = this._itemNumSize = undefined;
  }

  _normalizeScroll(scroll) {
    return Math.max( Math.min(scroll, this.maxScroll), 0)
  }

  refresh() {
    this._reset();
    this._updateLayout();

    const scroll = this._normalizeScroll(this._scroll);
    scroll !== this._scroll ? this._killOverScroll(scroll) : this._changeTo(scroll);

    this.refreshHook();
  }

  get targetSize() {
    if (!this._targetSize) {
      this._targetSize = this.target[`offset${this.dM.size}`];
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
      c.style[this.dM.size.toLowerCase()] = this.itemSize;
    }

    if (this.isCentered()) {
      this._offset = (this.targetSize - this.itemNumSize) / -2 || 0;
    }
  }
}

