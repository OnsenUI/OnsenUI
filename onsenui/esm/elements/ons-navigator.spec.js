'use strict';

describe('OnsNavigatorElement', () => {
  let nav, nav2, tpl1, tpl2, tpl3;

  beforeEach((done) => {
    tpl1 = ons._util.createElement(`<template id="hoge"><ons-page>hoge</ons-page></template>`);
    tpl2 = ons._util.createElement(`<template id="fuga"><ons-page>fuga</ons-page></template>`);
    tpl3 = ons._util.createElement(`<template id="info"><ons-page>info</ons-page></template>`);
    document.body.appendChild(tpl1);
    document.body.appendChild(tpl2);
    document.body.appendChild(tpl3);

    nav = ons._util.createElement(`
      <ons-navigator page='hoge'></ons-navigator>
    `);
    nav.options = {cancelIfRunning: false};
    document.body.appendChild(nav);

    setImmediate(done);
  });

  afterEach(() => {
    nav.remove();
    tpl1.remove();
    tpl2.remove();
    tpl3.remove();
    nav = tpl1 = tpl2 = tpl3 = null;
  });

  it('should exist', () => {
    expect(window.ons.elements.Navigator).to.be.ok;
  });

  it('provides \'animators\' object', () => {
    expect(window.ons.elements.Navigator.animators).to.be.an('object');
  });

  onlyChrome(it)('provides \'page\' attribute', () => {
    const content = nav.topPage._getContentElement();
    expect(content.innerHTML).to.equal('hoge');
  });

  it('provides \'page\' property', () => {
    nav.page = 'hoge';
    expect(nav.page).to.equal('hoge');
  });

  it('provides \'pageLoader\' property', () => {
    expect(nav.pageLoader).to.be.ok;
    nav.pageLoader = new ons.PageLoader();
    expect(nav.pageLoader).to.be.ok;
  });

  it('provides \'animatorFactory\' property', () => {
    expect(nav.animatorFactory).to.be.ok;
  });

  describe('#pages', () => {
    it('provides \'pages\' property', () => {
        const pages = nav.pages;
        expect(pages[0]).to.be.an.instanceof(Element);
    });

    it('should have one page after initialization', () => {
       expect(nav.pages.length).to.equal(1);
    });
  });

  describe('#pushPage()', () => {
    it('adds a new page to the top of the page stack', (done) => {
      nav.pushPage('hoge', {
        callback: () => {
          const content = nav.topPage._getContentElement();
          expect(nav.pages.length).to.equal(2);
          expect(content.innerHTML).to.equal('hoge');
          done();
        }
      });
    });

    it('push none exist page', (done) => {
      nav.pushPage('404').catch(err => {
        expect(err).to.equal(404);
        done();
      });
    });

    it('adds a new page to the top of the page stack using options.pageHTML', (done) => {
      nav.pushPage(null, {
        pageHTML: '<ons-page>hoge2</ons-page>',
        callback: () => {
          const content = nav.topPage._getContentElement();
          expect(nav.pages.length).to.equal(2);
          expect(content.innerHTML).to.equal('hoge2');
          done();
        }
      });
    });

    it('only accepts object options', () => {
      expect(() => nav.pushPage('hoge', 'string')).to.throw(Error);
    });

    it('is canceled if already performing another pushPage', (done, rej) => {
      var spy = chai.spy.on(nav, '_pushPage');

      var counter = 0;

      var myFun = (num, ok) => {
        counter++;

        if (num == 0 && !ok) {
          throw 'First pushPage should go through';
        }

        if (num == 1 && ok) {
          throw 'Second pushPage should not go through';
        }

        if (counter == 2) {
          done();
        }
      };

      var promise1 = nav.pushPage('hoge', {}).then(() => {
        myFun(0, true);
      }, () => {
        myFun(0, false);
      });

      var promise2 = nav.pushPage('hoge', {'cancelIfRunning': true}).then(() => {
        myFun(1, true);
      }, () => {
        myFun(1, false);
      });

      expect(promise1).to.eventually.be.fulfilled;
      expect(promise2).to.eventually.be.rejected;
    });

  });

  describe('#popPage()', () => {
    it('only accepts object options', () => {
      expect(() => nav.popPage('hoge', 'string')).to.throw(Error);
    });

    it('throws error if the stack is empty', (done) => {
      nav.popPage().then( null, () => {
        done();
      });
    });

    it('removes the top page from the stack', (done) => {
      nav.pushPage('fuga', {
        callback: () => {
          const content = nav.topPage._getContentElement();
          expect(content.innerHTML).to.equal('fuga');

          nav.popPage({
            callback: () => {
              expect(nav.pages.length).to.equal(1);
              const content = nav.topPage._getContentElement();
              expect(content.innerHTML).equal('hoge');
              done();
            }
          });
        }
      });
    });

    it('is canceled if already performing another popPage', (done) => {
      var calls = [false, false];
      var finished = (num) => {
        calls[num] = true;
        if (calls[0] && calls[1]) {
          done();
        }
      };
      var spy = chai.spy.on(nav, '_popPage');

      nav.pushPage('hoge', {
        callback: () => {
          var promise1 = nav.popPage().then((happy) => {
            finished(0);
          });

          var promise2 = nav.popPage({'cancelIfRunning': true}).then(() => {
          }, () => {
            finished(1);
          });
        }
      });
    });

    it('emits \'prepop\' event', () => {
      const promise = new Promise((resolve) => {
        nav.addEventListener('prepop', (event) => { resolve(event); });
      });

      nav.pushPage('hoge', {
        callback: () => nav.popPage()
      });

      return expect(promise).to.eventually.be.fulfilled;
    });

    it('should be possible to cancel the \'prepop\' event', (done) => {
      nav.addEventListener('prepop', (event) => {
        event.detail.cancel();
      });

      expect(nav.pages.length).to.equal(1);

      nav.pushPage('hoge', {
        callback: () => {
          expect(nav.pages.length).to.equal(2);
          nav.popPage();
          expect(nav.pages.length).to.equal(2);
          done();
        }
      });
    });

    it('emits \'postpop\' event', () => {
      const promise = new Promise((resolve) => {
        nav.addEventListener('postpop', (event) => { resolve(event); });
      });

      nav.pushPage('hoge', {
        callback: () => nav.popPage()
      });

      return expect(promise).to.eventually.be.fulfilled;
    });

    it('emits \'show\' event', () => {
      const deferred = ons._util.defer();

      nav.pushPage('hoge').then(() => {
        nav.addEventListener('show', deferred.resolve);
        nav.popPage();
      });

      return expect(deferred.promise).to.eventually.be.fulfilled;
    });

    it('returns a promise that resolves to the new top page', () => {
      return nav.pushPage('hoge').then(() => {
        return expect(nav.popPage()).to.eventually.be.fulfilled.then(
          page => expect(page).to.equal(nav.topPage)
        );
      });
    });
  });

  describe('#bringPageTop()', () => {

    it('fallback to pushPage if the given page does not exist', (done) => {
      const spy = chai.spy.on(nav, '_pushPage');
      nav.bringPageTop('info');
      expect(spy).to.have.been.called.once;
      done();
    });

    it('does nothing when the page is already on top', (done) => {
      const spy = chai.spy.on(nav, '_pushPage');
      nav.bringPageTop('hoge');
      expect(spy).not.to.have.been.called();
      done();
    });

    it('brings the given pageUrl to the top', (done) => {
      expect(nav.pages.length).to.equal(1);
      expect(nav._pageMap.get(nav.topPage)).to.equal('hoge');
      nav.bringPageTop('fuga', {
        callback: () => {
          expect(nav.pages.length).to.equal(2);
          expect(nav._pageMap.get(nav.topPage)).to.equal('fuga');
          nav.bringPageTop('hoge', {
            callback: () => {
              expect(nav.pages.length).to.equal(2);
              expect(nav._pageMap.get(nav.topPage)).to.equal('hoge');
              expect(nav._pageMap.get(nav.pages[nav.pages.length - 2])).to.equal('fuga');
              done();
            }
          });
        }
      });
    });

    it('brings the given page index to the top', (done) => {
      expect(nav.pages.length).to.equal(1);
      expect(nav._pageMap.get(nav.topPage)).to.equal('hoge');
      nav.bringPageTop('fuga', {
        callback: () => {
          expect(nav.pages.length).to.equal(2);
          expect(nav._pageMap.get(nav.topPage)).to.equal('fuga');
          nav.bringPageTop(0, {
            callback: () => {
              expect(nav.pages.length).to.equal(2);
              expect(nav._pageMap.get(nav.topPage)).to.equal('hoge');
              expect(nav._pageMap.get(nav.pages[nav.pages.length - 2])).to.equal('fuga');
              done();
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


    it('should be possible to cancel the \'prepush\' event', (done) => {
      expect(nav.pages.length).to.equal(1);

      nav.bringPageTop('info', {callback: () => {
        expect(nav.pages.length).to.equal(2);

        nav.addEventListener('prepush', (event) => {
          event.detail.cancel();
        });

        nav.bringPageTop('fuga').then(null, () => {
          expect(nav.pages.length).to.equal(2);
          done();
        });
      }});
    });

    it('returns a promise that resolves to the new top page', () => {
      return nav.pushPage('info').then(() => {
        return nav.pushPage('fuga').then(() => {
          return expect(nav.bringPageTop('info')).to.eventually.be.fulfilled.then(
            page => expect(page).to.equal(nav.topPage)
          );
        });
      });
    });

    it('works when initial page is defined as child element', () => {
      nav = ons._util.createElement(`
        <ons-navigator page='hoge'><ons-page></ons-page></ons-navigator>
      `);
      document.body.appendChild(nav);

      expect(() => nav.bringPageTop('hoge')).to.not.throw(Error);
    });
  });

  describe('#insertPage()', () => {
    onlyChrome(it)('inserts a new page on a given index', (done) => {
      nav.pushPage('info', {
        callback: () => {
          nav.insertPage(0, 'fuga');
          setImmediate(() => {
            expect(nav.pages.length).to.equal(3);

            const content = nav.pages[0]._getContentElement();
            expect(content.innerHTML).to.equal('fuga');

            done();
          });
        }
      });
    });

    it('inserts a new page on a given index using `options.pageHTML`', (done) => {
      nav.pushPage('info', {
        callback: () => {
          nav.insertPage(0, null, {pageHTML: '<ons-page>fuga</ons-page>'});
          setImmediate(() => {
            expect(nav.pages.length).to.equal(3);

            const content = nav.pages[0]._getContentElement();
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
      nav.insertPage(1, 'info', {});
      expect(spy).to.have.been.called.once;
    });

    it('normalizes the index', (done) => {
      nav.pushPage('info', {
        callback: () => {
          nav.insertPage(-2, 'fuga').then( () => {
            expect(nav.pages.length).to.equal(3);

            const content = nav.pages[0]._getContentElement();
            expect(content.innerHTML).to.equal('fuga');

            done();
          });
        }
      });
    });

    it('returns a promise that resolves to the inserted page', () => {
      return nav.pushPage('hoge').then(() => {
        return expect(nav.insertPage(0, 'fuga')).to.eventually.be.fulfilled.then(
          page => expect(page).to.equal(nav.pages[0])
        );
      });
    });
  });

  describe('#removePage()', () => {
    it('removes the page on a given index', (done) => {
      nav.pushPage('info', {
        callback: () => {
          expect(nav.pages.length).to.equal(2); // ['hoge', 'info']

          nav.removePage(0).then(() => {
            expect(nav.pages.length).to.equal(1); // ['info']

            const content = nav.pages[0]._getContentElement();
            expect(content.innerHTML).to.equal('info');

            done();
          });
        }
      });
    });

    it('only accepts object options', (done) => {
      nav.pushPage('info', {
        callback: () => {
          nav.removePage(0).then(() => {
            expect(() => nav.removePage(0, 'string')).to.throw(Error);

            done();
          });
        }
      });
    });

    it('redirects to pushPage if the removal is at the top', () => {
      var spy = chai.spy.on(nav, 'popPage');
      nav.removePage(0, {});
      expect(spy).to.have.been.called.once;
    });

    it('normalizes the index', (done) => {
      nav.pushPage('info', {
        callback: () => {
          expect(nav.pages.length).to.equal(2); // ['hoge', 'info']

          nav.removePage(-2).then(() => {
            expect(nav.pages.length).to.equal(1); // ['info']

            const content = nav.pages[0]._getContentElement();
            expect(content.innerHTML).to.equal('info');

            done();
          });
        }
      });
    });
  });

  describe('#replacePage()', () => {
    it('only accepts object options', () => {
      expect(() => nav.replacePage('hoge', 'string')).to.throw(Error);
    });

    it('replaces the current page with a new one', () => {
      return nav.pushPage('info')
        .then(() => {
          expect(nav.pages.length).to.equal(2);
          const content = nav.topPage._getContentElement();
          expect(content.innerHTML).to.equal('info');

          return nav.replacePage('fuga')
            .then(() => {
              expect(nav.pages.length).to.equal(2);
              const content = nav.topPage._getContentElement();
              expect(content.innerHTML).to.equal('fuga');
            });
        });
    });

    it('returns a promise that resolves to the new top page', () => {
      return nav.pushPage('hoge')
        .then(() => expect(nav.replacePage('fuga')).to.eventually.be.fulfilled)
        .then(page => expect(page).to.equal(nav.topPage));
    });
  });

  describe('#resetToPage()', () => {
    it('only accepts object options', () => {
      expect(() => nav.resetToPage('hoge', 'string')).to.throw(Error);
    });

    it('replaces all the page stack with only a new page', (done) => {
      nav.pushPage('fuga', {callback: () => {
        nav.resetToPage('hoge', {
          callback: () => {
            expect(nav.pages.length).to.equal(1);
            const content = nav.topPage._getContentElement();
            expect(content.innerHTML).to.equal('hoge');
            done();
          }
        });
      }});
    });

    it('returns a promise that resolves to the new top page', () => {
      return nav.pushPage('hoge').then(() => {
        return expect(nav.resetToPage('fuga')).to.eventually.be.fulfilled.then(
          page => expect(page).to.equal(nav.topPage)
        );
      });
    });
  });

  describe('#topPage', () => {
    it('returns the current page', () => {
      const page = nav.topPage;

      expect(page).to.be.an.instanceof(Element);
      expect(nav._pageMap.get(page)).to.be.an('string');
    });

    it('throws error if page stack is empty', () => {
      nav._destroy();
      expect(nav.topPage).to.equal(null);
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
      const tmp = ons._internal.normalizePageHTML;
      ons._internal.normalizePageHTML = (html) => '<div>' + html + '</div>';
      expect(() => nav._createPageElement('Test')).to.throw(Error);
      ons._internal.normalizePageHTML = tmp;
    });
  });

  describe('#_onDeviceBackButton()', () => {
    it('pops a page if there are more than one', (done) => {
      nav.pushPage('hoge', {
        callback: () => {
          var spy = chai.spy.on(nav, 'popPage');
          nav._onDeviceBackButton();
          expect(spy).to.have.been.called.once;
          done();
        }
      });
    });

    it('calls event parent handler if there are less than two pages', () => {
      var event = {callParentHandler: () => { return; }};
      var spy = chai.spy.on(event, 'callParentHandler');
      nav._onDeviceBackButton(event);
      expect(spy).to.have.been.called.once;
    });
  });

  describe('propagate API', () => {

    it('fires \'show\' event', () => {
      const promise = new Promise((resolve) => {
        nav.addEventListener('show', (event) => resolve());
      });

      nav.pushPage('hoge', {
        callback: () => {
          nav._hide();
          nav._show();
        }
      });

      return expect(promise).to.eventually.be.fulfilled;
    });

    it('fires \'hide\' event', () => {
      const promise = new Promise((resolve) => {
        nav.addEventListener('hide', () => resolve());
      });

      nav.pushPage('hoge', {
        callback: () => nav._hide()
      });

      return expect(promise).to.eventually.be.fulfilled;
    });

    it('fires \'destroy\' event', () => {
      const promise = new Promise((resolve) => {
        nav.addEventListener('destroy', () => resolve());
      });

      nav.pushPage('hoge', {
        callback: () => nav._destroy()
      });

      return expect(promise).to.eventually.be.fulfilled;
    });
  });

  describe('#registerAnimator()', () => {
    it('throws an error if animator is not a NavigatorAnimator', () => {
      expect(() => window.ons.elements.Navigator.registerAnimator('hoge', 'hoge')).to.throw(Error);
    });

    it('registers a new animator', () => {
      class MyAnimator extends window.ons.elements.Navigator.NavigatorAnimator {
      }

      window.ons.elements.Navigator.registerAnimator('hoge', MyAnimator);
    });
  });

  describe('Extended Animator', () => {
    it('can be registered', () => {
      const MyAnimator = window.ons.elements.Navigator.animators['fade-ios'].extend();

      window.ons.elements.Navigator.registerAnimator('fuga', MyAnimator);
    });

    it('overwrites specified properties', () => {
      const deferred = {};
      deferred.promise = new Promise((resolve) => {
        deferred.resolve = resolve;
      });

      const CustomAnimatorClass = window.ons.elements.Navigator.animators['fade-ios'].extend({
        duration: 0,
        push: function(enterPage, leavePage, callback) {
          deferred.resolve();
          callback();
        }
      });

      const customAnimatorInstance = new CustomAnimatorClass();
      const Animator = window.ons.elements.Navigator.animators['fade-ios'];
      const originalAnimatorInstance = new Animator();

      expect(customAnimatorInstance.pop).to.equal(originalAnimatorInstance.pop);
      expect(customAnimatorInstance.push).to.not.equal(originalAnimatorInstance.push);
      expect(customAnimatorInstance.duration).to.not.equal(originalAnimatorInstance.duration);

      window.ons.elements.Navigator.registerAnimator('customAnimator', CustomAnimatorClass);
      return nav.pushPage('fuga', {animation: 'customAnimator'})
        .then(() => {
          return expect(deferred.promise).to.eventually.be.fulfilled;
        });
    });
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = '<ons-navigator></ons-navigator>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });

  describe('#backButton', () => {
    beforeEach((done) => {
      const tpl1 = ons._util.createElement(`<template id="backPage"><ons-page><ons-back-button>Back</ons-back-button>hoge</ons-page></template>`);
      const tpl2 = ons._util.createElement(`<template id="backPage2"><ons-page><ons-back-button>Back</ons-back-button>hoge2</ons-page></template>`);

      document.body.appendChild(tpl1);
      document.body.appendChild(tpl2);
      nav2 = ons._util.createElement(`<ons-navigator></ons-navigator>`);
      document.body.appendChild(nav2);

      nav2.pushPage('backPage').then(() => done());
    });

    it('should not display on first page', () => {
      const backBtn = nav2.topPage.backButton;
      expect(backBtn.style.display).to.equal('none');
    });

    it('should display button after push', () => {
      return nav2.pushPage('backPage').then(() => {
        const backBtn = nav2.topPage.backButton;
        expect(backBtn.style.display).to.equal('inline-block');
      });
    });

    it('should display button after insert and hide after pop', () => {
      return nav2.insertPage(0, 'backPage').then(() => {
        var backBtn = nav2.topPage.backButton;
        expect(backBtn.style.display).to.equal('inline-block');

        return nav2.popPage().then(() => {
          backBtn = nav2.topPage.backButton;
          expect(backBtn.style.display).to.equal('none');
        });
      });
    });

    it('should display button after insert and hide after reset', () => {
      return nav2.pushPage('backPage2').then(() => {
        var backBtn = nav2.topPage.backButton;
        expect(backBtn.style.display).to.equal('inline-block');

        return nav2.resetToPage('backPage').then(() => {
          backBtn = nav2.topPage.backButton;
          expect(backBtn.style.display).to.equal('none');
        });
      });
    });

    afterEach(() => {
      nav2.remove();
      nav2 = null;
    });

  });
});
