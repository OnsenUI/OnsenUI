'use strict';

describe('deviceBackButtonDispatcher', () => {
  describe('#createHandler()', () => {
    it('throws an error if the first parameter is not an HTMLElement', () => {
      expect(() => ons._internal.dbbDispatcher.createHandler('just a string')).to.throw(Error);
    });

    it('throws an error if the first parameter is not a function', () => {
      expect(() => ons._internal.dbbDispatcher.createHandler(document.createElement('div'), 'just a string')).to.throw(Error);
    });

    it('disables the handler', () => {
      const handler = ons._internal.dbbDispatcher.createHandler(document.createElement('div'), () => { return; });
      expect(handler.isEnabled()).to.be.true;
      handler.disable();
      expect(handler.isEnabled()).to.be.false;
    });
  });

  describe('#_callback() default', () => {
    it('exits the app', () => {
      navigator.app = {};
      navigator.app.exitApp = () => { return; };
      const spy = chai.spy.on(navigator.app, 'exitApp');
      ons._internal.dbbDispatcher._callback();
      expect(spy).to.have.been.called.once;
    });
  });

  describe('#fireDeviceBackButtonEvent()', () => {
    it('fires \'backbutton\' event', () => {
      const promise = new Promise((resolve) => {
        document.addEventListener('backbutton', () => { resolve(); });
      });

      ons._internal.dbbDispatcher.fireDeviceBackButtonEvent();

      return expect(promise).to.eventually.be.fulfilled;
    });
  });
});
