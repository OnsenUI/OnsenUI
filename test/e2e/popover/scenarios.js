(function() {
  'use strict';

  describe('tabbar', function() {
    var path = '/test/e2e/popover/index.html';

    it('should be displayed when clicking the button', function() {
      browser.get(path);

      var popover = element(by.css('ons-popover')),
        button = element(by.css('ons-button'));

      browser.wait(function() {
        return browser.isElementPresent(popover);
      });

      expect(popover.isDisplayed()).not.toBeTruthy();
      button.click();
      expect(popover.isDisplayed()).toBeTruthy();
    });
  });
})();
