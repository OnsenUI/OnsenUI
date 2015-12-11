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
});

