describe('ons-back-button', () => {
  it('provides \'OnsBackButton\' global variable', () => {
    expect(window.OnsBackButtonElement).to.be.ok;
  });

  it('provides \'modifier\' attribute', () => {
    var element = new OnsBackButtonElement();

    element.setAttribute('modifier', 'hoge');
    expect(element.children[0].classList.contains('toolbar-button--hoge')).to.be.true;

    element.setAttribute('modifier', ' foo bar');
    expect(element.children[0].classList.contains('toolbar-button--foo')).to.be.true;
    expect(element.children[0].classList.contains('toolbar-button--bar')).to.be.true;
    expect(element.children[0].classList.contains('toolbar-button--hoge')).not.to.be.true;

    element.children[0].classList.add('toolbar-button--piyo');
    element.setAttribute('modifier', 'fuga');
    expect(element.children[0].classList.contains('toolbar-button--piyo')).to.be.true;
    expect(element.children[0].classList.contains('toolbar-button--fuga')).to.be.true;
  });

  it('has a default child', () => {
    var element = new OnsBackButtonElement();
    document.body.appendChild(element);

    expect(element.children[0]).to.be.ok;
    expect(element.children[1]).not.to.be.ok;

    expect(element.children[0].nodeName).to.equal('SPAN');
    expect(element.children[0].classList.contains('toolbar-button--quiet')).to.be.true;
    expect(element.children[0].style.height).to.equal('44px');
    expect(element.children[0].style.lineHeight).to.equal('0');
    expect(element.children[0].style.padding).to.equal('0px 10px 0px 0px');
    expect(element.children[0].style.position).to.equal('relative');
  });

  it('has an onClick() method', (done) => {
    document.body.appendChild(ons._util.createElement (`
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
    `));

    var contentBefore;
    setImmediate(() =>  {
      var nav = document.querySelector('ons-navigator');

      var listener = (event) => {
        var contentAfter = nav.getCurrentPage();
        expect(event).to.be.ok;
        document.removeEventListener('postpop', listener);
        done();
      };

      nav.addEventListener('postpop', listener);

      nav.pushPage('page2', {
        onTransitionEnd: () => {
          let element = nav.querySelector('ons-back-button');
          element._onClick();
        }
      });
    });
  });
});