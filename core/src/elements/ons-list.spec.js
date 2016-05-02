'use strict';

describe('ons-list', () => {
  it('provides \'OnsListElement\' global variable', () => {
    expect(window.OnsListElement).to.be.ok;
  });

  it('classList contains \'list\' by default', () => {
    var element = new OnsListElement();
    expect(element.classList.contains('list')).to.be.true;
  });

  it('provides modifier attribute', () => {
    var element = new OnsListElement();
    element.setAttribute('modifier', 'hoge');
    expect(element.classList.contains('list--hoge')).to.be.true;

    element.setAttribute('modifier', ' foo bar');
    expect(element.classList.contains('list--foo')).to.be.true;
    expect(element.classList.contains('list--bar')).to.be.true;
    expect(element.classList.contains('list--hoge')).not.to.be.true;

    element.classList.add('list--piyo');
    element.setAttribute('modifier', 'fuga');
    expect(element.classList.contains('list--piyo')).to.be.true;
    expect(element.classList.contains('list--fuga')).to.be.true;
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = `
        <ons-list>
          <ons-list-header>Content</ons-list-header>
          <ons-list-item>Content</ons-list-item>
          <ons-list-item>Content</ons-list-item>
        </ons-list>
      `;
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });

  describe('autoStyling', () => {
    it('adds \'material\' modifier on Android', () => {
      ons.platform.select('android');
      const e = document.createElement('ons-list');
      expect(e.getAttribute('modifier')).to.equal('material');
      ons.platform.select('');
    });
  });
});
