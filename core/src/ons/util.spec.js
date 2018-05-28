'use strict';

describe('ons-util', function() {
  it('provide \'ons._util\' global variable', () => {
    expect(!!window.ons._util).to.equal(true);
  });

  const util = window.ons._util;

  describe('#parseJSONObjectSafely', () => {
    it('should parse normal JSON', () => {
      expect(util.parseJSONObjectSafely('{"hoge":"hoge"}')).to.deep.equal({hoge: 'hoge'});
    });

    it('should parse broken JSON', () => {
      expect(util.parseJSONObjectSafely('{broken}')).to.deep.equal({});
      expect(util.parseJSONObjectSafely('{broken}', {hoge: 'hoge'})).to.deep.equal({hoge: 'hoge'});
    });
  });

  describe('getAllChildNodes', () => {
    it(`should return an array of all an element's children, grandchildren etc`, () => {
      const testHTML = `
        <div class="outer">
          <div class="middle">
            <div class="middle-middle">
              <div class="middle-inner-1"></div>
              <div class="middle-inner-2"></div>
            </div>
          </div>
          <div class="end">
            <div class="end-inner"></div>
          </div>
        </div>
      `;

      const testElContainer = document.createElement('div');
      testElContainer.innerHTML = testHTML;
      const testEl = testElContainer.children[0];

      const allChildren = util.getAllChildNodes(testEl);

      const result = allChildren.map(el => el.className);
      const expectedResult = ['outer', 'middle', 'middle-middle', 'middle-inner-1', 'middle-inner-2', 'end', 'end-inner'];

      expect(result).to.deep.equal(expectedResult);
    });
  });
});

