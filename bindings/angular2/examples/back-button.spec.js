const EC = protractor.ExpectedConditions;

describe('ons-back-button example', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/back-button.html');
  });

  it('should have a back button', () => {
    expect($('ons-back-button').isPresent()).toBeTruthy();
    expect($('.back-button__icon').isPresent()).toBeTruthy();
    expect($('.back-button__label').isPresent()).toBeTruthy();
  });
});
