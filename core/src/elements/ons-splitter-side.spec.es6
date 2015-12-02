'use strict';

describe('OnsSplitterSideElement', () => {
  it('exists', () => {
    expect(window.OnsSplitterSideElement).to.be.ok;
  });

  let splitter, left, right;
  beforeEach(() => {
    splitter = ons._util.createElement(`
      <ons-splitter>
        <ons-splitter-side side="left" width="90px">Left</ons-splitter-side>
        <ons-splitter-side side="right" collapse width="90px" swipeable>Right</ons-splitter-side>
        <ons-splitter-content></ons-splitter-content>
      </ons-splitter>
    `);
    left = splitter.querySelector('ons-splitter-side[side="left"]');
    right = splitter.querySelector('ons-splitter-side[side="right"]');

    document.body.appendChild(splitter);
  });

  afterEach(() => {
    splitter.remove();
    splitter = left = right = null;
  });

  it('provides _hide(), _show(), _destroy() methods', () => {
    expect(left._hide instanceof Function).to.be.ok;
    expect(left._show instanceof Function).to.be.ok;
    expect(left._destroy instanceof Function).to.be.ok;
  });

  describe('#open()', () => {
    it('should open ons-splitter-side', () => {
      expect(right.open()).to.be.true;
      expect(left.open()).to.be.false;
    });
  });

  describe('#close()', () => {
    it('should close ons-splitter-side', (done) => {
      expect(left.close()).to.be.false;
      right.open({callback: () => {
        right.close({callback: () => {
          done();
        }});
      }});
    });
  });

  describe('#isOpened()', () => {
    it('should return boolean', (done) => {
      expect(right.isOpened()).to.be.false;
      expect(left.isOpened()).to.be.false;
      right.open({callback: () => {
        expect(right.isOpened()).to.be.true;
        done();
      }});
    });
  });

  describe('#toggle()', () => {
    it('toggle open or close state', (done) => {
      expect(right.isOpened()).to.be.false;
      right.toggle({callback: () => {
        expect(right.isOpened()).to.be.true;
        done();
      }});
    });
  });

  describe('#getCurrentMode()', () => {
    it('should return current mode', () => {
      expect(right.getCurrentMode()).to.be.equal('collapse');
      expect(left.getCurrentMode()).to.be.equal('split');
      right.removeAttribute('collapse');
      expect(right.getCurrentMode()).to.be.equal('split');
    });
  });
});

