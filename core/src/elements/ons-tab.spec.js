'use strict';

describe('OnsTabElement', () => {
  let element;

  beforeEach(done => {
    element = ons._util.createElement(`<ons-tab></ons-tab>`);
    ons._contentReady(element, done);
  });

  afterEach(() => {
    element.remove();
    element = null;
  });

  it('should exist', () => {
    expect(window.ons.TabElement).to.be.ok;
  });

  it('has "page" property', () => {
    element.page = 'foobar';
    expect(element.page).to.be.equal('foobar');

    element.page = { foo: 'bar' };
    expect(element.page.foo).to.be.equal('bar');

    element.setAttribute('page', 'hoge');
    expect(element.getAttribute('page')).to.be.equal('hoge');
  });

  it('has "pageLoader" property', () => {
    const pageLoader = new ons.PageLoader();
    element.pageLoader = pageLoader;
    expect(element.pageLoader).to.be.equal(pageLoader);
    expect(() => {
      element.pageLoader = 'foobar';
    }).to.throw(Error);
  });

  describe('class attribute', () => {
    xit('should contain "tabbar__item" class token automatically', () => {
      expect(element.classList.contains('tabbar__item')).to.be.true;
      element.className = 'foo'; // FIXME: CE polyfill should trigger `attributeChangedCallback` against `className`
      expect(element.classList.contains('tabbar__item')).to.be.true;
      expect(element.classList.contains('foo')).to.be.true;
    });
  });

  describe('modifier attribute', () => {
    it('modifies the classList of the tab', () => {
      const parent = ons._util.createElement(`
        <ons-tabbar>
        </ons-tabbar>
      `);

      document.body.appendChild(parent);
      parent.appendChild(element);

      element.setAttribute('modifier', 'hoge');

      expect(element.classList.contains('tabbar--hoge__item')).to.be.true;
      expect(element.children[1].classList.contains('tabbar--hoge__button')).to.be.true;

      element.setAttribute('modifier', ' foo bar');
      expect(element.classList.contains('tabbar--foo__item')).to.be.true;
      expect(element.children[1].classList.contains('tabbar--foo__button')).to.be.true;
      expect(element.classList.contains('tabbar--bar__item')).to.be.true;
      expect(element.children[1].classList.contains('tabbar--bar__button')).to.be.true;
      expect(element.classList.contains('tabbar--hoge__item')).not.to.be.true;
      expect(element.children[1].classList.contains('tabbar--hoge__button')).not.to.be.true;

      element.classList.add('tabbar--piyo__item');
      element.children[1].classList.add('tabbar--piyo__button');
      element.setAttribute('modifier', 'fuga');
      expect(element.classList.contains('tabbar--piyo__item')).to.be.true;
      expect(element.children[1].classList.contains('tabbar--piyo__button')).to.be.true;
      expect(element.classList.contains('tabbar--fuga__item')).to.be.true;
      expect(element.children[1].classList.contains('tabbar--fuga__button')).to.be.true;

      document.body.removeChild(parent);
    });
  });

  describe('active attribute', () => {
    it('sets whether a tab should be active or not', () => {
      expect(element.hasAttribute('active')).not.to.be.true;

      const tabbar = ons._util.createElement(`
        <ons-tabbar>
        </ons-tabbar>
      `);

      document.body.appendChild(tabbar);
      element = ons._util.createElement(`
        <ons-tab active="true">
          <div></div>
        </ons-tab>
      `);
      tabbar.appendChild(element);
      expect(element.hasAttribute('active')).to.be.true;

      document.body.removeChild(tabbar);
    });
  });

  describe('icon attribute', () => {
    it('sets icon name for the tab', done => {
      const tabbar = ons._util.createElement(`
        <ons-tabbar>
        </ons-tabbar>
      `);

      tabbar.appendChild(element);
      document.body.appendChild(tabbar);

      ons._contentReady(tabbar, () => {
        expect(element.querySelector('ons-icon')).not.to.be.ok;

        element.setAttribute('icon', 'ion-map');
        expect(element.querySelector('ons-icon')).to.be.ok;
        expect(element.querySelector('ons-icon').getAttribute('icon')).to.equal('ion-map');

        element.setAttribute('icon', 'ion-home');
        expect(element.querySelector('ons-icon').getAttribute('icon')).to.equal('ion-home');
        expect(element.querySelector('ons-icon').getAttribute('icon')).not.to.equal('ion-map');

        document.body.removeChild(tabbar);

        done();
      });
    });
  });

  describe('active-icon attribute', () => {
    it('sets active-icon name for the tab', done => {
      const tabbar = ons._util.createElement('<ons-tabbar></ons-tabbar>');
      const tab = ons.createElement('<ons-tab active id="tab1" icon="ion-home" active-icon="ion-edit"></ons-tab>');

      tabbar.appendChild(tab);
      document.body.appendChild(tabbar);

      setImmediate(() => {
        tab.setActive(false);
        expect(tab.querySelector('ons-icon').getAttribute('icon')).to.equal('ion-home');

        tab.setActive(true);
        expect(tabbar.querySelector('ons-icon').getAttribute('icon')).to.equal('ion-edit');

        tabbar.remove();
        done();
      });
    });
  });

  describe('label attribute', () => {
    it('sets label name for the tab', done => {
      const tabbar = ons._util.createElement(`
        <ons-tabbar>
        </ons-tabbar>
      `);

      tabbar._tabbarElement.appendChild(element);
      document.body.appendChild(tabbar);
      setImmediate(() => {
        expect(document.getElementsByClassName('tabbar__label')[0]).not.to.be.ok;

        element.setAttribute('label', 'text');
        expect(document.getElementsByClassName('tabbar__label')[0]).to.be.ok;
        expect(document.getElementsByClassName('tabbar__label')[0].innerHTML).to.equal('text');

        element.setAttribute('label', 'new text');
        expect(document.getElementsByClassName('tabbar__label')[0].innerHTML).to.equal('new text');
        expect(document.getElementsByClassName('tabbar__label')[0].innerHTML).not.to.equal('text');

        document.body.removeChild(tabbar);
        done();
      });
    });
  });

  describe('badge attribute', () => {
    it('sets badge for the tab', done => {
      const tabbar = ons._util.createElement(`
        <ons-tabbar>
        </ons-tabbar>
      `);

      tabbar.appendChild(element);
      document.body.appendChild(tabbar);
      setImmediate(() => {
        expect(document.getElementsByClassName('tabbar__badge')[0]).not.to.be.ok;

        element.setAttribute('badge', '99+');
        expect(document.getElementsByClassName('tabbar__badge')[0]).to.be.ok;
        expect(document.getElementsByClassName('tabbar__badge')[0].innerHTML).to.equal('99+');

        element.setAttribute('badge', '98');
        expect(document.getElementsByClassName('tabbar__badge')[0].innerHTML).to.equal('98');
        expect(document.getElementsByClassName('tabbar__badge')[0].innerHTML).not.to.equal('99+');

        document.body.removeChild(tabbar);
        done();
      });
    });
  });

  describe('children', () => {
    it('are, by default, two', () => {
      expect(element.children[0]).to.be.ok;
      expect(element.children[1]).to.be.ok;
      expect(element.children[2]).not.to.be.ok;

      expect(element.children[0].nodeName).to.equal('INPUT');
      expect(element.children[0].type).to.equal('radio');
      expect(element.children[0].style.display).to.equal('none');

      expect(element.children[1].nodeName).to.equal('BUTTON');
      expect(element.children[1].classList.contains('tabbar__button')).to.be.true;
    });
  });

  describe('#connectedCallback', () => {
    it('should be child of \'ons-tabbar\' element', () => {
      const error = 'ons-tabbar';
      expect(() => document.body.appendChild(element)).to.throw(error);

      const tabbar = document.createElement('ons-tabbar');
      document.body.appendChild(tabbar);

      expect(() => tabbar.appendChild(element)).not.to.throw(error);
      tabbar.remove();
    });

    it('loads the provided page', (done) => {
      const tabbar = document.createElement('ons-tabbar');
      const template1 = ons.createElement('<template id="t1"><ons-page id="page1"></ons-page></template>');
      const tab = ons.createElement('<ons-tab label="tab1" page="t1"></ons-tab>');
      const spy = chai.spy.on(tab._pageLoader, 'load');

      tabbar.addEventListener('init', event => {
        expect(spy).to.have.been.called.once;
        expect(tab.pageElement).to.equal(event.target);
        expect(tab.pageElement.id).to.equal('page1');

        tabbar.remove();
        template1.remove();
        done();
      });

      tabbar.appendChild(tab);
      document.body.appendChild(template1);
      document.body.appendChild(tabbar);
    });

    it('uses existing pages', (done) => {
      const tab = ons.createElement('<ons-tab label="tab1"></ons-tab>');
      const tabbar = ons.createElement(`
        <ons-tabbar>
          <div class="tabbar__content">
            <div>
              <ons-page id="test-page"></ons-page>
            </div>
          </div>
          <div class="tabbar"></div>
        </ons-tabbar>
      `);
      const spy = chai.spy.on(tab._pageLoader, 'load');

      tabbar.addEventListener('init', event => {
        expect(spy).not.to.have.been.called;
        expect(tab.pageElement).to.equal(event.target);
        expect(tab.pageElement.id).to.equal('test-page');

        tabbar.remove();
        done();
      });

      tabbar._tabbarElement.insertBefore(tab, tabbar._tabbarElement.children[0]);
      document.body.appendChild(tabbar);
    });

    it('does nothing when there is no page', () => {
      const tabbar = ons.createElement(`
        <ons-tabbar>
          <div class="tabbar__content"></div>
          <div class="tabbar">
            <ons-tab label="tab1"></ons-tab>
          </div>
        </ons-tabbar>
      `);

      expect(() => document.body.appendChild(tabbar)).not.to.throw.error;
      tabbar.remove();
    });
  });

  describe('#setActive()', () => {
    it('will set the tab as active', done => {
      const tabbar = ons._util.createElement(`
        <ons-tabbar>
          <ons-tab id="tab1" page="page1"></ons-tab><ons-tab id="tab2" page="page2"></ons-tab>
        </ons-tabbar>
      `);

      const template1 = ons._util.createElement(`
        <template id="page1"><ons-page></ons-page></template>
      `);

      const template2 = ons._util.createElement(`
        <template id="page2"><ons-page></ons-page></template>
      `);

      document.body.appendChild(tabbar);
      document.body.appendChild(template1);
      document.body.appendChild(template2);

      setImmediate(() => {
        const tab1 = tabbar.querySelector('#tab1');
        const tab2 = tabbar.querySelector('#tab2');
        expect(tabbar.getActiveTabIndex()).to.equal(0);

        tab2.setActive(true);
        tab1.classList.remove('active');
        expect(tabbar.getActiveTabIndex()).to.equal(1);

        tab1.setActive(true);
        tab2.setActive(false);
        expect(tabbar.getActiveTabIndex()).to.equal(0);

        document.body.removeChild(tabbar);
        document.body.removeChild(template1);
        document.body.removeChild(template2);

        done();
      });
    });
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');

      div1.innerHTML = '<ons-tab></ons-tab>';
      div2.innerHTML = div1.innerHTML;

      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });

  describe('autoStyling', done => {
    it('adds \'material\' modifiers and effects on Android', done => {
      ons.platform.select('android');
      const tab = document.createElement('ons-tab');

      setImmediate(() => {
        expect(tab.getAttribute('modifier')).to.equal('material');
        ons.platform.select('');

        done();
      });
    });
  });
});
