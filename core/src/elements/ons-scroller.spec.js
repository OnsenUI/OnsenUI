'use strict';

describe('ons-scroller', () => {
  it('provides \'OnsRowElement\' global variable', () => {
    expect(window.OnsScrollerElement).to.be.ok;
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      let div1 = document.createElement('div');
      let div2 = document.createElement('div');
      div1.innerHTML = '<ons-scroller></ons-scroller>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });
});
