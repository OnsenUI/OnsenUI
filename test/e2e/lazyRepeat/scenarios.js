(function() {
  'use strict';

  describe('lazy repeat', function() {
    var path = '/test/e2e/lazyRepeat/index.html',
      EC = protractor.ExpectedConditions;

    beforeEach(function() {
      browser.get(path);
      browser.waitForAngular();

      var firstItem = element(by.id('item-1'));
      browser.wait(EC.visibilityOf(firstItem));
    });

    it('should remove elements when scrolling', function() {
      var firstItem = element(by.id('item-1'));
      expect(firstItem.isPresent()).toBeTruthy();

      // Scroll down to bottom.
      browser.executeScript('document.querySelector(".page__content").scrollTop = 10000;');

      // Fix for test on small screens.
      browser.wait(function() {
        var deferred = protractor.promise.defer();
        setTimeout(function() {
          deferred.fulfill(true);
        }, 200);
        return deferred.promise;
      });

      browser.executeScript('document.querySelector(".page__content").scrollTop = 10000;');

      // Check that the first element is removed.
      browser.wait(EC.stalenessOf(firstItem));
      expect(firstItem.isPresent()).not.toBeTruthy();
    });

    it('should correctly compile the inner elements', function() {
      expect(element(by.id('item-1-text')).getText()).toBe('Item #1');
    });

    it('should only trigger a click event once for child elements (Issue #498)', function() {
      var timesClicked = element(by.id('times-clicked'));

      expect(timesClicked.getText()).toBe('0');
      element(by.id('item-1')).click();
      expect(timesClicked.getText()).toBe('1');
    });

    it('should be possible to remove items from the list', function() {
      var secondElement = element(by.id('item-2'));

      expect(secondElement.isDisplayed()).toBeTruthy();

      element(by.id('remove-2')).click();
      browser.wait(EC.stalenessOf(secondElement));
      expect(secondElement.isPresent()).not.toBeTruthy();
    });
  });
})();
