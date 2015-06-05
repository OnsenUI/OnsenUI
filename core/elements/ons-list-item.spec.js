describe('ons-list-item', function() {
  it('provides \'OnsItemListElement\' global variable', function() {
    expect(window.OnsListItemElement).to.be.ok;
  });

  it('classList contains \'list__item\' by default', function() {
  	var element = new OnsListItemElement();
  	expect(element.classList.contains('list__item')).to.be.true;
  });

  it('provides modifier attribute', function() {
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
