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
    expect(window.ons.elements.Page).to.be.ok;
  });

  it('has page class', () => {
    expect(element.classList.contains('page')).to.be.true;
    element.setAttribute('class', 'foo');
    expect(element.classList.contains('page')).to.be.true;
    expect(element.classList.contains('foo')).to.be.true;
  });

  it('should fill class name automatically on content wrapper element', () => {
    const page = ons._util.createElement(`<ons-page>
      <div class="content">...</div>
    </ons-page>`);

    expect(page.querySelector('.page__content').textContent).to.be.equal('...');
  });

  it('should fill class name automatically on background element', () => {
    const page = ons._util.createElement(`<ons-page>
      <div class="background" id="test">...</div>
    </ons-page>`);

    expect(page.querySelector('.page__background').id).to.be.equal('test');
  });

  it('should create background element automatically', () => {
    const page = ons._util.createElement(`<ons-page>
      <div class="page__content">...</div>
    </ons-page>`);
    expect(page.querySelector('.page__background')).to.be.ok;
  });

  it('should have hidden background if is a wrapper', () => {
    const page = ons._util.createElement(`
      <ons-page>
        <div class="page__background"></div>
        <ons-page id="inner"><div class="page__background"></div></ons-page>
      </ons-page>`);
    expect(page.className).to.contain('page--wrapper');
    expect(page.querySelector('#inner').className).not.to.contain('page--wrapper');
  });

  it('should add an extra class if there is a bottom toolbar', () => {
    const page = ons._util.createElement(`<ons-page>
      <div class="page__content">...</div>
      <ons-bottom-toolbar></ons-bottom-toolbar>
    </ons-page>`);

    expect(page.className).to.contain('page-with-bottom-toolbar');
  });

  describe('#attachedCallback()', () => {
    it('calls \'onInit\' hook', () => {
      const p = new Promise((resolve) => element.onInit = resolve);
      document.body.appendChild(element);
      return expect(p).to.eventually.be.fulfilled;
    });

    it('throws error if \'onInit\' is not a function', () => {
      expect(() => element.onInit = 'something').to.throw('function');
    });

    it('fires \'init\' event', () => {
      const initPromise = new Promise(function(resolve, reject) {
        const resolveOnce = () => {
          element.removeEventListener('init', resolveOnce);
          resolve();
        };

        element.addEventListener('init', resolveOnce);
      });
      document.body.appendChild(element);
      expect(element.parentNode).to.be.ok;
      return expect(initPromise).to.eventually.be.fulfilled;
    });

    it('fires \'init\' event only once', (done) => {
      const spy = chai.spy();

      const page = ons._util.createElement(`<ons-page>
        <div class="content">...</div>
      </ons-page>`);
      page.addEventListener('init', spy);

      document.body.appendChild(page);
      setImmediate(() => {
        page.remove();
        setImmediate(() => {
          document.body.appendChild(page);
          setImmediate(() => {
            expect(spy).to.have.been.called.once;
            page.removeEventListener('init', spy);
            page.remove();
            done();
          });
        });
      });
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
      element.addEventListener('destroy', spy);
      document.body.appendChild(element);
      element._destroy();
      expect(element.parentNode).not.to.be.ok;
      expect(spy).to.have.been.called.once;
      element.removeEventListener('destroy', spy);
    });

    it('calls \'onDestroy\' hook', () => {
      const spy = chai.spy();
      element.onDestroy = spy;
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

  describe('#_getBackgroundElement()', () => {
    it('gets page__background', () => {
      expect(() => element._getBackgroundElement()).not.to.throw(Error);
    });

    it('throws page__background error', () => {
      element.removeChild(element.getElementsByClassName('page__background')[0]);
      expect(() => element._getBackgroundElement()).to.throw(Error);
    });
  });

  describe('#_getContentElement()', () => {
    it('throws page__content error', () => {
      element.removeChild(element.getElementsByClassName('page__content')[0]);
      expect(() => element._getContentElement()).to.throw(Error);
    });
  });

  describe('#_canAnimateToolbar()', () => {
    it('works with normal toolbar', () => {
      expect(element._canAnimateToolbar()).to.be.false;
      element.insertBefore(new ons.elements.Toolbar(), element.children[0]);
      expect(element._canAnimateToolbar()).to.be.true;
    });

    it('works with toolbar in page__content', () => {
      expect(element._canAnimateToolbar()).to.be.false;
      element.lastChild.appendChild(new ons.elements.Toolbar());
      expect(element._canAnimateToolbar()).to.be.true;
    });
  });

  describe('#attributeChangedCallback()', () => {
    it('triggers \'onModifierChanged()\' method', () => {
      var spy = chai.spy.on(ons._internal.ModifierUtil, 'onModifierChanged');
      element.attributeChangedCallback('modifier', 'fuga', 'piyo');
      expect(spy).to.have.been.called.once;
      chai.spy.restore(ons._internal.ModifierUtil, 'onModifierChanged');
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
    it('fires \'show\' event when attached if page is standalone', () => {
      const showPromise = new Promise(function(resolve, reject) {
        const resolveOnce = () => {
          element.removeEventListener('show', resolveOnce);
          resolve();
        };

        element.addEventListener('show', resolveOnce);
      });
      document.body.appendChild(element);
      expect(element.parentNode).to.be.ok;
      return expect(showPromise).to.eventually.be.fulfilled;
    });

    it('calls \'onShow\' hook', () => {
      const p = new Promise((resolve) => element.onShow = resolve);
      document.body.appendChild(element);
      return expect(p).to.eventually.be.fulfilled;
    });
  });

  describe('#_hide()', () => {
    it('fires \'hide\' event', () => {
      var spy = chai.spy();
      element.addEventListener('hide', spy);
      document.body.appendChild(element);
      element._isShown = true;
      element._hide();
      expect(spy).to.have.been.called.once;
      element.removeEventListener('hide', spy);
    });

    it('calls \'onHide\' hook', () => {
      const spy = chai.spy();
      element.onHide = spy;
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

    it('adds elements in correct order', () => {
      const div = document.createElement('div');
      div.innerHTML = '<ons-page><span>test</span><ons-toolbar></ons-toolbar></ons-page>';
      const elements = div.children[0].children;
      expect(elements[0].tagName.toLowerCase()).to.equal('ons-toolbar');
      expect(elements[1].className).to.equal('page__background');
      expect(elements[2].className).to.equal('page__content');
    });
  });

  describe('#_elementShouldBeMoved()', () => {

    it('ignores .page__background', () => {
      const el = selector => ons._util.create(selector);
      expect(element._elementShouldBeMoved(el('.page__background'))).to.be.false;
      expect(element._elementShouldBeMoved(el('.page__doge'))).to.be.true;
      expect(element._elementShouldBeMoved(el('.doge__doge'))).to.be.true;
    });

    it('handles fabs accordingly', () => {
      const toolbar = document.createElement('ons-fab');
      expect(element._elementShouldBeMoved(toolbar)).to.be.true;
      toolbar.setAttribute('position', 'top right');
      expect(element._elementShouldBeMoved(toolbar)).to.be.false;
    });

    it('moves inline elements', () => {
      const toolbar = document.createElement('ons-toolbar');
      expect(element._elementShouldBeMoved(toolbar)).to.be.false;
      toolbar.setAttribute('inline', '');
      expect(element._elementShouldBeMoved(toolbar)).to.be.true;
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
      content = page._getContentElement();
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
      setImmediate(() => content.scrollTop = 0.95 * maxScroll);
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
      setImmediate(() => content.scrollTop = 0.95 * maxScroll);
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

