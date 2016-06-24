'use strict';

describe('page-loader', () => {
  const contentReady = ons._pageLoader;

  it('should exist', () => {
    expect(window.ons._defaultPageLoader).to.be.ok;
    expect(window.ons.PageLoader).to.be.ok;
  });

  it('should work normally', () => {
  });
});
