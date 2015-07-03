describe('ons-list-item', () => {
  it('provides \'OnsItemListElement\' global variable', () => {
    expect(window.OnsListItemElement).to.be.ok;
  });

  it('classList contains \'list__item\' by default', () => {
  	var element = new OnsListItemElement();
  	expect(element.classList.contains('list__item')).to.be.true;
  });

  it('provides modifier attribute', () => {
    var element = new OnsListItemElement();
    element.setAttribute('modifier', 'hoge');
    expect(element.classList.contains('list__item--hoge')).to.be.true;

    element.setAttribute('modifier', ' foo bar');
    expect(element.classList.contains('list__item--foo')).to.be.true;
    expect(element.classList.contains('list__item--bar')).to.be.true;
    expect(element.classList.contains('list__item--hoge')).not.to.be.true;

    element.classList.add('list__item--piyo');
    element.setAttribute('modifier', 'fuga');
    expect(element.classList.contains('list__item--piyo')).to.be.true;
    expect(element.classList.contains('list__item--fuga')).to.be.true;
  });
});
