'use strict';

describe('ons-button', () => {
  it('provides \'OnsButtonElement\' global variable', () => {
    expect(window.OnsButtonElement).to.be.ok;
  });

  it('provides modifier attribute', () => {
    var element = new OnsButtonElement();
    element.setAttribute('modifier', 'hoge');
    expect(element.classList.contains('button--hoge')).to.be.true;

    element.setAttribute('modifier', ' foo bar');
    expect(element.classList.contains('button--foo')).to.be.true;
    expect(element.classList.contains('button--bar')).to.be.true;
    expect(element.classList.contains('button--hoge')).not.to.be.true;

    element.classList.add('button--piyo');
    element.setAttribute('modifier', 'fuga');
    expect(element.classList.contains('button--piyo')).to.be.true;
    expect(element.classList.contains('button--fuga')).to.be.true;
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = '<ons-button>Button</ons-button>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });

  describe('autoStyling', () => {
    it('adds \'material\' modifiers and effects on Android', () => {
      ons.platform.select('android');
      let e = document.createElement('ons-button');
      expect(e.getAttribute('modifier')).to.equal('material');
      expect(e.hasAttribute('ripple')).to.be.true;
      expect(e.firstChild.tagName.toLowerCase()).to.equal('ons-ripple');
      e = ons._util.createElement('<ons-button modifier="quiet"></ons-button>');
      expect(e.getAttribute('modifier')).to.contain('material--flat');
      e = ons._util.createElement('<ons-button modifier="large--quiet"></ons-button>');
      expect(e.getAttribute('modifier')).to.contain('large').and.to.contain('material--flat');
      ons.platform.select('');
    });
  });
});

