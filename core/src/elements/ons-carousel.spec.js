'use strict';

describe('OnsCarouselElement', () => {
  let carousel;

  beforeEach((done) => {
    carousel = ons._util.createElement(`
      <ons-carousel style="width: 100%; height: 300px">
        <ons-carousel-item>Item 1</ons-carousel-item>
        <ons-carousel-item>Item 2</ons-carousel-item>
        <ons-carousel-item>Item 3</ons-carousel-item>
      </ons-carousel>
    `);
    document.body.appendChild(carousel);
    setImmediate(done); // wait for `refresh` event triggered by connectedCallback
  });

  afterEach(() => {
    carousel.remove();
    carousel = null;
  });

  it('should exist', () => {
    expect(window.ons.CarouselElement).to.be.ok;
  });

  it('compiles', () => {
    expect(carousel.children.length).to.equal(1);
    expect(carousel.children[0].children.length).to.equal(3);
  });

  describe('attribute swipeable', () => {
    it('updates Swiper', () => {
      const spy = chai.spy.on(carousel._swiper, 'updateSwipeable');

      carousel.setAttribute('swipeable', '');
      expect(spy).to.have.been.called.with(true);

      carousel.removeAttribute('swipeable');
      expect(spy).to.have.been.called.with(false);
    });
  });

  describe('attribute auto-refresh', () => {
    it('updates Swiper', () => {
      const spy = chai.spy.on(carousel._swiper, 'updateAutoRefresh');

      carousel.setAttribute('auto-refresh', '');
      expect(spy).to.have.been.called.with(true);

      carousel.removeAttribute('auto-refresh');
      expect(spy).to.have.been.called.with(false);
    });
  });

  describe('attribute item-width', () => {
    it('updates Swiper if it is vertical', () => {
      const spy = chai.spy.on(carousel._swiper, 'updateItemSize');

      // Horizontal
      carousel.setAttribute('item-width', '10px');
      expect(spy).to.have.been.called.with('10px');
      carousel.removeAttribute('item-width');
      expect(spy).to.have.been.called.with('100%');

      // Vertical
      carousel.setAttribute('direction', 'vertical');
      carousel.setAttribute('item-width', '10px');
      expect(spy).not.to.have.been.called;
      carousel.removeAttribute('item-width');
      expect(spy).not.to.have.been.called;
    });
  });

  describe('attribute item-height', () => {
    it('updates Swiper if it is vertical', () => {
      const spy = chai.spy.on(carousel._swiper, 'updateItemSize');

      // Horizontal
      carousel.setAttribute('item-height', '10px');
      expect(spy).not.to.have.been.called;
      carousel.removeAttribute('item-height');
      expect(spy).not.to.have.been.called;

      // Vertical
      carousel.setAttribute('direction', 'vertical');
      carousel.setAttribute('item-height', '10px');
      expect(spy).to.have.been.called.with('10px');
      carousel.removeAttribute('item-height');
      expect(spy).to.have.been.called.with('100%');
    });
  });

  describe('attribute direction', () => {
    it('updates Swiper', () => {
      const spy = chai.spy.on(carousel._swiper, 'refresh');
      carousel.setAttribute('direction', 'vertical');
      expect(spy).to.have.been.called.once;
    });
  });

  describe('auto-refresh', () => {
    it('appends children inside target element and refreshes', () => {
      const spy = chai.spy.on(carousel._swiper, 'refresh');
      carousel.setAttribute('auto-scroll', '');
      carousel.appendChild(ons.createElement('<ons-carousel-item>Item X</ons-carousel-item>'));
      expect(spy).to.have.been.called.at.least.once;
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

    it('should fire change events', () => {
      const p = name => new Promise(resolve => carousel.addEventListener(name, resolve));
      const promises = Promise.all([p('prechange'), p('postchange')])
      carousel.setActiveIndex(1);
      return expect(promises).to.eventually.be.fulfilled;
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

  describe('#refresh()', () => {
    it('fires \'refresh\' event', () => {
      const promise = new Promise((resolve) =>
        carousel.addEventListener('refresh', resolve)
      );

      carousel.refresh();

      return expect(promise).to.eventually.be.fulfilled;
    });

    it('renders dynamically added items', () => {
      const item = ons.createElement(`<ons-carousel-item>Item 4</ons-carousel-item>`);
      item.style.width = '10px';
      carousel.appendChild(item);
      expect(item.style.width).not.to.equal('100%');
      carousel.refresh();
      expect(item.style.width).to.equal('100%');
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

