class NavigatorController {
	pushPage(page, options = {}) {
		this.nav.pushPage(page, options);
	}
	popPage(options={}) {
		this.nav.popPage(options);
	}
	resetPage(page, options={}) {
		this.nav.resetPage(page, options);
	}
	replacePage(page, options={}) {
		this.nav.replacePage(page, options);
	}
	resetPageStack(pageStack, options={}) {
		this.nav.resetPageStack(pageStack, options);
	}
}

export default NavigatorController;
