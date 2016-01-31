'use strict';

describe('OnsBackButtonElement', () => {
  it('exists', () => {
    expect(window.OnsBackButtonElement).to.be.ok;
  });

  it('provides \'modifier\' attribute', () => {
    let element = new OnsBackButtonElement();

    element.setAttribute('modifier', 'hoge');
    expect(element.classList.contains('back-button--hoge')).to.be.true;


    element.setAttribute('modifier', 'foo bar');
    expect(element.classList.contains('back-button--foo')).to.be.true;
    expect(element.classList.contains('back-button--bar')).to.be.true;
    expect(element.classList.contains('back-button--hoge')).not.to.be.true;

    element.classList.add('back-button--piyo');
    element.setAttribute('modifier', 'fuga');
    expect(element.classList.contains('back-button--piyo')).to.be.true;
    expect(element.classList.contains('back-button--fuga')).to.be.true;
  });

  it('has two children', () => {
    let element = new OnsBackButtonElement();
    document.body.appendChild(element);

    expect(element.children[0]).to.be.ok;
    expect(element.children[1]).to.be.ok;
    expect(element.children[2]).not.to.be.ok;
  });

  describe('#_onClick()', () => {
    let div, nav;

    beforeEach((done) => {
      div = ons._util.createElement(`
        <div>
          <ons-template id="page1">
            <ons-page id="p1"></ons-page>
          </ons-template>
          <ons-template id="page2">
            <ons-page id="p2">
              <ons-back-button>content</ons-back-button>
            </ons-page>
          </ons-template>
        </div>
      `);

      nav = new OnsNavigatorElement();
      document.body.appendChild(div);
      document.body.appendChild(nav);
      nav.resetToPage('page1', {animation: 'default', onTransitionEnd: done});
    });

    afterEach(() => {
      div.remove();
      nav.remove();
      div = nav = null;
    });

    it('will pop a page', () => {
      let promise = new Promise((resolve) => {
        nav.addEventListener('postpop', () => {
          resolve();
        });
      });

      nav.pushPage('page2', {
        onTransitionEnd: () => {
          let element = nav.querySelector('ons-back-button');
          element._onClick();
        }
      });

      return expect(promise).to.eventually.be.fulfilled;
    });

    it('takes \'animation\' attribute', (done) => {
      nav.pushPage('page2', {
        onTransitionEnd: () => {
          let element = nav.querySelector('ons-back-button');
          let animation = 'fade';
          element.setAttribute('animation', animation);
          let tmp = nav.popPage;
          nav.popPage = options => { if (options.animation === animation) { nav.popPage = tmp; done(); } };
          element._onClick();
        }
      });
    });

    it('takes \'animation-options\' attribute', (done) => {
      nav.pushPage('page2', {
        onTransitionEnd: () => {
          let element = nav.querySelector('ons-back-button');
          element.setAttribute('animation-options', '{delay: .1, duration: .2, timing: \'ease-out\'}');
          let spy = chai.spy.on(nav, 'popPage');
          element._onClick();
          expect(spy).to.have.been.called.with({cancelIfRunning: true, animationOptions: {delay: 0.1, duration: 0.2, timing: 'ease-out'}});
          done();
        }
      });
    });

    it('takes \'refresh\' attribute', () => {
      let promise = new Promise((resolve) => {
        nav.addEventListener('init', event => {
          if (event.detail.page.id === 'p1') {
            return resolve();
          }
        });
      });

      nav.pushPage('page2', {
        onTransitionEnd: () => {
          let element = nav.querySelector('ons-back-button');
          element.setAttribute('refresh', true);
          element._onClick();
        }
      });

      return expect(promise).to.eventually.be.fulfilled;
    });

    it('takes \'onTransitionEnd\' attribute', (done) => {
      window.onTransitionEndCompleted = done;

      nav.pushPage('page2', {
        onTransitionEnd: () => {
          let element = nav.querySelector('ons-back-button');
          element.setAttribute('on-transition-end',
            `function() {\
              var localPromise = window.onTransitionEndCompleted;\
              window.onTransitionEndCompleted = null;\
              localPromise();\
            }`);
          element._onClick();
        }
      });
    });
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      let div1 = document.createElement('div');
      let div2 = document.createElement('div');
      div1.innerHTML = '<ons-back-button>Back</ons-back-button>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });

  describe('autoStyling', () => {
    it('adds \'material\' modifiers and effects on Android', () => {
      ons.platform.select('android');
      let e = document.createElement('ons-back-button');
      expect(e.getAttribute('modifier')).to.equal('material');
      expect(e.getAttribute('effect')).to.equal('ripple');
      expect(e.firstChild.tagName.toLowerCase()).to.equal('ons-ripple');
      ons.platform.select('');
    });

    it('removes \'material\' modifiers and effects on iOS', () => {
      ons.platform.select('ios');
      let e = ons._util.createElement('<ons-back-button modifier="material" effect="ripple"></ons-back-button>');
      expect(e.getAttribute('modifier')).not.to.equal('material');
      expect(e.getAttribute('effect')).not.to.equal('ripple');
      expect(e.firstChild.tagName.toLowerCase()).not.to.equal('ons-ripple');
      ons.platform.select('');
    });
  });
});
