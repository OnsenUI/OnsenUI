(function() {
  'use strict';

  var path = '/test/e2e/button/index.html',
    EC = protractor.ExpectedConditions;

  describe('button', function() {
    it('should have an element', function() {
      browser.get(path);
      browser.waitForAngular();

      var button = element(by.css('ons-button'));
      browser.wait(EC.presenceOf(button));

      expect(button.isPresent()).toBeTruthy();
    });

    it('should display a text when clicking the button', function() {
      var input = element(by.css('input'));

      expect(input.getAttribute('value')).not.toEqual('true');
      element(by.css('ons-button')).click();
      expect(input.getAttribute('value')).toEqual('true');
    });
  });
})();
