describe('ons-splitter', () => {
  it('provides \'OnsSplitterElement\' global variable', () => {
    expect(window.OnsSplitterElement).to.be.ok;
  });

  let splitter;
  beforeEach(() => {
    splitter = ons._util.createElement(`
      <ons-splitter>
        <ons-splitter-side side="left">Left</ons-splitter-side>
        <ons-splitter-side side="right" collapse>Right</ons-splitter-side>
        <ons-splitter-content></ons-splitter-content>
      </ons-splitter>
    `);

    document.body.appendChild(splitter);
  });

  afterEach(() => {
    splitter.remove();
    splitter = null;
  });

  it('provides _hide(), _show(), _destroy() methods', () => {
    expect(splitter._hide instanceof Function).to.be.ok;
    expect(splitter._show instanceof Function).to.be.ok;
    expect(splitter._destroy instanceof Function).to.be.ok;
  });

  describe('#openRight()', () => {
    it('should open right ons-splitter-side', () => {
      expect(splitter.openRight()).to.be.equal(true);
      expect(splitter.openLeft()).to.be.equal(false);
      expect(splitter.isRightOpened()).to.be.equal(true);
    });
  });

  describe('#openLeft()', () => {
    it('should return false on "split" mode with ons-splitter-side element', () => {
      expect(splitter.openLeft()).to.be.equal(false);
    });
  });

  describe('#closeRight()', () => {
    it('should close right ons-splitter-side', (done) => {
      expect(splitter.isRightOpened()).to.be.equal(false);
      expect(splitter.closeRight()).to.be.equal(false);

      expect(splitter.openRight({callback: () => {
        expect(splitter.isRightOpened()).to.be.equal(true);
        expect(splitter.closeRight({callback: () => {
          expect(splitter.isRightOpened()).to.be.equal(false);
          done();
        }})).to.be.equal(true);
      }})).to.be.equal(true);
    });
  });

  describe('#closeLeft()', () => {
    it('should return false on "split" mode with ons-splitter-side element', () => {
      expect(splitter.openLeft()).to.be.equal(false);
    });
  });

  describe('#getDeviceBackButtonHandler()', () => {
    it('should return handler object', () => {
      expect(splitter.getDeviceBackButtonHandler()).to.be.an('object');
    });
  });
});
