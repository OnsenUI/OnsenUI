describe('v-ons-carousel & v-ons-carousel-item', function() {
  describe('(standalone)', function() {
    beforeEach(function() {
      browser.url('/bindings/vue/test/e2e-webdriverio/carousel/standalone/index.html');
      browser.waitForExist('#is-mounted'); // wait until Vue instance is mounted
    });

    it('is mounted by Vue instance', function() {
      expect(browser.isExisting('#no-attributes')).toBe(true);
    });
  });

  describe('(with navigator)', function() {
  });

  describe('(with splitter)', function() {
  });

  describe('(with tabbar)', function() {
  });
});
