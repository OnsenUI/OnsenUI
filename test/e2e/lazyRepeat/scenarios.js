(function() {
  'use strict';

  describe('lazy repeat', function() {
    var path = '/test/e2e/lazyRepeat/index.html',
      EC = protractor.ExpectedConditions;

    it('should remove elements when scrolling', function() {
      browser.get(path);

      var firstItem = element(by.id('item1'));
      expect(firstItem.isPresent()).toBeTruthy();

      // Scroll down to bottom.
      browser.executeScript('document.querySelector(".page__content").scrollTop = 100000;');

      // Check that the first element is removed.
      browser.wait(EC.stalenessOf(firstItem));
      expect(firstItem.isPresent()).not.toBeTruthy();
    });

    it('should correctly compile the inner elements', function() {
      browser.get(path);
      expect(element(by.id('item1')).getText()).toBe('Item #1');
    });

    it('should only trigger a click event once for child elements (Issue #498)', function() {
      browser.get(path);

      var timesClicked = element(by.id('times-clicked'));

      expect(timesClicked.getText()).toBe('0');
      element(by.id('item1')).click();
      expect(timesClicked.getText()).toBe('1');
    });
  });
})();
