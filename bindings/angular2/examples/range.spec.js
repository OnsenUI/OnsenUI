const EC = protractor.ExpectedConditions;

describe('range.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/range.html');
  });

  it('should have ons-range elements', () => {
    expect($('ons-range').isPresent()).toBeTruthy();
  });

  // it('should change the value when clicked', () => {
  //   expect($('#value').getText()).toBe('10');

  //   browser.actions()
  //     .mouseMove($('#range'), {x: 16, y: 16})
  //     .mouseDown()
  //     .mouseMove({x: 50, y: 16})
  //     .mouseUp()
  //     .perform();

  //   expect($('#value').getText()).not.toBe('10');
  // });
});
