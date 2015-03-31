(function() {
  'use strict';

  describe('tabbar', function() {
    var path = '/test/e2e/tabbar/index.html';

    it('should have an element', function() {
      browser.get(path);
      expect(element(by.css('ons-tabbar')).isPresent()).toBeTruthy();
    });

    it('should switch page when a tab is clicked', function() {
      browser.get(path);

      var tabs  = [
        element(by.css('ons-tab[label="Page 1"]')),
        element(by.css('ons-tab[label="Page 2"]'))
      ];

      tabs[0].click();
      expect(element(by.id('page1')).isPresent()).toBe(true);
      expect(element(by.id('page2')).isPresent()).not.toBe(true);

      tabs[1].click();
      expect(element(by.id('page2')).isPresent()).toBe(true);
      expect(element(by.id('page1')).isPresent()).not.toBe(true);
    });

    it('should reload non-persistent tabs', function() {
      browser.get(path);

      var tabs = [
        element(by.css('ons-tab[label="Page 1"]')),
        element(by.css('ons-tab[label="Page 2"]'))
      ];

      var input = element(by.id('page2-input'));

      tabs[1].click();
      input.sendKeys('Hello');
      expect(input.getAttribute('value')).toBe('Hello');
      tabs[0].click();
      tabs[1].click();
      expect(input.getAttribute('value')).not.toBe('Hello');
    });

    it('should not reload persistent tabs', function() {
      browser.get(path);

      var tabs = [
        element(by.css('ons-tab[label="Page 1"]')),
        element(by.css('ons-tab[label="Page 3"]'))
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
      browser.get(path);

      var tab = element(by.css('ons-tab[label="Page 3"]'));
      var page3 = element(by.id('page3'));

      tab.click();
      expect(page3.isDisplayed()).toBeTruthy();
      tab.click();
      expect(page3.isDisplayed()).toBeTruthy();
    });
  });
})();
