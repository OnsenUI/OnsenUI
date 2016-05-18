describe('ons-button example', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/button.html');
  });

  it('should have a button', () => {
    expect(element(by.css('ons-button')).getText()).toEqual('MyButton');
  });
});
