(function() {
  'use strict';

  describe('dialog', function() {
    var path = '/test/e2e/dialog/index.html',
      EC = protractor.ExpectedConditions;

    beforeEach(function() {
      browser.get(path);
      browser.waitForAngular();
    });

    it('should be displayed when clicking the button', function() {
      var dialog = element(by.css('ons-dialog'));
      browser.wait(EC.presenceOf(dialog));

      expect(dialog.isDisplayed()).not.toBeTruthy();
      element(by.id('open-dialog')).click();
      expect(dialog.isDisplayed()).toBeTruthy();
    });

    it('should bind to the parent scope', function() {
      element(by.id('open-dialog')).click();
      expect(element(by.id('name')).getText()).toBe('Hello there, Andreas!');
      element(by.model('person.name')).sendKeys(Array(10).join(protractor.Key.BACK_SPACE) + 'Anatoo');
      expect(element(by.id('name')).getText()).toBe('Hello there, Anatoo!');
    });

    it('should emit events', function() {
      var button = element(by.id('open-dialog'));
      expect(button.isDisplayed()).toBeTruthy();

      button.click();
      browser.wait(EC.invisibilityOf(button));
      expect(button.isDisplayed()).not.toBeTruthy();

      var closeDialog = element(by.id('close-dialog'))
      browser.wait(EC.visibilityOf(closeDialog));
      closeDialog.click();

      browser.wait(EC.visibilityOf(button));
      expect(button.isDisplayed()).toBeTruthy();
    });

    it('should emit DOM events', function() {
      element(by.id('open-dialog')).click();
      expect(element(by.id('event-triggered')).getText()).toBe('Event triggered!');
    });
  });
})();
