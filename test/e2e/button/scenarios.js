(function() {
  'use strict';

  var path = '/test/e2e/button/index.html';
  


  describe('ons-button', function() {  
    var EC = protractor.ExpectedConditions;

    it('should have an element', function() {
      browser.get(path);
        browser.waitForAngular();

        var button = element(by.css('ons-button'));
        browser.wait(EC.presenceOf(button), 1000);

        expect(button.isPresent()).toBeTruthy();

      
      
    });
    
    it('should have ng-click or on-click attribute', function() {
        var button = element(by.css('ons-button'));
        
        expect(button.getAttribute('ng-click').isPresent()).toBeTruthy();
        
    });

    it('should display a text when clicking the button', function() {
      
      var button = element(by.css('ons-button'));
      var input = element(by.css('input'));
      button.click();
      console.log(element(by.model('data')));
      expect(input.getAttribute('value')).toEqual('true');

    });


  });
})();
