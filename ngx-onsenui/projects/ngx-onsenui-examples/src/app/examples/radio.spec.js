describe('radio.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/radio.html');
  });

  it('should have ons-radio elements', () => {
    expect($('ons-radio').isPresent()).toBeTruthy();
  });

  describe('template-driven form', () => {
    it('should show check mark on \'Bananas\' initially', () => {
      expect(element.all(by.tagName('ons-radio')).get(1).getAttribute('checked')).not.toBe(null);
    });

    it('should change the model when radio button is clicked', () => {
      expect(element.all(by.tagName('ons-radio')).get(1).getAttribute('checked')).not.toBe(null);
      expect(element.all(by.tagName('ons-radio')).get(2).getAttribute('checked')).toBe(null);
      expect($('#selected-fruit').getText()).toBe('Bananas');

      element.all(by.tagName('ons-radio')).get(2).click();

      expect(element.all(by.tagName('ons-radio')).get(1).getAttribute('checked')).toBe(null);
      expect(element.all(by.tagName('ons-radio')).get(2).getAttribute('checked')).not.toBe(null);
      expect($('#selected-fruit').getText()).toBe('Oranges');
    });
  });

  describe('reactive form', () => {
    it('should change form value when radio button is clicked', () => {
      $('#vegetable-2').click();
      expect($('#selected-vegetable').getText()).toBe('Broccoli');
    });
  });
});
