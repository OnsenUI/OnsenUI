'use strict';

describe('OnsRangeElement', () => {
  let element;

  beforeEach(() => {
    element = new OnsRangeElement();
    document.body.appendChild(element);
  });

  afterEach(() => {
    element.remove();
    element = null;
  });

  it('exists', () => {
    expect(window.OnsSwitchElement).to.be.ok;
  });

  it('classList contains \'range\' by default', () => {
    expect(element._input.classList.contains('range')).to.be.true;
  });

  it('provides \'modifier\' attribute', () => {
    const input = element.querySelector('input');

    element.setAttribute('modifier', 'hoge');
    expect(input.classList.contains('range--hoge')).to.be.true;

    element.setAttribute('modifier', ' foo bar');
    expect(input.classList.contains('range--foo')).to.be.true;
    expect(input.classList.contains('range--bar')).to.be.true;
    expect(input.classList.contains('range--hoge')).not.to.be.true;

    input.classList.add('range--piyo');
    element.setAttribute('modifier', 'fuga');
    expect(input.classList.contains('range--piyo')).to.be.true;
    expect(input.classList.contains('range--fuga')).to.be.true;
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      let div1 = document.createElement('div');
      let div2 = document.createElement('div');
      div1.innerHTML = '<ons-range></ons-range>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });

  describe('autoStyling', () => {
    it('adds \'material\' modifier on Android', () => {
      ons.platform.select('android');
      let e = document.createElement('ons-range');
      expect(e.getAttribute('modifier')).to.equal('material');
      ons.platform.select('');
    });

    it('removes \'material\' modifier on iOS', () => {
      ons.platform.select('ios');
      let e = ons._util.createElement('<ons-range modifier="material"></ons-range>');
      expect(e.getAttribute('modifier')).not.to.equal('material');
      ons.platform.select('');
    });
  });
});
