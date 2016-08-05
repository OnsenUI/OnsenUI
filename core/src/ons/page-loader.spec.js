'use strict';

describe('page-loader', () => {
  it('should exist', () => {
    expect(window.ons.defaultPageLoader).to.be.ok;
    expect(window.ons.PageLoader).to.be.ok;
  });

  describe('ons.PageLoader', () => {
    it('can change internal implementation', () => {
      const loader = new ons.PageLoader();
      const load = function(page, parent, done) {};
      loader.internalLoader = load;
      expect(loader.internalLoader).to.be.equal(load);
    });
  });
});
