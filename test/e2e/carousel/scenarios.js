(function() {
  'use strict';

  describe('carousel', function() {
    var path = '/test/e2e/carousel/index.html',
      EC = protractor.ExpectedConditions;

    describe('prev() and next() methods', function() {
      var initialPosition;
      var secondItemPosition;

      it('should move the items when swiping left', function() {
        browser.get(path);

        var carouselItem = element(by.id('first-item'));

        // Store initial position.
        initialPosition = carouselItem.getLocation();

        // Swipe left
        browser.actions()
        .mouseMove(carouselItem, {x: 100, y: 100})
        .mouseDown()
        .mouseMove({x: -520, y: 0})
        .mouseUp()
        .perform();
        browser.waitForAngular();

        browser.wait(function() {
          return carouselItem.getLocation().then(function(loc) {
            return loc.x !== 0;
          });
        });

        expect(initialPosition).not.toEqual(carouselItem.getLocation());
      });

      it('should move the items when swiping right', function() {
        browser.get(path);

        var carouselItem = element(by.id('first-item'));

        // Swipe left
        browser.actions()
        .mouseMove(carouselItem, {x: 100, y: 100})
        .mouseDown()
        .mouseMove({x: -520, y: 0})
        .mouseUp()
        .perform();
        browser.waitForAngular();

        // Store the position of the second carousel item
        secondItemPosition = carouselItem.getLocation();

        // Swipe right
        browser.actions()
        .mouseMove(element(by.id('second-item')), {x: 100, y: 100})
        .mouseDown()
        .mouseMove({x: 520, y: 0})
        .mouseUp()
        .perform();
        browser.waitForAngular();

        browser.wait(function() {
          return carouselItem.getLocation().then(function(loc) {
            return loc.x !== 0;
          });
        });

        expect(secondItemPosition).not.toEqual(carouselItem.getLocation());
      });

      it('should move the items when clicking the "Next" button', function() {
        browser.get(path);

        var carouselItem = element(by.id('first-item'));

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
        var carouselItem = element(by.id('first-item'));

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
