(function() {
  'use strict';

  describe('modal', function() {
    var path = '/test/e2e/modal/index.html';

    it('should be displayed when clicking the button', function() {
      browser.get(path);

      var modal = element(by.css('ons-modal'));

      expect(modal.isDisplayed()).not.toBeTruthy();
      element(by.css('ons-button')).click();
      expect(modal.isDisplayed()).toBeTruthy();
    });
  });
})();
