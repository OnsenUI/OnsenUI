describe('ons-list', () => {
  it('provides \'OnsListElement\' global variable', () => {
    expect(window.OnsListElement).to.be.ok;
  });

  it('classList contains \'list\' by default', () => {
    var element = new OnsListElement();
    expect(element.classList.contains('list')).to.be.true;
  });

  it('provides modifier attribute', () => {
    var element = new OnsListElement();
    element.setAttribute('modifier', 'hoge');
    expect(element.classList.contains('list--hoge')).to.be.true;

    element.setAttribute('modifier', ' foo bar');
    expect(element.classList.contains('list--foo')).to.be.true;
    expect(element.classList.contains('list--bar')).to.be.true;
    expect(element.classList.contains('list--hoge')).not.to.be.true;

    element.classList.add('list--piyo');
    element.setAttribute('modifier', 'fuga');
    expect(element.classList.contains('list--piyo')).to.be.true;
    expect(element.classList.contains('list--fuga')).to.be.true;
  });
});
