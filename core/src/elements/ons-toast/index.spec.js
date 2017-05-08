'use strict';

describe('OnsToastElement', () => {
  let element;

  beforeEach(() => {
    element = ons._util.createElement(`
      <ons-toast>
        <div class="message">Test 1</div>
        <button>Test 2</button>
      </ons-toast>
    `);
    document.body.appendChild(element);
  });

  afterEach(() => {
    element.remove();
    element = null;
  });

  it('should exist', () => {
    expect(window.ons.ToastElement).to.be.ok;
  });

  it('is not displayed by default', () => {
    expect(element.style.display).to.equal('none');
  });

  it('provides \'modifier\' attribute', () => {
    const toast = element.querySelector('.toast');
    const message = element.querySelector('.toast__message');
    const button = element.querySelector('.toast__button');

    element.setAttribute('modifier', 'hoge');
    expect(toast.classList.contains('toast--hoge')).to.be.true;
    expect(message.classList.contains('toast--hoge__message')).to.be.true;
    expect(button.classList.contains('toast--hoge__button')).to.be.true;

    element.setAttribute('modifier', ' foo bar');
    expect(toast.classList.contains('toast--foo')).to.be.true;
    expect(message.classList.contains('toast--foo__message')).to.be.true;
    expect(button.classList.contains('toast--foo__button')).to.be.true;
    expect(toast.classList.contains('toast--bar')).to.be.true;
    expect(message.classList.contains('toast--bar__message')).to.be.true;
    expect(button.classList.contains('toast--bar__button')).to.be.true;
    expect(toast.classList.contains('toast--hoge')).to.be.false;
    expect(message.classList.contains('toast--hoge__message')).to.be.false;
    expect(button.classList.contains('toast--hoge__button')).to.be.false;
  });

  describe('class attribute', () => {
    it('should contain a child with "toast" class name', (done) => {
      const element = new ons.ToastElement();
      setImmediate(() => {
        expect(element.querySelector('.toast')).to.be.ok;
        done();
      });
    });
  });

  describe('#_compile()', () => {
    it('adds a class \'toast\' by default', () => {
      expect(element.children[0].classList.contains('toast')).to.be.true;
    });

    it('adds a \'toast__message\' by default', () => {
      expect(element.children[0].children[0].classList.contains('toast__message')).to.be.true;
    });

    it('adds a \'toast__button\' by default', () => {
      expect(element.children[0].children[1].classList.contains('toast__button')).to.be.true;
    });

    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = '<ons-toast></ons-toast>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });

  describe('#show()', () => {
    it('displays the element', () => {
      expect(element.style.display).to.equal('none');
      element.show();
      expect(element.style.display).to.equal('block');
    });

    it('returns a promise that resolves to the displayed element', () => {
      const toast = element;
      return expect(toast.show()).to.eventually.be.fulfilled.then(
        element => {
          expect(element).to.equal(toast);
          expect(element.style.display).to.equal('block');
        }
      );
    });
  });

  describe('#hide()', () => {
    beforeEach(() => {
      element.show({animation: 'none'});
    });

    it('hides the element', () => {
      expect(element.style.display).to.equal('block');
      element.hide({animation: 'none'});
      expect(element.style.display).to.equal('none');
    });

    it('returns a promise that resolves to the hidden element', () => {
      const toast = element;
      return expect(toast.hide({animation: 'none'})).to.eventually.be.fulfilled.then(
        element => {
          expect(element).to.equal(toast);
          expect(element.style.display).to.equal('none');
        }
      );
    });
  });

  describe('#toggle()', () => {
    it('alternates the element displaying state', () => {
      expect(element.style.display).to.equal('none');
      element.toggle({animation: 'none'});
      expect(element.style.display).to.equal('block');
      element.toggle({animation: 'none'});
      expect(element.style.display).to.equal('none');
      element.toggle({animation: 'none'});
      expect(element.style.display).to.equal('block');
    });
  });

  describe('#visible', () => {
    it('returns whether the element is shown', () => {
      expect(element.style.display).to.equal('none');
      expect(element.visible).to.be.false;
      element.show({animation: 'none'});
      expect(element.style.display).to.equal('block');
      expect(element.visible).to.be.true;
    });
  });


  describe('#onDeviceBackButton', () => {
    it('gets the callback', () => {
      expect(element.onDeviceBackButton).to.be.ok;
    });

    it('calls parent handler by default', () => {
      const event = {};
      const spy = chai.spy.on(event, 'callParentHandler');

      element.onDeviceBackButton._callback(event);
      expect(spy).to.have.been.called.once;
    });

    it('overwrites the callback', () => {
      const spy = chai.spy.on(element._backButtonHandler, 'destroy');
      element.onDeviceBackButton = () => { return; };
      expect(spy).to.have.been.called.once;
      expect(element._backButtonHandler).to.be.ok;
    });
  });

  describe('#attributeChangedCallback()', () => {
    it('triggers \'onModifierChanged()\' method', () => {
      const spy = chai.spy.on(ons._internal.ModifierUtil, 'onModifierChanged');
      element.attributeChangedCallback('modifier', 'fuga', 'piyo');
      expect(spy).to.have.been.called.once;
    });
  });

  describe('#registerAnimator()', () => {
    it('throws an error if animator is not a ToastAnimator', () => {
      expect(() => window.ons.ToastElement.registerAnimator('hoge', 'hoge')).to.throw(Error);
    });

    it('registers a new animator', () => {
      class MyAnimator extends window.ons.ToastElement.ToastAnimator {
      }

      window.ons.ToastElement.registerAnimator('hoge', MyAnimator);
    });
  });
});
