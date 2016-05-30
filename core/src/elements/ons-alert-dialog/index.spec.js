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
    const element = dialog.querySelector('.alert-dialog');
    const content = dialog.querySelector('.alert-dialog-content');
    const title = dialog.querySelector('.alert-dialog-title');

    dialog.setAttribute('modifier', 'hoge');
    expect(element.classList.contains('alert-dialog--hoge')).to.be.true;
    expect(content.classList.contains('alert-dialog-content--hoge')).to.be.true;
    expect(title.classList.contains('alert-dialog-title--hoge')).to.be.true;

    dialog.setAttribute('modifier', ' foo bar');
    expect(element.classList.contains('alert-dialog--foo')).to.be.true;
    expect(content.classList.contains('alert-dialog-content--foo')).to.be.true;
    expect(title.classList.contains('alert-dialog-title--foo')).to.be.true;
    expect(element.classList.contains('alert-dialog--bar')).to.be.true;
    expect(content.classList.contains('alert-dialog-content--bar')).to.be.true;
    expect(title.classList.contains('alert-dialog-title--bar')).to.be.true;
    expect(element.classList.contains('alert-dialog--hoge')).not.to.be.true;
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

  describe('#disabled', () => {
    it('changes the "disabled" attribute', () => {
      expect(dialog.hasAttribute('disabled')).to.be.false;
      dialog.disabled = true;
      expect(dialog.hasAttribute('disabled')).to.be.true;
    });
  });

  describe('#cancelable', () => {
    it('changes the "cancelable" attribute', () => {
      expect(dialog.hasAttribute('cancelable')).to.be.false;
      dialog.cancelable = true;
      expect(dialog.hasAttribute('cancelable')).to.be.true;
    });
  });

  describe('#show()', () => {
    it('shows the dialog', () => {
      expect(dialog.style.display).to.equal('none');
      dialog.show();
      expect(dialog.style.display).to.equal('block');
    });

    it('emits \'preshow\' event', () => {
      const promise = new Promise((resolve) => {
        dialog.addEventListener('preshow', resolve);
      });

      dialog.show();

      return expect(promise).to.eventually.be.fulfilled;
    });

    it('emits \'postshow\' event', () => {
      const promise = new Promise((resolve) => {
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

    it('returns a promise that resolves to the displayed element', () => {
      return expect(dialog.show()).to.eventually.be.fulfilled.then(
        element => {
          expect(element).to.equal(dialog);
          expect(element.style.display).to.equal('block');
        }
      );
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
      const promise = new Promise((resolve) => {
        dialog.addEventListener('prehide', resolve);
      });

      dialog.hide();

      return expect(promise).to.eventually.be.resolved;
    });

    it('emits \'posthide\' event', () => {
      const promise = new Promise((resolve) => {
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

    it('returns a promise that resolves to the hidden element', () => {
      return expect(dialog.hide()).to.eventually.be.fulfilled.then(
        element => {
          expect(element).to.equal(dialog);
          expect(element.style.display).to.equal('none');
        }
      );
    });
  });

  describe('#onDeviceBackButton', () => {
    it('cancels if dialog is cancelable', () => {
      const spy = chai.spy.on(dialog, '_cancel');
      dialog.setAttribute('cancelable', '');
      dialog.onDeviceBackButton._callback();
      expect(spy).to.have.been.called.once;
    });

    it('calls parent handler if dialog is not cancelable', () => {
      const event = {};
      const spy = chai.spy.on(event, 'callParentHandler');

      dialog.onDeviceBackButton._callback(event);
      expect(spy).to.have.been.called.once;
    });
  });

  describe('#_cancel()', () => {
    it('hides the dialog if it is cancelable', () => {
      const spy = chai.spy.on(dialog, 'hide');
      dialog.setAttribute('cancelable', '');
      dialog._cancel();
      expect(spy).to.have.been.called.once;
    });
  });

  describe('#visible', () => {
    it('returns whether the dialog is visible or not', () => {
      expect(dialog.visible).to.be.false;
      dialog.show({animation: 'none'});
      expect(dialog.visible).to.be.true;
    });
  });

  describe('#registerAnimator()', () => {
    it('throws an error if animator is not a DialogAnimator', () => {
      expect(() => window.OnsAlertDialogElement.registerAnimator('hoge', 'hoge')).to.throw(Error);
    });

    it('registers a new animator', () => {
      class MyAnimator extends window.OnsAlertDialogElement.AlertDialogAnimator {
      }
      window.OnsAlertDialogElement.registerAnimator('hoge', MyAnimator);
    });
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = '<ons-alert-dialog>text</ons-alert-dialog>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });
});

  describe('autoStyling', () => {
    it('adds \'material\' modifier on Android', () => {
      ons.platform.select('android');
      const e = ons._util.createElement('<ons-alert-dialog>contents</ons-alert-dialog>');
      expect(e.getAttribute('modifier')).to.equal('material');
      ons.platform.select('');
    });
  });
