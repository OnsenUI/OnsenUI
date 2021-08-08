'use strict';

describe('OnsColElement', () => {
  it('should exist', () => {
    expect(window.ons.elements.Col).to.be.ok;
  });

  describe('#createdCallback()', () => {
    it('provides \'width\' attribute', () => {
      var element = ons._util.createElement('<ons-col width="100px"></ons-col>');

      if ('flex' in element.style) {
        expect(element.style.flex).to.equal('0 0 100px');
      } else if ('webkitFlex' in element.style) {
        expect(element.style.webkitFlex).to.equal('0 0 100px');
      } else if ('mozFlex' in element.style) {
        expect(element.style.mozFlex).to.equal('0 0 100px');
      } else if ('msFlex' in element.style) {
        expect(element.style.msFlex).to.equal('0 0 100px');
      }

      expect(element.style.maxWidth ).to.equal('100px');
    });
  });

  describe('#attributeChangedCallback()', () => {
    it('provides \'width\' attribute', () => {
      var element = new ons.elements.Col();
      element.setAttribute('width', '100px');

      if ('flex' in element.style) {
        expect(element.style.flex).to.equal('0 0 100px');
      } else if ('webkitFlex' in element.style) {
        expect(element.style.webkitFlex).to.equal('0 0 100px');
      } else if ('mozFlex' in element.style) {
        expect(element.style.mozFlex).to.equal('0 0 100px');
      } else if ('msFlex' in element.style) {
        expect(element.style.msFlex).to.equal('0 0 100px');
      }

      expect(element.style.maxWidth ).to.equal('100px');
    });
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = '<ons-col width="50px"></ons-col>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });
});

