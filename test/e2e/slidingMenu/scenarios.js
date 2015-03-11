(function() {
  'use strict';

  describe('sliding menu', function() {
    var path = '/test/e2e/slidingMenu/index.html';

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
  });
})();
