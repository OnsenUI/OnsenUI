describe('ons-list-header', () => {
  it('provides \'OnsHeaderListElement\' global variable', () => {
    expect(window.OnsListHeaderElement).to.be.ok;
  });

  it('classList contains \'list__header\' by default', () => {
  	var element = new OnsListHeaderElement();
  	expect(element.classList.contains('list__header')).to.be.true;
  });

  it('provides modifier attribute', () => {
    var element = new OnsListHeaderElement();
    element.setAttribute('modifier', 'hoge');
    expect(element.classList.contains('list__header--hoge')).to.be.true;

    element.setAttribute('modifier', ' foo bar');
    expect(element.classList.contains('list__header--foo')).to.be.true;
    expect(element.classList.contains('list__header--bar')).to.be.true;
    expect(element.classList.contains('list__header--hoge')).not.to.be.true;

    element.classList.add('list__header--piyo');
    element.setAttribute('modifier', 'fuga');
    expect(element.classList.contains('list__header--piyo')).to.be.true;
    expect(element.classList.contains('list__header--fuga')).to.be.true;
  });
});
