'use strict';

describe('OnsPullHookElement', () => {
  it('exists', () => {
    expect(window.OnsPullHookElement).to.be.ok;
  });

  let page, pullHook, event;

  beforeEach(() => {
    let n = 100,
      items = [];

    while (n--) {
      items.push(`
        <ons-list-item>
          Item
        </ons-list-item>
      `);
    }

    page = ons._util.createElement(`
      <ons-page>
        <ons-pull-hook>
          Pull to refresh
        </ons-pull-hook>
        <ons-list>
          ${items.join('')}
        </ons-list>
      </ons-page>
    `);

    pullHook = page.querySelector('ons-pull-hook');

    event = {
      stopPropagation: () => null,
      gesture: {
        direction: 'down',
        interimDirection: 'down',
        deltaY: 10,
        preventDefault: () => null
      }
    };

    document.body.appendChild(page);
  });

  afterEach(() => {
    page.remove();
    pullHook.remove();
    page = pullHook = null;
  });

  describe('#_createScrollElement()', () => {
    it('creates a scroll element', () => {
      let scrollElement = pullHook._createScrollElement();
      expect(scrollElement.classList.contains('scroll')).to.be.true;
    });
  });

  describe('#_onScroll()', () => {
    it('resets the scroll if negative', () => {
      // This test only works on browsers that support negative scroll.
      page.scrollTop = -100;
      pullHook._onScroll();
      expect(page.scrollTop).to.equal(0);
    });
  });

  describe('#_generateTranslationTransform()', () => {
    it('returns a string', () => {
      let transform = pullHook._generateTranslationTransform(100);
      expect(transform).to.be.a('string');
    });
  });

  describe('#_onDrag()', () => {
    it('does nothing if disabled', () => {
      let spy = chai.spy.on(pullHook, '_translateTo');

      pullHook.setAttribute('disabled', '');
      pullHook._onDrag();

      expect(spy).not.to.have.been.called();
    });

    it('does nothing if direction is horizontal', () => {
      let spy = chai.spy.on(pullHook, '_translateTo');

      pullHook._onDrag({
        gesture: {
          direction: 'left'
        }
      });

      expect(spy).not.to.have.been.called();
    });

    it('translates the element', () => {
      let spy = chai.spy.on(pullHook, '_translateTo');

      // Need to initiate the dragging.
      pullHook._onDragStart();
      pullHook._onDrag(event);

      expect(spy).to.have.been.called.with(10);
    });

    it('translates the element when interimDirection is not \'down\'', () => {
      let spy = chai.spy.on(pullHook, '_translateTo');

      event.gesture.interimDirection = 'up';
      // Need to initiate the dragging.
      pullHook._onDragStart();
      pullHook._onDrag(event);

      expect(spy).to.have.been.called.with(10);
    });

    it('changes the state', () => {
      pullHook.setAttribute('height', 10);
      event.gesture.deltaY = 20;

      pullHook._onDragStart();
      pullHook._onDrag(event);

      expect(pullHook.getAttribute('state')).to.equal('preaction');
    });

    it('bounces back if pull distance is higher than threshold', () => {
      let spy = chai.spy.on(event.gesture, 'stopDetect');

      pullHook._onDragStart();
      event.gesture.deltaY = 200;
      pullHook._onDrag(event);

      expect(spy).to.have.been.called.once;
    });
  });

  describe('#_onDragStart()', () => {
    it('does nothing if the pull hook is disabled', () => {
      pullHook.setAttribute('disabled', '');
      pullHook._onDragStart();
      expect(pullHook._startScroll).to.be.an('undefined');
    });

    it('saves the current scroll', () => {
      pullHook._onDragStart();
      expect(pullHook._startScroll).to.equal(0);
    });
  });

  describe('#_onDragEnd()', () => {
    it('does nothing if the pull hook is disabled', () => {
      pullHook.setAttribute('disabled', '');
      expect(pullHook._onDragEnd()).to.be.an('undefined');
    });

    it('changes the state', () => {
      let spy = chai.spy.on(pullHook, '_setState');

      pullHook.setAttribute('height', 10);
      event.gesture.deltaY = 20;

      pullHook._onDragStart();
      pullHook._onDrag(event);
      pullHook._onDragEnd();

      expect(spy).to.have.been.called.with('action');
    });

    it('translates back', () => {
      let spy = chai.spy.on(pullHook, '_translateTo');

      pullHook._onDragStart();
      pullHook._onDrag(event);
      pullHook._onDragEnd();

      expect(spy).to.have.been.called.with(0, {animate: true});
    });
  });

  describe('#setActionCallback()', () => {
    it('sets a callback', () => {
      let cb = () => null;

      pullHook.setActionCallback(cb);
      expect(pullHook._callback).to.equal(cb);
    });
  });

  describe('#_waitForAction()', () => {
    it('calls the argument', () => {
      let spy = chai.spy();
      pullHook._waitForAction(spy);
      expect(spy).to.have.been.called.once;
    });

    it('calls the callback if it exists', () =>{
      let spy = chai.spy();
      pullHook.setActionCallback(spy);
      pullHook._waitForAction(() => null);
      expect(spy).to.have.been.called.once;
    });
  });

  describe('#_onDone()', () => {
    it('translates the pull hook', () => {
      let spy = chai.spy.on(pullHook, '_translateTo');
      pullHook._onDone();
      expect(spy).to.have.been.called.once;
    });
  });

  describe('#height', () => {
    it('is 64 by default', () => {
      expect(pullHook.height).to.equal(64);
    });

    it('changes the "height" attribute', () => {
      pullHook.height = 100;
      expect(pullHook.height).to.equal(100);
      expect(pullHook.getAttribute('height')).to.equal('100px');
    });
  });

  describe('#thresholdHeight', () => {
    it('is 96 by default', () => {
      expect(pullHook.thresholdHeight).to.equal(96);
    });

    it('changes the "threshold-height" attribute', () => {
      pullHook.thresholdHeight = 100;
      expect(pullHook.thresholdHeight).to.equal(100);
      expect(pullHook.getAttribute('threshold-height')).to.equal('100px');
    });
  });

  describe('#_getState()', () => {
    it('returns the state', () => {
      pullHook.setAttribute('state', 'hoge');
      expect(pullHook._getState()).to.equal('hoge');
    });
  });

  describe('#state', () => {
    it('returns the state', () => {
      pullHook.setAttribute('state', 'hoge');
      expect(pullHook.state).to.equal('hoge');
    });
  });

  describe('#_getCurrentScroll()', () => {
    it('returns the current page scroll', () => {
      expect(pullHook._getCurrentScroll()).to.equal(page.scrollTop);
    });
  });

  describe('#getPullDistance()', () => {
    it('returns the current translation', () => {
      expect(pullHook.getPullDistance()).to.equal(0);
    });
  });

  describe('#disabled', () => {
    it('changes the "disabled" attribute', () => {
      expect(pullHook.hasAttribute('disabled')).to.be.false;
      pullHook.disabled = true;
      expect(pullHook.hasAttribute('disabled')).to.be.true;
    });
  });

  describe('#_isContentFixed()', () => {
    it('returns true if the pull hook is fixed', () => {
      pullHook.setAttribute('fixed-content', '');
      expect(pullHook._isContentFixed()).to.be.true;
    });

    it('returns false if the pull hook is not fixed', () => {
      expect(pullHook._isContentFixed()).to.be.false;
    });
  });

  describe('#_getScrollableElement()', () => {
    it('returns itself if content is fixed', () => {
      pullHook.setAttribute('fixed-content', '');
      expect(pullHook._getScrollableElement()).to.equal(pullHook);
    });

    it('returns another element if content is not fixed', () => {
      expect(pullHook._getScrollableElement()).not.to.equal(pullHook);
    });
  });

  describe('#_getMinimumScroll()', () => {
    it('returns an integer', () => {
      expect(pullHook._getMinimumScroll()).to.be.a('number');
    });
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      let div1 = document.createElement('div');
      let div2 = document.createElement('div');
      div1.innerHTML = '<ons-page><ons-pull-hook></ons-pull-hook></ons-page>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });
});

