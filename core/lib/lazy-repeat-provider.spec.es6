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

    page = ons._util.createElement(`
      <ons-page>
        <ons-list>
          <ons-list-item></ons-list-item>
        </ons-list>
      </ons-page>
    `);

    wrapper = page.querySelector('ons-list');
    template = wrapper.querySelector('ons-list-item');

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
      var topOffset = provider._wrapperElement.getBoundingClientRect().top;
      expect(provider._getTopOffset()).to.equal(topOffset);
    });
  });

  describe('#_onChange()', () => {
    it('should call \'_render()\'', () => {
      let spy = chai.spy.on(provider, '_render');
      provider._onChange();
      expect(spy).to.have.been.called.once;
    });
  });

  describe('#_render()', () => {
    it('should remove items that are not in view', () => {
      expect(provider._renderedItems.hasOwnProperty(0)).to.be.true;

      var pageContent = page.querySelector('.page__content');
      pageContent.scrollTop = 10000;

      provider._render();
      expect(provider._renderedItems.hasOwnProperty(0)).to.be.false;
    });
  });

  describe('#_isRendered()', () => {
    it('should return true if an item is rendered', () => {
      expect(provider._isRendered(0)).to.be.true;
    });

    it('should return false if an item is not rendered', () => {
      expect(provider._isRendered(1000)).to.be.false;
    });
  });

  describe('#_renderElement()', () => {
    it('should call \'updateItem()\' if it is already rendered', () => {
      let spy = chai.spy.on(delegate, 'updateItem');
      provider._renderElement({index: 0, top: 0});
      expect(spy).to.have.been.called.once;
    });

    it('should call \'prepareItem()\' if it is not already rendered', () => {
      let spy = chai.spy.on(delegate, 'prepareItem');
      provider._renderElement({index: 1000, top: 0});
      expect(spy).to.have.been.called.once;
    });
  });

  describe('#_removeElement()', () => {
    it('should not do anything if the element is not rendered', () => {
      let spy = chai.spy.on(delegate, 'destroyItem');
      provider._removeElement(1000);
      expect(spy).not.to.have.been.called();
    });

    it('should call \'destroyItem()\' if the element is rendered', () => {
      let spy = chai.spy.on(delegate, 'destroyItem');
      provider._removeElement(0);
      expect(spy).to.have.been.called.once;
    });
  });

  describe('#_removeAllElements', () => {
    it('should remove all elements', () => {
      expect(Object.keys(provider._renderedItems).length).not.to.equal(0);
      provider._removeAllElements();
      expect(Object.keys(provider._renderedItems).length).to.equal(0);
    });
  });

  describe('#destroy()', () => {
    it('should call the \'destroy()\' method', () => {
      var spy = chai.spy.on(delegate, 'destroy');
      provider.destroy();
      expect(spy).to.have.been.called.once;
    });
  });
});
