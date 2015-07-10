let LazyRepeatProvider = ons._internal.LazyRepeatProvider,
  LazyRepeatDelegate = ons._internal.LazyRepeatDelegate;

class DummyLazyRepeatDelegate extends LazyRepeatDelegate {
  prepareItem(index, done) {
    done({
      element: ons._util.createElement(`<div>Item ${index}</div>`)
    });
  }

  countItems() {
    return 1000;
  }

  updateItem(index, item) {
  }

  calculateItemHeight(index) {
    return 44;
  }

  destroyItem(index, item) {
    item.element.remove();
    item.element = undefined;
  }

  destroy() {
  }
}

describe('LazyRepeatDelegate', () => {
  describe('#prepareItem()', () => {
    it('should throw an error', () => {
      let lazyRepeatDelegate = new LazyRepeatDelegate();
      expect(() => lazyRepeatDelegate.prepareItem()).to.throw(Error);
    });
  });

  describe('#countItems()', () => {
    it('should throw an error', () => {
      let lazyRepeatDelegate = new LazyRepeatDelegate();
      expect(() => lazyRepeatDelegate.countItems()).to.throw(Error);
    });
  });

  describe('#updateItem()', () => {
    it('should throw an error', () => {
      let lazyRepeatDelegate = new LazyRepeatDelegate();
      expect(() => lazyRepeatDelegate.updateItem()).to.throw(Error);
    });
  });

  describe('#calculateItemHeight()', () => {
    it('should throw an error', () => {
      let lazyRepeatDelegate = new LazyRepeatDelegate();
      expect(() => lazyRepeatDelegate.calculateItemHeight()).to.throw(Error);
    });
  });

  describe('#destroyItem()', () => {
    it('should throw an error', () => {
      let lazyRepeatDelegate = new LazyRepeatDelegate();
      expect(() => lazyRepeatDelegate.destroyItem()).to.throw(Error);
    });
  });

  describe('#destroy()', () => {
    it('should throw an error', () => {
      let lazyRepeatDelegate = new LazyRepeatDelegate();
      expect(() => lazyRepeatDelegate.destroy()).to.throw(Error);
    });
  });
});

describe('LazyRepeatProvider', () => {
  let delegate, template, page, wrapper, provider;

  beforeEach(() => {
    delegate = new DummyLazyRepeatDelegate();
    template = document.createElement('div');

    page = ons._util.createElement(`
      <ons-page>
        <div id="wrapper"></div>
      </ons-page>
    `);

    wrapper = page.querySelector('#wrapper');

    document.body.appendChild(page);

    provider = new LazyRepeatProvider(wrapper, template, delegate);
  });

  afterEach(() => {
    template.remove();
    wrapper.remove();
    page.remove();

    delegate = template = page = wrapper = provider = null;
  });

  describe('#constructor()', () => {
    it('throws error if \'delegate\' is not a LazyRepeatDelegate', () => {
      expect(() => new LazyRepeatProvider(wrapper, template, 'hoge')).to.throw(Error);
      expect(() => new LazyRepeatProvider(wrapper, template, delegate)).not.to.throw(Error);
    });

    it('throws error if \'templateElement\' is not an Element', () => {
      expect(() => new LazyRepeatProvider(wrapper, 'hoge', delegate)).to.throw(Error);
      expect(() => new LazyRepeatProvider(wrapper, template, delegate)).not.to.throw(Error);
    });

    it('throws error if \'wrapperElement\' is not an Element', () => {
      expect(() => new LazyRepeatProvider('hoge', template, delegate)).to.throw(Error);
      expect(() => new LazyRepeatProvider(wrapper, template, delegate)).not.to.throw(Error);
    });

    it('throws error if \'wrapperElement\' is not a descendant of OnsPageElement', () => {
      let wrapper = document.createElement('div');
      expect(() => new LazyRepeatProvider(wrapper, template, delegate)).to.throw(Error);
    });
  });

  describe('#_countItems()', () => {
    it('should return the number of items', () => {
      expect(provider._countItems()).to.equal(1000);
    });
  });

  describe('#_getItemHeight()', () => {
    it('should return the item height', () => {
      expect(provider._getItemHeight(0)).to.equal(44);
      expect(provider._getItemHeight(99)).to.equal(44);
    });
  });

  describe('#_getTopOffset()', () => {
    it('should return the top of the wrapper element', () => {
      expect(provider._getTopOffset()).to.equal(wrapper.offsetTop);
    });
  });

  describe('#_onChange()', () => {
    it('should call \'_render()\'', (done) => {
      let spy = chai.spy.on(provider, '_render');

      provider._onChange();

      // Must wait 200ms since it's already called by constructor.
      setTimeout(() => {
        expect(spy).to.be.called.once;
        done();
      }, 200);
    });

    it('should only call \'_render()\' once every 200ms', (done) => {
      let spy = chai.spy.on(provider, '_render');

      provider._onChange();
      provider._onChange();

      setTimeout(() => {
        expect(spy).to.be.called.once;
        done();
      }, 200);
    });
  });

  describe('#_render()', () => {
    // TODO: Write tests.
  });

  describe('#_isRendered()', () => {
    it('should return true if an item is rendered', () => {
      expect(provider._isRendered(0)).to.be.true;
    });

    it('should return false if an item is not rendered', () => {
      expect(provider._isRendered(1000)).to.be.false;
    });
  });
});
