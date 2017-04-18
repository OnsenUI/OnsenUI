'use strict';

describe('OnsSpeedDialElement', () => {
  let speedDial;

  beforeEach(() => {
    speedDial = ons._util.createElement(`
      <ons-speed-dial>
        <ons-fab>
          A
        </ons-fab>
        <ons-speed-dial-item>Item 1</ons-speed-dial-item>
        <ons-speed-dial-item>Item 2</ons-speed-dial-item>
        <ons-speed-dial-item>Item 3</ons-speed-dial-item>
      </ons-speed-dial>
    `);

    document.body.appendChild(speedDial);
    speedDial.show();
  });

  afterEach(() => {
    speedDial.remove();
  });

  it('exists', () => {
    expect(window.ons.SpeedDialElement).to.be.ok;
  });

  it('provides modifier attribute', () => {
    speedDial.setAttribute('modifier', 'hoge');
    expect(speedDial.classList.contains('speed-dial--hoge')).to.be.true;

    speedDial.setAttribute('modifier', ' foo bar');
    expect(speedDial.classList.contains('speed-dial--foo')).to.be.true;
    expect(speedDial.classList.contains('speed-dial--bar')).to.be.true;
    expect(speedDial.classList.contains('speed-dial--hoge')).not.to.be.true;

    speedDial.classList.add('speed-dial--piyo');
    speedDial.setAttribute('modifier', 'fuga');
    expect(speedDial.classList.contains('speed-dial--piyo')).to.be.true;
    expect(speedDial.classList.contains('speed-dial--fuga')).to.be.true;
  });

  describe('"class" attribute', () => {
    it('should contain default class name automatically', () => {
      const element = ons._util.createElement(`
        <ons-speed-dial>
          <ons-fab>A</ons-fab>
          <ons-speed-dial-item>Item 1</ons-speed-dial-item>
        </ons-speed-dial>
      `);
      expect(element.classList.contains('speed-dial')).to.be.true;
      element.setAttribute('class', 'foo');
      expect(element.classList.contains('speed-dial')).to.be.true;
      expect(element.classList.contains('foo')).to.be.true;
    });
  });

  describe('#items', () => {
    it('should be a list of OnsSpeedDialItemElement', () => {
      expect(speedDial.items.length).to.equal(3);

      for (let i = 0; i < speedDial.items.length; i++) {
        expect(speedDial.items[i]).to.be.an.instanceof(window.ons.SpeedDialItemElement);
      }
    });
  });

  describe('#_onClick()', () => {
    it('should call #toggleItems()', () => {
      const spy = chai.spy.on(speedDial, 'toggleItems');
      return speedDial._onClick()
      .then(() => expect(spy).to.have.been.called.once);
    });
  });

  describe('#_show()', () => {
    it('does nothing if element is inline', () => {
      const spy = chai.spy.on(speedDial, 'show');
      speedDial.setAttribute('inline', '');
      return speedDial._show()
      .then(() => expect(spy).to.not.have.been.called());
    });

    it('calls show() if element is not inline', () => {
      const spy = chai.spy.on(speedDial, 'show');
      return speedDial._show()
      .then(() => expect(spy).to.have.been.called.once);
    });
  });

  describe('#_hide()', () => {
    it('does nothing if element is inline', () => {
      const spy = chai.spy.on(speedDial, 'hide');
      speedDial.setAttribute('inline', '');
      return speedDial._hide()
      .then(() => expect(spy).to.not.have.been.called());
    });

    it('calls hide() if element is not inline', () => {
      const spy = chai.spy.on(speedDial, 'hide');
      return speedDial._hide().then(() => {
        expect(spy).to.have.been.called.once;
      });
    });
  });

  describe('#_updateDirection()', () => {
    it('is called when element is created', () => {
      const spy = chai.spy.on(window.ons.SpeedDialElement.prototype, '_updateDirection');
      const speedDial = ons._util.createElement(`
          <ons-speed-dial direction="up"><ons-fab></ons-fab></ons-speed-dial>
        `);

      expect(spy).to.have.been.called.with('up');
    });

    it('is called with the value of the direction attribute', () => {
      const spy = chai.spy.on(window.ons.SpeedDialElement.prototype, '_updateDirection');
      const speedDial = ons._util.createElement(`
          <ons-speed-dial direction="down"><ons-fab></ons-fab></ons-speed-dial>
        `);

      expect(spy).to.have.been.called.with('down');
    });

    it('is called when direction changes', () => {
      const spy = chai.spy.on(speedDial, '_updateDirection');

      speedDial.setAttribute('direction', 'left');
      expect(spy).to.have.been.called.with('left');
    });

    it('sets the position of the items', () => {
      speedDial._updateDirection('left');
      speedDial._updateDirection('right');
      speedDial._updateDirection('up');
      speedDial._updateDirection('down');
    });

    it('throws an error if the argument is incorrect', () => {
      expect(() => speedDial._updateDirection('hoge')).to.throw(Error);
    });
  });

  describe('#_updatePosition()', () => {
    it('is called when the "position" attribute changes', () => {
      const spy = chai.spy.on(speedDial, '_updatePosition');

      speedDial.setAttribute('position', 'top left');
      speedDial.setAttribute('position', 'bottom left');

      expect(spy).to.have.been.called.twice;
    });

    it('adds the correct class', () => {
      speedDial.setAttribute('position', 'top right');
      expect(speedDial.classList.contains('fab--top__right')).to.be.true;

      speedDial.setAttribute('position', 'top left');
      expect(speedDial.classList.contains('fab--top__left')).to.be.true;

      speedDial.setAttribute('position', 'bottom right');
      expect(speedDial.classList.contains('fab--bottom__right')).to.be.true;

      speedDial.setAttribute('position', 'bottom left');
      expect(speedDial.classList.contains('fab--bottom__left')).to.be.true;

      speedDial.setAttribute('position', 'top center');
      expect(speedDial.classList.contains('fab--top__center')).to.be.true;

      speedDial.setAttribute('position', 'bottom center');
      expect(speedDial.classList.contains('fab--bottom__center')).to.be.true;

      speedDial.setAttribute('position', 'right top');
      expect(speedDial.classList.contains('fab--top__right')).to.be.true;

      speedDial.setAttribute('position', 'left top');
      expect(speedDial.classList.contains('fab--top__left')).to.be.true;

      speedDial.setAttribute('position', 'right bottom');
      expect(speedDial.classList.contains('fab--bottom__right')).to.be.true;

      speedDial.setAttribute('position', 'left bottom');
      expect(speedDial.classList.contains('fab--bottom__left')).to.be.true;

      speedDial.setAttribute('position', 'center top');
      expect(speedDial.classList.contains('fab--top__center')).to.be.true;

      speedDial.setAttribute('position', 'center bottom');
      expect(speedDial.classList.contains('fab--bottom__center')).to.be.true;

      expect(speedDial.classList.contains('fab-top__left')).not.to.be.true;
      expect(speedDial.classList.contains('fab-bottom__right')).not.to.be.true;
      expect(speedDial.classList.contains('fab-bottom__left')).not.to.be.true;
      expect(speedDial.classList.contains('fab-top__right')).not.to.be.true;
      expect(speedDial.classList.contains('fab-top__center')).not.to.be.true;
    });

    it('does nothing if position "attribute" is incorrect', () => {
      const oldClassList = ons._util.arrayFrom(speedDial.classList);

      speedDial.setAttribute('position', 'hoge');
      const newClassList = ons._util.arrayFrom(speedDial.classList);

      for (let i = 0; i < newClassList.length; i++) {
        expect(oldClassList[i]).to.equal(newClassList[i]);
      }

      expect(oldClassList.length).to.equal(newClassList.length);
    });
  });

  describe('#show()', () => {
    it('calls #show() on the child OnsFabElement', () => {
      const spy = chai.spy.on(speedDial.querySelector('ons-fab'), 'show');
      return speedDial.show()
      .then(() => expect(spy).to.have.been.called.once);
    });
  });

  describe('#hide()', () => {
    it('calls #hideItems()', () => {
      const spy = chai.spy.on(speedDial, 'hideItems');
      return speedDial.hide()
      .then(() => expect(spy).to.have.been.called.once);
    });

    it('eventually calls #hide() on the child OnsFabElement', () => {
      const spy = chai.spy.on(speedDial.querySelector('ons-fab'), 'hide');
      return speedDial.hide()
      .then(() => expect(spy).to.have.been.called.once);
    });
  });

  describe('#showItems()', () => {
    it('sets scale transform to 1 for all items', () => {
      return speedDial.showItems()
      .then(() => {
        for (let i = 0; i < speedDial.items; i++) {
          expect(speedDial.items[i].style.transform).to.equal('scale(1)');
        }
      })
    });
  });

  describe('#hideItems()', () => {
    it('sets scale transform to 0 for all items', () => {
      return speedDial.showItems()
      .then(() => speedDial.hideItems())
      .then(() => {
        for (let i = 0; i < speedDial.items; i++) {
          expect(speedDial.items[i].style.transform).to.equal('scale(0)');
        }
      });
    });
  });

  describe('#set disabled()', () => {
    it('disables it\'s direct fab element', (done) => {
      speedDial.disabled = true;
      expect(ons._util.findChild(speedDial, '.fab').disabled).to.be.true;
      setTimeout(done, 200); // disabled property performs async stuff
    });
  });

  describe('#visible', () => {
    it('returns whether the element is currently shown or not', () => {
      expect(speedDial.visible).to.be.true;
      return speedDial.hide().then(() => {
        expect(speedDial.visible).to.be.false;
        speedDial.show();
        expect(speedDial.visible).to.be.true;
        speedDial.style.display = 'none';
        expect(speedDial.visible).to.be.false;
      });
    });
  });

  describe('#toggle()', () => {
    it('calls #show() if element is hidden', () => {
      const spy = chai.spy.on(speedDial, 'show');
      return speedDial.hide().then(() => {
        return speedDial.toggle().then(() => {
          expect(spy).to.have.been.called.once;
        });
      });
    });

    it('calls #hide() if element is shown', () => {
      const spy = chai.spy.on(speedDial, 'hide');
      return speedDial.toggle().then(() => expect(spy).to.have.been.called.once);
    });
  });

  describe('#toggleItems()', () => {
    it('calls #showItems() if items are hidden', () => {
      const spy = chai.spy.on(speedDial, 'showItems');
      return speedDial.toggleItems().then(() => expect(spy).to.have.been.called.once);
    });

    it('calls #hideItems() if items are shown', () => {
      const spy = chai.spy.on(speedDial, 'hideItems');
      return speedDial.showItems()
      .then(() => speedDial.toggleItems())
      .then(() => expect(spy).to.have.been.called.once);
    });
  });

  describe('#isOpen()', () => {
    it('returns whether the menu is open or not.', () => {
      return speedDial.showItems()
      .then(() => {
        expect(speedDial.isOpen()).to.be.true;
        return speedDial.hideItems();
      })
      .then(() => expect(speedDial.isOpen()).to.be.false);
    });
  });

  describe('#_compile()', () => {
    onlyChrome(it)('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = `
        <ons-speed-dial>
          <ons-fab>A</ons-fab>
          <ons-speed-dial-item>Item 1</ons-speed-dial-item>
          <ons-speed-dial-item>Item 2</ons-speed-dial-item>
          <ons-speed-dial-item>Item 3</ons-speed-dial-item>
        </ons-speed-dial>
      `;
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });
});
