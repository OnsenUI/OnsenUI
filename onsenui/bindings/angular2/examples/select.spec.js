const EC = protractor.ExpectedConditions;

describe('select.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/select.html');
  });

  it('should have ons-select elements', () => {
    expect($('ons-select').isPresent()).toBeTruthy();
  });

  describe('reactive form', () => {
    it('should change form value when the selection is changed', () => {
      $('#animal-3').click();
      expect($('#selected-animal').getText()).toBe('Elephant');
    });
  });
});
