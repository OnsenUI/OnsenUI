(function() {
  'use strict';

  describe('action sheet', function() {
    var path = '/bindings/angular1/test/e2e/actionSheet/index.html',
      EC = protractor.ExpectedConditions;

    it('should be displayed when clicking the button', function() {
      browser.get(path);

      var actionSheet = element(by.css('ons-action-sheet'));
      browser.wait(EC.presenceOf(actionSheet));

      expect(actionSheet.isDisplayed()).not.toBeTruthy();
      element(by.css('ons-button#index-show')).click();
      expect(actionSheet.isDisplayed()).toBeTruthy();
    });

    describe('events', function() {
      var path = '/bindings/angular1/test/e2e/actionSheet/events.html';

      it('should trigger events', function() {
        browser.get(path);

        var actionSheet = element(by.css('ons-action-sheet'));
        browser.wait(EC.presenceOf(actionSheet));
        var helpElement = element(by.id('action-sheet-visible'));
        browser.wait(EC.presenceOf(helpElement));

        expect(helpElement.isDisplayed()).not.toBeTruthy();

        element(by.css('ons-button#show-action-sheet')).click();
        browser.wait(EC.visibilityOf(actionSheet));
        expect(helpElement.isDisplayed()).toBeTruthy();

        element(by.css('ons-action-sheet-button#hide-button')).click();
        browser.wait(EC.invisibilityOf(actionSheet));
        expect(helpElement.isDisplayed()).not.toBeTruthy();
      });
    });
  });
})();
