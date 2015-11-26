describe('OnsCarouselElement', () => {
  let carousel;

  beforeEach(() => {
    carousel = ons._util.createElement(`
      <ons-carousel>
      <ons-carousel-item>Item 1</ons-carousel-item>
      <ons-carousel-item>Item 2</ons-carousel-item>
      <ons-carousel-item>Item 3</ons-carousel-item>
      </ons-carosel>
    `);
    document.body.appendChild(carousel);
  });

  afterEach(() => {
    carousel.remove();
    carousel = null;
  });

  it('should exist', () => {
    expect(window.OnsCarouselElement).to.be.ok;
  });

  it('provides \'modifier\' attribute', () => {
    carousel.setAttribute('modifier', 'hoge');
    expect(carousel.classList.contains('carousel--hoge')).to.be.true;

    carousel.setAttribute('modifier', ' foo bar');
    expect(carousel.classList.contains('carousel--foo')).to.be.true;
    expect(carousel.classList.contains('carousel--bar')).to.be.true;
    expect(carousel.classList.contains('carousel--hoge')).not.to.be.true;

    carousel.classList.add('carousel--piyo');
    carousel.setAttribute('modifier', 'fuga');
    expect(carousel.classList.contains('carousel--piyo')).to.be.true;
    expect(carousel.classList.contains('carousel--fuga')).to.be.true;
  });

  describe('#_onResize()', () => {
    it('fires \'refresh\' event', () => {
      var promise = new Promise((resolve) =>
        carousel.addEventListener('refresh', resolve)
      );

      carousel._onResize();
      return expect(promise).to.eventually.be.fulfilled;
    });
  });

  describe('#_onDirectionChange()', () => {
    it('is fired when the \'direction\' attribute is changed', () => {
      let spy = chai.spy.on(carousel, '_onDirectionChange');
      carousel.setAttribute('direction', 'vertical');
      carousel.setAttribute('direction', 'horizontal');
      expect(spy).to.have.been.called.twice;
    });
  });

  describe('#_saveLastState()', () => {
    it('saves the last state', () => {
      delete carousel._lastState;
      carousel._saveLastState();
      expect(carousel._lastState).to.be.ok;
    });
  });

  describe('#_getCarouselItemSize()', () => {
    it('returns the \'item-width\' attribute if horizontal', () => {
      carousel.setAttribute('direction', 'horizontal');
      carousel.setAttribute('item-width', '10px');
      expect(carousel._getCarouselItemSize()).to.equal(10);
    });

    it('returns the \'item-height\' attribute if vertical', () => {
      carousel.setAttribute('direction', 'vertical');
      carousel.setAttribute('item-height', '10px');
      expect(carousel._getCarouselItemSize()).to.equal(10);
    });
  });

  describe('#_getInitialIndex()', () => {
    it('returns 0 by default', () => {
      expect(carousel._getInitialIndex()).to.equal(0);
    });

    it('return the \'initial-index\' attribute', () => {
      carousel.setAttribute('initial-index', '2');
      expect(carousel._getInitialIndex()).to.equal(2);
    });
  });

  describe('#setSwipeable()', () => {
    it('can set the \'swipeable\' attribute', () => {
      expect(carousel.hasAttribute('swipeable')).to.be.false;
      carousel.setSwipeable(true);
      expect(carousel.hasAttribute('swipeable')).to.be.true;
    });

    it('can remove the \'swipeable\' attribute', () => {
      carousel.setAttribute('swipeable', '');
      carousel.setSwipeable(false);
      expect(carousel.hasAttribute('swipeable')).to.be.false;
    });
  });

  describe('#isSwipeable()', () => {
    it('returns \'false\' if carousel is not swipeable', () => {
      expect(carousel.isSwipeable()).to.be.false;
    });

    it('returns \'true\' if carousel is swipeable', () => {
      carousel.setSwipeable(true);
      expect(carousel.isSwipeable()).to.be.true;
    });
  });

  describe('#setAutoScrollRatio()', () => {
    it('only accepts values between 0.0 and 1.0', () => {
      expect(() => carousel.setAutoScrollRatio(-1)).to.throw(Error);
      expect(() => carousel.setAutoScrollRatio('2.0')).to.throw(Error);
      expect(() => carousel.setAutoScrollRatio(1.01)).to.throw(Error);
      expect(() => carousel.setAutoScrollRatio(-0.01)).to.throw(Error);
      expect(() => carousel.setAutoScrollRatio(1.0)).not.to.throw(Error);
      expect(() => carousel.setAutoScrollRatio(0.0)).not.to.throw(Error);
      expect(() => carousel.setAutoScrollRatio(0.5)).not.to.throw(Error);
      expect(() => carousel.setAutoScrollRatio(1)).not.to.throw(Error);
      expect(() => carousel.setAutoScrollRatio(0)).not.to.throw(Error);
    });

    it('can set the \'auto-scroll-ratio\' attribute', () => {
      expect(carousel.hasAttribute('auto-scroll-ratio')).to.be.false;
      carousel.setAutoScrollRatio(0.5);
      expect(carousel.hasAttribute('auto-scroll-ratio')).to.be.true;
      expect(carousel.getAttribute('auto-scroll-ratio')).to.equal('0.5');
    });
  });

  describe('#getAutoScrollRatio()', () => {
    it('returns \'0.5\' by default', () => {
      expect(carousel.getAutoScrollRatio()).to.equal(0.5);
    });

    it('throws an error if the \'auto-scroll-ratio\' attribute is invalid', () => {
      carousel.setAttribute('auto-scroll-ratio', '2.0');
      expect(() => carousel.getAutoScrollRatio()).to.throw(Error);
    });

    it('returns the value of the \'auto-scroll-ratio\' attribute', () => {
      carousel.setAttribute('auto-scroll-ratio', '0.7');
      expect(carousel.getAutoScrollRatio()).to.equal(0.7);
    });
  });

  describe('#setActiveCarouselItemIndex()', () => {
    it('should change the current active index', () => {
      expect(carousel.getActiveCarouselItemIndex()).to.equal(0);
      carousel.setActiveCarouselItemIndex(1);
      expect(carousel.getActiveCarouselItemIndex()).to.equal(1);
    });

    it('should force to maximum index', () => {
      carousel.setActiveCarouselItemIndex(100);
      expect(carousel.getActiveCarouselItemIndex()).to.equal(2);
    });

    it('should fire \'postchange\' event', () => {
      var promise = new Promise((resolve) =>
        carousel.addEventListener('postchange', resolve)
      );

      carousel.setActiveCarouselItemIndex(1);
      return expect(promise).to.eventually.be.fulfilled;
    });
  });

  describe('#getActiveCarouselItemIndex()', () => {
    it('should return the active item index', () => {
      expect(carousel.getActiveCarouselItemIndex()).to.equal(0);
      carousel.setActiveCarouselItemIndex(1);
      expect(carousel.getActiveCarouselItemIndex()).to.equal(1);
    });
  });

  describe('#next()', () => {
    it('should increase the current index', () => {
      expect(carousel.getActiveCarouselItemIndex()).to.equal(0);
      carousel.next();
      expect(carousel.getActiveCarouselItemIndex()).to.equal(1);
    });
  });

  describe('#prev()', () => {
    it('should decrease the current index', () => {
      carousel.next();
      expect(carousel.getActiveCarouselItemIndex()).to.equal(1);
      carousel.prev();
      expect(carousel.getActiveCarouselItemIndex()).to.equal(0);
    });
  });

  describe('#setAutoScrollEnabled()', () => {
    it('can set the \'auto-scroll\' attribute', () => {
      expect(carousel.hasAttribute('auto-scroll')).to.be.false;
      carousel.setAutoScrollEnabled(true);
      expect(carousel.hasAttribute('auto-scroll')).to.be.true;
    });

    it('can remove the \'auto-scroll\' attribute', () => {
      carousel.setAttribute('auto-scroll', '');
      carousel.setAutoScrollEnabled(false);
      expect(carousel.hasAttribute('auto-scroll')).to.be.false;
    });
  });

  describe('#isAutoScrollEnabled()', () => {
    it('returns \'true\' if \'auto-scroll\' attribute exists', () => {
      expect(carousel.isAutoScrollEnabled()).to.be.false;
    });

    it('returns \'false\' if \'auto-scroll\' attribute does not exists', () => {
      carousel.setAttribute('auto-scroll', '');
      expect(carousel.isAutoScrollEnabled()).to.be.true;
    });
  });

  describe('#setDisabled()', () => {
    it('can set the \'disabled\' attribute', () => {
      expect(carousel.hasAttribute('disabled')).to.be.false;
      carousel.setDisabled(true);
      expect(carousel.hasAttribute('disabled')).to.be.true;
    });

    it('can remove the \'disabled\' attribute', () => {
      carousel.setAttribute('disabled', '');
      carousel.setDisabled(false);
      expect(carousel.hasAttribute('disabled')).to.be.false;
    });
  });

  describe('#isDisabled()', () => {
    it('returns \'true\' if \'disabled\' attribute exists', () => {
      expect(carousel.isDisabled()).to.be.false;
    });

    it('returns \'false\' if \'disabled\' attribute does not exists', () => {
      carousel.setAttribute('disabled', '');
      expect(carousel.isDisabled()).to.be.true;
    });
  });

  describe('#setOverscrollable()', () => {
    it('can set the \'overscrollable\' attribute', () => {
      expect(carousel.hasAttribute('overscrollable')).to.be.false;
      carousel.setOverscrollable(true);
      expect(carousel.hasAttribute('overscrollable')).to.be.true;
    });

    it('can remove the \'overscrollable\' attribute', () => {
      carousel.setAttribute('overscrollable', '');
      carousel.setOverscrollable(false);
      expect(carousel.hasAttribute('overscrollable')).to.be.false;
    });
  });

  describe('#isOverscrollable()', () => {
    it('returns \'true\' if \'overscrollable\' attribute exists', () => {
      expect(carousel.isOverscrollable()).to.be.false;
    });

    it('returns \'false\' if \'overscrollable\' attribute does not exists', () => {
      carousel.setAttribute('overscrollable', '');
      expect(carousel.isOverscrollable()).to.be.true;
    });
  });

  describe('#_isEnabledChangeEvent()', () => {
    it('should be true if auto scroll is enabled', () => {
      carousel.setAutoScrollEnabled(true);
      expect(carousel._isEnabledChangeEvent()).to.be.true;
    });

    it('should be false if auto scroll is not enabled', () => {
      expect(carousel._isEnabledChangeEvent()).to.be.false;
    });
  });

  describe('#refresh()', () => {
    it('fires \'refresh\' event', () => {
      let promise = new Promise((resolve) =>
        carousel.addEventListener('refresh', resolve)
      );

      carousel.refresh();

      return expect(promise).to.eventually.be.fulfilled;
    });

    it('renders dynamically added items', () => {
      var item = ons._util.createElement(`
        <ons-carousel-item>Item 4</ons-carousel-item>
      `);

      carousel.appendChild(item);
      expect(item.style.position).not.to.equal('absolute');
      carousel.refresh();
      expect(item.style.position).to.equal('absolute');
    });
  });

  describe('#_onDrag()', () => {
    let ev;

    beforeEach(() => {
      ev = new CustomEvent('drag');
      ev.gesture = {
        direction: 'left',
        deltaX: -10,
        velocityX: -10,
        preventDefault: () => {}
      };
    });

    it('should not work if the carousel is not swipeable', () => {
      carousel._onDrag(ev);
      expect(carousel._lastDragEvent).not.to.be.ok;
    });

    it('should not work if the direction is vertical', () => {
      ev.gesture.direction = 'up';
      carousel._onDrag(ev);
      expect(carousel._lastDragEvent).not.to.be.ok;
    });

    it('should work if carousel is swipeable and direction is horizontal', () => {
      carousel.setAttribute('swipeable', '');
      carousel._onDrag(ev);
      expect(carousel._lastDragEvent).to.be.ok;
    });
  });

  describe('#_onDragEnd()', () => {
    let ev;

    beforeEach(() => {
      ev = new CustomEvent('drag');
      ev.gesture = {
        direction: 'left',
        deltaX: -10,
        velocityX: -10,
        preventDefault: () => {}
      };
    });

    it('should not work if carousel is not swipeable', () => {
      carousel._onDragEnd(ev);
      expect(carousel._scroll).to.equal(0);
    });

    it('should work if carousel is swipeable', () => {
      carousel.setSwipeable(true);
      carousel._onDragEnd(ev);
      expect(carousel._scroll).to.not.equal(0);
    });

    it('should call \'_scrollToKillOverScroll\' if overscrolled', () => {
      carousel.setOverscrollable(true);
      carousel.setSwipeable(true);

      ev.gesture.deltaX = 10;
      ev.gesture.velocityX = 10;

      let spy = chai.spy.on(carousel, '_scrollToKillOverScroll');
      carousel._onDragEnd(ev);
      expect(spy).to.be.called.once;
    });
  });

  describe('#_getCarouselItemElements()', () => {
    it('returns the carousel item elements', () => {
      let rv = carousel._getCarouselItemElements();

      expect(rv.length).to.equal(3);

      for (let i = 0; i < rv.length; i++) {
        expect(rv[i]).to.be.an.instanceof(OnsCarouselItemElement);
      }
    });

    it('doesn\'t return the items in child carousels (issue #844)', () => {
      let carousel = ons._util.createElement(`
        <ons-carousel>
          <ons-carousel-item>
            <ons-carousel>
              <ons-carousel-item>
              </ons-carousel-item>
            </ons-carousel>
          </ons-carousel-item>
        </ons-carousel>
      `);

      let rv = carousel._getCarouselItemElements();
      expect(rv.length).to.equal(1);
    });
  });

  describe('#_startMomentumScroll()', () => {
    let ev;

    beforeEach(() => {
      carousel.setAttribute('auto-scroll', '');
      ev = new CustomEvent('drag');
      ev.gesture = {
        direction: 'left',
        deltaX: 0,
        velocityX: 100000,
        preventDefault: () => {}
      };
    });

    afterEach(() => {
      carousel.removeAttribute('auto-scroll');
    });

    it('should change the scroll value', () => {
      carousel.setSwipeable(true);

      let scroll = carousel._scroll;

      carousel._lastDragEvent = ev;
      carousel._startMomentumScroll(ev);

      expect(carousel._scroll).not.to.equal(scroll);
    });
  });

  describe('#first()', () => {
    it('sets the current index to 0', () => {
      carousel.setActiveCarouselItemIndex(2);
      expect(carousel.getActiveCarouselItemIndex()).to.equal(2);
      carousel.first();
      expect(carousel.getActiveCarouselItemIndex()).to.equal(0);
    });
  });

  describe('#last()', () => {
    it('sets the current index to the last position', () => {
      expect(carousel.getActiveCarouselItemIndex()).to.equal(0);
      carousel.last();
      expect(carousel.getActiveCarouselItemIndex()).to.equal(2);
    });
  });
});

