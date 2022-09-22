import contentReady from '../ons/content-ready.js';

describe('OnsPopoverElement', () => {
  let popover, target;
  const popoverDisplay = () => window.getComputedStyle(popover).getPropertyValue('display');

  beforeEach(done => {
    popover = new ons.elements.Popover();
    target = ons._util.createElement('<div>Target</div>');

    document.body.appendChild(target);
    document.body.appendChild(popover);

    contentReady(popover, done);
  });

  afterEach(() => {
    popover.remove();
    target.remove();
    popover = target = null;
  });

  it('exists', () => {
    expect(window.ons.elements.Popover).to.be.ok;
  });

  it('provides \'modifier\' attribute', () => {
    const content = popover.querySelector('.popover__content');
    const innerPopover = popover.querySelector('.popover');

    popover.setAttribute('modifier', 'hoge');
    expect(innerPopover.classList.contains('popover--hoge')).to.be.true;
    expect(content.classList.contains('popover--hoge__content')).to.be.true;

    popover.setAttribute('modifier', 'foo bar');
    expect(innerPopover.classList.contains('popover--foo')).to.be.true;
    expect(innerPopover.classList.contains('popover--bar')).to.be.true;
    expect(innerPopover.classList.contains('popover--hoge')).not.to.be.true;
    expect(content.classList.contains('popover--foo__content')).to.be.true;
    expect(content.classList.contains('popover--bar__content')).to.be.true;
    expect(content.classList.contains('popover--hoge__content')).not.to.be.true;

    innerPopover.classList.add('popover--piyo');
    popover.setAttribute('modifier', 'fuga');
    expect(innerPopover.classList.contains('popover--piyo')).to.be.true;
    expect(innerPopover.classList.contains('popover--fuga')).to.be.true;
  });

  it('should be hidden by default', () => {
    expect(popoverDisplay()).to.equal('none');
  });

  describe('elements', () => {
    ['_mask', '_popover', '_content', '_arrow'].forEach(name => {
      it(`has an element '${name}'`, () => {
        expect(popover[name]).to.be.an.instanceof(HTMLElement);
      });
    });
  });

  describe('#onDeviceBackButton', () => {
    it('should hide the popover if it is cancelable', () => {
      popover.setAttribute('animation', 'none');
      popover.setAttribute('cancelable', '');

      popover.show(target);
      expect(popoverDisplay()).to.equal('block');

      popover.onDeviceBackButton._callback({callParentHandler: () => {}});
      expect(popoverDisplay()).to.equal('none');
    });

    it('should not hide the popover if it is not cancelable', () => {
      popover.setAttribute('animation', 'none');

      popover.show(target);
      expect(popoverDisplay()).to.equal('block');

      popover.onDeviceBackButton._callback({callParentHandler: () => {}});
      expect(popoverDisplay()).to.equal('block');
    });
  });

  describe('#show()', () => {
    it('throws an error when called with invalid targets', () => {
      expect(() => popover.show()).to.throw(Error);
      expect(() => popover.show(42)).to.throw(Error);
      expect(() => popover.show({})).to.throw(Error);
      expect(() => popover.show([])).to.throw(Error);
      expect(() => popover.show(null)).to.throw(Error);
    });

    it('accepts an HTML element', () => {
      expect(popoverDisplay()).to.equal('none');
      popover.show(target);
      expect(popoverDisplay()).to.equal('block');
    });

    it('accepts a CSS selector', () => {
      expect(popoverDisplay()).to.equal('none');
      popover.show('div');
      expect(popoverDisplay()).to.equal('block');
    });

    it('accepts an Event object', () => {
      var ev = new Event('dummy');
      target.dispatchEvent(ev);
      expect(popoverDisplay()).to.equal('none');
      popover.show(ev);
      expect(popoverDisplay()).to.equal('block');
    });

    it('has an \'animationOptions\' parameter', () => {
      expect(() => popover.show(target, {animationOptions: {'duration': 1.0, delay: 1.0}}))
        .not.to.throw(Error);
    });

    describe('\'preshow\' event', () => {
      it('is fired', () => {
        const promise = new Promise(resolve => popover.addEventListener('preshow', resolve));
        popover.show(target);
        return expect(promise).to.eventually.be.fulfilled;
      });

      it('can be cancelled', () => {
        popover.addEventListener('preshow', e => e.cancel());
        popover.show(target);
        expect(popoverDisplay()).to.equal('none');
      });
    });

    describe('\'postshow\' event', () => {
      it('is fired', () => {
        const promise = new Promise(resolve => popover.addEventListener('postshow', resolve));
        popover.show(target);
        return expect(promise).to.eventually.be.fulfilled;
      });
    });

    it('returns a promise that resolves to the displayed element', () => {
      return expect(popover.show(target)).to.eventually.be.fulfilled.then(element => {
        expect(element).to.equal(popover);
        expect(popoverDisplay()).to.equal('block');
      });
    });

    it("sets the 'visible' property to true", () => {
      return expect(popover.show(target)).to.eventually.be.fulfilled.then(
        element => {
          expect(popover.visible).to.be.true;
        }
      );
    });
  });

  describe('#hide()', () => {
    beforeEach(done => {
      popover.show(target, {animation: 'none'}).then(() => done());
    });

    it('hides the popover', () => {
      expect(popoverDisplay()).to.equal('block');
      popover.hide({animation: 'none'});
      expect(popoverDisplay()).to.equal('none');
    });

    describe('\'prehide\' event', () => {
      it('is fired', () => {
        const promise = new Promise(resolve => popover.addEventListener('prehide', resolve));
        popover.hide();
        return expect(promise).to.eventually.be.fulfilled;
      });

      it('can be cancelled', () => {
        popover.addEventListener('prehide', e => e.cancel());
        popover.hide({animation: 'none'});
        expect(popoverDisplay()).to.equal('block');
      });
    });

    describe('\'posthide\' event', () => {
      it('is fired', () => {
        const promise = new Promise(resolve => popover.addEventListener('posthide', resolve));
        popover.hide();
        return expect(promise).to.eventually.be.fulfilled;
      });
    });

    it('returns a promise that resolves to the hidden element', () => {
      return expect(popover.hide()).to.eventually.be.fulfilled.then(element => {
        expect(element).to.equal(popover);
        expect(popoverDisplay()).to.equal('none');
      });
    });

    it("sets the 'visible' property to false", () => {
      return expect(popover.hide()).to.eventually.be.fulfilled.then(
        element => {
          expect(popover.visible).to.be.false;
        }
      );
    });
  });

  describe('#visible', () => {
    it('should return \'true\' if popover is visible', () => {
      return popover.show(target, {animation: 'none'})
        .then(() => expect(popover.visible).to.be.true);
    });

    it('should return \'false\' if popover is not visible', () => {
      expect(popover.visible).to.be.false;
    });
  });

  describe('#_cancel()', () => {
    it('should hide the popover if it is not cancelable', () => {
      popover.show(target, {animation: 'none'});
      popover._cancel();
      expect(popoverDisplay()).to.equal('block');
    });

    it('should hide the popover if it is cancelable', () => {
      popover.setAttribute('animation', 'none');
      popover.show(target);
      popover.setAttribute('cancelable', '');
      popover._cancel();
      expect(popoverDisplay()).to.equal('none');
    });
  });

  describe('\'direction\' attribute', () => {
    const classes = {
      up: 'popover--bottom',
      down: 'popover--top',
      left: 'popover--right',
      right: 'popover--left'
    };

    Object.keys(classes).forEach(key => {
      it(`can have the value '${key}'`, (done) => {
        popover.setAttribute('direction', key);
        popover.show(target, {animation: 'none'}).then(() => {
          expect(popover._popover.classList.contains(classes[key])).to.be.true;
          done();
        });
      });
    });

  });

  describe('\'mask-color\' attribute', () => {
    it ('works', (done) => {
      const popover = ons._util.createElement('<ons-popover mask-color="red"></ons-popover>');

      setImmediate(() => {
        expect(popover._mask.style.backgroundColor).to.equal('red');
        done();
      });
    });
  });

  describe('\'style\' attribute', () => {
    it ('works', (done) => {
      const popover = ons._util.createElement('<ons-popover style="background: blue">Test</ons-popover>');

      setImmediate(() => {
        expect(popover._popover.style.background).to.equal('blue');
        done();
      });
    });
  });

  describe('\'target\' attribute', () => {
    const targetElmId = 'test';
    const popover = ons._util.createElement(`<ons-popover target="${targetElmId}">Test</ons-popover>`);
    const target = ons._util.createElement(`<div id="${targetElmId}"></div>`);
    document.body.appendChild(popover);
    document.body.appendChild(target);

    it ('works on show() as the default target', (done) => {
      setImmediate(() => {
        // expect(popover._popover.target).to.equal(targetElmId);
        popover.show().then(() => {
          window.getComputedStyle(popover).getPropertyValue('display');
          done();
        });
      });
    });

    it ('works on visible as the default target', (done) => {
      setImmediate(() => {
        popover.visible = true;
        expect(popover.target).to.equal(targetElmId);
        window.getComputedStyle(popover).getPropertyValue('display');
        done();
      });
    });
  });


  describe('#registerAnimator()', () => {
    it('throws an error if animator is not a PopoverAnimator', () => {
      expect(() => window.ons.elements.Popover.registerAnimator('hoge', 'hoge')).to.throw(Error);
    });

    it('registers a new animator', () => {
      class MyAnimator extends window.ons.elements.Popover.PopoverAnimator {
      }

      window.ons.elements.Popover.registerAnimator('hoge', MyAnimator);
    });
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = '<ons-popover>contents</ons-popover>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });

  describe('autoStyling', () => {
    it('adds \'material\' modifier on Android', () => {
      ons.platform.select('android');
      const e = ons._util.createElement('<ons-popover>Content</ons-popover>');
      expect(e.getAttribute('modifier')).to.equal('material');
      ons.platform.select('');
    });
  });
});

