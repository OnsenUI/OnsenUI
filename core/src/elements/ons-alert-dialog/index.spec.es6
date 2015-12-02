'use strict';

describe('OnsAlertDialogElement', () => {
  let dialog;

  beforeEach(() => {
    dialog = ons._util.createElement(`
      <ons-alert-dialog mask-color="red">
        <div class="alert-dialog-title">Warning!</div>
        <div class="alert-dialog-content">
          An error has occurred!
        </div>
        <div class="alert-dialog-footer">
          <button class="alert-dialog-button">Cancel</button>
          <button class="alert-dialog-button">OK</button>
        </div>
      </ons-alert-dialog>
    `);

    document.body.appendChild(dialog);
  });

  afterEach(() => {
    dialog.remove();
    dialog = null;
  });

  it('exists', () => {
    expect(window.OnsAlertDialogElement).to.be.ok;
  });

  it('provides \'modifier\' attribute', () => {
    let content = dialog.querySelector('.alert-dialog-content'),
      title = dialog.querySelector('.alert-dialog-title');

    dialog.setAttribute('modifier', 'hoge');
    expect(dialog.classList.contains('alert-dialog--hoge')).to.be.true;
    expect(content.classList.contains('alert-dialog-content--hoge')).to.be.true;
    expect(title.classList.contains('alert-dialog-title--hoge')).to.be.true;

    dialog.setAttribute('modifier', ' foo bar');
    expect(dialog.classList.contains('alert-dialog--foo')).to.be.true;
    expect(content.classList.contains('alert-dialog-content--foo')).to.be.true;
    expect(title.classList.contains('alert-dialog-title--foo')).to.be.true;
    expect(dialog.classList.contains('alert-dialog--bar')).to.be.true;
    expect(content.classList.contains('alert-dialog-content--bar')).to.be.true;
    expect(title.classList.contains('alert-dialog-title--bar')).to.be.true;
    expect(dialog.classList.contains('alert-dialog--hoge')).not.to.be.true;
    expect(content.classList.contains('alert-dialog-content--hoge')).not.to.be.true;
    expect(title.classList.contains('alert-dialog-title--hoge')).not.to.be.true;
  });

  describe('#_titleElement', () => {
    it('is an HTML element', () => {
      expect(dialog._titleElement).to.be.an.instanceof(HTMLElement);
    });
  });

  describe('#_contentElement', () => {
    it('is an HTML element', () => {
      expect(dialog._contentElement).to.be.an.instanceof(HTMLElement);
    });
  });

  describe('#_dialog', () => {
    it('is an HTML element', () => {
      expect(dialog._dialog).to.be.an.instanceof(HTMLElement);
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

  describe('#isCancelable()', () => {
    it('returns whether the dialog is cancelable or not', () => {
      expect(dialog.isCancelable()).to.be.false;
      dialog.setCancelable(true);
      expect(dialog.isCancelable()).to.be.true;
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
  });

  describe('#isShown()', () => {
    it('returns whether the dialog is visible or not', () => {
      expect(dialog.isShown()).to.be.false;
      dialog.show({animation: 'none'});
      expect(dialog.isShown()).to.be.true;
    });
  });

  describe('#registerAnimator()', () => {
    it('throws an error if animator is not a DialogAnimator', () => {
      expect(() => window.OnsAlertDialogElement.registerAnimator('hoge', 'hoge')).to.throw(Error);
    });

    it('registers a new animator', () => {
      class MyAnimator extends ons._internal.AlertDialogAnimator {
      }
      window.OnsAlertDialogElement.registerAnimator('hoge', MyAnimator);
    });
  });
});
