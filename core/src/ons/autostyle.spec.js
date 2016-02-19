'use strict';

describe('ons._autoStyle', () => {
  it('exists', () => {
    expect(ons._autoStyle).to.be.an.instanceOf(Object);
  });

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
