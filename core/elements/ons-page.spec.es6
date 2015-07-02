describe('ons-page', () => {
  it('provides \'OnsPageElement\' global variable', () => {
    expect(window.OnsPageElement).to.be.ok;
  });

  it('has page class', () => {
    var element = new OnsPageElement();
    expect(element.classList.contains('page')).to.be.true;
  });

  it('creates the element and fires \'init\' event', () => {
    var initPromise = new Promise(function(resolve, reject) {
      document.addEventListener('init', resolve);
    });
    var element = new OnsPageElement();
    document.body.appendChild(element);
    expect(element.parentNode).to.be.ok;
    return expect(initPromise).to.eventually.be.fulfilled;
  });

  it('destroys the element and fires \'destroy\' event', () => {
    var spy = chai.spy();
    document.addEventListener('destroy', spy);
    var element = new OnsPageElement();
    document.body.appendChild(element);
    element._destroy();
    expect(element.parentNode).not.to.be.ok;
    expect(spy).to.have.been.called.once;
  });
});

