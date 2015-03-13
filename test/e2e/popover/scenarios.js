(function() {
  'use strict';

  describe('popover', function() {
    var path = '/test/e2e/popover/index.html',
      EC = protractor.ExpectedConditions;

    it('should be displayed when clicking the button', function() {
      browser.get(path);

      var popover = element(by.css('ons-popover'));

      browser.wait(EC.presenceOf(popover));

      expect(popover.isDisplayed()).not.toBeTruthy();
      element(by.css('ons-button')).click();
      expect(popover.isDisplayed()).toBeTruthy();
    });
  });
})();
