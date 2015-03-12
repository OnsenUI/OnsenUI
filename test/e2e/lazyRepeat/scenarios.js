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
  });
})();
