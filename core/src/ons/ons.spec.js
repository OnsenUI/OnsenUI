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

  describe('#createPopover()', () => {
    it('throws error when no page is provided', () => {
      expect(() => ons.createPopover(null)).to.throw(Error);
    });

    it('calls the linking function', (done) => {
      const options = {};
      options.link = () => { return; };
      var spy = chai.spy.on(options, 'link');
      ons.createPopover('page.html', options).then((element) => {
        expect(spy).to.have.been.called.once;
        element.remove();
        done();
      });
    });

    it('returns a valid popover element', (done) => {
      ons.createPopover('page.html').then((element) => {
        expect(element).to.be.instanceof(OnsPopoverElement);
        element.remove();
        done();
      });
    });
  });

  describe('#createDialog()', () => {
    it('throws error when no page is provided', () => {
      expect(() => ons.createDialog(null)).to.throw(Error);
    });

    it('calls the linking function', (done) => {
      const options = {};
      options.link = () => { return; };
      var spy = chai.spy.on(options, 'link');
      ons.createDialog('page.html', options).then((element) => {
        expect(spy).to.have.been.called.once;
        element.remove();
        done();
      });
    });

    it('returns a valid dialog element', (done) => {
      ons.createDialog('page.html').then((element) => {
        expect(element).to.be.instanceof(OnsDialogElement);
        element.remove();
        done();
      });
    });
  });

  describe('#createAlertDialog()', () => {
    it('throws error when no page is provided', () => {
      expect(() => ons.createAlertDialog(null)).to.throw(Error);
    });

    it('calls the linking function', (done) => {
      const options = {};
      options.link = () => { return; };
      var spy = chai.spy.on(options, 'link');
      ons.createAlertDialog('page.html', options).then((element) => {
        expect(spy).to.have.been.called.once;
        element.remove();
        done();
      });
    });

    it('returns a valid alertDialog element', (done) => {
      ons.createAlertDialog('page.html').then((element) => {
        expect(element).to.be.instanceof(OnsAlertDialogElement);
        element.remove();
        done();
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
