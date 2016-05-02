'use strict';

describe('ons-if', () => {
  it('provides \'OnsConditionalElement\' global variable', () => {
    expect(window.OnsConditionalElement).to.be.ok;
  });

  it('doesn\'t have any children', () => {
    var element = new OnsConditionalElement();
    expect(element.hasChildNodes()).not.to.be.true;
  });

  it('filters depending on \'platform\' attribute', () => {
    ons.platform.select('android');
    let element = ons._util.createElement('<ons-if platform="android">Content</ons-if>');
    expect(element.hasChildNodes()).to.be.true;
    ons.platform._renderPlatform = null;
    element = ons._util.createElement('<ons-if platform="android">Content</ons-if>');
    expect(element.hasChildNodes()).not.to.be.true;
  });

  it('filters depending on \'orientation\' attribute', (done) => {
    const originalIsPortrait = ons.orientation._isPortrait;
    let isPortrait = true;
    ons.orientation._isPortrait = () => isPortrait;

    const element = ons._util.createElement('<ons-if orientation="landscape">Content</ons-if>');
    document.body.appendChild(element);

    expect(element.style.display).to.equal('none');

    isPortrait = false;
    ons.orientation.emit('change');

    setImmediate(() => {
      expect(element.style.display).to.equal('');

      ons.orientation._isPortrait = originalIsPortrait;
      element.remove();

      done();
    });
  });
});
