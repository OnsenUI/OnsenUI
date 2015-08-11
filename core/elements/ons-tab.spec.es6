describe('OnsTabElement', () => {
  let element;

  beforeEach(() => {
    element = ons._util.createElement(`
      <ons-tab>
      </ons-tab>
    `);
  });

  afterEach(() => {
    element.remove();
    element = null;
  });

  it('should exist', () => {
    expect(window.OnsTabElement).to.be.ok;
  });

  it('has a default template', () => {
    expect(element.classList.contains('tab-bar__item')).to.be.true;
    expect(element._hasDefaultTemplate).to.be.true;
  });

  describe('modifier attribute', () => {
    it('modifies the classList of the tab', () => {
      let parent = ons._util.createElement(`
        <ons-tabbar>
        </ons-tabbar>
      `);

      document.body.appendChild(parent);
      parent.appendChild(element);

      element.setAttribute('modifier', 'hoge');

      expect(element.classList.contains('tab-bar--hoge__item')).to.be.true;
      expect(element.children[1].classList.contains('tab-bar--hoge__button')).to.be.true;

      element.setAttribute('modifier', ' foo bar');
      expect(element.classList.contains('tab-bar--foo__item')).to.be.true;
      expect(element.children[1].classList.contains('tab-bar--foo__button')).to.be.true;
      expect(element.classList.contains('tab-bar--bar__item')).to.be.true;
      expect(element.children[1].classList.contains('tab-bar--bar__button')).to.be.true;
      expect(element.classList.contains('tab-bar--hoge__item')).not.to.be.true;
      expect(element.children[1].classList.contains('tab-bar--hoge__button')).not.to.be.true;

      element.classList.add('tab-bar--piyo__item');
      element.children[1].classList.add('tab-bar--piyo__button');
      element.setAttribute('modifier', 'fuga');
      expect(element.classList.contains('tab-bar--piyo__item')).to.be.true;
      expect(element.children[1].classList.contains('tab-bar--piyo__button')).to.be.true;
      expect(element.classList.contains('tab-bar--fuga__item')).to.be.true;
      expect(element.children[1].classList.contains('tab-bar--fuga__button')).to.be.true;

      document.body.removeChild(parent);
    });
  });

  describe('persistent attribute', () => {
    it('adds a persistent state to the tab', function() {
      let tabbar = ons._util.createElement(`
        <ons-tabbar>
        </ons-tabbar>
      `);

      tabbar.appendChild(element);
      document.body.appendChild(tabbar);
      expect(element.isPersistent()).not.to.be.true;

      element.setAttribute('persistent', '');
      expect(element.isPersistent()).to.be.true;

      element.removeAttribute('persistent');
      expect(element.isPersistent()).not.to.be.true;

      document.body.removeChild(tabbar);
    });
  });

  describe('no-reload attribute', () => {
    it('sets the tab as no-reloadable', function() {
      let tabbar = ons._util.createElement(`
        <ons-tabbar>
        </ons-tabbar>
      `);

      tabbar.appendChild(element);
      document.body.appendChild(tabbar);
      expect(element.canReload()).to.be.true;

      element.setAttribute('no-reload', '');
      expect(element.canReload()).not.to.be.true;

      element.removeAttribute('no-reload');
      expect(element.canReload()).to.be.true;

      document.body.removeChild(tabbar);
    });
  });

  describe('active attribute', () => {
    it('sets whether a tab should be active or not', () => {
      expect(element.hasAttribute('active')).not.to.be.true;

      let tabbar = ons._util.createElement(`
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
    it('sets icon name for the tab', () => {
      let tabbar = ons._util.createElement(`
        <ons-tabbar>
        </ons-tabbar>
      `);

      tabbar.appendChild(element);
      document.body.appendChild(tabbar);
      expect(element.querySelector('ons-icon')).not.to.be.ok;

      element.setAttribute('icon', 'ion-map');
      expect(element.querySelector('ons-icon')).to.be.ok;
      expect(element.querySelector('ons-icon').getAttribute('icon')).to.equal('ion-map');

      element.setAttribute('icon', 'ion-home');
      expect(element.querySelector('ons-icon').getAttribute('icon')).to.equal('ion-home');
      expect(element.querySelector('ons-icon').getAttribute('icon')).not.to.equal('ion-map');

      document.body.removeChild(tabbar);
    });
  });

  describe('label attribute', () => {
    it('sets label name for the tab', () => {
      let tabbar = ons._util.createElement(`
        <ons-tabbar>
        </ons-tabbar>
      `);

      tabbar.appendChild(element);
      document.body.appendChild(tabbar);
      expect(document.getElementsByClassName('tab-bar__label')[0]).not.to.be.ok;

      element.setAttribute('label', 'text');
      expect(document.getElementsByClassName('tab-bar__label')[0]).to.be.ok;
      expect(document.getElementsByClassName('tab-bar__label')[0].innerHTML).to.equal('text');

      element.setAttribute('label', 'new text');
      expect(document.getElementsByClassName('tab-bar__label')[0].innerHTML).to.equal('new text');
      expect(document.getElementsByClassName('tab-bar__label')[0].innerHTML).not.to.equal('text');

      document.body.removeChild(tabbar);
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
      expect(element.children[1].classList.contains('tab-bar__button')).to.be.true;
      expect(element.children[1].classList.contains('tab-bar-inner')).to.be.true;
    });
  });

  describe('parent', () => {
    it('should be an \'ons-tabbar\' element', () => {
      expect(() => element._ensureElementPosition()).to.throw('This ons-tab element is must be child of ons-tabbar element.');

      let parent = ons._util.createElement(`
        <ons-tabbar>
        </ons-tabbar>
      `);

      parent.appendChild(element);
      expect(() => element._ensureElementPosition()).not.to.throw('This ons-tab element is must be child of ons-tabbar element.');
    });
  });

  describe('_hasDefaultTemplate property', () => {
    it('is, by default, true', () => {
      expect(element._hasDefaultTemplate).to.be.true;
    });

  it('is false when one of the tab\'s children is a ELEMENT_NODE', () => {
      let tabbar = ons._util.createElement(`
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
      expect(element._hasDefaultTemplate).not.to.be.true;

      document.body.removeChild(tabbar);
    });
  });

  describe('#_updateDefaultTemplate()', () => {
    it('will return if there is not a default template', () => {
      var spy = chai.spy.on(element, 'getAttribute');
      element._hasDefaultTemplate = false;
      element._updateDefaultTemplate();
      expect(spy).not.to.have.been.called;
    });
  });

  describe('#_loadPage()', () => {
    it('returns the current tab _pageElement, if the tab has persistent attribute and a _pageElement', (done) => {
      element = ons._util.createElement(`
        <ons-tab persistent>
        </ons-tab>
      `);

      let myFunction = (value) => {
        expect(value).to.equal(element._pageElement);
        done();
      };
      element._pageElement = true;
      element._loadPageElement(myFunction);
    });

    it('sets the tab _pageElement as null, if the tab doesn\'t has a persistent attribute', (done) => {
      let myFunction = () => {
        expect(element._pageElement).to.be.null;
        done();
      };
      element._loadPageElement(myFunction);
    });
  });

  describe('#setActive()', () => {
    it('will set the tab as active', () => {
      let tabbar = ons._util.createElement(`
        <ons-tabbar>
          <ons-tab id="tab1" page="page1"></ons-tab><ons-tab id="tab2" page="page2"></ons-tab>
        </ons-tabbar>
      `);

      let template1 = ons._util.createElement(`
        <ons-template id="page1"><ons-page></ons-page></ons-template>
      `);

      let template2 = ons._util.createElement(`
        <ons-template id="page2"><ons-page></ons-page></ons-template>
      `);

      document.body.appendChild(tabbar);
      document.body.appendChild(template1);
      document.body.appendChild(template2);

      let tab1 = tabbar.querySelector('#tab1');
      let tab2 = tabbar.querySelector('#tab2');
      expect(tabbar.getActiveTabIndex()).to.equal(-1);

      tab1.setActive();
      expect(tabbar.getActiveTabIndex()).not.to.equal(-1);
      expect(tabbar.getActiveTabIndex()).to.equal(0);

      tab2.setActive();
      tab1.classList.remove('active');
      expect(tabbar.getActiveTabIndex()).not.to.equal(0);
      expect(tabbar.getActiveTabIndex()).to.equal(1);

      document.body.removeChild(tabbar);
      document.body.removeChild(template1);
      document.body.removeChild(template2);
    });
  });
});
