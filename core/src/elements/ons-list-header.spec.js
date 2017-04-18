'use strict';

describe('ons-list-header', () => {
  it('provides \'OnsHeaderListElement\' global variable', () => {
    expect(window.ons.ListHeaderElement).to.be.ok;
  });

  it('classList contains \'list-header\' by default', () => {
    const element = new ons.ListHeaderElement();
    expect(element.classList.contains('list-header')).to.be.true;
    element.setAttribute('class', 'foo');
    expect(element.classList.contains('list-header')).to.be.true;
    expect(element.classList.contains('foo')).to.be.true;
  });

  it('provides modifier attribute', () => {
    const element = new ons.ListHeaderElement();
    element.setAttribute('modifier', 'hoge');
    expect(element.classList.contains('list-header--hoge')).to.be.true;

    element.setAttribute('modifier', ' foo bar');
    expect(element.classList.contains('list-header--foo')).to.be.true;
    expect(element.classList.contains('list-header--bar')).to.be.true;
    expect(element.classList.contains('list-header--hoge')).not.to.be.true;

    element.classList.add('list-header--piyo');
    element.setAttribute('modifier', 'fuga');
    expect(element.classList.contains('list-header--piyo')).to.be.true;
    expect(element.classList.contains('list-header--fuga')).to.be.true;
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = '<ons-list-header>Content</ons-list-header>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });

  describe('autoStyling', () => {
    it('adds \'material\' modifier on Android', () => {
      ons.platform.select('android');
      const e = document.createElement('ons-list-header');
      expect(e.getAttribute('modifier')).to.equal('material');
      ons.platform.select('');
    });
  });
});
