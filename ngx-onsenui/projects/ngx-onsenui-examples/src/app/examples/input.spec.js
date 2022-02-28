describe('input.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/input.html');
  });

  it('should have ons-input elements', () => {
    expect($('ons-input').isPresent()).toBeTruthy();
  });

  describe('template-driven form', () => {
    it('should change the model when typing', () => {
      $('#text input').sendKeys('hoge');
      expect($('#target').getText()).toBe('hoge');
    });

    it('should change the content when typing in the native input', () => {
      $('#native-text').sendKeys('fuga');
      expect($('#text input').getAttribute('value')).toBe('fuga');
    });
  });

  describe('reactive form', () => {
    it('should change form value when inputs are changed', () => {
      const name = 'Jim';
      const job = 'Tester';

      $('#reactive-name input').sendKeys(name);
      $('#reactive-job input').sendKeys(job);

      expect($('#form-value').getText()).toBe(`{ "name": "${name}", "job": "${job}" }`);
    });
  });
});
