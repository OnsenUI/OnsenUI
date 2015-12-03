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
    it('will pop a page', () => {
      let div = ons._util.createElement(`
        <div>
          <ons-template id="page1">
            <ons-page></ons-page>
          </ons-template>
          <ons-template id="page2">
            <ons-page>
              <ons-back-button>content</ons-back-button>
            </ons-page>
          </ons-template>
          <ons-navigator page="page1"></ons-navigator>
        </div>
      `);

      document.body.appendChild(div);

      let nav = div.querySelector('ons-navigator');

      let promise = new Promise((resolve) => {
        nav.addEventListener('postpop', () => {
          div.remove();
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
  });
});
