'use strict';

describe('OnsBackButtonElement', () => {
  it('exists', () => {
    expect(window.OnsBackButtonElement).to.be.ok;
  });

  it('provides \'modifier\' attribute', () => {
    const element = ons._util.createElement('<ons-back-button>label</ons-back-button>');

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
    const element = ons._util.createElement('<ons-back-button>label</ons-back-button>');
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
      const promise = new Promise((resolve) => {
        nav.addEventListener('postpop', () => {
          resolve();
        });

        nav.pushPage('page2').then(function(page) {
          const element = nav.querySelector('ons-back-button');
          nav.querySelector('ons-back-button')._onClick();
        });
      });

      return expect(promise).to.eventually.be.fulfilled;
    });
  });

  describe('#onClick', () => {
    it ('overrides the default click handler', () => {
      const backButton = ons._util.createElement('<ons-back-button></ons-back-button>');
      backButton.onClick = function () {};
      const spy = chai.spy.on(backButton, 'onClick');
      backButton._onClick();
      expect(spy).to.have.been.called.once;
    });
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = '<ons-back-button>Back</ons-back-button>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });

  describe('autoStyling', () => {
    it('adds \'material\' modifiers and effects on Android', () => {
      ons.platform.select('android');
      const e = ons._util.createElement('<ons-back-button>label</ons-back-button>');
      expect(e.getAttribute('modifier')).to.equal('material');
      ons.platform.select('');
    });
  });
});
