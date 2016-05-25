const EC = protractor.ExpectedConditions;

describe('lazy-repeat.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/lazy-repeat.html');
  });

  it('should have ons-lazy-repeat elements', () => {
    expect($('ons-lazy-repeat').isPresent()).toBeTruthy();
  });
});
