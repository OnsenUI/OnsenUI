'use strict';

describe('OnsTabbarElement', () => {
  let element, template, template2;

  beforeEach(() => {
    template = ons._util.createElement('<ons-template id="hoge">hogehoge</ons-template>');
    template2 = ons._util.createElement('<ons-template id="fuga">fugafuga</ons-template>');
    element = new OnsTabbarElement();
    document.body.appendChild(template);
    document.body.appendChild(template2);
  });

  afterEach(() => {
    template.remove();
    template2.remove();
    element.remove();
    template = template2 = element = null;
  });

  it('should exist', () => {
    expect(window.OnsTabbarElement).to.be.ok;
  });

  it('provides \'modifier\' attribute', () => {
    document.body.appendChild(element);
    element.setAttribute('modifier', 'hoge');

    expect(element.children[0].classList.contains('tab-bar--hoge__content')).to.be.true;
    expect(element.children[1].classList.contains('tab-bar--hoge')).to.be.true;

    element.setAttribute('modifier', ' foo bar');
    expect(element.children[0].classList.contains('tab-bar--foo__content')).to.be.true;
    expect(element.children[1].classList.contains('tab-bar--foo')).to.be.true;
    expect(element.children[0].classList.contains('tab-bar--bar__content')).to.be.true;
    expect(element.children[1].classList.contains('tab-bar--bar')).to.be.true;
    expect(element.children[0].classList.contains('tab-bar--hoge__content')).not.to.be.true;
    expect(element.children[1].classList.contains('tab-bar--hoge')).not.to.be.true;

    element.children[0].classList.add('tab-bar--piyo');
    element.children[1].classList.add('tab-bar--piyo');
    element.setAttribute('modifier', 'fuga');
    expect(element.children[0].classList.contains('tab-bar--piyo')).to.be.true;
    expect(element.children[1].classList.contains('tab-bar--piyo')).to.be.true;
    expect(element.children[0].classList.contains('tab-bar--fuga__content')).to.be.true;
    expect(element.children[1].classList.contains('tab-bar--fuga')).to.be.true;
  });

  it('has \'position\' attribute', function(done) {
    var div = document.createElement('div');
    document.body.appendChild(div);
    div.innerHTML = `
      <ons-page>
        <ons-tabbar id="top" position="top">
        </ons-tabbar>
        <ons-tabbar id="bottom" position="bottom">
        </ons-tabbar>
      </ons-page>
    `;

    var topElement = document.getElementById('top');
    var bottomElement = document.getElementById('bottom');

    setImmediate(() => {
      expect(topElement.style.top).to.equal('0px');
      expect(bottomElement.style.top).not.to.equal('0px');

      expect(topElement._hasTopTabbar()).to.be.true;
      expect(bottomElement._hasTopTabbar()).not.to.be.true;

      expect(topElement.children[0].classList.contains('tab-bar--top__content')).to.be.true;
      expect(bottomElement.children[0].classList.contains('tab-bar--top__content')).not.to.be.true;

      expect((topElement.children[0]).hasAttribute('no-status-bar-fill')).to.be.true;
      expect((bottomElement.children[0]).hasAttribute('no-status-bar-fill')).not.to.be.true;

      expect(topElement.children[1].classList.contains('tab-bar--top')).to.be.true;
      expect(bottomElement.children[1].classList.contains('tab-bar--top')).not.to.be.true;

      done();
    });
  });

  it('has two children by default', () => {
    expect(element.children[0]).to.be.ok;
    expect(element.children[1]).to.be.ok;
    expect(element.children[2]).not.to.be.ok;

    expect(element.children[0].classList.contains('ons-tab-bar__content')).to.be.true;
    expect(element.children[0].classList.contains('tab-bar__content')).to.be.true;

    expect(element.children[1].classList.contains('tab-bar')).to.be.true;
    expect(element.children[1].classList.contains('ons-tab-bar__footer')).to.be.true;
    expect(element.children[1].classList.contains('ons-tabbar-inner')).to.be.true;
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
    });
  });


  describe('#_getCurrentPageElement()', () => {
    it('accepts only \'ons-page\' as current page element', () => {
      let page = new OnsPageElement();
      element._contentElement.appendChild(page);
      expect(element._getCurrentPageElement().classList.contains('page')).to.be.true;
      expect(element._getCurrentPageElement.bind(element)).not.to.throw('Invalid state: page element must be a "ons-page" element.');

      element._contentElement.removeChild(element._contentElement.querySelector('ons-page'));
      let button = new OnsButtonElement();
      element._contentElement.appendChild(button);
      expect(element._getCurrentPageElement.bind(element)).to.throw('Invalid state: page element must be a "ons-page" element.');
    });
  });

  describe('#getActiveTabIndex()', () => {
    it('has active tab property', function(done) {
      let div = document.createElement('div');
      document.body.appendChild(div);
      div.innerHTML = `
        <ons-template id="page1"></ons-template>
        <ons-template id="page2"></ons-template>
        <ons-tabbar id="myTabbar">
          <ons-tab id="tab1" page="page1"></ons-tab>
          <ons-tab id="tab2" page="page2"></ons-tab>
        </ons-tabbar>
      `;

      setImmediate(() => {
        let element = document.getElementById('myTabbar');
        expect(element.getActiveTabIndex()).to.equal(-1);

        document.getElementById('tab1').click();
        expect(element.getActiveTabIndex()).to.equal(0);

        document.getElementById('tab2').click();
        expect(element.getActiveTabIndex()).to.equal(1);

        done();
      });
    });
  });

  describe('events', () => {
    let template, element;

    beforeEach(() => {
      template = ons._util.createElement('<ons-template id="page1"><ons-page>Page1</ons-page></ons-template>');
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
      let promise = new Promise((resolve) => {
        element.addEventListener('prechange', resolve);
      });
      element.setActiveTab(0);
      return expect(promise).to.eventually.be.fulfilled;
    });

    it('fires \'postchange\' event', () => {
      let promise = new Promise((resolve) => {
        element.addEventListener('postchange', resolve);
      });
      element.setActiveTab(0);
      return expect(promise).to.eventually.be.fulfilled;
    });

    it('fires \'show\' event', () => {
      let promise = new Promise((resolve) => {
        element.addEventListener('show', resolve);
      });
      element.setActiveTab(0);
      return expect(promise).to.eventually.be.fulfilled;
    });

    it('fires \'hide\' event', () => {
      let promise = new Promise((resolve) => {
        element.addEventListener('hide', resolve);
      });
      element.setActiveTab(0);
      element.setActiveTab(1);
      return expect(promise).to.eventually.be.fulfilled;
    });

    it('fires \'reactive\' event', () => {
      let promise = new Promise((resolve) => {
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
      template = ons._util.createElement('<ons-template id="page1"><ons-page>Page1</ons-page></ons-template>');
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

    it('fires \'show\' event', (done) => {
      element.setActiveTab(0);
      setImmediate(() => {
        let promise = new Promise((resolve) => {
          element.addEventListener('show', () => {
            resolve();
            done();
          });
        });
        element._hide();
        element._show();
        return expect(promise).to.eventually.be.fulfilled;
      });
    });

    it('fires \'hide\' event', (done) => {
      element.setActiveTab(0);
      setImmediate(() => {
        let promise = new Promise((resolve) => {
          element.addEventListener('hide', () => {
            resolve();
            done();
          });
        });
        element._hide();
        return expect(promise).to.eventually.be.fulfilled;
      });
    });

    it('fires \'destroy\' event', (done) => {
      element.setActiveTab(0);
      setImmediate(() => {
        let promise = new Promise((resolve) => {
          element.addEventListener('destroy', () => {
            resolve();
            done();
          });
        });
        element._destroy();
        return expect(promise).to.eventually.be.fulfilled;
      });
    });
  });

  describe('#loadPage()', () => {
    it('loads a page', (done) => {
      let element;
      element = ons._util.createElement(`
        <ons-tabbar>
          <ons-tab label="Hoge"></ons-tab>
        </ons-tabbar>
      `);
      document.body.appendChild(element);

      expect(element.innerHTML.indexOf('hogehoge')).to.be.below(0);
      element.loadPage('hoge', {
        callback: function() {
          expect(element.innerHTML.indexOf('hogehoge')).not.to.be.below(0);
          done();
        }
      });
    });

    it('returns a promise that resolves to the new page', () => {
      expect(element.innerHTML.indexOf('fugafuga')).to.be.below(0);
      return expect(element.loadPage('fuga')).to.eventually.be.fulfilled.then(page => {
        expect(element.innerHTML.indexOf('fugafuga')).not.to.be.below(0);
        expect(page).to.equal(element._getCurrentPageElement());
      });
    });
  });

  describe('#setActiveTab()', () => {
    it('loads any tab as persistent', (done) => {
      let element = ons._util.createElement(`
        <ons-tabbar>
          <ons-tab label="Hoge" page="hoge"></ons-tab>
        </ons-tabbar>
      `);
      document.body.appendChild(element);

      var spy = chai.spy.on(element, '_loadPersistentPageDOM');
      element.setActiveTab(0);

      setImmediate(() => {
        expect(spy).to.have.been.called.once;
        done();
      });
    });

    it('rejects the promise if index does not exist', () => {
      return expect(element.setActiveTab(0)).to.eventually.be.rejected;
    });

    it('can be canceled', (done) => {
      let element = ons._util.createElement(`
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

    it('does not remove tabs', (done) => {
      let element = ons._util.createElement(`
        <ons-tabbar>
          <ons-tab label="Hoge" page="hoge"></ons-tab>
          <ons-tab label="fuga" page="fuga"></ons-tab>
        </ons-tabbar>
      `);

      element.setActiveTab(0);

      setImmediate(() => {
        let tmp = element._getCurrentPageElement();
        element.setActiveTab(1, {'callback': () => {
          expect(tmp.style.display).to.equal('none');
          done();
        }, 'animation': 'none'});
      });
    });

    it('keeps the page when option \'keepPage\' is true', (done) => {
      let element = ons._util.createElement(`
        <ons-tabbar>
          <ons-tab label="Hoge" page="hoge" active="true"></ons-tab>
          <ons-tab label="fuga" page="fuga"></ons-tab>
        </ons-tabbar>
      `);

      var spy = chai.spy.on(element, '_switchPage');

      element.addEventListener('postchange', (event) => {
        expect(spy).not.to.have.been.called();
        done();
      });

      element.setActiveTab(1, {'keepPage': true});
    });

    it('returns a promise that resolves to the new page', () => {
      let element = ons._util.createElement(`
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
    it('fills status bar', (done) => {
      var tmp = ons._internal.shouldFillStatusBar;
      ons._internal.shouldFillStatusBar = () => { return Promise.resolve(); };
      let element = ons._util.createElement(`
        <ons-tabbar position="top">
        </ons-tabbar>
      `);
      ons._internal.shouldFillStatusBar = tmp;

      setTimeout(() => {
        expect(element._hasTopTabbar()).to.be.true;
        expect(element.firstChild.className).to.equal('tab-bar__status-bar-fill');
        done();
      }, 1000);
    });

    it('does not compile twice', () => {
      let div1 = document.createElement('div');
      let div2 = document.createElement('div');
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

  describe('#registerAnimator()', () => {
    it('throws an error if animator is not a TabbarAnimator', () => {
      expect(() => window.OnsTabbarElement.registerAnimator('hoge', 'hoge')).to.throw(Error);
    });

    it('registers a new animator', () => {
      class MyAnimator extends window.OnsTabbarElement.TabbarAnimator {
      }

      window.OnsTabbarElement.registerAnimator('hoge', MyAnimator);
    });
  });
});
