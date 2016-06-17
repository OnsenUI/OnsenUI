const EC = protractor.ExpectedConditions;

describe('notification.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/notification.html');
  });

  it('should have buttons', () => {
    expect($('#alert-button').isPresent()).toBeTruthy();
    expect($('#confirm-button').isPresent()).toBeTruthy();
    expect($('#prompt-button').isPresent()).toBeTruthy();
  });

  describe('alert() button', () => {
    it('should work normally', () => {
      const button = $('#alert-button');

      expect(button.getText()).toEqual('alert()');
      button.click();
      browser.wait(EC.visibilityOf($('ons-alert-dialog')), 5000);
      const ok = $('ons-alert-dialog .alert-dialog-button');
      expect(ok.getText()).toEqual('OK');
    });
  });
});
