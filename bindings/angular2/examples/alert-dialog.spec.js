const EC = protractor.ExpectedConditions;

describe('alert-dialog.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/alert-dialog.html');
  });

  it('should have ons-alert-dialog elements', () => {
    expect($('ons-alert-dialog').isDisplayed()).toBeFalsy();
    $('ons-button').click();
    browser.wait(EC.visibilityOf($('ons-alert-dialog')), 5000);
    expect($('ons-alert-dialog').isDisplayed()).toBeTruthy();
  });

  it('should hide ons-alert-dialog when the button is clicked', () => {
    expect($('ons-alert-dialog').isDisplayed()).toBeFalsy();
    $('ons-button').click();
    browser.wait(EC.visibilityOf($('ons-alert-dialog')), 5000);

    $('.alert-dialog-button').click();
    browser.wait(EC.invisibilityOf($('ons-alert-dialog')), 5000);
    expect($('ons-alert-dialog').isDisplayed()).toBeFalsy();
  });

  it('should hide ons-alert-dialog element when mask is clicked', () => {
    expect($('ons-alert-dialog').isDisplayed()).toBeFalsy();
    $('ons-button').click();
    browser.wait(EC.visibilityOf($('ons-alert-dialog')), 5000);

    /**
     * Clicking in center of mask will hit the dialog
     * so we need to click outside it.
     */
    browser.actions().mouseMove($('.alert-dialog-mask'), 300, 200).click().perform();

    browser.wait(EC.invisibilityOf($('ons-alert-dialog')), 5000);
    expect($('ons-alert-dialog').isDisplayed()).toBeFalsy();
  });
});
