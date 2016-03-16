(function() {
  'use strict';

  describe('alert dialog', function() {
    var path = '/test/e2e/alertDialog/index.html',
      EC = protractor.ExpectedConditions;

    it('should be displayed when clicking the button', function() {
      browser.get(path);

      var alertDialog = element(by.css('ons-alert-dialog'));
      browser.wait(EC.presenceOf(alertDialog));

      expect(alertDialog.isDisplayed()).not.toBeTruthy();
      element(by.css('ons-button')).click();
      expect(alertDialog.isDisplayed()).toBeTruthy();
    });

    describe('events', function() {
      var path = '/test/e2e/alertDialog/events.html';

      it('should trigger events', function() {
        browser.get(path);

        var alertDialog = element(by.css('ons-alert-dialog'));
        browser.wait(EC.presenceOf(alertDialog));
        var helpElement = element(by.id('alert-dialog-visible'));
        browser.wait(EC.presenceOf(helpElement));

        expect(helpElement.isDisplayed()).not.toBeTruthy();

        element(by.id('show-alert-dialog')).click();
        browser.wait(EC.visibilityOf(alertDialog));
        expect(helpElement.isDisplayed()).toBeTruthy();

        element(by.css('button.alert-dialog-button')).click();
        browser.wait(EC.invisibilityOf(alertDialog));
        expect(helpElement.isDisplayed()).not.toBeTruthy();
      });
    });
  });
})();
