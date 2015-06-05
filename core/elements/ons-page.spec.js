
describe('ons-page', function() {
  it('provide \'OnsPageElement\' global variable', function() {
    expect(window.OnsPageElement).to.be.ok;
  });

  it('has page class', function() {
    var element = new OnsPageElement();
    expect(element.classList.contains('page')).to.be.true;
  });

  it('creates the element and fires \'init\' event', function() {
    var spy = chai.spy();
    document.addEventListener('init', spy);
    var element = new OnsPageElement();
    document.body.appendChild(element);
    expect(element.parentNode).to.be.ok;
    expect(spy).to.have.been.called.once;
  });

  it('destroys the element and fires \'destroy\' event', function() {
    var spy = chai.spy();
    document.addEventListener('destroy', spy);
    var element = new OnsPageElement();
    document.body.appendChild(element);
    element._destroy();
    expect(element.parentNode).to.not.be.ok;
    expect(spy).to.have.been.called.once;
  });

  it('hides the element and fires \'hide\' event', function() {
    var spy = chai.spy();
    document.addEventListener('hide', spy);
    var element = new OnsPageElement();
    document.body.appendChild(element)
    element._hide();
    expect(element.style.display).to.equal('none');
    expect(spy).to.have.been.called.once;
  });

  it('shows the element and fires \'show\' event', function() {
    var spy = chai.spy();
    document.addEventListener('show', spy);
    var element = new OnsPageElement();
    document.body.appendChild(element)
    element._show();
    expect(element.style.display).to.equal('block');
    expect(spy).to.have.been.called.once;
  });
});

