(function() {
  'use strict';

  describe('tabbar', function() {
    var path = '/test/e2e/tabbar/index.html';

    beforeEach(function() {
      browser.get(path);
    });

    it('should have an element', function() {
      expect(element(by.css('ons-tabbar')).isPresent()).toBeTruthy();
    });

    it('should switch page when a tab is clicked', function() {
      var tabs  = [
        element(by.id('tab1')),
        element(by.id('tab2'))
      ];

      tabs[0].click();
      expect(element(by.id('page1')).isDisplayed()).toBeTruthy();
      expect(element(by.id('page2')).isDisplayed()).toBeFalsy();

      tabs[1].click();
      expect(element(by.id('page2')).isDisplayed()).toBeTruthy();
      expect(element(by.id('page1')).isDisplayed()).toBeFalsy();
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

    it('should not hide persistent tabs when tapped twice (issue #530)', function() {
      var tab = element(by.id('tab3'));
      var page3 = element(by.id('page3'));

      tab.click();
      expect(page3.isDisplayed()).toBeTruthy();
      tab.click();
      expect(page3.isDisplayed()).toBeTruthy();
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

    it('should be possible to hide tabs', function() {
      var tabBar = element(by.css('.tab-bar'));

      expect(tabBar.isDisplayed()).toBeTruthy();
      element(by.id('toggle-tabbar')).click();
      expect(tabBar.isDisplayed()).not.toBeTruthy();
      element(by.id('toggle-tabbar')).click();
      expect(tabBar.isDisplayed()).toBeTruthy();
    });
  });
})();
