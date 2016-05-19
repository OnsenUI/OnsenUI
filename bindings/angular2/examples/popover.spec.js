const EC = protractor.ExpectedConditions;

describe('popover.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/popover.html');
  });

  it('should work nomarlly', () => {
    $('ons-button').click();
    browser.wait(EC.visibilityOf($('ons-popover')), 5000);
    expect($('ons-popover').isPresent()).toBeTruthy();
  });
});
