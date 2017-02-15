describe('v-ons-button', function() {
  describe('(standalone)', function() {
    beforeEach(function() {
      browser.url('/bindings/vue/test/e2e-webdriverio/button/standalone/index.html');
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

    xit('does not have ripple effect if :ripple="false" is set', function() {
      // TODO
    });

    xit('has ripple effect if :ripple="true" is set', function() {
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
