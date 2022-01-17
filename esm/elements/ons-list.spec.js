'use strict';

describe('ons-list', () => {
  it('provides \'OnsListElement\' global variable', () => {
    expect(window.ons.elements.List).to.be.ok;
  });

  it("has the 'list' class when first connected", () => {
    const element = document.createElement('ons-list');
    document.body.appendChild(element);
    expect(element.classList.contains('list')).to.be.true;
    element.remove();
  });

  it("restores the 'list' class when it is removed", () => {
    const element = document.createElement('ons-list');
    document.body.appendChild(element);
    element.setAttribute('class', 'foo');
    expect(element.classList.contains('list')).to.be.true;
    element.remove();
  });

  it('restores modifier classes when they are removed', () => {
    const element = document.createElement('ons-list');
    document.body.appendChild(element);
    element.setAttribute('modifier', 'hoge');
    element.setAttribute('class', 'foo');
    expect(element.classList.contains('list--hoge')).to.be.true;
    element.remove();
  });

  it("does not overwrite existing classes when restoring classes", () => {
    const element = document.createElement('ons-list');
    document.body.appendChild(element);
    element.setAttribute('class', 'foo');
    expect(element.classList.contains('foo')).to.be.true;
    element.remove();
  });

  it('provides modifier attribute', () => {
    const element = new ons.elements.List();
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

  describe('autoStyling', () => {
    it('adds \'material\' modifier on Android', () => {
      ons.platform.select('android');
      const e = document.createElement('ons-list');
      document.body.appendChild(e);
      expect(e.getAttribute('modifier')).to.equal('material');
      ons.platform.select('');
      e.remove();
    });
  });
});
