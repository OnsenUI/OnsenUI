const EC = protractor.ExpectedConditions;

describe('action-sheet.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/action-sheet.html');
  });

  it('should have static ons-action-sheet elements', () => {
    const staticActionSheet = element.all(by.tagName('ons-action-sheet')).get(0);

    expect(staticActionSheet.isDisplayed()).toBeFalsy();
    element.all(by.tagName('ons-button')).get(0).click();
    browser.wait(EC.visibilityOf(staticActionSheet), 5000);
    expect(staticActionSheet.isDisplayed()).toBeTruthy();
  });

  it('should hide static ons-action-sheet when the mask is clicked', () => {
    const staticActionSheet = element.all(by.tagName('ons-action-sheet')).get(0);

    expect(staticActionSheet.isDisplayed()).toBeFalsy();
    element.all(by.tagName('ons-button')).get(0).click();
    browser.wait(EC.visibilityOf(staticActionSheet), 5000);

    element.all(by.css('.action-sheet-mask')).get(0).click();
    browser.wait(EC.invisibilityOf(staticActionSheet), 5000);
    expect(staticActionSheet.isDisplayed()).toBeFalsy();
  });

  it('should have dynamic ons-action-sheet elements', () => {
    let dynamicActionSheet;

    expect(element.all(by.tagName('ons-action-sheet')).count()).toBe(1);
    element.all(by.tagName('ons-button')).get(1).click();
    dynamicActionSheet = element.all(by.tagName('ons-action-sheet')).get(1);
    browser.wait(EC.visibilityOf(dynamicActionSheet), 5000);
    expect(dynamicActionSheet.isDisplayed()).toBeTruthy();
  });

  it('should hide and destroy dynamic ons-action-sheet when the mask is clicked', () => {
    let dynamicActionSheet;

    expect(element.all(by.tagName('ons-action-sheet')).count()).toBe(1);
    element.all(by.tagName('ons-button')).get(1).click();
    dynamicActionSheet = element.all(by.tagName('ons-action-sheet')).get(1);
    browser.wait(EC.visibilityOf(dynamicActionSheet), 5000);

    element.all(by.css('.action-sheet-mask')).get(1).click();
    browser.wait(() => {
      return element.all(by.tagName('ons-action-sheet')).count().then((count) => {
        return count <= 1;
      });
    }, 5000);
    expect(element.all(by.tagName('ons-action-sheet')).count()).toBe(1);
  });
});
