'use strict';

describe('OnsIconElement', () => {
  it('should exist', () => {
    expect(window.OnsIconElement).to.be.ok;
  });

  describe('icon attribute', () => {
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

    it('supports a second icon depending on modifiers', () => {
      var element = new OnsIconElement();
      element.setAttribute('icon', 'ion-navicon, material:md-face');
      expect(element.classList.contains('ion-navicon')).to.be.true;
      expect(element.classList.contains('zmdi-face')).not.to.be.true;

      ons.platform.select('android');
      element = new OnsIconElement();
      element.setAttribute('icon', 'ion-navicon, material:md-face');
      expect(element.classList.contains('ion-navicon')).not.to.be.true;
      expect(element.classList.contains('zmdi-face')).to.be.true;
      ons.platform.select('');
    });
  });

  describe('size attribute', () => {
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

    it('supports a second size depending on modifiers', () => {
      var element = new OnsIconElement();
      element.setAttribute('size', '20px, material:30px');
      expect(element.style.fontSize).to.equal('20px');

      ons.platform.select('android');
      element = new OnsIconElement();
      element.setAttribute('size', '20px, material:30px');
      expect(element.style.fontSize).to.equal('30px');
      ons.platform.select('');
    });
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = '<ons-icon icon="fa-twitter" size="10px"></ons-icon>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });
});
