const EC = protractor.ExpectedConditions;

describe('alert-dialog.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/alert-dialog.html');
  });

  it('should have ons-alert-dialog elements', () => {
    $('ons-button').click();
    browser.wait(EC.visibilityOf($('ons-alert-dialog')), 5000);
    expect($('ons-alert-dialog').isPresent()).toBeTruthy();
  });
});
