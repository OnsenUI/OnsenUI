(function() {
  'use strict';

  describe('split view', function() {
    var path = '/test/e2e/splitView/index.html';

    it('should have an element', function() {
      browser.get(path);
      expect(element(by.css('ons-split-view')).isPresent()).toBeTruthy();
    });

    it('should collapse when width is under 500px', function() {
      var win = browser.driver.manage().window(),
        secondaryPage = element(by.css('.onsen-split-view__secondary')),
        origSize = {};

      win.setSize(1000, 1000);
      expect(secondaryPage.isDisplayed()).toBeTruthy();

      win.setSize(400, 400);
      expect(secondaryPage.isDisplayed()).not.toBeTruthy();

      win.setSize(1000, 1000);
      expect(secondaryPage.isDisplayed()).toBeTruthy();
    });
  });
})();
