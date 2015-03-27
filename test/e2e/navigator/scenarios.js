(function() {
  'use strict';

  describe('navigator', function() {
    var path = '/test/e2e/navigator/index.html';
    var EC = protractor.ExpectedConditions;

    it('should exist', function() {
      browser.get(path);
      browser.waitForAngular();

      var navi = element(by.css('ons-navigator'));
      browser.wait(EC.presenceOf(navi));
      expect(navi.isDisplayed()).toBeTruthy();
    });

    it('should switch page when a button is clicked', function() {
      browser.get(path);

      var page1 = element(by.id('page1'));
      var page2 = element(by.id('page2'));

      element(by.id('btn1')).click();
      browser.wait(EC.visibilityOf(page2));
      browser.wait(EC.invisibilityOf(page1));

      // Check that page2 was created and that it's displayed.
      expect((page2).isDisplayed()).toBeTruthy();
      expect((page1).isDisplayed()).not.toBeTruthy();
      expect((page1).isPresent()).toBeTruthy();

      element(by.id('btn2')).click();
      browser.wait(EC.stalenessOf(page2));

      // Check that page2 was destroyed.
      expect((page1).isDisplayed()).toBeTruthy();
      expect((page2).isPresent()).not.toBeTruthy();
    });

    it('should emit events', function() {
      browser.get(path);

      var pops = element(by.id('pops')),
        pushes = element(by.id('pushes'));

      expect(pops.getText()).toBe('0');
      expect(pushes.getText()).toBe('1');

      element(by.id('btn1')).click();
      browser.wait(EC.visibilityOf(element(by.id('btn2'))));
      element(by.id('btn2')).click();
      browser.wait(EC.textToBePresentInElement(pops, '1'));

      expect(pops.getText()).toBe('1');
      expect(pushes.getText()).toBe('2');
    });
  });
})();
