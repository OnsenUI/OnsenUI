(function() {
  'use strict';

  describe('pull hook', function() {
    var path = '/test/e2e/pullHook/index.html';

    it('should execute the action when pulled down', function() {
      browser.get(path);

      var elements = element.all(by.css('ons-list-item'));

      expect(elements.count()).toBe(3);

      browser.actions()
        .mouseMove(element(by.css('.page__content')), {x: 10, y: 10})
        .mouseDown()
        .mouseMove({x: 10, y: 200})
        .mouseUp()
        .perform();

      browser.waitForAngular();

      expect(elements.count()).toBe(4);
    });

  });
})();
