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
});
