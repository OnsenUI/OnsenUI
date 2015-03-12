(function() {
  'use strict';

  describe('dialog', function() {
    var path = '/test/e2e/dialog/index.html',
      EC = protractor.ExpectedConditions;

    it('should be displayed when clicking the button', function() {
      browser.get(path);

      var dialog = element(by.css('ons-dialog'));

      browser.wait(EC.presenceOf(dialog));

      expect(dialog.isDisplayed()).not.toBeTruthy();
      element(by.css('ons-button')).click();
      expect(dialog.isDisplayed()).toBeTruthy();
    });
  });
})();
