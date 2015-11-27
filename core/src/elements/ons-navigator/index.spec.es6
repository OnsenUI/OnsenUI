describe('OnsNavigatorElement', () => {
  let nav;

  beforeEach(() => {
    let tpl1 = ons._util.createElement(`<ons-template id="hoge"><ons-page>hoge</ons-page></ons-template>`),
      tpl2 = ons._util.createElement(`<ons-template id="fuga"><ons-page>fuga</ons-page></ons-template>`);
    document.body.appendChild(tpl1);
    document.body.appendChild(tpl2);
    nav = new OnsNavigatorElement();
    document.body.appendChild(nav);
  });

  afterEach(() => {
    nav.remove();
    nav = null;
  });

  it('should exist', () => {
    expect(window.OnsNavigatorElement).to.be.ok;
  });

  it('provides \'page\' attribute', (done) => {
    let nav = ons._util.createElement(`
      <ons-navigator page='hoge'></ons-navigator>
    `);
    document.body.appendChild(nav);

    setImmediate(() => {
      let content = nav.getCurrentPage().element._getContentElement();
      expect(content.innerHTML).to.equal('hoge');

      done();
    });
  });

  describe('#pages', () => {
    it('provides \'pages\' getter', () => {
      expect(nav.pages).to.be.an('array');
    });

    it('provides \'pages\' property', () => {
      let pages = nav.pages;
      expect(pages[0].element).to.be.an.instanceof(Element);
      expect(pages[0].name).to.be.an('string');
      expect(pages[0].page).to.be.an('string');
    });

    it('should have one page by default', () => {
      expect(nav.pages.length).to.equal(1);
    });
  });

  describe('#pushPage()', () => {
    it('adds a new page to the top of the page stack', (done) => {
      nav.pushPage('hoge', {
        onTransitionEnd: () => {
          let content = nav.getCurrentPage().element._getContentElement();
          expect(nav.pages.length).to.equal(2);
          expect(content.innerHTML).to.equal('hoge');
          done();
        }
      });
    });

    it('only accepts object options', () => {
      expect(() => nav.pushPage('hoge', 'string')).to.throw(Error);
    });

    it('is canceled if already performing another pushPage', () => {
      var spy = chai.spy.on(nav, '_pushPage');
      nav.pushPage('hoge', {});
      nav.pushPage('hoge', {'cancelIfRunning': true});
      expect(spy).to.have.been.called.once;
    });

    it('emits \'prepush\' event', () => {
      let promise = new Promise((resolve) => {
        nav.addEventListener('prepush', (event) => { resolve(event); });
      });

      nav.pushPage('hoge');

      return expect(promise).to.eventually.be.fulfilled;
    });

    it('should be possible to cancel the \'prepush\' event', (done) => {
      expect(nav.pages.length).to.equal(1);

      nav.pushPage('hoge', {onTransitionEnd: () => {
        expect(nav.pages.length).to.equal(2);

        nav.addEventListener('prepush', (event) => {
          event.detail.cancel();
        });

        nav.pushPage('hoge');
        expect(nav.pages.length).to.equal(2);

        done();
      }});
    });

    it('emits \'postpush\' event', () => {
      let promise = new Promise((resolve) => {
        nav.addEventListener('postpush', (event) => { resolve(event); });
      });

      nav.pushPage('hoge');

      return expect(promise).to.eventually.be.fulfilled;
    });

    it('emits \'hide\' event', (done) => {
      let promise = new Promise((resolve) => {
        nav.addEventListener('hide', (event) => { resolve(event); });
      });

      nav.pushPage('hoge', {
        onTransitionEnd: () => nav.popPage({
          onTransitionEnd: () => done()
        })
      });

      return expect(promise).to.eventually.be.fulfilled;
    });
  });

  describe('#bringPageTop()', () => {
    it('fallback to pushPage if the given page does not exist', () => {
      let spy = chai.spy.on(nav, '_pushPage');
      nav.bringPageTop('hoge');
      expect(spy).to.have.been.called.once;
    });

    it('does nothing when the page is already on top', (done) => {
      nav.bringPageTop('hoge', {
        onTransitionEnd: () => {
          let spy = chai.spy.on(nav._doorLock, 'waitUnlock');
          nav.bringPageTop('hoge');
          expect(spy).not.to.have.been.called();
          done();
        }
      });
    });

    it('brings the given pageUrl to the top', (done) => {
      nav.bringPageTop('hoge', {
        onTransitionEnd: () => {
          expect(nav.pages.length).to.equal(2);
          expect(nav.getCurrentPage().name).to.equal('hoge');
          nav.bringPageTop('fuga', {
            onTransitionEnd: () => {
              expect(nav.pages.length).to.equal(3);
              expect(nav.getCurrentPage().name).to.equal('fuga');
              nav.bringPageTop('hoge', {
                onTransitionEnd: () => {
                  expect(nav.pages.length).to.equal(3);
                  expect(nav.getCurrentPage().name).to.equal('hoge');
                  expect(nav.pages[nav.pages.length - 2].name).to.equal('fuga');
                  done();
                }
              });
            }
          });
        }
      });
    });

    it('brings the given page index to the top', (done) => {
      nav.bringPageTop('hoge', {
        onTransitionEnd: () => {
          expect(nav.pages.length).to.equal(2);
          expect(nav.getCurrentPage().name).to.equal('hoge');
          nav.bringPageTop('fuga', {
            onTransitionEnd: () => {
              expect(nav.pages.length).to.equal(3);
              expect(nav.getCurrentPage().name).to.equal('fuga');
              nav.bringPageTop(1, {
                onTransitionEnd: () => {
                  expect(nav.pages.length).to.equal(3);
                  expect(nav.getCurrentPage().name).to.equal('hoge');
                  expect(nav.pages[nav.pages.length - 2].name).to.equal('fuga');
                  done();
                }
              });
            }
          });
        }
      });
    });

    it('only accepts string or number as first parameter', () => {
      expect(() => nav.bringPageTop([])).to.throw(Error);
    });

    it('throws error if the given index is not valid', () => {
      expect(() => nav.bringPageTop(20)).to.throw(Error);
    });

    it('only accepts object options', () => {
      expect(() => nav.bringPageTop('hoge', 'string')).to.throw(Error);
    });

    it('is canceled if already performing another bringPageTop', () => {
      let spy = chai.spy.on(nav, '_pushPage');
      nav.bringPageTop('hoge', {});
      nav.bringPageTop('fuga', {'cancelIfRunning': true});
      expect(spy).to.have.been.called.once;
    });

    it('should be possible to cancel the \'prepush\' event', (done) => {
      expect(nav.pages.length).to.equal(1);

      nav.bringPageTop('hoge', {onTransitionEnd: () => {
        expect(nav.pages.length).to.equal(2);

        nav.addEventListener('prepush', (event) => {
          event.detail.cancel();
        });

        nav.bringPageTop('fuga');
        expect(nav.pages.length).to.equal(2);

        done();
      }});
    });
  });

  describe('#insertPage()', () => {
    it('inserts a new page on a given index', (done) => {
      nav.pushPage('hoge', {
        onTransitionEnd: () => {
          nav.insertPage(0, 'fuga');
          setImmediate(() => {
            expect(nav.pages.length).to.equal(3);

            let content = nav.pages[0].element._getContentElement();
            expect(content.innerHTML).to.equal('fuga');

            done();
          });
        }
      });
    });

    it('only accepts object options', () => {
      expect(() => nav.insertPage(0, 'hoge', 'string')).to.throw(Error);
    });

    it('redirects to pushPage if the insertion is at the top', () => {
      var spy = chai.spy.on(nav, 'pushPage');
      nav.insertPage(1, 'hoge', {});
      expect(spy).to.have.been.called.once;
    });

    it('normalizes the index', (done) => {
      nav.pushPage('hoge', {
        onTransitionEnd: () => {
          nav.insertPage(-2, 'fuga');
          setImmediate(() => {
            expect(nav.pages.length).to.equal(3);

            let content = nav.pages[0].element._getContentElement();
            expect(content.innerHTML).to.equal('fuga');

            done();
          });
        }
      });
    });
  });

  describe('#popPage()', () => {
    it('removes the top page from the stack', (done) => {
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

    it('is canceled if already performing another popPage', (done) => {
      nav.pushPage('hoge', {
        onTransitionEnd: () => {
          var spy = chai.spy.on(nav, '_popPage');
          nav.popPage();
          nav.popPage({'cancelIfRunning': true});
          expect(spy).to.have.been.called.once;
          done();
        }
      });
    });

    it('can refresh the previous page', (done) => {
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
      });
    });

    it('throws error when refreshing pages directly inside the navigator', (done) => {
      nav.innerHTML = '<ons-page> Test </ons-page>';
      nav.pushPage('hoge', {
        onTransitionEnd: () => {
          expect(() => nav.popPage({ refresh: true })).to.throw(Error);
          done();
        }
      });
    });

    it('emits \'prepop\' event', () => {
      let promise = new Promise((resolve) => {
        nav.addEventListener('prepop', (event) => { resolve(event); });
      });

      nav.pushPage('hoge', {
        onTransitionEnd: () => nav.popPage()
      });

      return expect(promise).to.eventually.be.fulfilled;
    });

    it('should be possible to cancel the \'prepop\' event', (done) => {
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

    it('emits \'postpop\' event', () => {
      let promise = new Promise((resolve) => {
        nav.addEventListener('postpop', (event) => { resolve(event); });
      });

      nav.pushPage('hoge', {
        onTransitionEnd: () => nav.popPage()
      });

      return expect(promise).to.eventually.be.fulfilled;
    });

    it('emits \'show\' event', (done) => {
      let promise = new Promise((resolve) => {
        nav.addEventListener('show', (event) => { resolve(event); });
      });

      nav.pushPage('hoge', {
        onTransitionEnd: () => nav.popPage({
          onTransitionEnd: () => done()
        })
      });

      return expect(promise).to.eventually.be.fulfilled;
    });
  });

  describe('#replacePage()', () => {
    it('replaces the current page with a new one', (done) => {
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
  });

  describe('#replaceToPage()', () => {
    it('replaces all the page stack with only a new page', (done) => {
      nav.pushPage('fuga', {onTransitionEnd: () => {
        nav.resetToPage('hoge', {
          onTransitionEnd: () => {
            expect(nav.pages.length).to.equal(1);
            let content = nav.getCurrentPage().element._getContentElement();
            expect(content.innerHTML).to.equal('hoge');
            done();
          }
        });
      }});
    });
  });

  describe('#getCurrentPage()', () => {
    it('returns the current page', () => {
      let page = nav.getCurrentPage();

      expect(page.element).to.be.an.instanceof(Element);
      expect(page.name).to.be.an('string');
      expect(page.page).to.be.an('string');
    });

    it('throws error if page stack is empty', () => {
      nav._destroy();
      expect(() => nav.getCurrentPage()).to.throw(Error);
    });
  });

  describe('#canPopPage()', () => {
    it('returns whether a page can be popped', (done) => {
      expect(nav.canPopPage()).to.be.false;
      nav.pushPage('hoge', {onTransitionEnd: () => {
        expect(nav.canPopPage()).to.be.true;
        done();
      }});
    });
  });

  describe('#_destroy()', () => {
    it('destroys all the pages', () => {
      expect(nav.pages.length).to.equal(1);
      nav._destroy();
      expect(nav.pages.length).to.equal(0);
    });
  });

  describe('#_createPageElement()', () => {
    it('throws an error when no ons-page is provided', () => {
      let tmp = ons._internal.normalizePageHTML;
      ons._internal.normalizePageHTML = (html) => '<div>' + html + '</div>';
      expect(() => nav._createPageElement('Test')).to.throw(Error);
      ons._internal.normalizePageHTML = tmp;
    });
  });

  describe('#_onDeviceBackButton()', () => {
    it('pops a page if there are more than one', (done) => {
      nav.pushPage('hoge', {
        onTransitionEnd: () => {
          var spy = chai.spy.on(nav, 'popPage');
          nav._onDeviceBackButton();
          expect(spy).to.have.been.called.once;
          done();
        }
      });
    });

    it('calls event parent handler if there are less than two pages', () => {
      var event = { 'callParentHandler': () => { return; }};
      var spy = chai.spy.on(event, 'callParentHandler');
      nav._onDeviceBackButton(event);
      expect(spy).to.have.been.called.once;
    });
  });

  describe('propagate API', () => {

    it('fires \'show\' event', () => {
      let promise = new Promise((resolve) => {
        nav.addEventListener('show', (event) => resolve());
      });

      nav.pushPage('hoge', {
        onTransitionEnd: () => {
          nav._hide();
          nav._show();
        }
      });

      return expect(promise).to.eventually.be.fulfilled;
    });

    it('fires \'hide\' event', () => {
      let promise = new Promise((resolve) => {
        nav.addEventListener('hide', () => resolve());
      });

      nav.pushPage('hoge', {
        onTransitionEnd: () => nav._hide()
      });

      return expect(promise).to.eventually.be.fulfilled;
    });

    it('fires \'destroy\' event', () => {
      let promise = new Promise((resolve) => {
        nav.addEventListener('destroy', () => resolve());
      });

      nav.pushPage('hoge', {
        onTransitionEnd: () => nav._destroy()
      });

      return expect(promise).to.eventually.be.fulfilled;
    });
  });

  describe('#registerAnimator()', () => {
    it('throws an error if animator is not a NavigatorAnimator', () => {
      expect(() => window.OnsNavigatorElement.registerAnimator('hoge', 'hoge')).to.throw(Error);
    });

    it('registers a new animator', () => {
      class MyAnimator extends ons._internal.NavigatorTransitionAnimator {
      }

      window.OnsNavigatorElement.registerAnimator('hoge', MyAnimator);
    });
  });
});
