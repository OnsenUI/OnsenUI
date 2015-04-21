(function() {
  'use strict';

  describe('split view', function() {
    var path = '/test/e2e/splitView/index.html';

    beforeEach(function() {
      browser.get(path);
      browser.waitForAngular();
    });

    it('should have an element', function() {
      expect(element(by.css('ons-split-view')).isPresent()).toBeTruthy();
    });

    it('should collapse when width is under 500px', function() {
      var win = browser.driver.manage().window(),
        secondaryPage = element(by.css('.onsen-split-view__secondary'));

      win.setSize(1000, 1000);
      expect(secondaryPage.isDisplayed()).toBeTruthy();

      win.setSize(400, 400);
      expect(secondaryPage.isDisplayed()).not.toBeTruthy();

      win.setSize(1000, 1000);
      expect(secondaryPage.isDisplayed()).toBeTruthy();
    });

    it('should emit events', function() {
      var win = browser.driver.manage().window(),
        state = element(by.id('state'));

      win.setSize(1000, 1000);
      win.setSize(400, 400);

      expect(state.getText()).toBe('collapse');

      win.setSize(1000, 1000);
      expect(state.getText()).toBe('split');
    });

    it('should pass down scope', function() {
      expect(element(by.id('name')).getText()).toBe('Andreas');
    });
  });
})();
