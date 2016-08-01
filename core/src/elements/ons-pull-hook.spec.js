'use strict';

describe('OnsPullHookElement', () => {
  it('exists', () => {
    expect(window.OnsPullHookElement).to.be.ok;
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
        preventDefault: () => null
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

  describe('#_generateTranslationTransform()', () => {
    it('returns a string', () => {
      const transform = pullHook._generateTranslationTransform(100);
      expect(transform).to.be.a('string');
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
});

