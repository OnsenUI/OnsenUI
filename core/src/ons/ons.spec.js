'use strict';

describe('ons', () => {
  let template;

  beforeEach(() => {
    template = ons._util.createElement(`
      <ons-template id="page.html">
        <ons-page>
        </ons-page>
      </ons-template>
    `);
    document.body.appendChild(template);
  });

  afterEach(() => {
    template.remove();
    template = null;
  });

  it('should have defaultPageLoader property', () => {
    expect(!!ons.defaultPageLoader).to.be.true;
  });

  it('should have PageLoader property', () => {
    expect(!!ons.PageLoader).to.be.true;
  });

  describe('#disableAutoStatusBarFill()', () => {
    it('sets autoStatusBarFill to false', () => {
      const tmp = ons.isReady;
      ons.isReady = () => false;
      ons.disableAutoStatusBarFill();
      expect(ons._internal.config.autoStatusBarFill).to.be.false;
      ons.isReady = tmp;
    });

    it('throws an error if ons is ready', () => {
      expect(ons.isReady()).to.be.true;
      expect(() => ons.enableAutoStatusBarFill()).to.throw(Error);
    });
  });

  describe('#disableDeviceBackButtonHandler()', () => {
    it('disables the device back button', () => {
      ons.disableDeviceBackButtonHandler();
      expect(ons._deviceBackButtonDispatcher._isEnabled).to.be.false;
    });
  });

  describe('#enableDeviceBackButtonHandler()', () => {
    it('enables the device back button', () => {
      ons.enableDeviceBackButtonHandler();
      expect(ons._deviceBackButtonDispatcher._isEnabled).to.be.true;
    });
  });

  describe('#setDefaultDeviceBackButtonListener()', () => {
    it('changes the default callback', () => {
      const tmp = ons._defaultDeviceBackButtonHandler._callback;
      ons.setDefaultDeviceBackButtonListener(() => undefined);
      expect(tmp).not.to.equal(ons._defaultDeviceBackButtonHandler._callback);
      ons.setDefaultDeviceBackButtonListener(tmp);
    });
  });

  describe('#enableAutoStatusBarFill()', () => {
    it('sets autoStatusBarFill to true', () => {
      const tmp = ons.isReady;
      ons.isReady = () => false;
      ons.enableAutoStatusBarFill();
      expect(ons._internal.config.autoStatusBarFill).to.be.true;
      ons.isReady = tmp;
    });

    it('throws an error if ons is ready', () => {
      expect(ons.isReady()).to.be.true;
      expect(() => ons.disableAutoStatusBarFill()).to.throw(Error);
    });
  });

  describe('#enableAnimations()', () => {
    it('enables animations', () => {
      expect(ons._internal.config.animationsDisabled).to.be.true;
      ons.enableAnimations();
      expect(ons._internal.config.animationsDisabled).to.be.false;
      ons.disableAnimations();
      expect(ons._internal.config.animationsDisabled).to.be.true;
    });
  });

  describe('#preload()', () => {
    it('requests and caches new templates as fragments', () => {
      return ons.preload(['/base/test-template.html'])
        .then(result => {
          expect(result[0]).to.be.an.instanceof(DocumentFragment);
          expect(ons._internal.templateStore.get('/base/test-template.html')).to.be.ok;
          expect(result[0]).to.equal(ons._internal.templateStore.get('/base/test-template.html'));
        });
    });
  });

  describe('#createElement()', () => {
    it('throws error when no page is provided', () => {
      expect(() => ons.createElement(null)).to.throw(Error);
    });

    it('returns a valid element from a path', () => {
      return ons.createElement('page.html').then((element) => {
        expect(element).to.be.instanceof(window.ons.PageElement);
      });
    });

    it('returns a valid element from inline HTML without promise', () => {
      expect(ons.createElement('<ons-page></ons-page>')).to.be.instanceof(window.ons.PageElement);
    });

    it('does not attach by default', () => {
      return ons.createElement('page.html').then((element) => {
        expect(element.parentElement).not.to.be.ok;
      });
    });

    it('attaches when option.append is provided', () => {
      return ons.createElement('page.html', { append: true }).then((element1) => {
        expect(element1.parentElement).to.be.ok;
        expect(element1.parentElement).to.equal(document.body);
        return ons.createElement('page.html', { append: element1 }).then(element2 => {
          expect(element2.parentElement).to.equal(element1);
          element1.remove();
        })
      });
    });

    it('calls the linking function when appending', () => {
      const options = {
        link: chai.spy(),
        append: true
      };
      return ons.createElement('page.html', options).then((element) => {
        expect(options.link).to.have.been.called.once;
      });
    });
  });

  describe('#resolveLoadingPlaceholder()', () => {
    it('resolves the placeholder', () => {
      const e = document.createElement('div');
      e.setAttribute('ons-loading-placeholder', 'page.html');
      document.body.appendChild(e);
      ons.resolveLoadingPlaceholder();
      expect(e.getAttribute('ons-loading-placeholder')).to.equal('undefined');
      e.remove();
    });
  });

  describe('#_setupLoadingPlaceHolders()', () => {
    it('resolves the placeholder', () => {
      const e = document.createElement('div');
      e.setAttribute('ons-loading-placeholder', 'page.html');
      document.body.appendChild(e);
      var spy = chai.spy.on(ons, '_resolveLoadingPlaceholder');
      ons._setupLoadingPlaceHolders();
      expect(spy).to.have.been.called.with(e, 'page.html');
      e.remove();
    });
  });
});
