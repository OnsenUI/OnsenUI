(function() {
  'use strict';

  describe('navigator', function() {
    var path = '/test/e2e/navigator/index.html';
    var EC = protractor.ExpectedConditions;

    beforeEach(function () {
      browser.get(path);
      browser.waitForAngular();
    });

    it('should exist', function() {
      var navi = element(by.css('ons-navigator'));
      browser.wait(EC.presenceOf(navi));
      expect(navi.isDisplayed()).toBeTruthy();
    });

    describe('page pushing', function () {
      it('should switch page when a button is clicked', function() {
        var page1 = element(by.id('page1'));
        var page2 = element(by.id('page2'));
        var status = element(by.id('status'));

        expect(status.getText()).toBe('init');

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

        // Check that page1 object is the same modified object.
        expect(status.getText()).toBe('modified');
      });
    });

    describe('page replacing', function () {
      it('should replace current page when a button is clicked', function () {
        var page1 = element(by.id('page1'));
        var page2 = element(by.id('page2'));
        var page3 = element(by.id('page3'));
        var status = element(by.id('status'));

        expect(status.getText()).toBe('init');

        element(by.id('btn1')).click();
        browser.wait(EC.visibilityOf(page2));
        browser.wait(EC.invisibilityOf(page1));

        element(by.id('btn3')).click();
        browser.wait(EC.stalenessOf(page2));

        expect(page3.isDisplayed()).toBeTruthy();
        expect(page2.isPresent()).not.toBeTruthy();
        expect(page1.isPresent()).toBeTruthy();

        element(by.id('btn4')).click();
        browser.wait(EC.stalenessOf(page3));

        expect(page1.isDisplayed()).toBeTruthy();
        expect(page3.isPresent()).not.toBeTruthy();

        expect(status.getText()).toBe('modified');
      });
    });

    describe('page reset', function () {
      it('should reset to page', function () {
        var page1 = element(by.id('page1'));
        var page2 = element(by.id('page2'));
        var page3 = element(by.id('page3'));
        var page4 = element(by.id('page4'));
        var status = element(by.id('status'));

        expect(status.getText()).toBe('init');

        element(by.id('btn1')).click();
        browser.wait(EC.visibilityOf(page2));
        browser.wait(EC.invisibilityOf(page1));

        element(by.id('btn6-reset')).click();
        browser.wait(EC.stalenessOf(page2));

        expect(page1.isPresent()).toBeTruthy();
      });
    });

    describe('page insert', function () {
      it('should insert in background', function () {
        var page1 = element(by.id('page1'));
        var page2 = element(by.id('page2'));
        element(by.id('btn1')).click();
        browser.wait(EC.visibilityOf(page2));
        browser.wait(EC.invisibilityOf(page1));

        element(by.id('btn-insert1')).click();
        browser.wait(protractor.until.elementLocated(by.id('background_1'), 500));

        element(by.id('btn-insert2')).click();
        browser.wait(protractor.until.elementLocated(by.id('background_2'), 500));

        var page3 = element(by.id('background_1'));
        var page4 = element(by.id('background_2'));

        expect(element(by.id('page1')).isDisplayed()).toBe(false);
        expect(element(by.id('page2')).isDisplayed()).toBe(true);
        expect(element(by.id('background_1')).isDisplayed()).toBe(false);
        expect(element(by.id('background_2')).isDisplayed()).toBe(false);

        // pop
        element(by.id('btn2')).click();
        browser.wait(EC.stalenessOf(page2));
        expect(element(by.id('page1')).isDisplayed()).toBe(false);
        expect(element(by.id('background_1')).isDisplayed()).toBe(true);
        expect(element(by.id('background_2')).isDisplayed()).toBe(false);

        element(by.id('background_1_btn')).click();
        browser.wait(EC.stalenessOf(page3));
        expect(element(by.id('page1')).isDisplayed()).toBe(true);
        expect(element(by.id('background_2')).isDisplayed()).toBe(false);

        element(by.id('btn1-pop')).click();
        browser.wait(EC.stalenessOf(page1));
        expect(element(by.id('background_2')).isDisplayed()).toBe(true);
      });
    });

    describe('backbutton handler', function () {
      it('should work on \'backbutton\' event', function() {
        var page1 = element(by.id('page1'));
        var page2 = element(by.id('page2'));

        element(by.id('btn1')).click();
        browser.wait(EC.visibilityOf(page2));
        browser.wait(EC.invisibilityOf(page1));

        element(by.id('btn4-device-backbutton')).click();
        browser.wait(EC.stalenessOf(page2));

        // Check that page2 was destroyed.
        expect((page1).isDisplayed()).toBeTruthy();
        expect((page2).isPresent()).not.toBeTruthy();
      });
    });

    describe('pop and refresh page', function () {
      it('should refresh previous page when a button is clicked', function () {
        var page1 = element(by.id('page1'));
        var page2 = element(by.id('page2'));
        var status = element(by.id('status'));

        expect(status.getText()).toBe('init');

        element(by.id('btn1')).click();
        browser.wait(EC.visibilityOf(page2));
        browser.wait(EC.invisibilityOf(page1));

        // Check that page2 was created and that it's displayed.
        expect((page2).isDisplayed()).toBeTruthy();
        expect((page1).isDisplayed()).not.toBeTruthy();
        expect((page1).isPresent()).toBeTruthy();

        element(by.id('btn5')).click();
        browser.wait(EC.stalenessOf(page2));

        // Check that page2 was destroyed.
        expect((page1).isDisplayed()).toBeTruthy();
        expect((page2).isPresent()).not.toBeTruthy();

        // Check that page1 object is a new unmodified object.
        expect(status.getText()).toBe('init');
      });
    });

    it('should emit events', function() {
      var pops = element(by.id('pops')),
        pushes = element(by.id('pushes'));

      var page1 = element(by.id('page1'));
      var page2 = element(by.id('page2'));

      expect(pops.getText()).toBe('0');
      expect(pushes.getText()).toBe('1'); // initial page was pushed

      browser.wait(EC.visibilityOf(element(by.id('btn1'))));
      element(by.id('btn1')).click();

      browser.wait(EC.visibilityOf(page2));
      browser.wait(EC.invisibilityOf(page1));

      browser.wait(EC.visibilityOf(element(by.id('btn2'))));
      element(by.id('btn2')).click();
      browser.wait(EC.textToBePresentInElement(pops, '1'));

      expect(pops.getText()).toBe('1');
      expect(pushes.getText()).toBe('2');
    });
  });
})();
