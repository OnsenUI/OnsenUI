(function() {
  'use strict';

  describe('back-button', function() {
    var path = '/test/e2e/backButton/index.html',
      EC = protractor.ExpectedConditions;

    it('should be displayed after pushing a page', function() {
      browser.get(path);
      browser.waitForAngular();

      var button = element(by.css('ons-button'));
      browser.wait(EC.presenceOf(button));

      button.click();

      var backbutton = element(by.css('ons-back-button'));
      browser.wait(EC.presenceOf(backbutton));

      expect(backbutton.isDisplayed()).toBeTruthy();
    });

    it('should switch page when a button is clicked', function() {
      browser.get(path);

      var page1 = element(by.id('page1'));
      var page2 = element(by.id('page2'));

      element(by.css('ons-button')).click();
      browser.wait(EC.visibilityOf(page2));
      browser.wait(EC.invisibilityOf(page1));

      // Check that page2 was created and that it's displayed.
      expect((page2).isDisplayed()).toBeTruthy();
      expect((page1).isDisplayed()).not.toBeTruthy();
      expect((page1).isPresent()).toBeTruthy();

      element(by.css('ons-back-button')).click();
      browser.wait(EC.stalenessOf(page2));

      // Check that page2 was destroyed.
      expect((page1).isDisplayed()).toBeTruthy();
      expect((page2).isPresent()).not.toBeTruthy();
    });
  });
})();
