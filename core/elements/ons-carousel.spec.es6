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

