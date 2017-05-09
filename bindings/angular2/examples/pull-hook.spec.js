const EC = protractor.ExpectedConditions;

describe('pull-hook.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/pull-hook.html');
  });

  it('should have ons-pull-hook elements', () => {
    expect($('ons-pull-hook').isPresent()).toBeTruthy();
  });

  it('should load stuff when pulled down', () => {
    expect($('#item-5').isPresent()).toBeFalsy();
    browser.actions()
      .mouseMove(element(by.css('.page__content')), {x: 10, y: 100})
      .mouseDown()
      .mouseMove({x: 10, y: 250})
      .mouseUp()
      .perform();

    browser.wait(EC.presenceOf($('#item-5')), 5000);
    expect($('#item-5').isPresent()).toBeTruthy();
  });
});
