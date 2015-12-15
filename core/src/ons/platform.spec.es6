'use strict';

describe('ons.platform', () => {
  afterEach(() => {
    ons.platform._renderPlatform = null;
  });

  it('exists', () => {
    expect(ons.platform).to.be.ok;
  });

  describe('#select()', () => {
    it('sets the render platform', () => {
      ons.platform.select('android');
      expect(ons.platform._renderPlatform).to.equal('android');
    });
  });

  describe('#isWebView()', () => {
    it('return false if platform is not a WebView', () => {
      expect(ons.platform.isWebView()).to.be.false;
    });
  });

  describe('#isIOS()', () => {
    it('returns false if platform is not IOS', () => {
      expect(ons.platform.isIOS()).to.be.false;
    });

    it('supports forcing the platform', () => {
      ons.platform.select('ios');
      expect(ons.platform.isIOS()).to.be.true;
    });
  });

  describe('#isAndroid()', () => {
    it('returns false if platform is not Android', () => {
      expect(ons.platform.isAndroid()).to.be.false;
    });

    it('supports forcing the platform', () => {
      ons.platform.select('android');
      expect(ons.platform.isAndroid()).to.be.true;
    });
  });

  describe('#isAndroidPhone()', () => {
    it('returns false if platform is not an Android Phone', () => {
      expect(ons.platform.isAndroidPhone()).to.be.false;
    });
  });

  describe('#isAndroidTablet()', () => {
    it('returns false if platform is not an Android Tablet', () => {
      expect(ons.platform.isAndroidTablet()).to.be.false;
    });
  });

  describe('#isWP()', () => {
    it('returns false if platform is not WP', () => {
      expect(ons.platform.isWP()).to.be.false;
    });

    it('supports forcing the platform', () => {
      ons.platform.select('wp');
      expect(ons.platform.isWP()).to.be.true;
    });
  });

  describe('#isIPhone()', () => {
    it('returns false if platform is iPhone', () => {
      expect(ons.platform.isIPhone()).to.be.false;
    });
  });

  describe('#isIPad()', () => {
    it('returns false if platform is iPad', () => {
      expect(ons.platform.isIPad()).to.be.false;
    });
  });

  describe('#isBlackBerry()', () => {
    it('returns false if platform is not BlackBerry', () => {
      expect(ons.platform.isBlackBerry()).to.be.false;
    });

    it('supports forcing the platform', () => {
      ons.platform.select('blackberry');
      expect(ons.platform.isBlackBerry()).to.be.true;
    });
  });

  describe('#isOpera()', () => {
    it('returns false if platform is not Opera', () => {
      expect(ons.platform.isOpera()).to.be.false;
    });

    it('supports forcing the platform', () => {
      ons.platform.select('opera');
      expect(ons.platform.isOpera()).to.be.true;
    });
  });

  describe('#isFirefox()', () => {
    it('returns false if platform is not Firefox', () => {
      expect(ons.platform.isFirefox()).to.be.false;
    });

    it('supports forcing the platform', () => {
      ons.platform.select('firefox');
      expect(ons.platform.isFirefox()).to.be.true;
    });
  });

  describe('#isSafari()', () => {
    it('returns false if platform is not Safari', () => {
      expect(ons.platform.isSafari()).to.be.false;
    });

    it('supports forcing the platform', () => {
      ons.platform.select('safari');
      expect(ons.platform.isSafari()).to.be.true;
    });
  });

  describe('#isChrome()', () => {
    it('returns true if platform is Chrome', () => {
      expect(ons.platform.isChrome()).to.be.true;
    });

    it('supports forcing the platform', () => {
      ons.platform.select('chrome');
      expect(ons.platform.isChrome()).to.be.true;
    });
  });

  describe('#isIE()', () => {
    it('returns false if platform is not IE', () => {
      expect(ons.platform.isIE()).to.be.false;
    });

    it('supports forcing the platform', () => {
      ons.platform.select('ie');
      expect(ons.platform.isIE()).to.be.true;
    });
  });

  describe('#isIOS7above()', () => {
    it('returns false if platform is not iOS 7 or above', () => {
      expect(ons.platform.isIOS7above()).to.be.false;
    });
  });
});
