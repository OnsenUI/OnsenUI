'use strict';

describe('OnsBackButtonElement', () => {
  it('exists', () => {
    expect(window.OnsBackButtonElement).to.be.ok;
  });

  it('provides \'modifier\' attribute', () => {
    let element = ons._util.createElement('<ons-back-button>label</ons-back-button>');

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
    let element = ons._util.createElement('<ons-back-button>label</ons-back-button>');
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
            <ons-page id="p1">page1 content</ons-page>
          </ons-template>
          <ons-template id="page2">
            <ons-page id="p2">
              <ons-back-button>content</ons-back-button>
            </ons-page>
          </ons-template>
        </div>
      `);

      nav = new OnsNavigatorElement();
      nav._options = {cancelIfRunning: false};
      document.body.appendChild(div);
      document.body.appendChild(nav);
      nav.pushPage('page1').then(function(e) {
        done();
      });
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

        nav.pushPage('page2').then(function(page) {
          let element = nav.querySelector('ons-back-button');
          nav.querySelector('ons-back-button')._onClick();
        });
      });

      return expect(promise).to.eventually.be.fulfilled;
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
      let e = ons._util.createElement('<ons-back-button>label</ons-back-button>');
      expect(e.getAttribute('modifier')).to.equal('material');
      ons.platform.select('');
    });
  });
});
