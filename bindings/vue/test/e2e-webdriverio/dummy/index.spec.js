describe('dummy', function() {
  beforeEach(function() {
    browser.url('/bindings/vue/test/e2e-webdriverio/dummy/index.html');
  });

  it('should be that true is true', function() {
    expect(true).toBeTruthy();
  });
});
