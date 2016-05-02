'use strict';

describe('OnsRangeElement', () => {
  let element;

  beforeEach(done => {
    element = new OnsRangeElement();
    document.body.appendChild(element);
    ons._contentReady(element, done);
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
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = '<ons-range></ons-range>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });

  describe('#disabled', () => {
    it('changes the "disabled" attribute', () => {
      expect(element.hasAttribute('disabled')).to.be.false;
      element.disabled = true;
      expect(element.hasAttribute('disabled')).to.be.true;
    });
  });

  describe('autoStyling', () => {
    it('adds \'material\' modifier on Android', done => {
      ons.platform.select('android');
      const range = document.createElement('ons-range');

      ons._contentReady(range, () => {
        expect(range.getAttribute('modifier')).to.equal('material');
        ons.platform.select('');
        done();
      });
    });
  });
});
