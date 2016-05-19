const EC = protractor.ExpectedConditions;

describe('ons-toolbar-button example', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/toolbar-button.html');
  });

  it('should have toolbar buttons', () => {
    expect($('ons-toolbar-button#left').isPresent()).toBeTruthy();
    expect($('ons-toolbar-button#left').getText()).toEqual('Left');
    expect($('ons-toolbar-button#right').isPresent()).toBeTruthy();
    expect($('ons-toolbar-button#right').getText()).toEqual('Right');
  });
});
