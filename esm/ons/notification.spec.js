'use strict';

describe('ons.notification', () => {
  it('exists', () => {
    expect(ons.notification).to.be.ok;
  });

  describe('#alert()', () => {
    let dialog,
      resolvePromise;

    const callback = chai.spy();

    beforeEach(() => {
      resolvePromise = ons.notification.alert({message: 'hoge', modifier: 'fuga', maskColor: 'rgb(24, 134, 211)', cancelable: true, callback: callback});
      dialog = document.body.querySelector('ons-alert-dialog');
    });

    afterEach(() => {
      dialog.remove();
      dialog = null;
    });

    it('requires a message', () => {
      expect(ons.notification.alert()).to.eventually.be.rejected;
      expect(() => ons.notification.alert('test')).to.be.ok;
    });

    it('accepts a \'messageHTML\' parameter', () => {
      const message = '<strong>hoge</strong>';
      ons.notification.alert({messageHTML: message, id: 'test'});
      const dialog = document.getElementById('test');
      expect(dialog.innerHTML.indexOf(message)).to.be.above(-1);
      dialog.remove();
    });

    it('displays an alert dialog', () => {
      expect(dialog).to.be.ok;
      expect(dialog.innerHTML.indexOf('hoge')).to.be.above(-1);
    });

    it('accepts a \'modifier\' parameter', () => {
      expect(dialog.getAttribute('modifier').indexOf('fuga')).to.be.above(-1);
    });

    it('hides the dialog when a button is clicked', () => {
      const button = dialog.querySelector('ons-alert-dialog-button');
      const event = new CustomEvent('click');
      const spy = chai.spy.on(dialog, 'hide');
      button.dispatchEvent(event);
      expect(spy).to.have.been.called.once;
    });

    it('accepts a \'cancelable\' attribute', () => {
      const event = new CustomEvent('dialog-cancel');
      dialog.dispatchEvent(event);
      expect(callback).to.have.been.called.with(-1);
    });

    it('resolves to the pressed button index', (done) => {
      resolvePromise.then(index => {
        expect(index).to.equal(0);
        done();
      });

      dialog.querySelector('ons-alert-dialog-button').click();
    });

    it('throws an error if AlertDialog is not imported', () => {
      const alertDialog = ons.elements.AlertDialog;
      ons.elements.AlertDialog = undefined;
      expect(ons.notification.alert('test')).to.eventually.be.rejected;
      ons.elements.AlertDialog = alertDialog;
    });

    it('sets the maskColor', () => {
      const maskEl = dialog.querySelector('.alert-dialog-mask');
      const color = window.getComputedStyle(maskEl)['background-color'];

      expect(color).to.equal('rgb(24, 134, 211)');
    });
  });

  describe('#confirm()', () => {
    let dialog,
      resolvePromise;

    const callback = chai.spy();

    beforeEach(() => {
      resolvePromise = ons.notification.confirm({message: 'hoge', modifier: 'fuga', maskColor: 'rgb(24, 134, 211)', cancelable: true, callback: callback});
      dialog = document.body.querySelector('ons-alert-dialog');
    });

    afterEach(() => {
      dialog.remove();
      dialog = null;
    });

    it('requires a message', () => {
      expect(ons.notification.confirm()).to.eventually.be.rejected;
    });

    it('accepts a \'messageHTML\' parameter', () => {
      const message = '<strong>hoge</strong>';
      ons.notification.confirm({messageHTML: message, id: 'test'});
      const dialog = document.getElementById('test');
      expect(dialog.innerHTML.indexOf(message)).to.be.above(-1);
      dialog.remove();
    });

    it('displays an alert dialog', () => {
      expect(dialog).to.be.ok;
      expect(dialog.innerHTML.indexOf('hoge')).to.be.above(-1);
    });

    it('accepts a \'modifier\' parameter', () => {
      expect(dialog.getAttribute('modifier').indexOf('fuga')).to.be.above(-1);
    });

    it('hides the dialog when a button is clicked', () => {
      const button = dialog.querySelector('ons-alert-dialog-button');
      const event = new CustomEvent('click');
      const spy = chai.spy.on(dialog, 'hide');
      button.dispatchEvent(event);
      expect(spy).to.have.been.called.once;
    });

    it('accepts a \'cancelable\' attribute', () => {
      const event = new CustomEvent('dialog-cancel');
      dialog.dispatchEvent(event);
      expect(callback).to.have.been.called.with(-1);
    });

    it('resolves to the pressed button index', (done) => {
      resolvePromise.then(index => {
        expect(index).to.equal(0);
        done();
      });

      dialog.querySelector('ons-alert-dialog-button').click();
    });

    it('sets the maskColor', () => {
      const maskEl = dialog.querySelector('.alert-dialog-mask');
      const color = window.getComputedStyle(maskEl)['background-color'];

      expect(color).to.equal('rgb(24, 134, 211)');
    });
  });

  describe('#prompt()', () => {
    let dialog,
      resolvePromise;

    const callback = chai.spy();

    beforeEach(() => {
      resolvePromise = ons.notification.prompt({message: 'hoge', modifier: 'fuga', maskColor: 'rgb(24, 134, 211)', submitOnEnter: true, cancelable: true, callback: callback});
      dialog = document.body.querySelector('ons-alert-dialog');
    });

    afterEach(() => {
      dialog.remove();
      dialog = null;
    });

    it('requires a message', () => {
      expect(ons.notification.prompt()).to.eventually.be.rejected;
    });

    it('accepts a \'messageHTML\' parameter', () => {
      const message = '<strong>hoge</strong>';
      ons.notification.prompt({messageHTML: message, id: 'test'});
      const dialog = document.getElementById('test');
      expect(dialog.innerHTML.indexOf(message)).to.be.above(-1);
      dialog.remove();
    });

    it('accepts a \'inputType\' parameter', () => {
      ons.notification.prompt({message: 'test', id: 'test', inputType: 'password'});
      const dialog = document.getElementById('test');
      expect(dialog.querySelector('.text-input').type).to.equal('password');
      dialog.remove();
    });

    it('displays an alert dialog', () => {
      expect(dialog).to.be.ok;
      expect(dialog.innerHTML.indexOf('hoge')).to.be.above(-1);
    });

    it('accepts a \'modifier\' parameter', () => {
      expect(dialog.getAttribute('modifier').indexOf('fuga')).to.be.above(-1);
    });

    it('accepts a \'submitOnEnter\' parameter', () => {
      const input = dialog.querySelector('input');
      const event = new CustomEvent('keypress');
      event.keyCode = 13;

      const spy = chai.spy.on(dialog, 'hide');

      input.dispatchEvent(event);
      expect(spy).to.have.been.called.once;
    });

    it('hides the dialog when a button is clicked', () => {
      const button = dialog.querySelector('ons-alert-dialog-button');
      const event = new CustomEvent('click');
      const spy = chai.spy.on(dialog, 'hide');
      button.dispatchEvent(event);
      expect(spy).to.have.been.called.once;
    });

    it('accepts a \'cancelable\' attribute', () => {
      const event = new CustomEvent('dialog-cancel');
      dialog.dispatchEvent(event);
      expect(callback).to.have.been.called.with(null);
    });

    it('resolves to the input value', (done) => {
      resolvePromise.then(value => {
        expect(value).to.equal('42');
        done();
      });

      dialog.querySelector('input').value = 42;
      dialog.querySelector('ons-alert-dialog-button').click();
    });

    it('sets the maskColor', () => {
      const maskEl = dialog.querySelector('.alert-dialog-mask');
      const color = window.getComputedStyle(maskEl)['background-color'];

      expect(color).to.equal('rgb(24, 134, 211)');
    });
  });

  describe('#toast()', () => {
    let dialog,
      resolvePromise;

    const callback = chai.spy();

    beforeEach(() => {
      resolvePromise = ons.notification.toast({message: 'hoge', buttonLabel: 'test', modifier: 'fuga', callback: callback, force: true});
      dialog = document.body.querySelector('ons-toast');
    });

    afterEach(() => {
      dialog.remove();
      dialog = null;
    });

    it('requires a message', () => {
      expect(ons.notification.toast({force: true})).to.eventually.be.rejected;
      expect(() => ons.notification.toast('test', {force: true})).to.be.ok;
    });

    it('displays a toast', () => {
      expect(dialog).to.be.ok;
      expect(dialog.innerHTML.indexOf('hoge')).to.be.above(-1);
    });

    it('accepts a \'modifier\' parameter', () => {
      expect(dialog.getAttribute('modifier').indexOf('fuga')).to.be.above(-1);
    });

    it('hides the toast when the button is clicked', () => {
      const button = dialog.querySelector('button');
      const event = new CustomEvent('click');
      const spy = chai.spy.on(dialog, 'hide');
      button.dispatchEvent(event);
      expect(dialog.style.display).to.equal('none');
    });

    it('resolves to the pressed button index', (done) => {
      resolvePromise.then(index => {
        expect(index).to.equal(0);
        done();
      });

      dialog.querySelector('button').click();
    });

    it('accepts a \'timeout\' attribute and resolves', () => {
      return ons.notification.toast({message: 'hoge', timeout: 10, force: true}).then(index => {
        expect(index).to.equal(-1);
      });
    });

    it('throws an error if Toast is not imported', () => {
      const toast = ons.elements.Toast;
      ons.elements.Toast = undefined;
      expect(ons.notification.toast('test')).to.eventually.be.rejected;
      ons.elements.Toast = toast;
    });
  });

  describe('autoStyling', () => {
    it('adds \'material\' modifier on Android', () => {
      ons.platform.select('android');
      ons.notification.alert({message: 'test', id: 'test'});
      const dialog = document.getElementById('test');
      expect(dialog.getAttribute('modifier')).to.equal('material');
      ons.platform.select('');
      dialog.remove();
    });

    it('removes \'material\' modifier on iOS', () => {
      ons.platform.select('ios');
      ons.notification.alert({message: 'test', id: 'test'});
      const dialog = document.getElementById('test');
      expect(dialog.getAttribute('modifier')).not.to.equal('material');
      ons.platform.select('');
      dialog.remove();
    });
  });
});
