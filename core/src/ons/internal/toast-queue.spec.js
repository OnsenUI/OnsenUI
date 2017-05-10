'use strict';

describe('ToastQueue',() => {
  const ToastQueue = window.ons._internal.ToastQueue;
  beforeEach(() => {
    ToastQueue.queue = [];
  });

  it('provide \'ons._internal.ToastQueue\' global variable', function() {
    expect(!!window.ons._internal.ToastQueue).to.equal(true);
  });

  describe('add()', () => {
    it('adds functions to the queue', () => {
      expect(ToastQueue.queue).to.be.empy;
      const fn = () => {};
      ToastQueue.add(fn, Promise.resolve());
      expect(ToastQueue.queue).to.have.lengthOf(1);
      expect(ToastQueue.queue[0]).to.equal(fn);
    });

    it('finishes the queue', () => {
      const spy1 = chai.spy();
      const spy2 = chai.spy();
      ToastQueue.add(spy1, Promise.resolve());
      ToastQueue.add(spy2, Promise.resolve());

      const promise = new Promise((resolve) => {
        ToastQueue.add(resolve, Promise.resolve());
      });

      return expect(promise).to.be.eventually.fulfilled.then(() => {
        expect(spy1).to.have.been.called.once;
        expect(spy2).to.have.been.called.once;
        expect(ToastQueue.queue).to.be.empty;
      });
    });
  });
});

