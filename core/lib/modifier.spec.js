
describe('modifier', function() {
  it('provide \'ModifierUtil\' global variable', function() {
    expect(!!window.ModifierUtil).to.equal(true);
  });

  describe('.diff()', function() {
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

