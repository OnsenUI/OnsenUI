const EC = protractor.ExpectedConditions;

describe('popover.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/popover.html');
  });

  it('should work normally', () => {
    expect($('ons-popover').isDisplayed()).toBeFalsy();
    $('#show').click();
    browser.wait(EC.visibilityOf($('ons-popover')), 5000);
    expect($('ons-popover').isDisplayed()).toBeTruthy();
  });

  it('should be hidden when the button is pressed', () => {
    $('#show').click();
    browser.wait(EC.visibilityOf($('ons-popover')), 5000);
    expect($('ons-popover').isDisplayed()).toBeTruthy();
    $('#hide').click();
    browser.wait(EC.invisibilityOf($('ons-popover')), 5000);
    expect($('ons-popover').isDisplayed()).toBeFalsy();
  });
});
