(function() {
  'use strict';

  describe('switch', function() {
    var path = '/test/e2e/switch/index.html';

    it('should have an element', function() {
      browser.get(path);
      expect(element(by.css('ons-switch')).isPresent()).toBeTruthy();
    });

    it('should change value when clicked', function() {
      var el = element(by.id('myInput'));

      expect(el.getAttribute('value')).toBe('');
      element(by.css('ons-switch')).click();
      expect(el.getAttribute('value')).toBe('true');

      element(by.css('ons-switch')).click();
      expect(el.getAttribute('value')).toBe('false');
    });
  });
})();
