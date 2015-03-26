(function() {
  'use strict';

  describe('sliding menu', function() {
    var path = '/test/e2e/slidingMenu/index.html',
      EC = protractor.ExpectedConditions;

    it('should have an element', function() {
      browser.get(path);
      expect(element(by.css('ons-sliding-menu')).isPresent()).toBeTruthy();
    });

    it('should open when clicking the button', function() {
      browser.get(path);

      var button = element(by.css('ons-toolbar-button'));

      // Get location before clicking the button.
      var locationBefore = button.getLocation();

      button.click();
      browser.waitForAngular();

      browser.wait(function() {
        var oldLocation;

        return locationBefore.then(function(loc) {
          oldLocation = loc;

          return button.getLocation();
        })
        .then(function(newLocation) {
          return newLocation.x !== oldLocation.x;
        });
      });

      expect(locationBefore).not.toEqual(button.getLocation());
    });

    describe('event handlers', function() {
      var path = '/test/e2e/slidingMenu/events.html';

      it('should trigger events', function() {
        browser.get(path);

        var button = element(by.id('open-menu'));
        expect(button.isDisplayed()).toBeTruthy();

        button.click();
        browser.wait(EC.invisibilityOf(button));
        expect(button.isDisplayed()).not.toBeTruthy();

        element(by.id('close-menu')).click();
        browser.wait(EC.visibilityOf(button));
        expect(button.isDisplayed()).toBeTruthy();
      });
    });
  });
})();
