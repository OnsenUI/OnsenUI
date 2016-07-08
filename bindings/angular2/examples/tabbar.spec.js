const EC = protractor.ExpectedConditions;

describe('tabbar.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/tabbar.html');
  });

  it('should have ons-tabbar elements', () => {
    expect($('ons-tabbar').isDisplayed()).toBeTruthy();
  });

  it('should have ons-tab elements', () => {
    expect($('ons-tab').isDisplayed()).toBeTruthy();
  });

  it('should load initial page', () => {
    browser.wait(EC.visibilityOf($('#initial-page')), 5000);
    expect($('#initial-page').isDisplayed()).toBeTruthy();
  });

  it('should switch page on click tab', () => {
    $('ons-tab[label="Page2"]').click();
    browser.wait(EC.visibilityOf($('.normal-page')), 5000);
    expect($('.normal-page').isDisplayed()).toBeTruthy();
  });
});
