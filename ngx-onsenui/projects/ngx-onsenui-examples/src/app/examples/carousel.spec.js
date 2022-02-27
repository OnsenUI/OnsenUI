const EC = protractor.ExpectedConditions;

describe('carousel.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/carousel.html');
  });

  it('should have ons-carousel elements', () => {
    expect($('ons-carousel').isPresent()).toBeTruthy();
  });

  it('should show the next slide when "Next" button is clicked', () => {
    expect($('#slide-1').isDisplayed()).toBeTruthy();

    /**
     * Click twice since first slide might not
     * be entirely invisible after one click.
     */
    $('#next').click();
    $('#next').click();
    browser.wait(EC.invisibilityOf($('#slide-1')), 5000);
    expect($('#slide-1').isDisplayed()).not.toBeTruthy();
  });

  it('should show the previous slide when "Prev" button is clicked', () => {
    $('#next').click();
    $('#next').click();
    browser.wait(EC.invisibilityOf($('#slide-1')), 5000);
    expect($('#slide-1').isDisplayed()).not.toBeTruthy();

    $('#prev').click();
    $('#prev').click();
    browser.wait(EC.visibilityOf($('#slide-1')), 5000);
    expect($('#slide-1').isDisplayed()).toBeTruthy();
  });
});
