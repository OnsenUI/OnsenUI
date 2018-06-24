const EC = protractor.ExpectedConditions;

describe('tabbar.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/tabbar.html');
  });

  it('should have ons-tabbar elements', () => {
    expect($('ons-tabbar').isDisplayed()).toBeTruthy();
  });

  it('should have ons-tab elements', () => {
    expect($('ons-tab[label="Page1"]').isDisplayed()).toBeTruthy();
  });

  it('should load initial page', () => {
    browser.wait(EC.visibilityOf($('#initial-page')), 5000);
    expect($('#initial-page').isDisplayed()).toBeTruthy();
  });

  it('should switch page on click tab', () => {
    $('ons-tab[label="Page2"]').click();
    browser.wait(EC.visibilityOf(element.all(by.css('.normal-page')).get(0)), 5000);
    expect(element.all(by.css('.normal-page')).get(0).isDisplayed()).toBeTruthy();
  });

  it ('should handle swipe event', () => {
    expect($('#index').getText()).toBe('0.00');
    browser.actions()
      .mouseMove(element(by.css('.page__content')), {x: 16, y: 16})
      .mouseDown()
      .mouseMove({x: -50, y: 16})
      .mouseMove({x: -100, y: 16})
      .perform();
    expect($('#index').getText()).not.toBe('0.00');
  })
});
