describe('search-input.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/search-input.html');
  });

  it('should have ons-search-input elements', () => {
    expect($('ons-search-input').isPresent()).toBeTruthy();
  });

  describe('template-driven form', () => {
    it('should change the model when typing', () => {
      $('#text input').sendKeys('hoge');
      expect($('#target').getText()).toBe('hoge');
    });
  });

  describe('reactive form', () => {
    it('should change the form value when typing', () => {
      $('#reactive-search input').sendKeys('graaAAAHHH!!!');
      expect($('#reactive-query').getText()).toBe('graaAAAHHH!!!');
    });
  });

});
