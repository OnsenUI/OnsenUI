(function() {
  'use strict';

  describe('navigator', function() {
    var path = '/test/react/navigator/index.html';
    var EC = protractor.ExpectedConditions;
    var until = protractor.until;
    var driver = browser.driver;

    beforeEach(function () {
      browser.get(path);
    });

    var titleTest = function(index, title) {
      title = title || ('Navigator ' + index);
      var titlePage = driver.findElement(by.id('title_page_' + index));
      expect(titlePage.getText()).toEqual(title);
    };


    var pushPage = function(start, end) {
      for (var i = start; i < end; i++) {
        driver.sleep(100);
        var pushBtn = driver.findElement(by.id('push_page_' + i));
        pushBtn.click();
        driver.wait(until.elementLocated(by.id('page_' + (i + 1))), 100);
        driver.findElement(by.id('push_page_' + (i + 1)));
        driver.findElement(by.id('pop_page_' + (i + 1)));
        var page  = driver.findElement(by.id('page_' + (i + 1)));
        expect(page.isDisplayed()).toBe(true);
        titleTest(i + 1);
      }
    };

    var popPage = function(start, end) {
      for (var i = start; i > end; i--) {
        var popBtn = driver.findElement(by.id('pop_page_' + i));
        popBtn.click();
        driver.sleep(100);
        expect(driver.isElementPresent(by.id('page_' + (i)))).toBe(false);
      }
    };

    it('should exist with page', function() {
      // findElement throws an exception if it is not there
      driver.findElement(by.id('mynav'));
      driver.findElement(by.id('page_1'));
    });

   describe('page pushing', function () {
     it('should switch page when a button is clicked', function() {
       // push 9 pages
      titleTest(1);
       pushPage(1, 10);
       // pop  5 pages
       popPage(10, 5);
       // push 3 pages
       pushPage(5, 9);
      // pop the rest
       popPage(9, 1);
     });
   });
   //
   // describe('page replacing', function () {
   //     it('should replace current page when a button is clicked', function () {
   //    titleTest(1);
   //    // push page
   //    pushPage(1, 2);
   //    var replaceBtn = driver.findElement(by.id('replace_page_2'));
   //    replaceBtn.click();
   //    driver.sleep(100);
   //    titleTest(2, 'Replaced Page');
   //    pushPage(2, 3);
   //    replaceBtn = driver.findElement(by.id('replace_page_3'));
   //    replaceBtn.click();
   //    driver.sleep(100);
   //    titleTest(3, 'Replaced Page');
   //    popPage(3, 2);
   //    driver.sleep(100);
   //    titleTest(2, 'Replaced Page');
   //    popPage(2, 1);
   //    titleTest(1);
   //    });
   //  });
   //
   //  describe('page reset', function () {
   //     it('should reset current page when the button is clicked', function () {
   //       var resetButton = driver.findElement(by.id('reset_page_1'));
   //       resetButton.click();
   //       driver.sleep(100);
   //       titleTest(1, 'Reset Page');
   //
   //       pushPage(1, 3);
   //       var resetButton = driver.findElement(by.id('reset_page_3'));
   //       resetButton.click();
   //       driver.sleep(100);
   //       titleTest(1, 'Reset Page');
   //
   //      expect(driver.isElementPresent(by.id('page_2'))).toBe(false);
   //      expect(driver.isElementPresent(by.id('page_3'))).toBe(false);
   //    });
   //  });
   //
    // TODO PAGE INSERT
    // BACK BUTTON HANDLER



    // describe('backbutton handler', function () {
    //   it('should work on \'backbutton\' event', function() {
    //     var page1 = element(by.id('page1'));
    //     var page2 = element(by.id('page2'));
    //
    //     element(by.id('btn1')).click();
    //     browser.wait(EC.visibilityOf(page2));
    //     browser.wait(EC.invisibilityOf(page1));
    //
    //     element(by.id('btn4-device-backbutton')).click();
    //     browser.wait(EC.stalenessOf(page2));
    //
    //     // Check that page2 was destroyed.
    //     expect((page1).isDisplayed()).toBeTruthy();
    //     expect((page2).isPresent()).not.toBeTruthy();
    //   });
    // });


    // it('should emit events', function() {
    //   var pops = element(by.id('pops')),
    //     pushes = element(by.id('pushes'));
    //
    //   expect(pops.getText()).toBe('0');
    //   expect(pushes.getText()).toBe('1');
    //
    //   element(by.id('btn1')).click();
    //   browser.wait(EC.visibilityOf(element(by.id('btn2'))));
    //   element(by.id('btn2')).click();
    //   browser.wait(EC.textToBePresentInElement(pops, '1'));
    //
    //   expect(pops.getText()).toBe('1');
    //   expect(pushes.getText()).toBe('2');
    // });
  });
})();
