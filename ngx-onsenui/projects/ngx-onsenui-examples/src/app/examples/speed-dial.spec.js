const EC = protractor.ExpectedConditions;

describe('speed-dial.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/speed-dial.html');
  });

  it('should have ons-speed-dial elements', () => {
    expect($('ons-speed-dial').isPresent()).toBeTruthy();
  });

  it('should open and close when clicked', () => {
    expect($('#item').isDisplayed()).toBeFalsy();

    $('ons-speed-dial').click();
    browser.wait(EC.visibilityOf($('#item')), 5000);
    expect($('#item').isDisplayed()).toBeTruthy();

    $('ons-speed-dial').click();
    browser.wait(EC.invisibilityOf($('#item')), 5000);
    expect($('#item').isDisplayed()).toBeFalsy();
  });
});
