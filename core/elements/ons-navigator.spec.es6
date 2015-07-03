describe('ons-navigator', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    let tpl1 = ons._util.createElement(`<ons-template id="hoge">hoge</ons-template>`),
      tpl2 = ons._util.createElement(`<ons-template id="fuga">fuga</ons-template>`);
    document.body.appendChild(tpl1);
    document.body.appendChild(tpl2);
  });

  it('provides \'OnsNavigatorElement\' global variable', () => {
    expect(window.OnsNavigatorElement).to.be.ok;
  });

  it('should have one page by default', () => {
    let nav = new OnsNavigatorElement();
    document.body.appendChild(nav);
    expect(nav.pages.length).to.equal(1);
  });

  it('provides \'pushPage()\' method', (done) => {
    let nav = new OnsNavigatorElement();
    document.body.appendChild(nav);

    nav.pushPage('hoge', {
      onTransitionEnd: () => {
        let content = nav.getCurrentPage().element._getContentElement();
        expect(nav.pages.length).to.equal(2);
        expect(content.innerHTML).to.equal('hoge');
        done();
      }
    });
  });

  it('provides \'insertPage()\' method', (done) => {
    let nav = new OnsNavigatorElement();
    document.body.appendChild(nav);

    nav.pushPage('hoge', {
      onTransitionEnd: () => {
        nav.insertPage(0, 'fuga');
        expect(nav.pages.length).to.equal(3);

        let content = nav.pages[0].element._getContentElement();
        expect(content.innerHTML).to.equal('fuga');

        done();
      }
    });
  });

  it('provides \'popPage()\' method', (done) => {
    let nav = new OnsNavigatorElement();
    document.body.appendChild(nav);

    expect(() => nav.popPage()).to.throw(Error);

    nav.pushPage('hoge', {
      onTransitionEnd: () => {
        let content = nav.getCurrentPage().element._getContentElement();
        expect(content.innerHTML).to.equal('hoge');

        nav.popPage({
          onTransitionEnd: () => {
            expect(nav.pages.length).to.equal(1);
            let content = nav.getCurrentPage().element._getContentElement();
            expect(content.innerHTML).not.to.be.ok;
            done();
          }
        });
      }
    });
  });

  it('provides \'replacePage()\' method', (done) => {
    let nav = new OnsNavigatorElement();
    document.body.appendChild(nav);

    nav.pushPage('hoge', {
      onTransitionEnd: () => {
        expect(nav.pages.length).to.equal(2);
        let content = nav.getCurrentPage().element._getContentElement();
        expect(content.innerHTML).to.equal('hoge');

        nav.replacePage('fuga', {
          onTransitionEnd: () => {
            expect(nav.pages.length).to.equal(2);
            let content = nav.getCurrentPage().element._getContentElement();
            expect(content.innerHTML).to.equal('fuga');
            done();
          }
        });
      }
    });
  });

  it('provides \'replaceToPage()\' method', (done) => {
    let nav = new OnsNavigatorElement();
    document.body.appendChild(nav);

    nav.resetToPage('hoge', {
      onTransitionEnd: () => {
        expect(nav.pages.length).to.equal(1);
        let content = nav.getCurrentPage().element._getContentElement();
        expect(content.innerHTML).to.equal('hoge');
        done();
      }
    });
  });

  it('provides \'getCurrentPage()\' property', () => {
    let nav = new OnsNavigatorElement();
    document.body.appendChild(nav);

    let page = nav.getCurrentPage();

    expect(page.element).to.be.an.instanceof(Element);
    expect(page.name).to.be.an('string');
    expect(page.page).to.be.an('string');
  });

  it('provides \'canPopPage()\' method', () => {
    let nav = new OnsNavigatorElement();
    document.body.appendChild(nav);

    expect(nav.canPopPage()).to.be.false;
    nav.pushPage('hoge');
    expect(nav.canPopPage()).to.be.true;
  });

  it('provides \'pages\' property', () => {
    let nav = new OnsNavigatorElement();
    document.body.appendChild(nav);

    let pages = nav.pages;

    expect(pages.length).to.equal(1);
    expect(pages[0].element).to.be.an.instanceof(Element);
    expect(pages[0].name).to.be.an('string');
    expect(pages[0].page).to.be.an('string');
  });

  it('emits \'prepush\' event', () => {
    let nav = new OnsNavigatorElement();
    document.body.appendChild(nav);

    let promise = new Promise((resolve) => {
      nav.addEventListener('prepush', (event) => { resolve(event); });
    });

    nav.pushPage('hoge');

    return expect(promise).to.eventually.be.fulfilled;
  });

  it('emits \'postpush\' event', () => {
    let nav = new OnsNavigatorElement();
    document.body.appendChild(nav);

    let promise = new Promise((resolve) => {
      nav.addEventListener('postpush', (event) => { resolve(event); });
    });

    nav.pushPage('hoge');

    return expect(promise).to.eventually.be.fulfilled;
  });

  it('emits \'prepop\' event', () => {
    let nav = new OnsNavigatorElement();
    document.body.appendChild(nav);

    let promise = new Promise((resolve) => {
      nav.addEventListener('prepop', (event) => { resolve(event); });
    });

    nav.pushPage('hoge', {
      onTransitionEnd: () => nav.popPage()
    });

    return expect(promise).to.eventually.be.fulfilled;
  });

  it('emits \'postpop\' event', () => {
    let nav = new OnsNavigatorElement();
    document.body.appendChild(nav);

    let promise = new Promise((resolve) => {
      nav.addEventListener('postpop', (event) => { resolve(event); });
    });

    nav.pushPage('hoge', {
      onTransitionEnd: () => nav.popPage()
    });

    return expect(promise).to.eventually.be.fulfilled;
  });

  it('should be possible to cancel the \'prepush\' event', () => {
    let nav = new OnsNavigatorElement();
    document.body.appendChild(nav);

    expect(nav.pages.length).to.equal(1);

    nav.pushPage('hoge');
    expect(nav.pages.length).to.equal(2);

    nav.addEventListener('prepush', (event) => {
      event.detail.cancel();
    });

    nav.pushPage('hoge');
    expect(nav.pages.length).to.equal(2);
  });

  it('should be possible to cancel the \'prepop\' event', (done) => {
    let nav = new OnsNavigatorElement();
    document.body.appendChild(nav);

    nav.addEventListener('prepop', (event) => {
      event.detail.cancel();
    });

    expect(nav.pages.length).to.equal(1);

    nav.pushPage('hoge', {
      onTransitionEnd: () => {
        expect(nav.pages.length).to.equal(2);
        nav.popPage();
        expect(nav.pages.length).to.equal(2);
        done();
      }
    });
  });

  it('provides \'page\' attribute', () => {
    let nav = ons._util.createElement(`
      <ons-navigator page='hoge'></ons-navigator>
    `);
    document.body.appendChild(nav);

    let content = nav.getCurrentPage().element._getContentElement();
    expect(content.innerHTML).to.equal('hoge');
  });

  it('can refresh the previous page', (done) => {
    let nav = new OnsNavigatorElement();
    document.body.appendChild(nav);

    nav.pushPage('hoge', {
      onTransitionEnd: () => {
        var content = nav.getCurrentPage().element._getContentElement();
        content.innerHTML = 'piyo';

        nav.pushPage('fuga', {
          onTransitionEnd: () => {
            nav.popPage({
              refresh: true,
              onTransitionEnd: () => {
                var content = nav.getCurrentPage().element._getContentElement();
                expect(content.innerHTML).to.equal('hoge');
                done();
              }
            });
          }
        });
      }
    })
  });
});
