(function() {
  'use strict';

  describe('sliding menu', function() {
    var path = '/test/e2e/slidingMenu/index.html',
      EC = protractor.ExpectedConditions;

    beforeEach(function() {
      browser.get(path);
      browser.waitForAngular();
    });

     it('should have an element', function() {
      expect(element(by.css('ons-sliding-menu')).isPresent()).toBeTruthy();
    });

    it('should open when swipe', function() {
      
      var button = element(by.css('ons-toolbar-button'));

      // Get location before clicking the button.
      var locationBefore = button.getLocation();

      browser.actions()
      .mouseMove(element(by.css('.onsen-sliding-menu__main')), {x: 500, y: 100})
      .mouseDown()
      .mouseMove({x: -120, y: 0})
      .mouseUp()
      .perform();
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

    it('should close when swipe', function() {
      var button = element(by.css('ons-toolbar-button'));
      button.click();

      // Get location before clicking the button.
      var locationBefore = button.getLocation();

      // Close the sliding menu using a swipe action
      browser.actions()
      .mouseMove(element(by.css('.onsen-sliding-menu__main')), {x: 300, y: 100})
      .mouseDown()
      .mouseMove({x: 120, y: 0})
      .mouseUp()
      .perform();
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

    it('should open when clicking the button', function() {
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

    it('should close when clicking the page content', function() {
      var button = element(by.css('ons-toolbar-button'));

      // Get location before clicking the button.
      var locationBefore = button.getLocation();

      button.click();
      browser.waitForAngular();

      // Get location before clicking the button.
      var locationBefore = button.getLocation();

      // Close the sliding menu using a click action
      browser.actions()
      .mouseMove(element(by.css('.onsen-sliding-menu__main')), {x: 300, y: 100})
      .mouseDown()
      .mouseUp()
      .perform();
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

    it('should pass down scope to pages', function() {
      expect(element(by.id('name')).getText()).toBe('Andreas');
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
