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

    it('should open when swipe', function(done) {
      var button = element(by.css('ons-toolbar-button'));
      var slidingMenu = element(by.css('ons-sliding-menu'));

      browser.wait(EC.presenceOf(button));
      browser.wait(EC.presenceOf(slidingMenu));

      var oldLocation;
      button.getLocation().then(function(loc) {
        oldLocation = loc;

        // wait until its actually clickable
        browser.wait(
          function() {
            var deferred = protractor.promise.defer();
            element(by.id('some-element')).isPresent()
            .then(function (isPresent) {
              deferred.fulfill(!isPresent);
            });
            return deferred.promise;
          });

        // for some reason, angular has a setTimeOut of 400,
        // so we need to wait here until its swipable since only styles are set
        browser.sleep(400);
        browser.actions()
          .mouseMove(slidingMenu, {x: 1000, y: 200})
          .mouseDown()
          .mouseMove({x: -800, y: 0})
          .mouseUp()
          .perform();
      });

      return button.getLocation().then(function(newLocation) {
          if (newLocation.x == oldLocation.x &&
             newLocation.y== oldLocation.y) {
            throw 'locations of buttons should be different';
          }
          done();
      });
    });

    it('should close when swipe', function() {
      var button = element(by.css('ons-toolbar-button'));
      button.click();

      // The div element is created only after the SlidingMenu is opened
      var myDiv = element(by.id('my-div'));
      browser.wait(EC.presenceOf(myDiv));

      // Get location before clicking the button.
      var locationBefore = button.getLocation();

      // Close the sliding menu using a swipe action
      browser.actions()
      .mouseMove(myDiv, {x: 1, y: 1})
      .mouseDown()
      .mouseMove({x: 800, y: 0})
      .mouseUp()
      .perform();
      browser.wait(EC.stalenessOf(myDiv));

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

      button.click();

      // The div element is created only after the SlidingMenu is opened
      var myDiv = element(by.id('my-div'));
      browser.wait(EC.presenceOf(myDiv));

      // Get location before clicking the button.
      var locationBefore = button.getLocation();

      // Close the sliding menu using a click action
      browser.actions()
      .mouseMove(myDiv, {x: 1, y: 1})
      .mouseDown()
      .mouseUp()
      .perform();
      browser.wait(EC.stalenessOf(myDiv));

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
        browser.wait(EC.presenceOf(button));

        expect(button.isDisplayed()).toBeTruthy();
        button.click();

        browser.wait(EC.invisibilityOf(button));
        expect(button.isDisplayed()).not.toBeTruthy();

        var button2 = element(by.id('close-menu'));
        browser.wait(EC.visibilityOf(button2));
        button2.click();
        browser.wait(EC.visibilityOf(button));
        expect(button.isDisplayed()).toBeTruthy();
      });
    });
  });
})();
