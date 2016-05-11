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
      resolvePromise = ons.notification.alert({message: 'hoge', modifier: 'fuga', cancelable: true, callback: callback});
      dialog = document.body.querySelector('ons-alert-dialog');
    });

    afterEach(() => {
      dialog.remove();
      dialog = null;
    });

    it('requires a message', () => {
      expect(() => ons.notification.alert()).to.throw(Error);
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
      const button = dialog.querySelector('button');
      const event = new CustomEvent('click');
      const spy = chai.spy.on(dialog, 'hide');
      button.dispatchEvent(event);
      expect(spy).to.have.been.called.once;
    });

    it('resolves to the pressed button index', (done) => {
      resolvePromise.then(index => {
        expect(index).to.equal(0);
        done();
      });

      dialog.querySelector('button').click();
    });
  });

  describe('#confirm()', () => {
    let dialog,
      resolvePromise;

    const callback = chai.spy();

    beforeEach(() => {
      resolvePromise = ons.notification.confirm({message: 'hoge', modifier: 'fuga', cancelable: true, callback: callback});
      dialog = document.body.querySelector('ons-alert-dialog');
    });

    afterEach(() => {
      dialog.remove();
      dialog = null;
    });

    it('requires a message', () => {
      expect(() => ons.notification.confirm()).to.throw(Error);
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
      const button = dialog.querySelector('button');
      const event = new CustomEvent('click');
      const spy = chai.spy.on(dialog, 'hide');
      button.dispatchEvent(event);
      expect(spy).to.have.been.called.once;
    });

    it('accepts a \'cancelable\' attribute', () => {
      const event = new CustomEvent('cancel');
      dialog.dispatchEvent(event);
      expect(callback).to.have.been.called.with(-1);
    });

    it('resolves to the pressed button index', (done) => {
      resolvePromise.then(index => {
        expect(index).to.equal(0);
        done();
      });

      dialog.querySelector('button').click();
    });
  });

  describe('#prompt()', () => {
    let dialog,
      resolvePromise;

    const callback = chai.spy();

    beforeEach(() => {
      resolvePromise = ons.notification.prompt({message: 'hoge', modifier: 'fuga', submitOnEnter: true, cancelable: true, callback: callback});
      dialog = document.body.querySelector('ons-alert-dialog');
    });

    afterEach(() => {
      dialog.remove();
      dialog = null;
    });

    it('requires a message', () => {
      expect(() => ons.notification.prompt()).to.throw(Error);
    });

    it('accepts a \'messageHTML\' parameter', () => {
      const message = '<strong>hoge</strong>';
      ons.notification.prompt({messageHTML: message, id: 'test'});
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

    it('accepts a \'submitOnEnter\' parameter', () => {
      const input = dialog.querySelector('input');
      const event = new CustomEvent('keypress');
      event.keyCode = 13;

      const spy = chai.spy.on(dialog, 'hide');

      input.dispatchEvent(event);
      expect(spy).to.have.been.called.once;
    });

    it('hides the dialog when a button is clicked', () => {
      const button = dialog.querySelector('button');
      const event = new CustomEvent('click');
      const spy = chai.spy.on(dialog, 'hide');
      button.dispatchEvent(event);
      expect(spy).to.have.been.called.once;
    });

    it('accepts a \'cancelable\' attribute', () => {
      const event = new CustomEvent('cancel');
      dialog.dispatchEvent(event);
      expect(callback).to.have.been.called.with(null);
    });

    it('resolves to the input value', (done) => {
      resolvePromise.then(value => {
        expect(value).to.equal('42');
        done();
      });

      dialog.querySelector('input').value = 42;
      dialog.querySelector('button').click();
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
