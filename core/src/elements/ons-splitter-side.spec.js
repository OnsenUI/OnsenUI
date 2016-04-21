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

  describe('#load()', () => {
    let template;

    beforeEach(() => {
      template = ons._util.createElement(`<ons-template id="hoge.html">hoge</ons-template>`);
      document.body.appendChild(template);
    });

    afterEach(() => {
      template.remove();
      template = null;
    });

    it('returns a promise that resolves to the new page element', () => {
      return expect(left.load('hoge.html')).to.eventually.be.fulfilled.then(page => {
        expect(page).to.equal(left.firstChild);
        expect(left.getElementsByClassName('page__content')[0].innerHTML).to.equal('hoge');
      });
    });
  });

  describe('#open()', () => {
    it('should open ons-splitter-side', () => {
      return expect(right.open()).to.eventually.be.fulfilled.then(element => {
        expect(element).to.equal(right);
        return expect(left.open()).to.eventually.be.fulfilled.then(element => expect(element).not.to.be.ok);
      });
    });
  });

  describe('#close()', () => {
    it('should close ons-splitter-side', () => {
      return right.open().then(() => {
        return expect(right.close()).to.eventually.be.fulfilled.then(element => {
          expect(element).to.equal(right);
          return expect(left.close()).to.eventually.be.fulfilled.then(element => expect(element).not.to.be.ok);
        });
      });
    });
  });

  describe('#isOpen', () => {
    it('should return boolean', (done) => {
      expect(right.isOpen).to.be.false;
      expect(left.isOpen).to.be.false;
      right.open({callback: () => {
        expect(right.isOpen).to.be.true;
        done();
      }});
    });
  });

  describe('#toggle()', () => {
    it('toggle open or close state', (done) => {
      expect(right.isOpen).to.be.false;
      right.toggle({callback: () => {
        expect(right.isOpen).to.be.true;
        done();
      }});
    });
  });

  describe('#handleGesture()', () => {
    const shouldIgnore = (gesture, value) => {
      gesture.center = gesture.center || {};
      right._boundHandleGesture({type: 'dragstart', gesture});
      expect(!!right._collapseMode._ignoreDrag).to.equal(value);
    };

    it('should ignore scrolling', () => {
      shouldIgnore({direction: 'up'}, true);
      shouldIgnore({direction: 'left'}, false);
      shouldIgnore({direction: 'down'}, true);
    });

    it('should ignore drags outside the target area', () => {
      const w = window.innerWidth;
      shouldIgnore({direction: 'left'}, false);
      shouldIgnore({direction: 'right', center: {clientX: 10}}, false);
      right._swipeTargetWidth = 30;
      shouldIgnore({direction: 'left', center: {clientX: w - 10}}, false);
      shouldIgnore({direction: 'right', center: {clientX: w - 40}}, true);
      right._side = 'left';
      shouldIgnore({direction: 'right', center: {clientX: 10}}, false);
      shouldIgnore({direction: 'left', center: {clientX: 40}}, true);
    });
  });
});

