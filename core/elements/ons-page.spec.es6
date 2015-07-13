describe('ons-page', () => {
  it('exists', () => {
    expect(window.OnsPageElement).to.be.ok;
  });

  it('has page class', () => {
    var element = new OnsPageElement();
    expect(element.classList.contains('page')).to.be.true;
  });

  describe('#attachedCallback()', () => {
	  it('fires \'init\' event', () => {
	    var initPromise = new Promise(function(resolve, reject) {
	      document.addEventListener('init', resolve);
	    });
	    var element = new OnsPageElement();
	    document.body.appendChild(element);
	    expect(element.parentNode).to.be.ok;
	    return expect(initPromise).to.eventually.be.fulfilled;
	  });
	});

  describe('#detachedCallback', () => {
	  it('fires \'destroy\' event', () => {
	    var spy = chai.spy();
	    document.addEventListener('destroy', spy);
	    var element = new OnsPageElement();
	    document.body.appendChild(element);
	    element._destroy();
	    expect(element.parentNode).not.to.be.ok;
	    expect(spy).to.have.been.called.once;
	  });
	});

	describe('#setDeviceBackButtonHandler()', () => {
	  var element = new OnsPageElement();

	  it('sets the callback', () => {
	  	expect(element._deviceBackButtonHandler).not.to.be.ok;
	  	element.setDeviceBackButtonHandler(() => { return; });
	  	expect(element._deviceBackButtonHandler).to.be.ok;
	  });

	  it('overwrites the callback', () => {
	    var spy = chai.spy.on(element._deviceBackButtonHandler, 'destroy');
	  	element.setDeviceBackButtonHandler(() => { return; });
	  	expect(spy).to.have.been.called.once;
	  	expect(element._deviceBackButtonHandler).to.be.ok;
	  });

	  it('is correctly deleted', () => {
			element._destroy();
	    expect(element.parentNode).not.to.be.ok;
	  });
	});

	describe('#_getBackgroundElement()', () => {
	  var element = new OnsPageElement();

	  it('gets page__background', () => {
	  	expect(() => element._getBackgroundElement()).not.to.throw(Error);
	  });

	  it('throws page__background error', () => {
	  	element.removeChild(element.getElementsByClassName('page__background')[0]);
	  	expect(() => element._getBackgroundElement()).to.throw(Error);
	  });
	});

	describe('#_getContentElement()', () => {
	  it('throws page__content error', () => {
	  	var element = new OnsPageElement();
	  	element.removeChild(element.getElementsByClassName('page__content')[0]);
	  	expect(() => element._getContentElement()).to.throw(Error);
	  });
	});

	describe('#_hasToolbarElement()', () => {
	  it('returns if a toolbar exists', () => {
	  	var element = new OnsPageElement();
	  	expect(element._hasToolbarElement()).to.be.false;
	  	element._registerToolbar(new OnsToolbarElement());
	  	expect(element._hasToolbarElement()).to.be.true;
	  });
	});

	describe('#_canAnimateToolbar()', () => {
	  it('works with normal toolbar', () => {
	  	var element = new OnsPageElement();
	  	expect(element._canAnimateToolbar()).to.be.false;
	  	element._registerToolbar(new OnsToolbarElement());
	  	expect(element._canAnimateToolbar()).to.be.true;
	  });

	  it('works with toolbar in page__content', () => {
	  	var element = new OnsPageElement();
	  	expect(element._canAnimateToolbar()).to.be.false;
	  	element.lastChild.appendChild(new OnsToolbarElement());
	  	expect(element._canAnimateToolbar()).to.be.true;
	  });
	});

	describe('#_getToolbarElement()', () => {
	  it('returns the toolbar element', () => {
	  	var element = new OnsPageElement();
	  	element._registerToolbar(new OnsToolbarElement());
	  	expect(element._getToolbarElement()).to.be.ok;
	  });
	});

	describe('#_registerToolbar()', () => {
	  it('inserts toolbar as a child', () => {
	  	var element = new OnsPageElement();
			var spy = chai.spy.on(element, 'insertBefore');
			var toolbarElement = new OnsToolbarElement();
	  	element._registerToolbar(toolbarElement);
	  	expect(spy).to.have.been.called.with(toolbarElement, element.children[0]);
	  });

	  it('inserts toolbar as a child after status-bar-fill', () => {
	  	var element = new OnsPageElement();
			var fill = document.createElement('div');
			fill.classList.add('page__status-bar-fill');
			element.insertBefore(fill, element.firstChild);
			var toolbarElement = new OnsToolbarElement();
			var spy = chai.spy.on(element, 'insertBefore');
	  	element._registerToolbar(toolbarElement);
	  	expect(spy).to.have.been.called.with(toolbarElement, element.children[1]);
	  });
	});

	describe('#_getBottomToolbarElement()', () => {
	  it('inserts bottomToolbar as a child', () => {
	  	var element = new OnsPageElement();
	  	element._registerBottomToolbar(new OnsBottomToolbarElement());
	  	expect(element._getBottomToolbarElement()).to.be.ok;
	  });
	});

	describe('#registerExtraElement()', () => {
	  it('attaches a new child to the page', () => {
	  	var element = new OnsPageElement();
	  	expect(element.lastChild.className).to.equal('page__content');
	  	element._registerExtraElement(document.createElement('div'));
	  	expect(element.lastChild.className).to.equal('page__extra');
	  });
	});

	describe('#_tryToFillStatusBar()', () => {
	  it('fills status bar', () => {
	  	var element = new OnsPageElement();
	  	var tmp = ons._internal.shouldFillStatusBar;
	  	ons._internal.shouldFillStatusBar = () => {return true;};
	  	element._tryToFillStatusBar();
	  	ons._internal.shouldFillStatusBar = tmp;
	  	expect(element.firstChild.className).to.equal('page__status-bar-fill');
	  });
	});

	describe('#attributeChangedCallback()', () => {
	  it('triggers \'onModifierChanged()\' method', () => {
	  	var element = new OnsPageElement();
    	element.setAttribute('modifier', 'hoge');
    	element.attributeChangedCallback('hoge','fuga','piyo');
	  	expect(() => element.attributeChangedCallback('hoge','fuga','piyo')).to.be.ok;
	  });
	});

	describe('#_compile()', () => {
	  it('does not compile twice', () => {
	  	var element = new OnsPageElement();
	  	var formerLastChild = element.lastChild;
	  	element._compile();
	  	expect(element.lastChild).to.equal(formerLastChild);
	  });

	  it('uses style attribute', () => {
	  	var element = new OnsPageElement();
	  	while (element.lastChild) {
				element.removeChild(element.lastChild);
			}
    	element.setAttribute('style', 'hoge');
    	element._compile();
	  	expect(element.hasAttribute('style')).to.be.false;
	  	expect(element.firstChild.hasAttribute('style')).to.be.true;
	  });
	});
});

