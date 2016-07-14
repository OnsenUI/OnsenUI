(function() {
  'use strict';

  describe('navigator with split view', function() {
    it('should push and pop the page', function() {
      var path = '/test/e2e/composition/navigator+splitView.html',
        EC = protractor.ExpectedConditions;
      browser.get(path);
      browser.waitForAngular();

      var pushPage = element(by.id('push-page')),
        popPage = element(by.id('pop-page'));

      pushPage.click();
      browser.wait(EC.visibilityOf(popPage));
      expect(popPage.isDisplayed()).toBeTruthy();

      popPage.click();
      browser.wait(EC.visibilityOf(pushPage));
      browser.wait(EC.stalenessOf(popPage));
      expect(popPage.isPresent()).not.toBeTruthy();
      expect(pushPage.isDisplayed()).toBeTruthy();
    });
  });

  describe('navigator with dialog', function() {
    it('should not crash (issue #570)', function() {
      var path = '/test/e2e/composition/navigator+dialog.html',
        EC = protractor.ExpectedConditions;

      browser.get(path);
      browser.waitForAngular();

      var pushPage = element(by.id('push-page')),
        popPage = element(by.id('pop-page')),
        hideDialog = element(by.id('hide-dialog'));

      browser.wait(EC.visibilityOf(pushPage));
      pushPage.click();

      browser.wait(EC.visibilityOf(hideDialog));
      expect(hideDialog.isDisplayed()).toBeTruthy();
      hideDialog.click();

      browser.wait(EC.invisibilityOf(hideDialog));
      expect(hideDialog.isDisplayed()).not.toBeTruthy();


      browser.wait(EC.visibilityOf(popPage));
      popPage.click();
      browser.wait(EC.stalenessOf(popPage));
      expect(popPage.isPresent()).not.toBeTruthy();

      browser.wait(EC.visibilityOf(pushPage));
      pushPage.click();

      browser.wait(EC.visibilityOf(hideDialog));
      expect(hideDialog.isDisplayed()).toBeTruthy();
    });
  });
})();
