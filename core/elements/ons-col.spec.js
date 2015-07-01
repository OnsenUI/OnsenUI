
describe('ons-col', function() {
  it('provide \'OnsColElement\' global variable', function() {
    expect(window.OnsColElement).to.be.ok;
  });

  it('provides width attribute', function() {
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

