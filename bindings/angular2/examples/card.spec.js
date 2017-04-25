describe('card.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/card.html');
  });

  it('should have ons-card elements', () => {
    expect(element(by.css('ons-card')).getText()).toEqual('Some content');
  });
});
