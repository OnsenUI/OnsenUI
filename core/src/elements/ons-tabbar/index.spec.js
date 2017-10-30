'use strict';

describe('OnsTabbarElement', () => {
  let element;

  beforeEach(done => {
    element = ons.createElement(`
      <ons-tabbar animation="none">
        <div class="tabbar__content">
          <div>
            <ons-page id="test-page1">hogehoge</ons-page>
            <ons-page id="test-page2">fugafuga</ons-page>
          </div>
        </div>
        <div class="tabbar">
          <ons-tab id="tab1" active></ons-tab>
          <ons-tab id="tab2"></ons-tab>
        </div>
      </ons-tabbar>
    `, { append: true });

    setImmediate(() => {
      element._show(); // Normally triggered by parent page
      setImmediate(done);
    });
  });

  afterEach(() => {
    element.remove();
    element = null;
  });

  it('should exist', () => {
    expect(window.ons.elements.Tabbar).to.be.ok;
  });

  it('provides \'modifier\' attribute', () => {
    document.body.appendChild(element);
    element.setAttribute('modifier', 'hoge');

    expect(element.children[0].classList.contains('tabbar--hoge__content')).to.be.true;
    expect(element.children[1].classList.contains('tabbar--hoge')).to.be.true;

    element.setAttribute('modifier', ' foo bar');
    expect(element.children[0].classList.contains('tabbar--foo__content')).to.be.true;
    expect(element.children[1].classList.contains('tabbar--foo')).to.be.true;
    expect(element.children[0].classList.contains('tabbar--bar__content')).to.be.true;
    expect(element.children[1].classList.contains('tabbar--bar')).to.be.true;
    expect(element.children[0].classList.contains('tabbar--hoge__content')).not.to.be.true;
    expect(element.children[1].classList.contains('tabbar--hoge')).not.to.be.true;

    element.children[0].classList.add('tabbar--piyo');
    element.children[1].classList.add('tabbar--piyo');
    element.setAttribute('modifier', 'fuga');
    expect(element.children[0].classList.contains('tabbar--piyo')).to.be.true;
    expect(element.children[1].classList.contains('tabbar--piyo')).to.be.true;
    expect(element.children[0].classList.contains('tabbar--fuga__content')).to.be.true;
    expect(element.children[1].classList.contains('tabbar--fuga')).to.be.true;
  });

  it('has \'position\' attribute', function(done) {
    var div = document.createElement('div');
    document.body.appendChild(div);
    ons.platform.select('android');
    div.innerHTML = `
      <ons-page>
        <ons-tabbar id="top" position="top">
        </ons-tabbar>
        <ons-tabbar id="bottom" position="bottom">
        </ons-tabbar>
        <ons-tabbar id="auto-android" position="auto">
        </ons-tabbar>
      </ons-page>
    `;

    ons.platform.select('');

    var topElement = document.getElementById('top');
    var bottomElement = document.getElementById('bottom');
    var autoAndroidElement = document.getElementById('auto-android');

    setImmediate(() => {
      expect(topElement.style.top).to.equal('0px');
      expect(bottomElement.style.top).not.to.equal('0px');
      expect(autoAndroidElement.style.top).to.equal('0px');

      expect(topElement._top).to.be.true;
      expect(bottomElement._top).not.to.be.true;
      expect(autoAndroidElement._top).to.be.true;

      expect(topElement.children[0].classList.contains('tabbar--top__content')).to.be.true;
      expect(bottomElement.children[0].classList.contains('tabbar--top__content')).not.to.be.true;
      expect(autoAndroidElement.children[0].classList.contains('tabbar--top__content')).to.be.true;

      expect(topElement.children[1].classList.contains('tabbar--top')).to.be.true;
      expect(bottomElement.children[1].classList.contains('tabbar--top')).not.to.be.true;
      expect(autoAndroidElement.children[1].classList.contains('tabbar--top')).to.be.true;

      div.remove();
      done();
    });
  });

  it('has two children by default', (done) => {
    const element = new ons.elements.Tabbar();
    ons._contentReady(element);

    setImmediate(() => {
      expect(element.children[0]).to.be.ok;
      expect(element.children[1]).to.be.ok;
      expect(element.children[2]).not.to.be.ok;

      expect(element.children[0].classList.contains('ons-tabbar__content')).to.be.true;
      expect(element.children[0].classList.contains('tabbar__content')).to.be.true;

      expect(element.children[1].classList.contains('tabbar')).to.be.true;
      expect(element.children[1].classList.contains('ons-tabbar__footer')).to.be.true;

      done();
    });
  });

  it('sets tab initial index if none is provided', () => {
    let element = ons.createElement(`<ons-tabbar><ons-tab label="t1"></ons-tab></ons-tabbar>`);
    expect(element.tabs[0].hasAttribute('active')).to.be.true;

    element = ons.createElement(`<ons-tabbar activeIndex="1"><ons-tab label="t1"></ons-tab><ons-tab label="t2"></ons-tab></ons-tabbar>`);
    expect(element.tabs[1].hasAttribute('active')).to.be.true;
  });

  describe('#setTabbarVisibility()', () => {
    it('sets the element visible or invisible', () => {
      var div = document.createElement('div');
      document.body.appendChild(div);
      div.innerHTML = `
        <ons-tabbar id="top" position="top">
        </ons-tabbar>
        <ons-tabbar id="bottom" position="bottom">
        </ons-tabbar>
      `;

      var topElement = document.getElementById('top');
      var bottomElement = document.getElementById('bottom');

      expect(topElement._contentElement.style.top).to.equal('');
      expect(topElement._tabbarElement.style.display).to.equal('');
      expect(bottomElement._contentElement.style.bottom).to.equal('');
      expect(bottomElement._tabbarElement.style.display).to.equal('');

      topElement.setTabbarVisibility(false);
      bottomElement.setTabbarVisibility(false);
      expect(topElement._contentElement.style.top).to.equal('0px');
      expect(topElement._tabbarElement.style.display).to.equal('none');
      expect(bottomElement._contentElement.style.bottom).to.equal('0px');
      expect(bottomElement._tabbarElement.style.display).to.equal('none');

      topElement.setTabbarVisibility(true);
      bottomElement.setTabbarVisibility(true);
      expect(topElement._contentElement.style.top).to.equal('');
      expect(topElement._tabbarElement.style.display).to.equal('');
      expect(bottomElement._contentElement.style.bottom).to.equal('');
      expect(bottomElement._tabbarElement.style.display).to.equal('');

      div.remove();
    });
  });


  describe('#topPage', () => {
    it('returns the current page', () => {
      expect(element.topPage.id).to.equal('test-page1');
      return element.setActiveTab(1).then(() => expect(element.topPage.id).to.equal('test-page2'));
    });
  });

  describe('#getActiveTabIndex()', () => {
    it('has active tab property', () => {
      expect(element.getActiveTabIndex()).to.equal(0);

      return element.setActiveTab(1).then(() => {
        expect(element.getActiveTabIndex()).to.equal(1);
        return element.setActiveTab(0).then(() => {
          expect(element.getActiveTabIndex()).to.equal(0);
          element.remove();
        });
      });
    });
  });

  describe('events', (done) => {
    it('fires \'prechange\' event', () => {
      const promise = new Promise((resolve) => {
        element.addEventListener('prechange', resolve);
      });
      element.setActiveTab(1);
      return expect(promise).to.eventually.be.fulfilled;
    });

    it('fires \'postchange\' event', () => {
      const promise = new Promise((resolve) => {
        element.addEventListener('postchange', resolve);
      });
      element.setActiveTab(1);
      return expect(promise).to.eventually.be.fulfilled;
    });

    it('fires \'reactive\' event', () => {
      const promise = new Promise((resolve) => {
        element.addEventListener('reactive', resolve);
      });
      element.setActiveTab(0);
      return expect(promise).to.eventually.be.fulfilled;
    });
  });

  describe('propagate API', () => {
    it('fires \'show\' event', () => {
      const promise = new Promise((resolve) => {
        element.addEventListener('show', resolve);
      });
      element.setActiveTab(1);
      return expect(promise).to.eventually.be.fulfilled.then(event => {
        expect(event.target).to.equal(element.pages[1]);
      });
    });

    it('fires \'hide\' event', () => {
      const promise = new Promise((resolve) => {
        element.addEventListener('hide', resolve);
      });

      element.setActiveTab(1);
      return expect(promise).to.eventually.be.fulfilled.then(event => {
        expect(event.target).to.equal(element.pages[0]);
      });
    });
  });

  describe('#setActiveTab()', () => {
    it('rejects the promise if index does not exist', () => {
      return expect(element.setActiveTab(element._tabbarElement.children.length)).to.eventually.be.rejected;
    });

    it('can be canceled', () => {
      element.addEventListener('prechange', e => e.cancel());
      return expect(element.setActiveTab(1)).to.eventually.be.rejected;
    });

    it('returns a promise that resolves to the new page', () => {
      expect(element.topPage).to.equal(element.pages[0]);
      return expect(element.setActiveTab(1)).to.eventually.be.fulfilled.then(page => {
        expect(page).to.equal(element.pages[1]);
        expect(page).to.equal(element.topPage);
        expect(page.id).to.equal('test-page2');
      });
    });
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = `
        <ons-tabbar>
          <ons-tab page="hoge">hoge</ons-tab>
          <ons-tab page="fuga">fuga</ons-tab>
        </ons-tabbar>
      `;
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });

  describe('#_updatePosition()', () => {
    [true, false].forEach(isTop => {
      it('fills status bar - ' + isTop, (done) => {
        const tmp = ons._internal.autoStatusBarFill;
        ons._internal.autoStatusBarFill = action => action();
        const element = ons._util.createElement(`<ons-tabbar position="${isTop ?  'top' : 'bottom'}"> </ons-tabbar>`);
        element._updatePosition();
        ons._internal.autoStatusBarFill = tmp;

        setTimeout(() => {
          expect(element.hasAttribute('status-bar-fill')).to.equal(isTop);
          done();
        }, 200);
      });
    });
  });

  describe('autoStyling', () => {
    it('adds \'material\' modifier on Android', done => {
      ons.platform.select('android');
      const element = document.createElement('ons-tabbar');
      setImmediate(() => {
        expect(element.getAttribute('modifier')).to.equal('material');
        ons.platform.select('');
        done();
      });
    });
  });
});
