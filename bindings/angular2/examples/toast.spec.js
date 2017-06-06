const EC = protractor.ExpectedConditions;

describe('toast.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/toast.html');
  });

  it('should have static ons-toast elements', () => {
    const staticToast = element.all(by.tagName('ons-toast')).get(0);

    expect(staticToast.isDisplayed()).toBeFalsy();
    element.all(by.tagName('ons-button')).get(0).click();
    browser.wait(EC.visibilityOf(staticToast), 5000);
    expect(staticToast.isDisplayed()).toBeTruthy();
  });

  it('should hide static ons-toast when the button is clicked', () => {
    const staticToast = element.all(by.tagName('ons-toast')).get(0);

    expect(staticToast.isDisplayed()).toBeFalsy();
    element.all(by.tagName('ons-button')).get(0).click();
    browser.wait(EC.visibilityOf(staticToast), 5000);

    element.all(by.css('.toast__button')).get(0).click();
    browser.wait(EC.invisibilityOf(staticToast), 5000);
    expect(staticToast.isDisplayed()).toBeFalsy();
  });

  it('should have dynamic ons-toast elements', () => {
    let dynamicToast;

    expect(element.all(by.tagName('ons-toast')).count()).toBe(1);
    element.all(by.tagName('ons-button')).get(1).click();
    dynamicToast = element.all(by.tagName('ons-toast')).get(1);
    browser.wait(EC.visibilityOf(dynamicToast), 5000);
    expect(dynamicToast.isDisplayed()).toBeTruthy();
  });

  it('should hide and destroy dynamic ons-toast when the button is clicked', () => {
    let dynamicToast;

    expect(element.all(by.tagName('ons-toast')).count()).toBe(1);
    element.all(by.tagName('ons-button')).get(1).click();
    dynamicToast = element.all(by.tagName('ons-toast')).get(1);
    browser.wait(EC.visibilityOf(dynamicToast), 5000);

    element.all(by.css('.toast__button')).get(1).click();
    browser.wait(() => {
      return element.all(by.tagName('ons-toast')).count().then((count) => {
        return count <= 1;
      });
    }, 5000);
    expect(element.all(by.tagName('ons-toast')).count()).toBe(1);
  });
});
