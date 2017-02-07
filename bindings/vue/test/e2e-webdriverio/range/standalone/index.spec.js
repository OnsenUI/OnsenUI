describe('v-ons-range', function() {
  describe('(standalone)', function() {
    beforeEach(function() {
      browser.url('/bindings/vue/test/e2e-webdriverio/range/standalone/index.html');
      browser.waitForExist('#is-mounted'); // wait until Vue instance is mounted
    });

    it('is mounted by Vue instance', function() {
      expect(browser.isExisting('#no-attributes')).toBe(true);
    });

    xit('is not disabled if :disabled="false" is set', function() {
      // TODO
    });

    xit('is disabled if :disabled="true" is set', function() {
      // TODO
    });

    xit('has value \'25\' if value="25" is set', function() {
      // TODO
    });

    xit('has `material` class if modifier="material" is set', function() {
      // TODO
    });
  });

  describe('(with navigator)', function() {
  });

  describe('(with splitter)', function() {
  });

  describe('(with tabbar)', function() {
  });
});
