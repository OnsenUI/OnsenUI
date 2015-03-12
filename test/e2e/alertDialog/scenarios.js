(function() {
  'use strict';

  describe('alert dialog', function() {
    var path = '/test/e2e/alertDialog/index.html',
      EC = protractor.ExpectedConditions;

    it('should be displayed when clicking the button', function() {
      browser.get(path);

      var alertDialog = element(by.css('ons-alert-dialog')),

      browser.wait(EC.presenceOf(alertDialog));

      expect(alertDialog.isDisplayed()).not.toBeTruthy();
      element(by.css('ons-button')).click();
      expect(alertDialog.isDisplayed()).toBeTruthy();
    });
  });
})();
