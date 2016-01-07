'use strict';

describe('ons-button', () => {
  it('provides \'OnsButtonElement\' global variable', () => {
    expect(window.OnsButtonElement).to.be.ok;
  });

  it('provides modifier attribute', () => {
    var element = new OnsButtonElement();
    element.setAttribute('modifier', 'hoge');
    expect(element.classList.contains('button--hoge')).to.be.true;

    element.setAttribute('modifier', ' foo bar');
    expect(element.classList.contains('button--foo')).to.be.true;
    expect(element.classList.contains('button--bar')).to.be.true;
    expect(element.classList.contains('button--hoge')).not.to.be.true;

    element.classList.add('button--piyo');
    element.setAttribute('modifier', 'fuga');
    expect(element.classList.contains('button--piyo')).to.be.true;
    expect(element.classList.contains('button--fuga')).to.be.true;
  });
});

