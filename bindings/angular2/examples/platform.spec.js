const EC = protractor.ExpectedConditions;

describe('platform.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/platform.html');
  });

  it('should have ons-page elements', () => {
    expect($('ons-page').isPresent()).toBeTruthy();
  });
});
