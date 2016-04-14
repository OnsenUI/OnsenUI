'use strict';

describe('content-ready', () => {
  const contentReady = ons._contentReady;

  it('should exist', () => {
    expect(window.ons._contentReady).to.be.ok;
  });

  it('should work normally on an element have single text node', () => {
    const element = document.createElement('div');
    element.appendChild(document.createTextNode('foobar'));

    let called = false;
    contentReady(element, () => {
      called = true;
    });
    assert(called);
  });

  it('should work normally on an element have empty contents', done => {
    const element = document.createElement('div');
    contentReady(element, done);
  });

  it('should consume callbacks orderly', done => {
    new Promise(resolve => {
      const element = document.createElement('div');
      let called = false;
      contentReady(element, () => {
        called = true;
      });
      contentReady(element, () => {
        assert(called);
        resolve();
      });
    }).then(done);
  });
});
