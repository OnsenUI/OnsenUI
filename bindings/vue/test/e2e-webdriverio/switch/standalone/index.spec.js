describe('v-ons-switch', function() {
  describe('(standalone)', function() {
    beforeEach(function() {
      browser.url('/bindings/vue/test/e2e-webdriverio/switch/standalone/index.html');
      browser.waitForExist('#is-mounted'); // wait until Vue instance is mounted
    });

    it('is mounted by Vue instance', function() {
      expect(browser.isExisting('#no-attributes')).toBe(true);
    });

    xit('is not checked if :checked="false" is set', function() {
      // TODO
    });

    xit('is checked if :checked="true" is set', function() {
      // TODO
    });

    xit('is not disabled if :disabled="false" is set', function() {
      // TODO
    });

    xit('is disabled if :disabled="true" is set', function() {
      // TODO
    });

    xit('can be controlled via label if input-id attribute is set', function() {
      // TODO
    });

    xit('has `material` class if modifier="material" is set', function() {
      // TODO
    });

    describe('change event', function() {
      it('works', function() {
        browser.click('#change-event')
        expect(browser.getText('#change-event-message')).toBe('it works!');
      });
    });
  });

  describe('(with navigator)', function() {
  });

  describe('(with splitter)', function() {
  });

  describe('(with tabbar)', function() {
  });
});
