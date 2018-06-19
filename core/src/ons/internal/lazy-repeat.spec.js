import { LazyRepeatProvider, LazyRepeatDelegate } from './lazy-repeat';

describe('LazyRepeatDelegate', () => {
  let userDelegate, delegate;

  beforeEach(() => {
    userDelegate = {};
    delegate = new LazyRepeatDelegate(userDelegate);
  });


  describe('#constructor()', () => {
    it('requires userDelegate to be an _actual_ object', () => {
      expect(() => new LazyRepeatDelegate()).to.throw(Error);
      expect(() => new LazyRepeatDelegate('')).to.throw(Error);
      expect(() => new LazyRepeatDelegate(null)).to.throw(Error);
      expect(() => new LazyRepeatDelegate(1234)).to.throw(Error);
      expect(() => new LazyRepeatDelegate([])).to.not.throw(Error);
      expect(() => new LazyRepeatDelegate({})).to.not.throw(Error);
    });
  });

  describe('#loadItemElement()', () => {
    const done = () => 42;

    it('throws an error when there is no function to call', () => {
      expect(() => delegate.loadItemElement(0, done)).to.throw(Error);
    });

    it('works when defined later', () => {
      expect(() => delegate.loadItemElement(0, done)).to.throw(Error);
      userDelegate.createItemContent = () => document.createElement('div');
      expect(() => delegate.loadItemElement(0, done)).to.not.throw(Error);
      userDelegate.createItemContent = null;
      expect(() => delegate.loadItemElement(0, done)).to.throw(Error);
    });
  });

  describe('#countItems()', () => {
    it('throws an error', () => {
      expect(() => delegate.countItems()).to.throw(Error);
    });
  });

  describe('#calculateItemHeight()', () => {
    it('should return zero on undefined userDelegate.calculateItemHeight()', () => {
      expect(delegate.calculateItemHeight()).to.equal(0);
    });
  });

  describe('#updateItem()', () => {
    it('doesn\'t throw an error', () => {
      expect(() => delegate.updateItem()).to.not.throw(Error);
    });
  });

  describe('#destroyItem()', () => {
    it('doesn\'t throw an error', () => {
      expect(() => delegate.destroyItem()).to.not.throw(Error);
    });
  });

  describe('#destroy()', () => {
    it('doesn\'t throw an error', () => {
      expect(() => delegate.destroy()).to.not.throw(Error);
    });
  });
});

describe('LazyRepeatProvider', () => {
  let delegate, template, page, wrapper, provider;

  beforeEach(() => {
    delegate = new LazyRepeatDelegate({
      createItemContent: i => ons._util.createElement(`<ons-list-item>Item ${i}</ons-list-item>`),
      countItems: () => 1000,
      calculateItemHeight: () => 44
    });

    page = ons._util.createElement(`
      <ons-page>
        <ons-list></ons-list>
      </ons-page>
    `);

    wrapper = page.querySelector('ons-list');

    document.body.appendChild(page);

    provider = new LazyRepeatProvider(wrapper, delegate);
  });

  afterEach(() => {
    wrapper.remove();
    page.remove();

    delegate = page = wrapper = provider = null;
  });

  describe('#constructor()', () => {
    it('throws error if \'delegate\' is not a LazyRepeatDelegate', () => {
      expect(() => new LazyRepeatProvider(wrapper, 'hoge')).to.throw(Error);
      expect(() => new LazyRepeatProvider(wrapper, delegate)).not.to.throw(Error);
    });

    it('throws error if \'wrapperElement\' is not an Element', () => {
      expect(() => new LazyRepeatProvider('hoge', delegate)).to.throw(Error);
      expect(() => new LazyRepeatProvider(wrapper, delegate)).not.to.throw(Error);
    });

    it('throws error if \'wrapperElement\' is not a descendant of OnsPageElement', () => {
      const wrapper = document.createElement('div');
      expect(() => new LazyRepeatProvider(wrapper, delegate)).to.throw(Error);
    });
  });

  describe('#_countItems()', () => {
    it('returns the number of items', () => {
      expect(provider._countItems()).to.equal(1000);
    });
  });

  describe('#_getItemHeight()', () => {
    it('returns the item height', () => {
      const itemsIndex = Object.keys(provider._renderedItems);
      expect(provider._getItemHeight(+(itemsIndex[0]))).to.equal(44);
      expect(provider._getItemHeight(+(itemsIndex[itemsIndex.length - 1]))).to.equal(44);
    });
  });

  describe('#_onChange()', () => {
    it('calls \'_render()\'', () => {
      const spy = chai.spy.on(provider, '_render');
      provider._onChange();
      expect(spy).to.have.been.called.once;
    });
  });

  describe('#refresh()', () => {
    it('calls _render with forceScrollDown set to true', () => {
      // _render takes an object as an argument, but chai-spies only compares directly,
      // so the usual expect to.have.been.called.with can't be used. Instead, the _render
      // function is mocked and the arguments are checked in there.
      chai.spy.on(provider, '_render', forceRender => {
        expect(forceRender.forceScrollDown).to.be.true;
      });

      provider.refresh();
    });

    it('calls _render with forceFirstIndex set to correct index', () => {
      chai.spy.on(provider, '_firstItemRendered', () => 47);
      chai.spy.on(provider, '_render', forceRender => {
        expect(forceRender.forceFirstIndex).to.equal(47);
      });

      provider.refresh();
    });

    it('should remove all elements', () => {
      chai.spy.on(provider, '_removeAllElements');

      provider.refresh();
      expect(provider._removeAllElements).to.have.been.called;
    });
  });

  describe('#_render()', () => {
    it('removes items that are not in view', () => {
      expect(provider._renderedItems.hasOwnProperty(0)).to.be.true;

      const pageContent = page.querySelector('.page__content');
      pageContent.scrollTop = 10000;
      provider._render();
      pageContent.scrollTop = 10000;
      provider._render();
      expect(provider._renderedItems.hasOwnProperty(0)).to.be.false;
    });
  });

  describe('#_renderElement()', () => {
    it('calls \'updateItem()\' if it is already rendered', () => {
      const spy = chai.spy.on(delegate, 'updateItem');
      provider._renderElement(0);
      expect(spy).to.have.been.called.once;
    });

    it('calls \'loadItemElement()\' if it is not already rendered', () => {
      const spy = chai.spy.on(delegate, 'loadItemElement');
      provider._renderElement(1000);
      expect(spy).to.have.been.called.once;
    });
  });

  describe('#_removeElement()', () => {
    it('calls \'destroyItem()\'', () => {
      const spy = chai.spy.on(delegate, 'destroyItem');
      provider._removeElement(0);
      expect(spy).to.have.been.called.once;
    });
  });

  describe('#_removeAllElements', () => {
    it('removes all elements', () => {
      expect(Object.keys(provider._renderedItems).length).not.to.equal(0);
      provider._removeAllElements();
      expect(Object.keys(provider._renderedItems).length).to.equal(0);
    });
  });

  describe('#destroy()', () => {
    it('calls the \'destroy()\' method', () => {
      const spy = chai.spy.on(delegate, 'destroy');
      provider.destroy();
      expect(spy).to.have.been.called.once;
    });
  });
});
