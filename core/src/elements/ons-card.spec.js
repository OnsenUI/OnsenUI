'use strict';

describe('ons-card', () => {
  it('provides \'OnsCardElement\' global variable', () => {
    expect(window.ons.CardElement).to.be.ok;
  });

  onlyChrome(it)('classList contains \'card\' by default', () => {
    const element = new ons.CardElement();
    expect(element.classList.contains('card')).to.be.true;
    element.setAttribute('class', 'foo');
    expect(element.classList.contains('card')).to.be.true;
    expect(element.classList.contains('foo')).to.be.true;
  });

  onlyChrome(it)('provides modifier attribute', () => {
    const element = new ons.CardElement();
    element.setAttribute('modifier', 'hoge');
    expect(element.classList.contains('card--hoge')).to.be.true;

    element.setAttribute('modifier', ' foo bar');
    expect(element.classList.contains('card--foo')).to.be.true;
    expect(element.classList.contains('card--bar')).to.be.true;
    expect(element.classList.contains('card--hoge')).not.to.be.true;

    element.classList.add('card--piyo');
    element.setAttribute('modifier', 'fuga');
    expect(element.classList.contains('card--piyo')).to.be.true;
    expect(element.classList.contains('card--fuga')).to.be.true;
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = `
        <ons-card>
          <p>Content</p>
        </ons-card>
      `;
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });

  describe('autoStyling', () => {
    it('adds \'material\' modifier on Android', () => {
      ons.platform.select('android');
      const e = document.createElement('ons-card');
      expect(e.getAttribute('modifier')).to.equal('material');
      ons.platform.select('');
    });
  });
});
