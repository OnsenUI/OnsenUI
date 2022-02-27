describe('button.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/button.html');
  });

  it('should have ons-button elements', () => {
    expect(element(by.css('ons-button')).getText()).toEqual('MyButton');
  });
});
