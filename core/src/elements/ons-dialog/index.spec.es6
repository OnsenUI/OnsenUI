'use strict';

describe('OnsDialogElement', () => {
  let dialog;

  beforeEach(() => {
    dialog = ons._util.createElement(`
      <ons-dialog>
        <p>Hello, world!</p>
      </ons-dialog>
    `);

    document.body.appendChild(dialog);
  });

  afterEach(() => {
    dialog.remove();
    dialog = null;
  });

  it('exists', () => {
    expect(window.OnsDialogElement).to.be.ok;
  });

  it('provides \'modifier\' attribute', () => {
    let element = dialog.querySelector('.dialog');

    dialog.setAttribute('modifier', 'hoge');
    expect(element.classList.contains('dialog--hoge')).to.be.true;

    dialog.setAttribute('modifier', ' foo bar');
    expect(element.classList.contains('dialog--foo')).to.be.true;
    expect(element.classList.contains('dialog--bar')).to.be.true;
    expect(element.classList.contains('dialog--hoge')).not.to.be.true;

    element.classList.add('dialog--piyo');
    dialog.setAttribute('modifier', 'fuga');
    expect(element.classList.contains('dialog--piyo')).to.be.true;
    expect(element.classList.contains('dialog--fuga')).to.be.true;
  });

  describe('#_mask', () => {
    it('is an HTML element', () => {
      expect(dialog._mask).to.be.an.instanceof(HTMLElement);
    });
  });

  describe('#_dialog', () => {
    it('is an HTML element', () => {
      expect(dialog._dialog).to.be.an.instanceof(HTMLElement);
    });
  });

  describe('#_compile()', () => {
    it('copies style to child', () => {
      let dialog = ons._util.createElement('<ons-dialog style="background-color: red"></ons-dialog>');
      expect(dialog._dialog.style.backgroundColor).to.equal('red');
    });
  });

  describe('#getDeviceBackButtonHandler()', () => {
    it('returns the back button handler', () => {
      expect(dialog.getDeviceBackButtonHandler()).to.be.an('object');
    });
  });

  describe('#_onDeviceBackButton()', () => {
    it('cancels if dialog is cancelable', () => {
      let spy = chai.spy.on(dialog, '_cancel');
      dialog.setAttribute('cancelable', '');
      dialog._onDeviceBackButton();
      expect(spy).to.have.been.called.once;
    });

    it('calls parent handler if dialog is not cancelable', () => {
      let event = {},
        spy = chai.spy.on(event, 'callParentHandler');

      dialog._onDeviceBackButton(event);
      expect(spy).to.have.been.called.once;
    });
  });

  describe('#_cancel()', () => {
    it('hides the dialog if it is cancelable', () => {
      let spy = chai.spy.on(dialog, 'hide');
      dialog.setAttribute('cancelable', '');
      dialog._cancel();
      expect(spy).to.have.been.called.once;
    });

    it('emits a \'cancel\' event', () => {
      let promise = new Promise((resolve) => {
        dialog.addEventListener('cancel', resolve);
      });

      dialog.setAttribute('cancelable', '');
      dialog._cancel();

      return expect(promise).to.eventually.be.fulfilled;
    });
  });

  describe('#show()', () => {
    it('shows the dialog', () => {
      expect(dialog.style.display).to.equal('none');
      dialog.show();
      expect(dialog.style.display).to.equal('block');
    });

    it('emits \'preshow\' event', () => {
      let promise = new Promise((resolve) => {
        dialog.addEventListener('preshow', resolve);
      });

      dialog.show();

      return expect(promise).to.eventually.be.fulfilled;
    });

    it('emits \'postshow\' event', () => {
      let promise = new Promise((resolve) => {
        dialog.addEventListener('postshow', resolve);
      });

      dialog.show();

      return expect(promise).to.eventually.be.fulfilled;
    });

    it('can be cancelled', () => {
      dialog.addEventListener('preshow', (event) => {
        event.detail.cancel();
      });

      dialog.show();
      expect(dialog.style.display).to.equal('none');
    });
  });

  describe('#hide()', () => {
    beforeEach(() => {
      dialog.show({animation: 'none'});
    });

    it('hides the dialog', () => {
      expect(dialog.style.display).to.equal('block');
      dialog.hide({animation: 'none'});
      expect(dialog.style.display).to.equal('none');
    });

    it('emits \'prehide\' event', () => {
      let promise = new Promise((resolve) => {
        dialog.addEventListener('prehide', resolve);
      });

      dialog.hide();

      return expect(promise).to.eventually.be.resolved;
    });

    it('emits \'posthide\' event', () => {
      let promise = new Promise((resolve) => {
        dialog.addEventListener('posthide', resolve);
      });

      dialog.hide();

      return expect(promise).to.eventually.be.resolved;
    });

    it('can be cancelled', () => {
      dialog.addEventListener('prehide', (event) => {
        event.detail.cancel();
      });

      dialog.hide({animation: 'none'});
      expect(dialog.style.display).to.equal('block');
    });
  });

  describe('#destroy()', () => {
    it('removes the dialog', () => {
      expect(dialog.parentElement).to.be.ok;
      dialog.destroy();
      expect(dialog.parentElement).not.to.be.ok;
    });
  });

  describe('#isShown()', () => {
    it('returns whether the dialog is visible or not', () => {
      expect(dialog.isShown()).to.be.false;
      dialog.show({animation: 'none'});
      expect(dialog.isShown()).to.be.true;
    });
  });

  describe('#isCancelable()', () => {
    it('returns whether the dialog is cancelable or not', () => {
      expect(dialog.isCancelable()).to.be.false;
      dialog.setCancelable(true);
      expect(dialog.isCancelable()).to.be.true;
    });
  });

  describe('#setDisabled()', () => {
    it('only accepts a boolean argument', () => {
      expect(() => dialog.setDisabled('hoge')).to.throw(Error);
    });

    it('disables the dialog', () => {
      expect(dialog.isDisabled()).to.be.false;
      dialog.setDisabled(true);
      expect(dialog.isDisabled()).to.be.true;
    });

    it('enables the dialog', () => {
      dialog.setDisabled(false);
      expect(dialog.isDisabled()).to.be.false;
      dialog.setDisabled(true);
      expect(dialog.isDisabled()).to.be.true;
    });
  });

  describe('#isDisabled()', () => {
    it('returns whether the dialog is disabled or not', () => {
      expect(dialog.isDisabled()).to.be.false;
      dialog.setDisabled(true);
      expect(dialog.isDisabled()).to.be.true;
    });
  });

  describe('#setCancelable()', () => {
    it('only accepts a boolean argument', () => {
      expect(() => dialog.setCancelable('hoge')).to.throw(Error);
    });

    it('makes the dialog cancelable', () => {
      expect(dialog.isCancelable()).to.be.false;
      dialog.setCancelable(true);
      expect(dialog.isCancelable()).to.be.true;
    });

    it('makes the dialog not cancelable', () => {
      dialog.setCancelable(false);
      expect(dialog.isCancelable()).to.be.false;
      dialog.setCancelable(true);
      expect(dialog.isCancelable()).to.be.true;
    });
  });

  describe('#registerAnimator()', () => {
    it('throws an error if animator is not a DialogAnimator', () => {
      expect(() => window.OnsDialogElement.registerAnimator('hoge', 'hoge')).to.throw(Error);
    });

    it('registers a new animator', () => {
      class MyAnimator extends window.OnsDialogElement.DialogAnimator {
      }

      window.OnsDialogElement.registerAnimator('hoge', MyAnimator);
    });
  });
});
