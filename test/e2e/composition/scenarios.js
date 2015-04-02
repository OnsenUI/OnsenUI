(function() {
  'use strict';

  describe('navigator with split view', function() {
    var path = '/test/e2e/composition/navigator+splitView.html',
      EC = protractor.ExpectedConditions;

    beforeEach(function() {
      browser.get(path);
      browser.waitForAngular();
    });

    it('should push and pop the page', function() {
      var pushPage = element(by.id('push-page')),
        popPage = element(by.id('pop-page'));

      pushPage.click();
      browser.wait(EC.visibilityOf(popPage));
      browser.wait(EC.invisibilityOf(pushPage));
      expect(popPage.isDisplayed()).toBeTruthy();
      expect(pushPage.isDisplayed()).not.toBeTruthy();

      popPage.click();
      browser.wait(EC.visibilityOf(pushPage));
      browser.wait(EC.stalenessOf(popPage));
      expect(popPage.isPresent()).not.toBeTruthy();
      expect(pushPage.isDisplayed()).toBeTruthy();
    });
  });
})();
