describe('OnsRippleElement', () => {
  let container, ripple;

  beforeEach(() => {
    container = ons._util.createElement(`
      <button>
        <ons-ripple></ons-ripple>
        Click me!
      </button>
    `);
    document.body.appendChild(container);

    ripple = container.querySelector('ons-ripple');
  });

  afterEach(() => {
    container.remove();
    container = ripple = null;
  });

  it('exists', () => {
    expect(window.OnsRippleElement).to.be.ok;
  });

  describe('#_compile()', () => {
    it('is called when an element is created', () => {
      const spy = chai.spy.on(OnsRippleElement.prototype, '_compile'),
        ripple = new OnsRippleElement();

      expect(spy).to.have.been.called.once;
    });

    it('creates a "wave" element', () => {
      const ripple = new OnsRippleElement();

      expect(ripple._wave).to.be.an.instanceof(HTMLElement);
    });

    it('sets the background based on the "color" attribute', () => {
      const ripple = ons._util.createElement('<ons-ripple color="black"></ons-ripple>');
      expect(ripple._wave.style.background).to.equal('black');
    });
  });

  describe('#_updateTarget()', () => {
    it('is called when the "target" attribute changes', () => {
      const spy = chai.spy.on(ripple, '_updateTarget');
      ripple.setAttribute('target', 'children');
      expect(spy).to.have.been.called.once;
      ripple.removeAttribute('target');
      expect(spy).to.have.been.called.twice;
    });
  });

  describe('#_updateCenter()', () => {
    it('is called when the "center" attribute changes', () => {
      const spy = chai.spy.on(ripple, '_updateCenter');
      ripple.setAttribute('center', '');
      expect(spy).to.have.been.called.once;
      ripple.removeAttribute('center');
      expect(spy).to.have.been.called.twice;
    });
  });

  describe('#_isTouchDevice()', () => {
    it('returns false if device is not a touch device', () => {
      expect(ripple._isTouchDevice()).to.be.false;
    });
  });

  describe('#_onMouseDown()', () => {
    it('sets the position of the wave', () => {
      // Dummy event.
      const e = {
        type: 'touchstart',
        changedTouches: [{
          clientX: 10,
          clientY: 10
        }]
      };

      const previousLeft = ripple._wave.style.left,
        previousTop = ripple._wave.style.top;

      ripple._onMouseDown(e);

      expect(ripple._wave.style.left).not.to.equal(previousLeft);
      expect(ripple._wave.style.top).not.to.equal(previousTop);
    });
  });

  describe('#setDisabled()', () => {
    it('throws an error if argument is not boolean', () => {
      expect(() => ripple.setDisabled('hoge')).to.throw(Error);
    });

    it('sets the disabled attribute if argument is true', () => {
      expect(ripple.hasAttribute('disabled')).to.be.false;
      ripple.setDisabled(true);
      expect(ripple.hasAttribute('disabled')).to.be.true;
    });

    it('removes the disabled attribute if argument is false', () => {
      ripple.setAttribute('disabled', '');
      ripple.setDisabled(false);
      expect(ripple.hasAttribute('disabled')).to.be.false;
    });
  });

  describe('#isDisabled()', () => {
    it('returns whether the disabled attribute is set or not', () => {
      ripple.setAttribute('disabled', '');
      expect(ripple.isDisabled()).to.be.true;
      ripple.removeAttribute('disabled');
      expect(ripple.isDisabled()).to.be.false;
    });
  });
});
