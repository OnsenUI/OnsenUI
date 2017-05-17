'use strict';

describe('OnsActionSheetElement', () => {
  let sheet;

  beforeEach(() => {
    sheet = ons._util.createElement(`
      <ons-action-sheet>
        <p>Hello, world!</p>
      </ons-action-sheet>
    `);

    document.body.appendChild(sheet);
  });

  afterEach(() => {
    sheet.remove();
    sheet = null;
  });

  it('exists', () => {
    expect(window.ons.ActionSheetElement).to.be.ok;
  });

  it('provides \'title\' attribute', (done) => {
    const element = ons.createElement('<ons-action-sheet title="test"></ons-action-sheet>', { append: true });
    setImmediate(() => {
      expect(element._title).to.be.ok;
      element.remove();
      done();
    });
  });

  it('provides \'modifier\' attribute', () => {
    const element = sheet.querySelector('.action-sheet');

    sheet.setAttribute('modifier', 'hoge');
    expect(element.classList.contains('action-sheet--hoge')).to.be.true;

    sheet.setAttribute('modifier', ' foo bar');
    expect(element.classList.contains('action-sheet--foo')).to.be.true;
    expect(element.classList.contains('action-sheet--bar')).to.be.true;
    expect(element.classList.contains('action-sheet--hoge')).not.to.be.true;

    element.classList.add('action-sheet--piyo');
    sheet.setAttribute('modifier', 'fuga');
    expect(element.classList.contains('action-sheet--piyo')).to.be.true;
    expect(element.classList.contains('action-sheet--fuga')).to.be.true;
  });

  describe('#_mask', () => {
    it('is an HTML element', () => {
      expect(sheet._mask).to.be.an.instanceof(HTMLElement);
    });
  });

  describe('#_sheet', () => {
    it('is an HTML element', () => {
      expect(sheet._sheet).to.be.an.instanceof(HTMLElement);
    });
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = '<ons-action-sheet></ons-action-sheet>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });

  describe('#onDeviceBackButton', () => {
    it('returns the back button handler', () => {
      expect(sheet.onDeviceBackButton).to.be.an('object');
    });
  });

  describe('#onDeviceBackButton', () => {
    it('cancels if action sheet is cancelable', () => {
      const spy = chai.spy.on(sheet, '_cancel');
      sheet.setAttribute('cancelable', '');
      sheet.onDeviceBackButton._callback();
      expect(spy).to.have.been.called.once;
    });

    it('calls parent handler if action sheet is not cancelable', () => {
      const event = {};
      const spy = chai.spy.on(event, 'callParentHandler');

      sheet.onDeviceBackButton._callback(event);
      expect(spy).to.have.been.called.once;
    });
  });

  describe('#_cancel()', () => {
    it('hides the action sheet if it is cancelable', () => {
      const spy = chai.spy.on(sheet, 'hide');
      sheet.setAttribute('cancelable', '');
      sheet._cancel();
      expect(spy).to.have.been.called.once;
    });

    it('emits a \'dialog-cancel\' event', () => {
      const promise = new Promise((resolve) => {
        sheet.addEventListener('dialog-cancel', resolve);
      });

      sheet.setAttribute('cancelable', '');
      sheet._cancel();

      return expect(promise).to.eventually.be.fulfilled;
    });
  });

  describe('#disabled', () => {
    it('changes the "disabled" attribute', () => {
      expect(sheet.hasAttribute('disabled')).to.be.false;
      sheet.disabled = true;
      expect(sheet.hasAttribute('disabled')).to.be.true;
    });
  });

  describe('#cancelable', () => {
    it('changes the "cancelable" attribute', () => {
      expect(sheet.hasAttribute('cancelable')).to.be.false;
      sheet.cancelable = true;
      expect(sheet.hasAttribute('cancelable')).to.be.true;
    });
  });

  describe('#show()', () => {
    it('shows the action sheet', () => {
      expect(sheet.style.display).to.equal('none');
      sheet.show();
      expect(sheet.style.display).to.equal('block');
    });

    it('emits \'preshow\' event', () => {
      const promise = new Promise((resolve) => {
        sheet.addEventListener('preshow', resolve);
      });

      sheet.show();

      return expect(promise).to.eventually.be.fulfilled;
    });

    it('emits \'postshow\' event', () => {
      const promise = new Promise((resolve) => {
        sheet.addEventListener('postshow', resolve);
      });

      sheet.show();

      return expect(promise).to.eventually.be.fulfilled;
    });

    it('can be cancelled', () => {
      sheet.addEventListener('preshow', (event) => {
        event.detail.cancel();
      });

      sheet.show();
      expect(sheet.style.display).to.equal('none');
    });

    it('returns a promise that resolves to the displayed element', () => {
      return expect(sheet.show()).to.eventually.be.fulfilled.then(
        element => {
          expect(element).to.equal(sheet);
          expect(element.style.display).to.equal('block');
        }
      );
    });
  });

  describe('#hide()', () => {
    beforeEach(() => {
      sheet.show({animation: 'none'});
    });

    it('hides the action sheet', () => {
      expect(sheet.style.display).to.equal('block');
      sheet.hide({animation: 'none'});
      expect(sheet.style.display).to.equal('none');
    });

    it('emits \'prehide\' event', () => {
      const promise = new Promise((resolve) => {
        sheet.addEventListener('prehide', resolve);
      });

      sheet.hide();

      return expect(promise).to.eventually.be.resolved;
    });

    it('emits \'posthide\' event', () => {
      const promise = new Promise((resolve) => {
        sheet.addEventListener('posthide', resolve);
      });

      sheet.hide();

      return expect(promise).to.eventually.be.resolved;
    });

    it('can be cancelled', () => {
      sheet.addEventListener('prehide', (event) => {
        event.detail.cancel();
      });

      sheet.hide({animation: 'none'});
      expect(sheet.style.display).to.equal('block');
    });

    it('returns a promise that resolves to the hidden element', () => {
      return expect(sheet.hide()).to.eventually.be.fulfilled.then(
        element => {
          expect(element).to.equal(sheet);
          expect(element.style.display).to.equal('none');
        }
      );
    });
  });

  describe('#visible', () => {
    it('returns whether the action sheet is visible or not', () => {
      expect(sheet.visible).to.be.false;
      sheet.show({animation: 'none'});
      expect(sheet.visible).to.be.true;
    });
  });


  describe('#registerAnimator()', () => {
    it('throws an error if animator is not a ActionSheetAnimator', () => {
      expect(() => window.ons.ActionSheetElement.registerAnimator('hoge', 'hoge')).to.throw(Error);
    });

    it('registers a new animator', () => {
      class MyAnimator extends window.ons.ActionSheetElement.ActionSheetAnimator {
      }

      window.ons.ActionSheetElement.registerAnimator('hoge', MyAnimator);
    });
  });

  describe('autoStyling', () => {
    it('adds \'material\' modifier on Android', () => {
      ons.platform.select('android');
      const e = ons._util.createElement('<ons-action-sheet>contents</ons-action-sheet>');
      expect(e.getAttribute('modifier')).to.equal('material');
      ons.platform.select('');
    });
  });
});
