'use strict';

describe('modifier', function() {
  it('provide \'ons._internal.ModifierUtil\' global variable', function() {
    expect(!!window.ons._internal.ModifierUtil).to.equal(true);
  });

  describe('.diff()', function() {
    var ModifierUtil = ons._internal.ModifierUtil;
    it('should calculate modifier diff', function() {
      var diff = ModifierUtil.diff('hoge', '');
      expect(diff.removed).to.eql(['hoge']);
      expect(diff.removed.length).to.equal(1);

      diff = ModifierUtil.diff('hoge fuga', 'foo');
      expect(diff.removed).to.eql(['hoge', 'fuga']);
      expect(diff.added).to.eql(['foo']);

      diff = ModifierUtil.diff(' hoge ', 'hoge');
      expect(diff.removed).to.eql([]);
      expect(diff.added).to.eql([]);
    });
  });
});

