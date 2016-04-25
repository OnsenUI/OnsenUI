'use strict';

describe('OnsGestureDetectorElement', () => {
  it('should exist', () => {
    expect(window.OnsGestureDetectorElement).to.be.ok;
  });

  it('is correctly created', () => {
    expect(new OnsGestureDetectorElement()).to.be.ok;
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = '<ons-gesture-detector></ons-gesture-detector>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });
});
