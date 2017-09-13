'use strict';

describe('Swiper', () => {
  let element, swiper;
  const TRUE = () => true;
  const FALSE = () => false;

  beforeEach((done) => {
    element = ons.createElement(`
      <div class="swiper">
        <div style="width: 100%; height: 300px">
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </div>
        <div></div>
      </div>
    `);
    document.body.appendChild(element);
    swiper = new window.ons._internal.Swiper({ getElement: () => element, getAutoScrollRatio: r => r });
    swiper.init();

    setImmediate(done);
  });

  afterEach(() => {
    element.remove();
    swiper.dispose();
    element = swiper = null;
  });

  it('should exist', () => {
    expect(window.ons._internal.Swiper).to.be.ok;
  });

  describe('#updateSwipeable()', () => {
    it('attaches and removes listeners', () => {
      const spyOn = chai.spy.on(swiper._gestureDetector, 'on'),
        spyOff = chai.spy.on(swiper._gestureDetector, 'off');

      swiper.updateSwipeable(true);
      expect(spyOn).to.have.been.called.at.least.once;

      swiper.updateSwipeable(false);
      expect(spyOff).to.have.been.called.at.least.once;
    });
  });

  describe('#_canConsumeGesture()', () => {
    it('ignores wrong unuseful swipes', () => {
      const canConsume = (direction, value) => expect(swiper._canConsumeGesture({direction})).to.equal(value);

      swiper.setActiveIndex(0);
      canConsume('right', false);
      canConsume('left', true);

      swiper.isOverScrollable = TRUE;
      canConsume('right', true);
      canConsume('left', true);

      swiper.setActiveIndex(swiper.itemCount - 1);
      canConsume('right', true);
      canConsume('left', true);

      swiper.isOverScrollable = FALSE;
      canConsume('right', true);
      canConsume('left', false);

      swiper.setActiveIndex(swiper.getActiveIndex() - 1);
      canConsume('right', true);
      canConsume('left', true);
    });
  });

  describe('#updateAutoRefresh()', () => {
    it('starts and stops observing', () => {
      const spyOn = chai.spy.on(swiper._mutationObserver, 'observe'),
        spyOff = chai.spy.on(swiper._mutationObserver, 'disconnect');

      swiper.updateAutoRefresh(true);
      expect(spyOn).to.have.been.called.at.least.once;

      swiper.updateAutoRefresh(false);
      expect(spyOff).to.have.been.called.at.least.once;
    });
  });

  describe('auto-refresh', () => {
    it('calls refresh on appendChild', () => {
      const spy = chai.spy.on(swiper, 'refresh');
      swiper.isAutoScrollable = TRUE;
      swiper.updateAutoRefresh(true);
      const child = ons.createElement('<div>Item X</div>');
      swiper.target.appendChild(child);
      expect(spy).to.have.been.called.at.least.once;
    });

    it('calls refresh on innerHTML change', () => {
      const spy = chai.spy.on(swiper.target, 'refresh');
      swiper.isAutoScrollable = TRUE;
      swiper.updateAutoRefresh(true);
      swiper.target.innerHTML += '<div>Item X</div>';
      expect(spy).to.have.been.called.at.least.once;
    });
  });

  describe('#onResize()', () => {
    it('calls \'refresh\' hook', () => {
      const spy = chai.spy.on(swiper, 'refreshHook');
      swiper.onResize();
      return expect(spy).to.have.been.called.once;
    });
  });

  describe('#getAutoScrollRatio()', () => {
    it('only accepts values between 0.0 and 1.0', () => {
      expect(() => swiper.getAutoScrollRatio(-1)).to.throw(Error);
      expect(() => swiper.getAutoScrollRatio(1.01)).to.throw(Error);
      expect(() => swiper.getAutoScrollRatio(-0.01)).to.throw(Error);

      expect(() => swiper.getAutoScrollRatio(1.0)).not.to.throw(Error);
      expect(() => swiper.getAutoScrollRatio(0.0)).not.to.throw(Error);
      expect(() => swiper.getAutoScrollRatio(0.5)).not.to.throw(Error);
      expect(() => swiper.getAutoScrollRatio(1)).not.to.throw(Error);
      expect(() => swiper.getAutoScrollRatio(0)).not.to.throw(Error);

      // Fallbacks to default value
      expect(() => swiper.getAutoScrollRatio('2.0')).not.to.throw(Error);
      expect(() => swiper.getAutoScrollRatio(null)).not.to.throw(Error);
      expect(() => swiper.getAutoScrollRatio(NaN)).not.to.throw(Error);
    });

    it('uses \'0.5\' by default', () => {
      expect(swiper.getAutoScrollRatio()).to.equal(0.5);
    });
  });

  describe('#setActiveIndex()', () => {
    it('should change the current active index', () => {
      expect(swiper.getActiveIndex()).to.equal(0);
      swiper.setActiveIndex(1);
      expect(swiper.getActiveIndex()).to.equal(1);
    });

    it('should force to maximum index', () => {
      swiper.setActiveIndex(100);
      expect(swiper.getActiveIndex()).to.equal(2);
    });

    it('calls change hooks', () => {
      const deferred = ons._util.defer();
      const spy = chai.spy.on(swiper, 'preChangeHook');

      swiper.postChangeHook = () => {
        expect(spy).to.have.been.called.once;
        deferred.resolve();
      };

      swiper.setActiveIndex(1);
      return expect(deferred.promise).to.eventually.be.fulfilled;
    });

    it('returns a promise', () => {
      return swiper.setActiveIndex(1).then(() => expect(swiper.getActiveIndex()).to.equal(1));
    });

    it('can be canceled during prechange', () => {
      swiper.preChangeHook = () => true;
      const spy = chai.spy.on(swiper, 'preChangeHook');

      return expect(swiper.setActiveIndex(1, { reject: true })).to.eventually.be.rejected.then(() => {
        expect(spy).to.have.been.called.once;
        expect(swiper.getActiveIndex()).to.equal(0);
      });
    });
  });

  describe('#getActiveIndex()', () => {
    it('should return the active index', () => {
      expect(swiper.getActiveIndex()).to.equal(0);
      swiper.setActiveIndex(1);
      expect(swiper.getActiveIndex()).to.equal(1);
    });
  });

  describe('#refresh()', () => {
    it('calls \'refresh\' hook', () => {
      const spy = chai.spy.on(swiper, 'refreshHook');
      swiper.refresh();
      return expect(spy).to.have.been.called.once;
    });

    it('renders dynamically added items', () => {
      const item = ons.createElement(`
        <div>Item 4</div>
      `);
      swiper.target.appendChild(item);
      item.style.width = '10px';
      expect(item.style.width).not.to.equal('100%');
      swiper.refresh();
      expect(item.style.width).to.equal('100%');
    });

    it('updates layout parameters on direction change', () => {
      expect(swiper.dM.axis).to.equal('X');
      expect(swiper.dM.size).to.equal('Width');
      swiper.isVertical = TRUE;
      swiper.refresh();
      expect(swiper.dM.axis).to.equal('Y');
      expect(swiper.dM.size).to.equal('Height');
    });
  });

  describe('#onDrag()', () => {
    let ev, spy;

    beforeEach(() => {
      ev = new CustomEvent('drag');
      ev.gesture = {
        direction: 'left',
        deltaTime: 50,
        deltaX: -10,
        velocityX: -10,
        preventDefault: () => {}
      };

      spy = chai.spy.on(swiper, '_scrollTo');
    });

    it('should not work if the direction is vertical', () => {
      ev.gesture.direction = 'up';
      swiper.onDragStart(ev);
      swiper.onDrag(ev);
      expect(spy).not.to.have.been.called;
    });

    it('should work if it is swipeable, direction is horizontal and is started', () => {
      swiper.onDragStart(ev);
      swiper.onDrag(ev);
      expect(spy).to.have.been.called.once;
    });
  });

  describe('#onDragEnd()', () => {
    let ev, spy;

    beforeEach(() => {
      ev = new CustomEvent('drag');
      ev.gesture = {
        direction: 'left',
        deltaTime: 50,
        deltaX: 10,
        velocityX: 10,
        preventDefault: () => {}
      };

      spy = chai.spy.on(swiper, '_scrollTo');
    });

    it('should work if it is swipeable, is started and continued', () => {
      const spy = chai.spy.on(swiper, '_changeTo');
      swiper.onDragStart(ev);
      swiper.onDrag(ev);
      swiper.onDragEnd(ev);
      expect(spy).to.have.been.called.once;
    });

    it('should call \'_killOverScroll\' if overscrolled', () => {
      swiper.isOverScrollable = TRUE;
      const spy = chai.spy.on(swiper, '_killOverScroll');
      swiper.onDragStart(ev);
      swiper.onDrag(ev);
      swiper.onDragEnd(ev);
      expect(spy).to.be.called.once;
    });
  });

  describe('#itemCount', () => {
    it('returns the amount of item', () => {
      expect(swiper.itemCount).to.equal(3);
    });
  });

  describe('#itemNumSize', () => {
    it('returns the correct numeric size', () => {
      swiper.itemSize = '80px';
      expect(swiper._calculateItemSize()).to.equal(80);

      swiper.itemSize = '5em';
      expect(() => swiper._calculateItemSize()).to.throw(Error);
      swiper.itemSize = '20%';
      expect(() => swiper._calculateItemSize()).not.to.throw(Error);
    });
  });

  describe('#_startMomentumScroll()', () => {
    it('should change the scroll value', () => {
      swiper.isAutoScrollable = TRUE;

      const ev = new CustomEvent('drag');
      ev.gesture = {
        direction: 'left',
        deltaX: 0,
        velocityX: 100000,
        preventDefault: () => {}
      };

      const fullScroll = document.body.offsetWidth;
      swiper._startMomentumScroll(2/3 * fullScroll, ev);
      expect(swiper._scroll).to.equal(fullScroll);
    });
  });
});

