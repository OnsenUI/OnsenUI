const EC = protractor.ExpectedConditions;

describe('lazy-repeat.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/lazy-repeat.html');
  });

  it('should have ons-list elements', () => {
    expect($('ons-list').isPresent()).toBeTruthy();
  });

  it('should remove elements when scrolling', () => {
    expect($('#item-1').isPresent()).toBeTruthy();

    /**
     * Scroll to bottom of page.
     */
    browser.executeScript('document.querySelector(".page__content").scrollTop = 10000;');

    browser.wait(EC.stalenessOf($('#item-1')));
    expect($('#item-1').isPresent()).toBeFalsy();
  });
});
