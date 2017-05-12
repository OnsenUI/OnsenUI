'use strict';

describe('OnsSelectElement', () => {
  let element;

  beforeEach(done => {
    element = new ons.SelectElement();
    document.body.appendChild(element);
    ons._contentReady(element, done);
  });

  afterEach(() => {
    element.remove();
    element = null;
  });

  it('exists', () => {
    expect(window.ons.SelectElement).to.be.ok;
  });

  it('classList contains \'select-input\' by default', () => {
    expect(element._select.classList.contains('select-input')).to.be.true;
  });

  it('provides \'modifier\' attribute', () => {
    const select = element.querySelector('select');

    element.setAttribute('modifier', 'material');
    expect(select.classList.contains('select-input--material')).to.be.true;

    element.setAttribute('modifier', 'foo bar');
    expect(select.classList.contains('select-input--foo')).to.be.true;
    expect(select.classList.contains('select-input--bar')).to.be.true;
    expect(select.classList.contains('select-input--hoge')).not.to.be.true;

    select.classList.add('select-input--piyo');
    element.setAttribute('modifier', 'fuga');
    expect(select.classList.contains('select-input--piyo')).to.be.true;
    expect(select.classList.contains('select-input--fuga')).to.be.true;
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = '<ons-select></ons-select>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });

  describe('#disabled', () => {
    it('changes the "disabled" attribute', () => {
      const select = element.querySelector('select');
      expect(select.hasAttribute('disabled')).to.be.false;
      element.disabled = true;
      expect(select.hasAttribute('disabled')).to.be.true;
    });
  });

  describe('autoStyling', () => {
    it('adds \'material\' modifier on Android', done => {
      ons.platform.select('android');
      const select = document.createElement('ons-select');

      ons._contentReady(select, () => {
        expect(select.getAttribute('modifier')).to.equal('material');
        ons.platform.select('');
        done();
      });
    });
  });
});
