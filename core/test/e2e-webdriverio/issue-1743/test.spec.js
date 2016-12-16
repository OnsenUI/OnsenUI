const assert = require('assert');

describe('issue-1743', () => {
  it('should be fixed', () => {
    browser.url('/core/test/e2e-webdriverio/issue-1743/index.html');
    browser.click('#target');
    if (browser.alertText()) {
      browser.alertAccept();
    }
    assert(!browser.alertText());
    //browser.alertDismiss();
  });
});

