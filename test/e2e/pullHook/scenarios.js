(function() {
  'use strict';

  describe('pull hook', function() {
    var path = '/test/e2e/pullHook/index.html',
      EC = protractor.ExpectedConditions;

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

      browser.wait(function() {
        return elements.count().then(function(n) {
          return n === 4;
        });
      });

      expect(elements.count()).toBe(4);
    });

    it('should emit events', function() {
      var state = element(by.id('current-state'));

      var page = element(by.css('.page__content'));
      browser.actions()
        .mouseMove(page, {x: 10, y: 10})
        .mouseDown()
        .mouseMove({x: 10, y: 200})
        .perform();

      browser.wait(EC.textToBePresentInElement(state, 'preaction'));
      expect(state.getText()).toBe('preaction');

      browser.actions()
        .mouseUp(page)
        .perform();

      browser.wait(EC.invisibilityOf(state));
      expect(state.isDisplayed()).not.toBeTruthy();
    });
  });
})();
