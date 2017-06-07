'use strict';

describe('OnsTabbarElement', () => {
  let element, template, template2;

  beforeEach(done => {
    template = ons._util.createElement('<template id="hoge"><ons-page>hogehoge</ons-page></template>');
    template2 = ons._util.createElement('<template id="fuga"><ons-page>fugafuga</ons-page></template>');
    element = new ons.TabbarElement();
    document.body.appendChild(template);
    document.body.appendChild(template2);
    ons._contentReady(element, done);
  });

  afterEach(() => {
    template.remove();
    template2.remove();
    element.remove();
    template = template2 = element = null;
  });

  it('should exist', () => {
    expect(window.ons.TabbarElement).to.be.ok;
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

  it('has two children by default', () => {
    expect(element.children[0]).to.be.ok;
    expect(element.children[1]).to.be.ok;
    expect(element.children[2]).not.to.be.ok;

    expect(element.children[0].classList.contains('ons-tabbar__content')).to.be.true;
    expect(element.children[0].classList.contains('tabbar__content')).to.be.true;

    expect(element.children[1].classList.contains('tabbar')).to.be.true;
    expect(element.children[1].classList.contains('ons-tabbar__footer')).to.be.true;
  });

  describe('#getTabbarId()', () => {
    it('provides a unique auto generated id', () => {
      expect(element.getTabbarId()).to.be.ok;
    });
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
      expect(topElement._getTabbarElement().style.display).to.equal('');
      expect(bottomElement._contentElement.style.bottom).to.equal('');
      expect(bottomElement._getTabbarElement().style.display).to.equal('');

      topElement.setTabbarVisibility(false);
      bottomElement.setTabbarVisibility(false);
      expect(topElement._contentElement.style.top).to.equal('0px');
      expect(topElement._getTabbarElement().style.display).to.equal('none');
      expect(bottomElement._contentElement.style.bottom).to.equal('0px');
      expect(bottomElement._getTabbarElement().style.display).to.equal('none');

      topElement.setTabbarVisibility(true);
      bottomElement.setTabbarVisibility(true);
      expect(topElement._contentElement.style.top).to.equal('');
      expect(topElement._getTabbarElement().style.display).to.equal('');
      expect(bottomElement._contentElement.style.bottom).to.equal('');
      expect(bottomElement._getTabbarElement().style.display).to.equal('');

      div.remove();
    });
  });


  describe('#_getCurrentPageElement()', () => {
    it('accepts only \'ons-page\' as current page element', () => {
      const page = new ons.PageElement();
      element._contentElement.appendChild(page);
      expect(element._getCurrentPageElement().classList.contains('page')).to.be.true;
      expect(element._getCurrentPageElement.bind(element)).not.to.throw('Invalid state: page element must be a "ons-page" element.');

      element._contentElement.removeChild(element._contentElement.querySelector('ons-page'));
      const button = new ons.ButtonElement();
      element._contentElement.appendChild(button);
      expect(element._getCurrentPageElement.bind(element)).to.throw('Invalid state: page element must be a "ons-page" element.');
    });
  });

  describe('#getActiveTabIndex()', () => {
    it('has active tab property', function(done) {
      const div = document.createElement('div');
      document.body.appendChild(div);
      div.innerHTML = `
        <template id="page1"></template>
        <template id="page2"></template>
        <ons-tabbar id="myTabbar">
          <ons-tab id="tab1" page="page1"></ons-tab>
          <ons-tab id="tab2" page="page2"></ons-tab>
        </ons-tabbar>
      `;

      setImmediate(() => {
        const element = document.getElementById('myTabbar');
        expect(element.getActiveTabIndex()).to.equal(-1);

        document.getElementById('tab1').click();
        expect(element.getActiveTabIndex()).to.equal(0);

        document.getElementById('tab2').click();
        expect(element.getActiveTabIndex()).to.equal(1);

        div.remove();
        done();
      });
    });
  });

  describe('events', () => {
    let template, element;

    beforeEach(() => {
      template = ons._util.createElement('<template id="page1"><ons-page>Page1</ons-page></template>');
      element = ons._util.createElement(`
        <ons-tabbar>
          <ons-tab label="Page 1" page="page1" no-reload></ons-tab>
          <ons-tab label="Page 2" page="page1" no-reload></ons-tab>
        </ons-tabbar>
      `);
      document.body.appendChild(template);
      document.body.appendChild(element);
    });

    afterEach(() => {
      template.remove();
      element.remove();
      template = element = null;
    });

    it('fires \'prechange\' event', () => {
      const promise = new Promise((resolve) => {
        element.addEventListener('prechange', resolve);
      });
      element.setActiveTab(0);
      return expect(promise).to.eventually.be.fulfilled;
    });

    it('fires \'postchange\' event', () => {
      const promise = new Promise((resolve) => {
        element.addEventListener('postchange', resolve);
      });
      element.setActiveTab(0);
      return expect(promise).to.eventually.be.fulfilled;
    });

    it('fires \'reactive\' event', () => {
      const promise = new Promise((resolve) => {
        element.addEventListener('reactive', resolve);
      });
      element.setActiveTab(0);
      element.setActiveTab(0);
      return expect(promise).to.eventually.be.fulfilled;
    });
  });

  describe('propagate API', () => {
    let template, element;

    beforeEach(() => {
      template = ons._util.createElement('<template id="page1"><ons-page>Page1</ons-page></template>');
      element = ons._util.createElement(`
        <ons-tabbar>
          <ons-tab label="Page 1" page="page1"></ons-tab>
          <ons-tab label="Page 2" page="page1"></ons-tab>
        </ons-tabbar>
      `);
      document.body.appendChild(template);
      document.body.appendChild(element);
    });

    afterEach(() => {
      template.remove();
      element.remove();
      template = element = null;
    });

    it('fires \'init\' event', () => {
      const promise = new Promise((resolve) => {
        element.addEventListener('init', resolve);
      });
      element.setActiveTab(0);
      return expect(promise).to.eventually.be.fulfilled;
    });

    it('fires \'show\' event', () => {
      const promise = new Promise((resolve) => {
        element.addEventListener('show', resolve);
      });
      element.setActiveTab(0);
      return expect(promise).to.eventually.be.fulfilled;
    });

    it('fires \'hide\' event', () => {
      const promise = new Promise((resolve) => {
        element.addEventListener('hide', resolve);
      });

      return element.setActiveTab(0).then(function() {
        element.setActiveTab(1);
        return expect(promise).to.eventually.be.fulfilled;
      });
    });
  });

  describe('#setActiveTab()', () => {
    it('rejects the promise if index does not exist', () => {
      return expect(element.setActiveTab(0)).to.eventually.be.rejected;
    });

    it('can be canceled', (done) => {
      const element = ons._util.createElement(`
        <ons-tabbar>
          <ons-tab label="Hoge" page="hoge"></ons-tab>
          <ons-tab label="Fuga" page="fuga"></ons-tab>
        </ons-tabbar>
      `);

      element.setActiveTab(1);

      element.addEventListener('prechange', (event) => {
        event.detail.cancel();
        done();
      });

      expect(element.setActiveTab(0)).to.be.false;
    });

    onlyChrome(it)('does not remove tabs', (done) => {
      const element = ons._util.createElement(`
        <ons-tabbar>
          <ons-tab label="Hoge" page="hoge"></ons-tab>
          <ons-tab label="fuga" page="fuga"></ons-tab>
        </ons-tabbar>
      `);

      element.setActiveTab(0);

      setImmediate(() => {
        const tmp = element._getCurrentPageElement();
        element.setActiveTab(1, {'callback': () => {
          expect(tmp.style.display).to.equal('none');
          done();
        }, 'animation': 'none'});
      });
    });

    it('returns a promise that resolves to the new page', () => {
      const element = ons._util.createElement(`
        <ons-tabbar>
          <ons-tab label="Hoge" page="hoge" active="true"></ons-tab>
          <ons-tab label="Fuga" page="fuga"></ons-tab>
        </ons-tabbar>
      `);

      expect(element.innerHTML.indexOf('fugafuga')).to.be.below(0);
      return expect(element.setActiveTab(1)).to.eventually.be.fulfilled.then(page => {
        expect(element.innerHTML.indexOf('fugafuga')).not.to.be.below(0);
        expect(page).to.equal(element._getCurrentPageElement());
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

  describe('#registerAnimator()', () => {
    it('throws an error if animator is not a TabbarAnimator', () => {
      expect(() => window.ons.TabbarElement.registerAnimator('hoge', 'hoge')).to.throw(Error);
    });

    it('registers a new animator', () => {
      class MyAnimator extends window.ons.TabbarElement.TabbarAnimator {
      }

      window.ons.TabbarElement.registerAnimator('hoge', MyAnimator);
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
