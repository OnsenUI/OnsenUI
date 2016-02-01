'use strict';

describe('OnsRippleElement', () => {
  var container, ripple, wave, background;

  var spyOn = chai.spy.on.bind(chai.spy, OnsRippleElement.prototype);

  beforeEach(() => {
    container = ons._util.createElement(`
      <button>
        <ons-ripple></ons-ripple>
        Click me!
      </button>
    `);
    document.body.appendChild(container);

    ripple = container.querySelector('ons-ripple');
    ripple.removeAttribute('disabled');
    wave = ripple._wave;
    background = ripple._background;
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
      var spy = spyOn('_compile'),
        _ = new OnsRippleElement();

      expect(spy).to.have.been.called.once;
    });

    it('is not called when an element is copied', () => {
      var spy = spyOn('_compile'),
        div1 = document.createElement('div'),
        div2 = document.createElement('div');

      div1.innerHTML = '<ons-ripple></ons-ripple>';
      div2.innerHTML = div1.innerHTML;

      expect(spy).to.have.been.called.once;
      expect(div1.innerHTML).to.equal(div2.innerHTML);
      expect(div1.isEqualNode(div2)).to.be.true;
    });

    it('creates a "wave" element', () => {
      expect((new OnsRippleElement())._wave).to.be.an.instanceof(HTMLElement);
    });

    it('creates a "background" element', () => {
      expect((new OnsRippleElement())._background).to.be.an.instanceof(HTMLElement);
    });
  });

  describe('#attachedCallback()', () => {
    beforeEach(() => {
      var container = document.createElement('div');
      var ripple = new OnsRippleElement();
    });

    it('changes parent position', () => {
      container.appendChild(ripple);
      expect(window.getComputedStyle(container).getPropertyValue('position')).equal('relative');
    });

    it('it doesn\'t change parent position', () => {
      container.style.position = 'absolute';
      container.appendChild(ripple);
      expect(window.getComputedStyle(container).getPropertyValue('position')).equal('absolute');
    });
  });

  describe('#attributeChangedCallback()', () => {
    var attributes = ['color', 'target', 'center', 'start-radius', 'background'];

    it('is called when an element is created', () => {
      var spy = spyOn('attributeChangedCallback'),
        _ = new OnsRippleElement();

      expect(spy).to.have.been.called.exactly(attributes.length);
    });

    it('sets the color of the wave based on the "color" attribute', () => {
      ripple.setAttribute('color', 'black');
      expect(wave.style.background).to.equal('black');
    });

    it('sets the color of the background based on the "color" attribute', () => {
      ripple.setAttribute('color', 'black');
      expect(background.style.background).to.equal('black');
    });

    it('sets the color of the background based on the "background" attribute', () => {
      ripple.setAttribute('color', 'black');
      ripple.setAttribute('background', 'rgb(0, 255, 255)');
      expect(background.style.background).to.equal('rgb(0, 255, 255)');
      ripple.setAttribute('color', 'lime');
      expect(background.style.background).to.equal('rgb(0, 255, 255)');
    });

    it('disables background if the "background" attribute is "none"', () => {
      ripple.setAttribute('background', 'none');
      expect(background.hasAttribute('disabled')).to.be.true;
    });

    it('makes sure the background is enabled if "background != none"', () => {
      background.setAttribute('disabled', 'disabled');
      ripple.setAttribute('background', 'rgb(0, 123, 5)');
      expect(background.hasAttribute('disabled')).to.be.false;
    });
  });


  describe('#_calculateCoords()', () => {
    var e = {
      changedTouches: [{
        clientX: 350,
        clientY: 250
      }]
    };

    var style = {
      width: '650px',
      height: '450px',
      position: 'fixed',
      top: '100px',
      left: '100px'
    };

    it('can do math', () => {
      ons._util.extend(ripple.style, style);

      var coords = ripple._calculateCoords(e);

      expect(coords.x).to.equal(250);
      expect(coords.y).to.equal(150);
      expect(coords.r).to.equal(500);
    });

    it('cares about it\'s center', () => {
      ons._util.extend(ripple.style, style);
      ripple.setAttribute('center', 'true');
      var coords = ripple._calculateCoords({clientY: 0, clientX: 0});

      expect(coords.x).to.equal(325);
      expect(coords.y).to.equal(225);
      expect(coords.r).to.be.closeTo(Math.sqrt(169 + 81) * 25, 0.001);
    });
  });


  var itCalls = (calling) => {
    return {
      whenUsing: (whenUsing, ...rest) => {
        it(`calls ${calling}`, () => {
          var spy = spyOn(calling),
            ripple = new OnsRippleElement();

          ripple[whenUsing].apply(ripple, rest);
          expect(spy).to.have.been.called.once;
        });
      }
    };
  };

  var e = {
    gesture: {
      direction: 'left',
      srcEvent: {
        changedTouches: [{
          clientX: 20,
          clientY: 10
        }]
      }
    }
  };

  describe('#_rippleAnimation()', () => {
    it('changes the location of the wave', () => {
      var {left, top} = wave.style;

      ripple._rippleAnimation(e.gesture.srcEvent);

      expect(wave.style.left).not.to.equal(left);
      expect(wave.style.top).not.to.equal(top);
    });

  });


  describe('#_onTap()', () => {
    itCalls('_rippleAnimation').whenUsing('_onTap', e);
  });

  describe('#_onHold()', () => {
    itCalls('_rippleAnimation').whenUsing('_onHold', e);

    it('sets _holding', () => {
      expect(ripple._holding).to.not.be.ok;
      ripple._onHold(e);
      expect(ripple._holding).to.be.ok;
    });

    it('unsets _holding', () => {
      ripple._onHold(e);
      expect(ripple._holding).to.be.ok;
      setTimeout(() => {
        expect(ripple._holding).to.not.be.ok;
      }, 2200);
    });
  });

  describe('#_onDragStart()', () => {
    itCalls('_rippleAnimation').whenUsing('_onDragStart', e);

    it('calls _onRelease', () => {
      var spy = spyOn('_onRelease');

      ripple._onHold(e);
      ripple._onDragStart(e);
      expect(spy).to.have.been.called.once;
    });
  });

  describe('#_onRelease()', () => {
    it('unsets _holding', () => {
      ripple._onHold(e);
      expect(ripple._holding).to.be.ok;
      ripple._onRelease(e);
      expect(ripple._holding).to.not.be.ok;
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
