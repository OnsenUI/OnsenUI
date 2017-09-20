(function() {
  'use strict';

  describe('tabbar', function() {
    var path = '/bindings/angular1/test/e2e/tabbar/index.html';

    beforeEach(function() {
      browser.get(path);
    });

    it('should have an element', function() {
      expect(element(by.css('ons-tabbar')).isPresent()).toBeTruthy();
    });

    it('should switch page when a tab is clicked', function() {
      var tabs  = [
        element(by.id('tab1')),
        element(by.id('tab2')),
        element(by.id('tab3'))
      ];

      var pages  = [
        element(by.id('page1')),
        element(by.id('page2')),
        element(by.id('page3'))
      ];

      tabs[0].click();
      expect(pages[0].getLocation()).toEqual(jasmine.objectContaining({x: 0}));
      expect(pages[1].getLocation()).not.toEqual(jasmine.objectContaining({x: 0}));
      expect(pages[2].getLocation()).not.toEqual(jasmine.objectContaining({x: 0}));

      tabs[1].click();
      expect(pages[0].getLocation()).not.toEqual(jasmine.objectContaining({x: 0}));
      expect(pages[1].getLocation()).toEqual(jasmine.objectContaining({x: 0}));
      expect(pages[2].getLocation()).not.toEqual(jasmine.objectContaining({x: 0}));

      tabs[2].click();
      expect(pages[0].getLocation()).not.toEqual(jasmine.objectContaining({x: 0}));
      expect(pages[1].getLocation()).not.toEqual(jasmine.objectContaining({x: 0}));
      expect(pages[2].getLocation()).toEqual(jasmine.objectContaining({x: 0}));
    });

    it('should change page when swiped', function() {
      var pages  = [
        element(by.id('page1')),
        element(by.id('page2')),
        element(by.id('page3'))
      ];

      var swipe = function(from, to, width) {
        var d = Math.sign(from - to);
        browser.actions()
          .mouseMove(pages[from], {x: width * (d>0?.1:.9), y: 100})
          .mouseDown()
          .mouseMove({x: width * 0.7 * d, y: 0})
          .mouseUp()
          .perform();
        browser.waitForAngular();

        browser.sleep(300);

        browser.wait(function() {
          return pages[to].getLocation().then(function(loc) {
            return loc.x === 0;
          });
        });
      };

      browser.executeScript('return document.body.clientWidth').then(function(width) {
        // Store initial position.
        var initialPosition = pages[0].getLocation();
        var currentIndex = element(by.id('current-index'));
        expect(currentIndex.getText()).toBe('0');

        // Swipe left
        swipe(0, 1, width);
        expect(currentIndex.getText()).toBe('1');
        expect(initialPosition).not.toEqual(pages[0].getLocation());

        // Swipe left
        swipe(1, 2, width);
        expect(currentIndex.getText()).toBe('2');

        // Swipe right
        swipe(2, 1, width);
        expect(currentIndex.getText()).toBe('1');

        // Swipe right
        swipe(1, 0, width);
        expect(currentIndex.getText()).toBe('0');
        expect(initialPosition).toEqual(pages[0].getLocation());
      });
    });

    it('should not reload persistent tabs', function() {
      var tabs = [
        element(by.id('tab1')),
        element(by.id('tab3'))
      ];

      var input = element(by.id('page3-input'));

      tabs[1].click();
      input.sendKeys('Hello');
      expect(input.getAttribute('value')).toBe('Hello');
      tabs[0].click();
      tabs[1].click();
      expect(input.getAttribute('value')).toBe('Hello');
    });

    it('should pass down its scope to tabs', function() {
      expect(element(by.id('tab1')).getAttribute('label')).toBe('My label');
    });

    it('should emit events', function() {
      var tabs = [
        element(by.id('tab1')),
        element(by.id('tab2')),
        element(by.id('tab3'))
      ];

      var timesReactivated = element(by.id('times-reactivated'));

      expect(timesReactivated.getText()).toBe('0');
      tabs[2].click();
      tabs[0].click();
      expect(timesReactivated.getText()).toBe('0');


      tabs[2].click();
      tabs[2].click();
      tabs[0].click();
      expect(timesReactivated.getText()).toBe('1');

      tabs[1].click();
      tabs[1].click();
      tabs[0].click();
      expect(timesReactivated.getText()).toBe('2');

      tabs[2].click();
      tabs[2].click();
      tabs[2].click();
      tabs[0].click();
      expect(timesReactivated.getText()).toBe('4');
    });
  });

  describe('tabbar/issue-1654.html', function() {
    it('should work', function() {
      var EC = protractor.ExpectedConditions;

      browser.get('/bindings/angular1/test/e2e/tabbar/issue-1654.html');

      element(by.css('#button')).click();
      browser.wait(EC.presenceOf(element(by.css('ons-icon'))));

      expect(element(by.css('ons-icon[class~="fa-envelope"]')).isPresent()).toBe(true);
    });
  });
})();
