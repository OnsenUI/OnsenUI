const EC = protractor.ExpectedConditions;

describe('modal.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/modal.html');
  });

  it('should have ons-modal elements', () => {
    expect($('ons-modal').isPresent()).toBeTruthy();
  });

  it('should show the modal when button is clicked', () => {
    expect($('ons-modal').isDisplayed()).toBeFalsy();

    $('#show').click();
    browser.wait(EC.visibilityOf($('ons-modal')), 5000);

    expect($('ons-modal').isDisplayed()).toBeTruthy();
  });

  it('should hide the modal when button is clicked', () => {
    $('#show').click();
    browser.wait(EC.visibilityOf($('ons-modal')), 5000);

    $('#hide').click();
    browser.wait(EC.invisibilityOf($('ons-modal')), 5000);
    expect($('ons-modal').isDisplayed()).toBeFalsy();
  });
});
