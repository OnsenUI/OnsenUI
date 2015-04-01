(function() {
  'use strict';

  describe('carousel', function() {
    var path = '/test/e2e/carousel/index.html',
      EC = protractor.ExpectedConditions;

    describe('prev() and next() methods', function() {
      var initialPosition;

      it('should move the items when clicking the "Next" button', function() {
        browser.get(path);

        var carouselItem = element(by.id('firstItem'));

        // Store initial position.
        initialPosition = carouselItem.getLocation();

        element(by.id('next')).click();
        browser.wait(function() {
          return carouselItem.getLocation().then(function(loc) {
            return loc.x !== 0;
          });
        });

        expect(initialPosition).not.toEqual(carouselItem.getLocation());
      });

      it('should move the items back when clicking the "Previous" button.', function() {
        var carouselItem = element(by.id('firstItem'));

        element(by.id('prev')).click();
        browser.wait(function() {
          return carouselItem.getLocation().then(function(loc) {
            return loc.x === 0;
          });
        });

        expect(initialPosition).toEqual(carouselItem.getLocation());
      });

      it('should emit events when changing', function() {
        browser.get(path);

        var currentIndex = element(by.id('current-index'));

        expect(currentIndex.getText()).toBe('0');

        element(by.id('next')).click();
        browser.wait(EC.textToBePresentInElement(currentIndex, '1'));
        expect(currentIndex.getText()).toBe('1');

        element(by.id('prev')).click();
        browser.wait(EC.textToBePresentInElement(currentIndex, '0'));
        expect(currentIndex.getText()).toBe('0');
      });
    });
  });
})();
