'use strict';

describe('ons-list-header', () => {
  it('provides \'OnsHeaderListElement\' global variable', () => {
    expect(window.ons.elements.ListHeader).to.be.ok;
  });

  it("has the 'list-header' class when first connected", () => {
    const element = document.createElement('ons-list-header');
    document.body.appendChild(element);
    expect(element.classList.contains('list-header')).to.be.true;
    element.remove();
  });

  it("restores the 'list-header' class when it is removed", () => {
    const element = document.createElement('ons-list-header');
    document.body.appendChild(element);
    element.setAttribute('class', 'foo');
    expect(element.classList.contains('list-header')).to.be.true;
    element.remove();
  });

  it('restores modifier classes when they are removed', () => {
    const element = document.createElement('ons-list-header');
    document.body.appendChild(element);
    element.setAttribute('modifier', 'hoge');
    element.setAttribute('class', 'foo');
    expect(element.classList.contains('list-header--hoge')).to.be.true;
    element.remove();
  });

  it("does not overwrite existing classes when restoring classes", () => {
    const element = document.createElement('ons-list-header');
    document.body.appendChild(element);
    element.setAttribute('class', 'foo');
    expect(element.classList.contains('foo')).to.be.true;
    element.remove();
  });

  it('provides modifier attribute', () => {
    const element = new ons.elements.ListHeader();
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

  describe('autoStyling', () => {
    it("adds 'material' modifier on Android when connected", () => {
      ons.platform.select('android');
      const e = document.createElement('ons-list-header');
      document.body.appendChild(e);
      expect(e.getAttribute('modifier')).to.equal('material');
      ons.platform.select('');
      e.remove();
    });
  });
});
