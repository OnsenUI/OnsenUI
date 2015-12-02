'use strict';

describe('OnsIconElement', () => {
  it('should exist', () => {
    expect(window.OnsIconElement).to.be.ok;
  });

  it('provides \'icon\' attribute', () => {
    var element = new OnsIconElement();
    element.setAttribute('icon', 'ion-navicon');
    expect(element.classList.contains('ion-navicon')).to.be.true;

    element.setAttribute('icon', 'fa-twitter');
    expect(element.classList.contains('fa-twitter')).to.be.true;
    expect(element.classList.contains('ion-navicon')).not.to.be.true;

    element.setAttribute('icon', 'i-dont-exist');
    expect(element.classList.contains('i-dont-exist')).not.to.be.true;
    expect(element.classList.contains('fa-twitter')).not.to.be.true;

    element.setAttribute('icon', 'md-face');
    expect(element.classList.contains('zmdi-face')).to.be.true;
    expect(element.classList.contains('zmdi')).to.be.true;

    element.setAttribute('icon', 'ion-navicon');
    expect(element.classList.contains('zmdi-face')).not.to.be.true;
    expect(element.classList.contains('zmdi')).not.to.be.true;
  });

  it('provides \'size\' attribute', () => {
    var element = new OnsIconElement();
    element.setAttribute('size', '10px');
    expect(element.style.fontSize).to.equal('10px');

    element.setAttribute('size', '20%');
    expect(element.style.fontSize).to.equal('20%');
    expect(element.style.fontSize).not.to.equal('10px');

    element.setAttribute('size', 'lg');
    expect(element.style.fontSize).not.be.ok;
    expect(element.classList.contains('fa-lg')).to.be.true;

    element.setAttribute('size', '5x');
    expect(element.style.fontSize).not.be.ok;
    expect(element.classList.contains('fa-5x')).to.be.true;
    expect(element.classList.contains('fa-lg')).not.to.be.true;

    element.setAttribute('size', '6x');
    expect(element.classList.contains('fa-6x')).not.to.be.true;
    expect(element.classList.contains('fa-5x')).not.to.be.true;
  });
});
