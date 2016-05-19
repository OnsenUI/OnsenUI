const EC = protractor.ExpectedConditions;

describe('back-button.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/back-button.html');
  });

  it('should have ons-back-button elements', () => {
    expect($('ons-back-button').isPresent()).toBeTruthy();
    expect($('.back-button__icon').isPresent()).toBeTruthy();
    expect($('.back-button__label').isPresent()).toBeTruthy();
  });
});
