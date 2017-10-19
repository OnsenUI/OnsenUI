const EC = protractor.ExpectedConditions;

describe('segment.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/segment.html');
  });

  it('should have ons-segment elements', () => {
    expect($('ons-segment').isPresent()).toBeTruthy();
  });
});
