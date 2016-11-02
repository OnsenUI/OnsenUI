const EC = protractor.ExpectedConditions;

describe('dialog.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/dialog.html');
  });

  it('should have ons-dialog elements', () => {
    expect($('ons-dialog').isPresent()).toBeTruthy();
  });

  it('should show the ons-dialog element when the button is clicked', () => {
    expect($('ons-dialog').isDisplayed()).toBeFalsy();

    $('#open').click();
    browser.wait(EC.visibilityOf($('ons-dialog')), 5000);
    expect($('ons-dialog').isDisplayed()).toBeTruthy();
  });

  it('should hide the ons-dialog element when button is clicked', () => {
    $('#open').click();
    browser.wait(EC.visibilityOf($('#close')), 5000);
    $('#close').click();
    browser.wait(EC.invisibilityOf($('ons-dialog')), 5000);
    expect($('ons-dialog').isDisplayed()).toBeFalsy();
  });

  it('should hide ons-dialog element when mask is clicked', () => {
    $('#open').click();
    browser.wait(EC.visibilityOf($('ons-dialog')), 5000);

    /**
     * Clicking in center of mask will hit the dialog
     * so we need to click outside it.
     */
    browser.actions().mouseMove($('.dialog-mask'), 300, 200).click().perform();
    browser.wait(EC.invisibilityOf($('ons-dialog')), 5000);
    expect($('ons-dialog').isDisplayed()).toBeFalsy();
  });
});
