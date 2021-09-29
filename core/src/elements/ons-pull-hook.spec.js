'use strict';

describe('OnsPullHookElement', () => {
  it('exists', () => {
    expect(window.ons.elements.PullHook).to.be.ok;
  });

  let page, pullHook, event;

  beforeEach(() => {
    let n = 100;
    const items = [];

    while (n--) {
      items.push(`
        <ons-list-item>
          Item
        </ons-list-item>
      `);
    }

    page = ons._util.createElement(`
      <ons-page>
        <div class="background">
        </div>
        <div class="content">
          <ons-pull-hook>
            Pull to refresh
          </ons-pull-hook>
          <ons-list>
            ${items.join('')}
          </ons-list>
        </div>
      </ons-page>
    `);

    pullHook = page.querySelector('ons-pull-hook');

    event = {
      stopPropagation: () => null,
      gesture: {
        direction: 'down',
        interimDirection: 'down',
        deltaY: 10,
        preventDefault: () => null,
        center: {
          clientX: 20,
          clientY: 20
        }
      }
    };

    document.body.appendChild(page);
  });

  afterEach(() => {
    if (page) {
      page.remove();
    }

    if (pullHook) {
      pullHook.remove();
    }
    page = pullHook = null;
  });

  describe('#_onScroll()', () => {
    it('resets the scroll if negative', () => {
      // This test only works on browsers that support negative scroll.
      page.scrollTop = -100;
      pullHook._onScroll();
      expect(page.scrollTop).to.equal(0);
    });
  });

  describe('#_onDrag()', () => {
    it('does nothing if disabled', () => {
      const spy = chai.spy.on(pullHook, '_translateTo');

      pullHook.setAttribute('disabled', '');
      pullHook._onDrag(event);

      expect(spy).not.to.have.been.called();
    });

    it('translates the element', () => {
      const spy = chai.spy.on(pullHook, '_translateTo');

      // Need to initiate the dragging.
      pullHook._onDragStart(event);
      pullHook._onDrag(event);

      expect(spy).to.have.been.called.with(10);
    });

    it('translates the element when interimDirection is not \'down\'', () => {
      const spy = chai.spy.on(pullHook, '_translateTo');

      event.gesture.interimDirection = 'up';
      // Need to initiate the dragging.
      pullHook._onDragStart(event);
      pullHook._onDrag(event);

      expect(spy).to.have.been.called.with(10);
    });

    it('changes the state', () => {
      pullHook.setAttribute('height', 10);
      event.gesture.deltaY = 20;

      pullHook._onDragStart(event);
      pullHook._onDrag(event);

      expect(pullHook.getAttribute('state')).to.equal('preaction');
    });

    it('bounces back if pull distance is higher than threshold', () => {
      const spy = chai.spy.on(event.gesture, 'stopDetect');

      pullHook._onDragStart(event);
      event.gesture.deltaY = 200;
      pullHook._onDrag(event);

      expect(spy).to.have.been.called.once;
    });
  });

  describe('#_onDragStart()', () => {
    it('does nothing if the pull hook is disabled', () => {
      pullHook.setAttribute('disabled', '');
      pullHook._onDragStart(event);
      expect(pullHook._startScroll).to.be.an('undefined');
    });

    it('saves the current scroll', () => {
      pullHook._onDragStart(event);
      expect(pullHook._startScroll).to.equal(0);
    });
  });

  describe('#_onDragEnd()', () => {
    it('does nothing if the pull hook is disabled', () => {
      pullHook.setAttribute('disabled', '');
      expect(pullHook._onDragEnd(event)).to.be.an('undefined');
    });

    it('changes the state', () => {
      const spy = chai.spy.on(pullHook, '_setState');

      pullHook.setAttribute('height', 10);
      event.gesture.deltaY = 20;

      pullHook._onDragStart(event);
      pullHook._onDrag(event);
      pullHook._onDragEnd(event);

      expect(spy).to.have.been.called.with('action');
    });

    it('translates back', () => {
      const spy = chai.spy.on(pullHook, '_translateTo');

      pullHook._onDragStart(event);
      pullHook._onDrag(event);
      pullHook._onDragEnd(event);

      expect(spy).to.have.been.called.with(0, {animate: true});
    });
  });

  describe('#_finish()', () => {
    it('calls the onAction if it exists', () =>{
      const spy = chai.spy();
      pullHook.onAction = spy;
      pullHook._finish();
      expect(spy).to.have.been.called.once;
    });

    it('translates to the pull hook when called', () =>{
      const spy = chai.spy.on(pullHook, '_translateTo');
      pullHook.onAction = () => null;
      pullHook._finish();
      expect(spy).to.have.been.called.once;
    });

    it('changes the state', () =>{
      pullHook._finish();
      expect(pullHook.state).to.equal('initial');
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

  describe('#maxHeight', () => {
    it('is 96 by default', () => {
      expect(pullHook.maxHeight).to.equal(96);
    });

    it('changes the "max-height" attribute', () => {
      pullHook.maxHeight = 100;
      expect(pullHook.maxHeight).to.equal(100);
      expect(pullHook.getAttribute('max-height')).to.equal('100px');
    });
  });

  describe('#state', () => {
    it('returns the state', () => {
      pullHook.setAttribute('state', 'hoge');
      expect(pullHook.state).to.equal('hoge');
    });
  });

  describe('#pullDistance', () => {
    it('returns the current translation', () => {
      expect(pullHook.pullDistance).to.equal(0);
    });
  });

  describe('#disabled', () => {
    it('changes the "disabled" attribute', () => {
      expect(pullHook.hasAttribute('disabled')).to.be.false;
      pullHook.disabled = true;
      expect(pullHook.hasAttribute('disabled')).to.be.true;
    });
  });
});

