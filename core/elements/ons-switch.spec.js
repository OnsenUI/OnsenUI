describe('ons-switch', function() {
  it('provides \'OnsSwitchElement\' global variable', function() {
    expect(window.OnsSwitchElement).to.be.ok;
  });

  it('classList contains \'switch\' by default', function() {
  	var element = new OnsSwitchElement();
  	expect(element.classList.contains('switch')).to.be.true;
  });

  it('has a \'input\' child by default', function() {
  	var element = new OnsSwitchElement();
  	expect(element.children[0].classList.contains('switch__input')).to.be.true;
  });

  it('has a \'div\' child by default', function() {
  	var element = new OnsSwitchElement();
  	expect(element.children[1].classList.contains('switch__toggle')).to.be.true;
  });

  it('provides a ', function(done) {
  	var element = new OnsSwitchElement();
  	//console.log(element);
  	//var target = document.querySelector('#some-id');

	// create an observer instance
	var observer = new MutationObserver(function(mutations) {
	    mutations.forEach(function(mutation) {
	    	//expect((element).hasAttribute('checked')).to.be.true;
	        console.log(mutation.type);
	    });
	});
	// configuration of the observer:
	var config = { attributes: true, childList: true, characterData: true }
	// pass in the target node, as well as the observer options
	observer.observe(document.body, config);

  document.body.appendChild(element);
  console.log(document.body);

	element.checked = true;
  console.log(element.checked);
	// later, you can stop observing
	observer.disconnect();
  	//expect((element).hasAttribute('checked')).to.be.true;
  	//expect(element).to.have.property('disabled');
  });
});