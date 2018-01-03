class NavigatorController {
	pushPage(page, options = {}) {
		this.nav.pushPage(page, options);
	}
	popPage(options) {
		this.nav.popPage(options);
	}
}

export default NavigatorController;
