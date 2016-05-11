'use strict';

describe('OnsPageElement', () => {
  let element;

  beforeEach(() => {
    element = ons._util.createElement('<ons-page>content</ons-page>');
  });

  afterEach(() => {
    element.remove();
    element = null;
  });

  it('should exist', () => {
    expect(window.OnsPageElement).to.be.ok;
  });

  it('has page class', () => {
    expect(element.classList.contains('page')).to.be.true;
  });

  describe('#attachedCallback()', () => {
    it('fires \'init\' event', () => {
      var initPromise = new Promise(function(resolve, reject) {
        document.addEventListener('init', resolve);
      });
      document.body.appendChild(element);
      expect(element.parentNode).to.be.ok;
      return expect(initPromise).to.eventually.be.fulfilled;
    });

    it('consumes _skipinit attribute if present', () => {
      element.setAttribute('_skipinit', '');
      expect(element.hasAttribute('_skipinit')).to.be.true;
      document.body.appendChild(element);
      expect(element.hasAttribute('_skipinit')).to.be.false;
    });
  });

  describe('#_tryToFillStatusBar()', (done) => {
    it('fills status bar', () => {
      var tmp = ons._internal.autoStatusBarFill;
      ons._internal.autoStatusBarFill = action => action();
      element._tryToFillStatusBar();
      expect(element.hasAttribute('status-bar-fill')).to.be.true;
      ons._internal.autoStatusBarFill = tmp;
    });
  });

  describe('#detachedCallback', () => {
    it('fires \'destroy\' event', () => {
      var spy = chai.spy();
      document.addEventListener('destroy', spy);
      document.body.appendChild(element);
      element._destroy();
      expect(element.parentNode).not.to.be.ok;
      expect(spy).to.have.been.called.once;
    });
  });

  describe('#onDeviceBackButton', () => {
    it('sets the callback', () => {
      expect(element._backButtonHandler).not.to.be.ok;
      element.onDeviceBackButton = () => { return; };
      expect(element._backButtonHandler).to.be.ok;
    });

    it('overwrites the callback', () => {
      expect(element._backButtonHandler).not.to.be.ok;
      element.onDeviceBackButton = () => { return; };
      expect(element._backButtonHandler).to.be.ok;

      var spy = chai.spy.on(element._backButtonHandler, 'destroy');
      element.onDeviceBackButton = () => { return; };
      expect(element._backButtonHandler).to.be.ok;
      expect(spy).to.have.been.called.once;
    });

    it('is correctly deleted', () => {
      element.onDeviceBackButton = () => { return; };
      expect(element._backButtonHandler).to.be.ok;

      element._destroy();
      expect(element.parentNode).not.to.be.ok;
    });
  });

  describe('#_canAnimateToolbar()', () => {
    it('works with normal toolbar', () => {
      expect(element._canAnimateToolbar()).to.be.false;
      element.insertBefore(new OnsToolbarElement(), element.childNodes[0]);
      expect(element._canAnimateToolbar()).to.be.true;
    });
  });

  describe('#attributeChangedCallback()', () => {
    it('triggers \'onModifierChanged()\' method', () => {
      var spy = chai.spy.on(ons._internal.ModifierUtil, 'onModifierChanged');
      element.attributeChangedCallback('modifier', 'fuga', 'piyo');
      expect(spy).to.have.been.called.once;
    });

    it('sets _onInfiniteScroll', () => {
      let i = 0;
      window._testApp = {
        a: () => i += 42
      };
      element.attributeChangedCallback('on-infinite-scroll', '', '_testApp.a');
      element._onInfiniteScroll();
      expect(i).to.equal(42);
      delete window._testApp;
      expect(element._onInfiniteScroll).to.be.ok;
      element._onInfiniteScroll();
      expect(i).to.equal(84);
    });

    it('infiniteScroll doesn\'t throw error until it\'s called', () => {
      const app = {a: () => 42};
      element.attributeChangedCallback('on-infinite-scroll', '', '_testApp.a');
      window._testApp = app;
      expect(() => element._onInfiniteScroll()).to.not.throw(Error);
      element.attributeChangedCallback('on-infinite-scroll', '', 'doge');
      expect(() => element._onInfiniteScroll()).to.throw(Error);
      delete window._testApp;
    });
  });

  describe('#_show()', () => {
    it('fires \'show\' event', () => {
      var showPromise = new Promise(resolve => {
        document.addEventListener('show', resolve);
      });
      document.body.appendChild(element);
      return expect(showPromise).to.eventually.be.fulfilled;
    });
  });

  describe('#_hide()', () => {
    it('fires \'hide\' event', () => {
      var spy = chai.spy();
      document.addEventListener('hide', spy);
      document.body.appendChild(element);
      element._isShown = true;
      element._hide();
      expect(spy).to.have.been.called.once;
    });
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = '<ons-page></ons-page>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });

  describe('autoStyling', () => {
    it('adds \'material\' modifier on Android', () => {
      ons.platform.select('android');
      const e = ons._util.createElement('<ons-page>content</ons-page>');
      expect(e.getAttribute('modifier')).to.equal('material');
      ons.platform.select('');
    });
  });

  describe('infiniteScroll', () => {
    var content, page, i, maxScroll;
    beforeEach(() => {
      i = 0;
      page = element;
      content = page._content;
      document.body.appendChild(page);
      content.innerHTML = '<div style="height: ' + (2 * content.clientHeight) + 'px"></div>';
      maxScroll = content.scrollHeight - content.clientHeight;
    });

    afterEach(() => {
      document.body.removeChild(page);
    });

    it('throws error on invalid input', () => {
      expect(() => element.onInfiniteScroll = 5).to.throw(Error);
      expect(() => element.onInfiniteScroll = []).to.throw(Error);
      expect(() => element.onInfiniteScroll = {}).to.throw(Error);
      expect(() => element.onInfiniteScroll = () => 42).to.not.throw(Error);
    });

    it('calls onInfiniteScroll', (done) => {
      element.onInfiniteScroll = done => {
        i++;
        done();
      };
      content.scrollTop = 0.95 * maxScroll;
      setTimeout(() => {
        expect(i).to.equal(1);
        done();
      }, 50);
    });

    it('waits for onInfiniteScroll to finish', (done) => {
      element.onInfiniteScroll = (done) => {
        i++;
        setTimeout(done, 200);
      };
      content.scrollTop = 0.95 * maxScroll;
      setTimeout(element._boundOnScroll, 50);
      setTimeout(element._boundOnScroll, 150);
      setTimeout(element._boundOnScroll, 250);

      setTimeout(() => {
        expect(i).to.equal(2);
        done();
      }, 300);
    });
  });
});

