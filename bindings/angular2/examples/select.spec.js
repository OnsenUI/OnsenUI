const EC = protractor.ExpectedConditions;

describe('select.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/select.html');
  });

  it('should have ons-select elements', () => {
    expect($('ons-select').isPresent()).toBeTruthy();
  });
});
