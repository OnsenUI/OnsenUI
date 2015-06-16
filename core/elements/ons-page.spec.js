
describe('ons-page', function() {
  it('provide \'OnsPageElement\' global variable', function() {
    expect(window.OnsPageElement).to.be.ok;
  });

  it('has page class', function() {
    var element = new OnsPageElement();
    expect(element.classList.contains('page')).to.be.true;
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

  it('creates the element and fires \'init\' event', function(done) {
    var spy = chai.spy(function() {
      expect(spy).to.have.been.called.once;
      done();
    });
    document.addEventListener('init', spy);
    var element = new OnsPageElement();
    document.body.appendChild(element);
    expect(element.parentNode).to.be.ok;
  });
});

