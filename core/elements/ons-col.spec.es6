describe('OnsColElement', () => {
  it('should exist', () => {
    expect(window.OnsColElement).to.be.ok;
  });

  describe('#createdCallback()', () => {
    it('provides \'width\' attribute', () => {
      var element = ons._util.createElement('<ons-col width="100px"></ons-col>');

      expect(element.style.webkitBoxFlex).to.equal('0');
      expect(element.style.webkitFlex).to.equal('0 0 100px');
      if ('mozBoxFlex' in element.style) {
        expect(element.style.mozBoxFlex).to.equal('0');
      }
      if ('mozFlex' in element.style) {
        expect(element.style.mozFlex).to.equal('0 0 100px');
      }
      if ('msFlex' in element.style) {
        expect(element.style.msFlex).to.equal('0 0 100px');
      }
      expect(element.style.flex).to.equal('0 0 100px');
      expect(element.style.maxWidth ).to.equal('100px');
    });
  });

  describe('#attributeChangedCallback()', () => {
    it('provides \'width\' attribute', () => {
      var element = new OnsColElement();
      element.setAttribute('width', '100px');

      expect(element.style.webkitBoxFlex).to.equal('0');
      expect(element.style.webkitFlex).to.equal('0 0 100px');
      if ('mozBoxFlex' in element.style) {
        expect(element.style.mozBoxFlex).to.equal('0');
      }
      if ('mozFlex' in element.style) {
        expect(element.style.mozFlex).to.equal('0 0 100px');
      }
      if ('msFlex' in element.style) {
        expect(element.style.msFlex).to.equal('0 0 100px');
      }
      expect(element.style.flex).to.equal('0 0 100px');
      expect(element.style.maxWidth ).to.equal('100px');
    });
  });
});

