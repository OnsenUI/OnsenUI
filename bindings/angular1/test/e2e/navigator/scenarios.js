(function() {
  'use strict';

  describe('navigator', function() {
    var path = '/bindings/angular1/test/e2e/navigator/index.html';
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

        // Check that page2 was created and that it's displayed.
        expect((page2).isDisplayed()).toBeTruthy();
        var lastElement = element.all(by.xpath('//ons-navigator/ons-page')).last();
        expect(lastElement.equals(page2)).toBeTruthy();
        expect((page1).isPresent()).toBeTruthy();

        var button =  element(by.id('btn2'));
        browser.wait(EC.elementToBeClickable(button));
        browser.sleep(500); // Wait for the animation
        button.click();

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
        expect((page2).isDisplayed()).toBeTruthy();
        var lastElement = element.all(by.xpath('//ons-navigator/ons-page')).last();
        expect(lastElement.equals(page2)).toBeTruthy();
        expect((page1).isPresent()).toBeTruthy();

        browser.sleep(500); // Wait for the animation
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
        expect((page2).isDisplayed()).toBeTruthy();
        var lastElement = element.all(by.xpath('//ons-navigator/ons-page')).last();
        expect(lastElement.equals(page2)).toBeTruthy();
        expect((page1).isPresent()).toBeTruthy();

        browser.sleep(500); // Wait for the animation

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
        expect((page2).isDisplayed()).toBeTruthy();
        var lastElement = element.all(by.xpath('//ons-navigator/ons-page')).last();
        expect(lastElement.equals(page2)).toBeTruthy();
        expect((page1).isPresent()).toBeTruthy();

        browser.sleep(500); // Wait for the animation

        element(by.id('btn-insert1')).click();
        browser.wait(protractor.until.elementLocated(by.id('background_1'), 500));

        element(by.id('btn-insert2')).click();
        browser.wait(protractor.until.elementLocated(by.id('background_2'), 500));

        var page3 = element(by.id('background_1'));
        var page4 = element(by.id('background_2'));

        // Instead of checking visibility (all of them are visible), we need to check the DOM order. The last page will be visible.
        var elements = element.all(by.xpath('//ons-navigator/ons-page'));
        expect(elements.get(0).equals(page4)).toBeTruthy();
        expect(elements.get(1).equals(page1)).toBeTruthy();
        expect(elements.get(2).equals(page3)).toBeTruthy();
        expect(elements.get(3).equals(page2)).toBeTruthy();
      });
    });

    describe('page remove', function () {
      it('should remove in background', function () {
        var page1 = element(by.id('page1'));
        var page2 = element(by.id('page2'));

        element(by.id('btn1')).click();
        browser.wait(EC.visibilityOf(page2));
        expect((page2).isDisplayed()).toBeTruthy();

        var lastElement = element.all(by.xpath('//ons-navigator/ons-page')).last();
        expect(lastElement.equals(page2)).toBeTruthy();
        expect((page1).isPresent()).toBeTruthy();

        browser.sleep(500); // Wait for the animation

        element(by.id('btn-remove')).click();
        browser.wait(EC.stalenessOf(page1));

        var elements = element.all(by.xpath('//ons-navigator/ons-page'));
        expect(elements.get(0).equals(page2)).toBeTruthy();
      });
    });

    describe('backbutton handler', function () {
      it('should work on \'backbutton\' event', function() {
        var page1 = element(by.id('page1'));
        var page2 = element(by.id('page2'));

        element(by.id('btn1')).click();
        browser.wait(EC.visibilityOf(page2));
        expect((page2).isDisplayed()).toBeTruthy();
        var lastElement = element.all(by.xpath('//ons-navigator/ons-page')).last();
        expect(lastElement.equals(page2)).toBeTruthy();
        expect((page1).isPresent()).toBeTruthy();

        browser.sleep(500); // Wait for the animation

        element(by.id('btn4-device-backbutton')).click();
        browser.wait(EC.stalenessOf(page2));

        // Check that page2 was destroyed.
        expect((page1).isDisplayed()).toBeTruthy();
        expect((page2).isPresent()).not.toBeTruthy();
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
      expect((page2).isDisplayed()).toBeTruthy();
      var lastElement = element.all(by.xpath('//ons-navigator/ons-page')).last();
      expect(lastElement.equals(page2)).toBeTruthy();
      expect((page1).isPresent()).toBeTruthy();

      browser.sleep(500); // Wait for the animation

      browser.wait(EC.visibilityOf(element(by.id('btn2'))));
      element(by.id('btn2')).click();
      browser.wait(EC.textToBePresentInElement(pops, '1'));

      expect(pops.getText()).toBe('1');
      expect(pushes.getText()).toBe('2');
    });
  });
})();
