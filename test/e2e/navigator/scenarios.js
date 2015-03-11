(function() {
  'use strict';

  describe('navigator', function() {
    var path = '/test/e2e/navigator/index.html';
    var EC = protractor.ExpectedConditions;

    it('should exist', function() {
      browser.get(path);
      browser.waitForAngular();

      var navi = element(by.css('ons-navigator'));

      //Waits for the ons-navigator loading
      browser.wait(EC.presenceOf(navi));

      
      expect(navi.isDisplayed()).toBeTruthy();
    });

    it('should have "var" attribute', function() {
      browser.get(path);

      var navi = element(by.css('ons-navigator'));

      expect((navi.getAttribute('var')).isPresent()).toBeTruthy();
    });

    it('should switch page when a button is clicked', function() {
      browser.get(path);

      var page1 = element(by.id('page1'));
      var page2 = element(by.id('page2'));

      var button = element(by.css('ons-button'));
      button.click();

      //Waits for page1 to be fully loaded
      browser.wait(EC.visibilityOf(page2));
      expect((page2).isDisplayed()).toBeTruthy();
      expect((page1).isDisplayed()).not.toBeTruthy();
      expect((page1).isPresent()).toBeTruthy();

      var backButton = element(by.css('ons-back-button'));
      backButton.click();

      //Waits for page2 to get destroyed
      browser.wait(EC.stalenessOf(page2));
      expect((page1).isDisplayed()).toBeTruthy();
      expect((page2).isPresent()).not.toBeTruthy();
    });
  });
})();
