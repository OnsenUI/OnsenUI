
describe('ons-button', function() {
  it('provide \'OnsButtonElement\' global variable', function() {
    expect(!!window.OnsButtonElement).to.be.true;
  });

  it('provides modifier attribute', function() {
    var element = new OnsButtonElement();
    element.setAttribute('modifier', 'hoge');
    expect(element.classList.contains('button--hoge')).to.be.true;

    element.setAttribute('modifier', ' foo bar');
    expect(element.classList.contains('button--foo')).to.be.true;
    expect(element.classList.contains('button--bar')).to.be.true;
    expect(element.classList.contains('button--hoge')).to.not.be.true;

    element.classList.add('button--piyo');
    element.setAttribute('modifier', 'fuga');
    expect(element.classList.contains('button--piyo')).to.be.true;
    expect(element.classList.contains('button--fuga')).to.be.true;
  });
});

