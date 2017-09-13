describe('search-input.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/search-input.html');
  });

  it('should have ons-search-input elements', () => {
    expect($('ons-search-input').isPresent()).toBeTruthy();
  });

  it('should change the model when typing', () => {
    $('#text input').sendKeys('hoge');
    expect($('#target').getText()).toBe('hoge');
  });

});
