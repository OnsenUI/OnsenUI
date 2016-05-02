'use strict';

describe('OnsSpeedDialItemElement', () => {
  let item;

  beforeEach(() => {
    item = new OnsSpeedDialItemElement();
    document.body.appendChild(item);
  });

  afterEach(() => {
    item.remove();
  });

  it('exists', () => {
    expect(window.OnsSpeedDialItemElement).to.be.ok;
  });

  it('provides modifier attribute', () => {
    item.setAttribute('modifier', 'hoge');
    expect(item.classList.contains('speed-dial__item--hoge')).to.be.true;

    item.setAttribute('modifier', ' foo bar');
    expect(item.classList.contains('speed-dial__item--foo')).to.be.true;
    expect(item.classList.contains('speed-dial__item--bar')).to.be.true;
    expect(item.classList.contains('speed-dial__item--hoge')).not.to.be.true;

    item.classList.add('speed-dial__item--piyo');
    item.setAttribute('modifier', 'fuga');
    expect(item.classList.contains('speed-dial__item--piyo')).to.be.true;
    expect(item.classList.contains('speed-dial__item--fuga')).to.be.true;
  });

  describe('#_onClick()', () => {
    it('should stop propagation', () => {
      const e = {
        stopPropagation: chai.spy()
      };

      item._onClick(e);
      expect(e.stopPropagation).to.have.been.called.once;
    });
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = '<ons-speed-dial-item>Content</ons-speed-dial-item>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });

  describe('autoStyling', () => {
    it('adds \'material\' effects on Android', () => {
      ons.platform.select('android');
      const e = document.createElement('ons-speed-dial-item');
      expect(e.hasAttribute('ripple')).to.be.true;
      expect(e.firstChild.tagName.toLowerCase()).to.equal('ons-ripple');
      ons.platform.select('');
    });
  });
});
