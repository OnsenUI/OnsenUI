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
      element(by.id('show-popover')).click();
      expect(popover.isDisplayed()).toBeTruthy();
    });

    it('should emit events', function() {
      browser.get(path);

      var timesShown = element(by.id('times-shown')),
        popover = element(by.css('ons-popover'));

      expect(timesShown.getText()).toBe('0');
      element(by.id('show-popover')).click();

      browser.wait(EC.visibilityOf(popover));
      element(by.id('hide-popover')).click();

      browser.wait(EC.invisibilityOf(popover));
      expect(timesShown.getText()).toBe('1');
    });
  });
})();
