(function() {
  'use strict';

  describe('loading placeholder', function() {
    var path = '/test/e2e/loadingPlaceholder/index.html';

    beforeEach(function() {
      browser.get(path);
      browser.waitForAngular();
    });

    it('should load data', function() {
      var e = element(by.id('loading-finished'));
      expect(e.isDisplayed()).toBeTruthy();
      expect(e.getText()).toBe('Loading finished!');
    });

    it('should pass down scope', function() {
      var e = element(by.id('name'));
      expect(e.getText()).toBe('John');
    });

    it('should compile elements', function() {
      var button = element(by.css('.button'));
      expect(button.isDisplayed()).toBeTruthy();
    });
  });
})();
