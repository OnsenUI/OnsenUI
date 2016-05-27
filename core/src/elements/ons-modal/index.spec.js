'use strict';

describe('OnsModalElement', () => {
  let element;

  beforeEach(() => {
    element = ons._util.createElement(`
      <ons-modal>
        <div>Test 1</div>
        <div>Test 2</div>
      </ons-modal>
    `);
    document.body.appendChild(element);
  });

  afterEach(() => {
    element.remove();
    element = null;
  });

  it('should exist', () => {
    expect(window.OnsModalElement).to.be.ok;
  });

  it('is not displayed by default', () => {
    expect(element.style.display).to.equal('none');
  });

  describe('#_compile()', () => {
    it('adds a class \'modal\' by default', () => {
      expect(element.classList.contains('modal')).to.be.true;
    });

    it('adds a \'modal__content\' by default', () => {
      const wrapper = document.createElement('div');
      element.appendChild(wrapper);
      expect(element.children[0].classList.contains('modal__content')).to.be.true;
    });

    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = '<ons-modal></ons-modal>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });

  describe('#show()', () => {
    it('displays the modal', () => {
      expect(element.style.display).to.equal('none');
      element.show();
      expect(element.style.display).to.equal('table');
    });

    it('returns a promise that resolves to the displayed element', () => {
      const modal = element;
      return expect(modal.show()).to.eventually.be.fulfilled.then(
        element => {
          expect(element).to.equal(modal);
          expect(element.style.display).to.equal('table');
        }
      );
    });
  });

  describe('#hide()', () => {
    beforeEach(() => {
      element.show();
    });

    it('hides the modal', () => {
      expect(element.style.display).to.equal('table');
      element.hide();
      expect(element.style.display).to.equal('none');
    });

    it('returns a promise that resolves to the hidden element', () => {
      const modal = element;
      return expect(modal.hide()).to.eventually.be.fulfilled.then(
        element => {
          expect(element).to.equal(modal);
          expect(element.style.display).to.equal('none');
        }
      );
    });
  });

  describe('#toggle()', () => {
    it('alternates the modal displaying state', () => {
      expect(element.style.display).to.equal('none');
      element.toggle();
      expect(element.style.display).to.equal('table');
      element.toggle();
      expect(element.style.display).to.equal('none');
      element.toggle();
      expect(element.style.display).to.equal('table');
    });
  });

  describe('#visible', () => {
    it('returns whether the modal is shown', () => {
      expect(element.style.display).to.equal('none');
      expect(element.visible).to.be.false;
      element.show();
      expect(element.style.display).to.equal('table');
      expect(element.visible).to.be.true;
    });
  });


  describe('#onDeviceBackButton', () => {
    it('gets the callback', () => {
      expect(element.onDeviceBackButton).to.be.ok;
    });

    it('returns nothing by default', () => {
      expect(element.onDeviceBackButton._callback()).not.to.be.ok;
    });

    it('overwrites the callback', () => {
      const spy = chai.spy.on(element._backButtonHandler, 'destroy');
      element.onDeviceBackButton = () => { return; };
      expect(spy).to.have.been.called.once;
      expect(element._backButtonHandler).to.be.ok;
    });
  });

  describe('#_ensureNodePosition()', () => {
    it('does not register extra element when has no parent ons-page', () => {
      const spy = chai.spy.on(element, '_registerExtraElement');
      expect(element._ensureNodePosition()).not.to.be.ok;
      expect(spy).to.not.have.been.called();
    });

    it('registers extra element when has parent ons-page', () => {
      const element = new OnsModalElement();
      const parent = new OnsPageElement();
      const spy = chai.spy.on(parent, '_registerExtraElement');
      parent._registerExtraElement(element);
      element._ensureNodePosition();
      expect(spy).to.have.been.called.twice;
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
    it('throws an error if animator is not a ModalAnimator', () => {
      expect(() => window.OnsModalElement.registerAnimator('hoge', 'hoge')).to.throw(Error);
    });

    it('registers a new animator', () => {
      class MyAnimator extends window.OnsModalElement.ModalAnimator {
      }

      window.OnsModalElement.registerAnimator('hoge', MyAnimator);
    });
  });
});
