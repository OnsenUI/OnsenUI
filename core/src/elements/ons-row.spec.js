'use strict';

describe('OnsRowElement', () => {
  it('should exist', () => {
    expect(window.OnsRowElement).to.be.ok;
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      let div1 = document.createElement('div');
      let div2 = document.createElement('div');
      div1.innerHTML = '<ons-row></ons-row>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });
});
