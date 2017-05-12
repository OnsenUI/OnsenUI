'use strict';

describe('ons-list-title', () => {
  it('provides \'ons.ListTitleElement\' global variable', () => {
    expect(window.ons.ListTitleElement).to.be.ok;
  });

  it('classList contains \'list-title\' by default', () => {
    const element = new ons.ListTitleElement();
    expect(element.classList.contains('list-title')).to.be.true;
    element.setAttribute('class', 'foo');
    expect(element.classList.contains('list-title')).to.be.true;
    expect(element.classList.contains('foo')).to.be.true;
  });

  it('provides modifier attribute', () => {
    const element = new ons.ListTitleElement();
    element.setAttribute('modifier', 'hoge');
    expect(element.classList.contains('list-title--hoge')).to.be.true;

    element.setAttribute('modifier', ' foo bar');
    expect(element.classList.contains('list-title--foo')).to.be.true;
    expect(element.classList.contains('list-title--bar')).to.be.true;
    expect(element.classList.contains('list-title--hoge')).not.to.be.true;

    element.classList.add('list-title--piyo');
    element.setAttribute('modifier', 'fuga');
    expect(element.classList.contains('list-title--piyo')).to.be.true;
    expect(element.classList.contains('list-title--fuga')).to.be.true;
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = '<ons-list-title>Content</ons-list-title>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });

  describe('autoStyling', () => {
    it('adds \'material\' modifier on Android', () => {
      ons.platform.select('android');
      const e = document.createElement('ons-list-title');
      expect(e.getAttribute('modifier')).to.equal('material');
      ons.platform.select('');
    });
  });
});
