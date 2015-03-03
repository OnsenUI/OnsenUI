(function() {
  'use strict';

  browser.get('/test/e2e/slidingMenu/index.html');

  describe('sliding menu', function() {  
    it('should have an element', function() {
      expect(element(by.css('ons-sliding-menu')).isPresent()).toBeTruthy();
    });

    it('should open when clicking the button', function(done) {
      var button = element(by.css('ons-toolbar-button'));

      button.getLocation().then(function(oldLocation) {
        button.click().then(function() {
          button.getLocation().then(function(newLocation) {
          
            // The button should have moved.
            expect(oldLocation.x).not.toBe(newLocation.x);
            done();
          });
        });
      });

    });
  });
})();
