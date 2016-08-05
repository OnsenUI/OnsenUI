'use strict';

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

  describe('#_updateSwipeable()', () => {
    it('attaches and removes listeners', () => {
      const spyOn = chai.spy.on(carousel._gestureDetector, 'on'),
        spyOff = chai.spy.on(carousel._gestureDetector, 'off');

      carousel.setAttribute('swipeable', '');
      expect(spyOn).to.have.been.called.at.least.once;

      carousel.removeAttribute('swipeable');
      expect(spyOff).to.have.been.called.at.least.once;
    });
  });

  describe('#_updateAutoRefresh()', () => {
    it('starts and stops observing', () => {
      const spyOn = chai.spy.on(carousel._mutationObserver, 'observe'),
        spyOff = chai.spy.on(carousel._mutationObserver, 'disconnect');

      carousel.setAttribute('auto-scroll', '');
      expect(spyOn).to.have.been.called.at.least.once;

      carousel.removeAttribute('auto-scroll');
      expect(spyOff).to.have.been.called.at.least.once;
    });
  });

  describe('auto-refresh', () => {
    it('calls refresh on appendChild', () => {
      const spy = chai.spy.on(carousel, 'refresh');
      carousel.setAttribute('auto-scroll', '');
      carousel.appendChild(ons._util.createElement('<ons-carousel-item>Item X</ons-carousel-item>'));
      expect(spy).to.have.been.called.at.least.once;
    });

    it('calls refresh on innerHTML change', () => {
      const spy = chai.spy.on(carousel, 'refresh');
      carousel.setAttribute('auto-scroll', '');
      carousel.innerHTML += '<ons-carousel-item>Item X</ons-carousel-item>';
      expect(spy).to.have.been.called.at.least.once;
    });
  });

  describe('#_onResize()', () => {
    it('fires \'refresh\' event', () => {
      const promise = new Promise((resolve) =>
        carousel.addEventListener('refresh', resolve)
      );

      carousel._onResize();
      return expect(promise).to.eventually.be.fulfilled;
    });
  });

  describe('#_onDirectionChange()', () => {
    it('is fired when the \'direction\' attribute is changed', () => {
      const spy = chai.spy.on(carousel, '_onDirectionChange');
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

  describe('#set autoScrollRatio()', () => {
    it('only accepts values between 0.0 and 1.0', () => {
      expect(() => carousel.autoScrollRatio = -1).to.throw(Error);
      expect(() => carousel.autoScrollRatio = '2.0').to.throw(Error);
      expect(() => carousel.autoScrollRatio = 1.01).to.throw(Error);
      expect(() => carousel.autoScrollRatio = -0.01).to.throw(Error);
      expect(() => carousel.autoScrollRatio = 1.0).not.to.throw(Error);
      expect(() => carousel.autoScrollRatio = 0.0).not.to.throw(Error);
      expect(() => carousel.autoScrollRatio = 0.5).not.to.throw(Error);
      expect(() => carousel.autoScrollRatio = 1).not.to.throw(Error);
      expect(() => carousel.autoScrollRatio = 0).not.to.throw(Error);
    });

    it('can set the \'auto-scroll-ratio\' attribute', () => {
      expect(carousel.hasAttribute('auto-scroll-ratio')).to.be.false;
      carousel.autoScrollRatio = 0.5;
      expect(carousel.hasAttribute('auto-scroll-ratio')).to.be.true;
      expect(carousel.getAttribute('auto-scroll-ratio')).to.equal('0.5');
    });
  });

  describe('#get autoScrollRatio', () => {
    it('returns \'0.5\' by default', () => {
      expect(carousel.autoScrollRatio).to.equal(0.5);
    });

    it('throws an error if the \'auto-scroll-ratio\' attribute is invalid', () => {
      carousel.setAttribute('auto-scroll-ratio', '2.0');
      expect(() => carousel.autoScrollRatio).to.throw(Error);
    });

    it('returns the value of the \'auto-scroll-ratio\' attribute', () => {
      carousel.setAttribute('auto-scroll-ratio', '0.7');
      expect(carousel.autoScrollRatio).to.equal(0.7);
    });
  });

  describe('#setActiveIndex()', () => {
    it('should change the current active index', () => {
      expect(carousel.getActiveIndex()).to.equal(0);
      carousel.setActiveIndex(1);
      expect(carousel.getActiveIndex()).to.equal(1);
    });

    it('should force to maximum index', () => {
      carousel.setActiveIndex(100);
      expect(carousel.getActiveIndex()).to.equal(2);
    });

    it('should fire \'postchange\' event', () => {
      const promise = new Promise((resolve) =>
        carousel.addEventListener('postchange', resolve)
      );

      carousel.setActiveIndex(1);
      return expect(promise).to.eventually.be.fulfilled;
    });

    it('returns a promise that resolves to the element', () => {
      return expect(carousel.setActiveIndex(1)).to.be.eventually.fulfilled.then(element => {
        expect(element).to.equal(carousel);
        expect(element.getActiveIndex()).to.equal(1);
      });
    });
  });

  describe('#getActiveIndex()', () => {
    it('should return the active item index', () => {
      expect(carousel.getActiveIndex()).to.equal(0);
      carousel.setActiveIndex(1);
      expect(carousel.getActiveIndex()).to.equal(1);
    });
  });

  describe('#next()', () => {
    it('should increase the current index', () => {
      expect(carousel.getActiveIndex()).to.equal(0);
      carousel.next();
      expect(carousel.getActiveIndex()).to.equal(1);
    });
  });

  describe('#prev()', () => {
    it('should decrease the current index', () => {
      carousel.next();
      expect(carousel.getActiveIndex()).to.equal(1);
      carousel.prev();
      expect(carousel.getActiveIndex()).to.equal(0);
    });
  });


  describe('#_isEnabledChangeEvent()', () => {
    it('should be true if auto scroll is enabled', () => {
      carousel.autoScroll = true;
      expect(carousel._isEnabledChangeEvent()).to.be.true;
    });

    it('should be false if auto scroll is not enabled', () => {
      expect(carousel._isEnabledChangeEvent()).to.be.false;
    });
  });

  describe('#refresh()', () => {
    it('fires \'refresh\' event', () => {
      const promise = new Promise((resolve) =>
        carousel.addEventListener('refresh', resolve)
      );

      carousel.refresh();

      return expect(promise).to.eventually.be.fulfilled;
    });

    it('renders dynamically added items', () => {
      const item = ons._util.createElement(`
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
    let ev, last;

    beforeEach(() => {
      ev = new CustomEvent('drag');
      ev.gesture = {
        direction: 'left',
        deltaX: -10,
        velocityX: -10,
        preventDefault: () => {}
      };
      last = new CustomEvent('drag');
      last.gesture = {
        direction: 'left',
        deltaX: -2,
        velocityX: -2,
        preventDefault: () => {}
      };
    });

    it('should work if carousel is swipeable', () => {
      carousel.swipeable = true;
      carousel._lastDragEvent = last;
      carousel._onDragEnd(ev);
      expect(carousel._lastDragEvent).not.to.be.ok;
    });

    it('should call \'_scrollToKillOverScroll\' if overscrolled', () => {
      carousel.overscrollable = true;
      carousel.swipeable = true;

      ev.gesture.deltaX = 10;
      ev.gesture.velocityX = 10;

      const spy = chai.spy.on(carousel, '_scrollToKillOverScroll');
      carousel._lastDragEvent = last;
      carousel._onDragEnd(ev);
      expect(spy).to.be.called.once;
    });
  });

  describe('#_getCarouselItemElements()', () => {
    it('returns the carousel item elements', () => {
      const rv = carousel._getCarouselItemElements();

      expect(rv.length).to.equal(3);

      for (let i = 0; i < rv.length; i++) {
        expect(rv[i]).to.be.an.instanceof(OnsCarouselItemElement);
      }
    });

    it('doesn\'t return the items in child carousels (issue #844)', () => {
      const carousel = ons._util.createElement(`
        <ons-carousel>
          <ons-carousel-item>
            <ons-carousel>
              <ons-carousel-item>
              </ons-carousel-item>
            </ons-carousel>
          </ons-carousel-item>
        </ons-carousel>
      `);

      const rv = carousel._getCarouselItemElements();
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
      carousel.swipeable = true;

      const scroll = carousel._scroll;

      carousel._lastDragEvent = ev;
      carousel._startMomentumScroll(ev);

      expect(carousel._scroll).not.to.equal(scroll);
    });
  });

  describe('#first()', () => {
    it('sets the current index to 0', () => {
      carousel.setActiveIndex(2);
      expect(carousel.getActiveIndex()).to.equal(2);
      carousel.first();
      expect(carousel.getActiveIndex()).to.equal(0);
    });
  });

  describe('#last()', () => {
    it('sets the current index to the last position', () => {
      expect(carousel.getActiveIndex()).to.equal(0);
      carousel.last();
      expect(carousel.getActiveIndex()).to.equal(2);
    });
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = `
        <ons-carousel>
        <ons-carousel-item>Item 1</ons-carousel-item>
        <ons-carousel-item>Item 2</ons-carousel-item>
        <ons-carousel-item>Item 3</ons-carousel-item>
        </ons-carosel>
      `;
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });
});

