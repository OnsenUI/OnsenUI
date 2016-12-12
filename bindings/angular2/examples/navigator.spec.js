const EC = protractor.ExpectedConditions;

describe('navigator.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/navigator.html');
  });

  it('should have ons-navigator elements', () => {
    expect($('ons-navigator').isPresent()).toBeTruthy();
    expect($('ons-navigator').isPresent()).toBeTruthy();
    expect($('#message').getText()).toEqual('Click to push:');
  });

  it('should push a page if the button is pressed', () => {
    $('#push').click();
    browser.wait(EC.elementToBeClickable($('#pop')), 5000);
    expect($('#pop').isPresent()).toBeTruthy();
    $('#pop').click();
    browser.wait(EC.stalenessOf($('#pop')), 5000);
    expect($('#pop').isPresent()).toBeFalsy();
  });
});
