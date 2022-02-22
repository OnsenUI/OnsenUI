(function() {
  'use strict';

  describe('navigator with dialog', function() {
    var path = '/bindings/angular1/test/e2e/composition/navigator+dialog.html',
      EC = protractor.ExpectedConditions;

    beforeEach(function() {
      browser.get(path);
      browser.waitForAngular();
    });

    it('should not crash (issue #570)', function() {
      var page1 = element(by.id('page1')),
        page2 = element(by.id('page2')),
        hideDialog = element(by.id('hide-dialog'));

      browser.wait(EC.visibilityOf(page1));
      element(by.id('push-page')).click();

      browser.wait(EC.visibilityOf(hideDialog));
      expect(hideDialog.isDisplayed()).toBeTruthy();
      hideDialog.click();

      browser.wait(EC.invisibilityOf(hideDialog));
      expect(hideDialog.isDisplayed()).not.toBeTruthy();


      browser.wait(EC.visibilityOf(page2));
      browser.sleep(500); // Wait for the animation

      element(by.id('pop-page')).click();
      browser.wait(EC.stalenessOf(page2));
      expect(page2.isPresent()).not.toBeTruthy();

      browser.wait(EC.visibilityOf(page1));
      element(by.id('push-page')).click();

      browser.wait(EC.visibilityOf(hideDialog));
      expect(hideDialog.isDisplayed()).toBeTruthy();
    });
  });
})();
