'use strict';

describe('ons-segment', () => {
  it('provides \'OnsSegmentElement\' global variable', () => {
    expect(window.ons.elements.Segment).to.be.ok;
  });

  describe('class attribute', () => {
    it('should contains "segment" class name automatically', () => {
      const element = new ons.elements.Segment();
      element.setAttribute('class', 'foobar');
      expect(element.classList.contains('segment')).to.be.true;
      expect(element.classList.contains('foobar')).to.be.true;
    });
  });

  it('provides modifier attribute', () => {
    var element = new ons.elements.Segment();
    element.setAttribute('modifier', 'hoge');
    expect(element.classList.contains('segment--hoge')).to.be.true;

    element.setAttribute('modifier', 'foo bar');
    expect(element.classList.contains('segment--foo')).to.be.true;
    expect(element.classList.contains('segment--bar')).to.be.true;
    expect(element.classList.contains('segment--hoge')).not.to.be.true;

    element.classList.add('segment--piyo');
    element.setAttribute('modifier', 'fuga');
    expect(element.classList.contains('segment--piyo')).to.be.true;
    expect(element.classList.contains('segment--fuga')).to.be.true;
  });

  it('fires \'postchange\' event', () => {
    const segment = ons.createElement(`
      <ons-segment active-index="0">
        <button>Label 1</button>
        <button>Label 2</button>
      </ons-segment>
    `);

    const promise = new Promise(resolve => {
      segment.addEventListener('postchange', resolve);
    });

    segment.setActiveButton(1);
    return expect(promise).to.be.eventually.fulfilled;
  });

  it('calls tabbar methods if provided', () => {
    const segment = ons.createElement(`
      <ons-segment>
        <button>Label 1</button>
        <button>Label 2</button>
        <button>Label 3</button>
      </ons-segment>
    `);

    const spy = chai.spy();
    segment._tabbar = { setActiveTab: spy, removeEventListener: (() => {}) };
    document.body.appendChild(segment);

    segment.setActiveButton(1);
    segment.querySelectorAll('input')[2].click();

    expect(spy).to.be.have.been.called.twice;
    segment.remove();
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = `
        <ons-segment>
          <button>Label 1</button>
          <button>Label 2</button>
          <button>Label 3</button>
        </ons-segment>
      `;
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });
});
