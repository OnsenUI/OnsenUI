describe('ons-tabbar', function() {
  it('provides \'OnsTabbarElement\' global variable', function() {
    expect(window.OnsTabbarElement).to.be.ok;
  });

  it('provides \'modifier\' attribute', function() {
    var element = new OnsTabbarElement();
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

  it('has a unique auto generated id', function() {
    var element = new OnsTabbarElement();
    expect(element.getTabbarId()).to.be.ok;
  });

  it('has \'position\' attribute', function(done) {
    var div = document.createElement('div');
    document.body.appendChild(div);
    div.innerHTML = '<ons-page><ons-tabbar id="top" position="top"></ons-tabbar><ons-tabbar id="bottom" position="bottom"></ons-tabbar></ons-page>';

    var topElement = document.getElementById('top');
    var bottomElement = document.getElementById('bottom');

    setImmediate(function() {
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

  it('can be set visible or invisible', function() {
    var div = document.createElement('div');
    document.body.appendChild(div);
    div.innerHTML = '<ons-tabbar id="top" position="top"></ons-tabbar><ons-tabbar id="bottom" position="bottom"></ons-tabbar>';

    var topElement = document.getElementById('top');
    var bottomElement = document.getElementById('bottom');

    expect(topElement._getContentElement().style.top).to.equal('');
    expect(topElement._getTabbarElement().style.display).to.equal('');
    expect(bottomElement._getContentElement().style.bottom).to.equal('');
    expect(bottomElement._getTabbarElement().style.display).to.equal('');

    topElement.setTabbarVisibility(false);
    bottomElement.setTabbarVisibility(false);
    expect(topElement._getContentElement().style.top).to.equal('0px');
    expect(topElement._getTabbarElement().style.display).to.equal('none');
    expect(bottomElement._getContentElement().style.bottom).to.equal('0px');
    expect(bottomElement._getTabbarElement().style.display).to.equal('none');

    topElement.setTabbarVisibility(true);
    bottomElement.setTabbarVisibility(true);
    expect(topElement._getContentElement().style.top).to.equal('');
    expect(topElement._getTabbarElement().style.display).to.equal('');
    expect(bottomElement._getContentElement().style.bottom).to.equal('');
    expect(bottomElement._getTabbarElement().style.display).to.equal('');
  });


  it('has accepts only \'ons-page\' as current page element', function() {
    var element = new OnsTabbarElement();
    var page = new OnsPageElement();
    element._getContentElement().appendChild(page);
    expect(element._getCurrentPageElement().classList.contains('page')).to.be.true;
    expect(element._getCurrentPageElement.bind(element)).not.to.throw('Invalid state: page element must be a "ons-page" element.');

    element._getContentElement().removeChild(element._getContentElement().querySelector('ons-page'));
    var button = new OnsButtonElement;
    element._getContentElement().appendChild(button);
    expect(element._getCurrentPageElement.bind(element)).to.throw('Invalid state: page element must be a "ons-page" element.');
  });

  it('has two children by default', function() {
    var element = new OnsTabbarElement();

    expect(element.children[0]).to.be.ok;
    expect(element.children[1]).to.be.ok;
    expect(element.children[2]).not.to.be.ok;

    expect(element.children[0].classList.contains('ons-tab-bar__content')).to.be.true;
    expect(element.children[0].classList.contains('tab-bar__content')).to.be.true;

    expect(element.children[1].classList.contains('tab-bar')).to.be.true;
    expect(element.children[1].classList.contains('ons-tab-bar__footer')).to.be.true;
    expect(element.children[1].classList.contains('ons-tabbar-inner')).to.be.true;
  });

  it('has active tab property', function(done) {
    var div = document.createElement('div');
    document.body.appendChild(div);
    div.innerHTML = '<ons-template id="page1"></ons-template><ons-template id="page2"></ons-template>' +
      '<ons-tabbar id="myTabbar"><ons-tab id="tab1" page="page1"></ons-tab><ons-tab id="tab2" page="page2"></ons-tab></ons-tabbar>';

    setImmediate(function() {
      var element = document.getElementById('myTabbar');
      expect(element.getActiveTabIndex()).to.equal(-1);

      document.getElementById("tab1").click();
      expect(element.getActiveTabIndex()).to.equal(0);

      document.getElementById("tab2").click();
      expect(element.getActiveTabIndex()).to.equal(1);

      done();
    });
  });

  it('has prechange event', function() {
    var preChangePromise = new Promise(function(resolve) {
      document.body.addEventListener('prechange', resolve);
    });

    var div = document.createElement('div');
    document.body.appendChild(div);
    div.innerHTML = '<ons-template id="page1"></ons-template><ons-tabbar id="myTabbar"><ons-tab id="tab1" page="page1"></ons-tab></ons-tabbar>';

    setImmediate(function() {
      var element = document.getElementById('myTabbar');
      element.setActiveTab(0);
    });

    return expect(preChangePromise).to.eventually.be.fulfilled;
  });

  it('has postchange event', function() {
    var postChangePromise = new Promise(function(resolve) {
      document.addEventListener('postchange', resolve);
    });

    var div = document.createElement('div');
    document.body.appendChild(div);
    div.innerHTML = '<ons-template id="page1"></ons-template><ons-tabbar id="myTabbar"><ons-tab id="tab1" page="page1"></ons-tab></ons-tabbar>';

    var element = document.getElementById('myTabbar');
    element.setActiveTab(0);
    return expect(postChangePromise).to.eventually.be.fulfilled;
  });

  it('has reactive event', function() {
    document.body.innerHTML = '';

    var reactivePromise = new Promise(function(resolve) {
      document.addEventListener('reactive', resolve);
    });

    var div = document.createElement('div');
    document.body.appendChild(div);
    div.innerHTML = '<ons-template id="page1"></ons-template><ons-tabbar id="myTabbar"><ons-tab no-reload id="tab1" page="page1"></ons-tab></ons-tabbar>';

    setImmediate(function() {
      var element = document.getElementById('myTabbar');
      element.setActiveTab(0);
      element.setActiveTab(0);
    });

    return expect(reactivePromise).to.eventually.be.fulfilled;
  });

  it('has loadPage method', function(done) {
    document.body.innerHTML = '';

    var div = document.createElement('div');
    document.body.appendChild(div);
    div.innerHTML = '<ons-template id="page1"><ons-page id="p1"></ons-page></ons-template><ons-tabbar id="myTabbar"><ons-tab id="tab1" page="page1"></ons-tab></ons-tabbar>';

    setImmediate(function() {
      var element = document.getElementById('myTabbar');
      expect(element.getActiveTabIndex()).to.equal(-1);
      expect(document.getElementById('p1')).not.to.be.ok;

      var value = {
        callback: function() {
          expect(element.getActiveTabIndex()).to.equal(-1);
          expect(document.getElementById('p1')).to.be.ok;
          done();
        }
      };

      element.loadPage('page1', value);
    });
  });
});
