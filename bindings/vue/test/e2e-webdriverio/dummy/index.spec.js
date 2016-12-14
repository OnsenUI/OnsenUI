(function() {
  'use strict';

  describe('dummy', function() {
    var path = '/bindings/vue/test/e2e-webdriverio/dummy/index.html';

    it('should be that true is true', function() {
      browser.url(path);
      expect(true).toBeTruthy();
    });
  });
})();
