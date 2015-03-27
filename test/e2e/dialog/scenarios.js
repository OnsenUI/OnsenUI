(function() {
  'use strict';

  describe('dialog', function() {
    var path = '/test/e2e/dialog/index.html',
      EC = protractor.ExpectedConditions;

    it('should be displayed when clicking the button', function() {
      browser.get(path);

      var dialog = element(by.css('ons-dialog'));
      browser.wait(EC.presenceOf(dialog));

      expect(dialog.isDisplayed()).not.toBeTruthy();
      element(by.id('open-dialog')).click();
      expect(dialog.isDisplayed()).toBeTruthy();
    });

    it('should bind to the parent scope', function() {
      expect(element(by.id('name')).getText()).toBe('Hello there, Andreas!');
      element(by.model('person.name')).sendKeys(Array(10).join(protractor.Key.BACK_SPACE) + 'Anatoo');
      expect(element(by.id('name')).getText()).toBe('Hello there, Anatoo!');
    });

    it('should emit events', function() {
      browser.get(path);

      var button = element(by.id('open-dialog'));
      expect(button.isDisplayed()).toBeTruthy();

      button.click();
      browser.wait(EC.invisibilityOf(button));
      expect(button.isDisplayed()).not.toBeTruthy();

      element(by.id('close-dialog')).click();
      browser.wait(EC.visibilityOf(button));
      expect(button.isDisplayed()).toBeTruthy();
    });
  });
})();
