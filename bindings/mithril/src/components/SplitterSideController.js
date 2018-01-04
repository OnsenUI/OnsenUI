class SplitterSideController {
	open(options = {}) {
		this.splitter.open(options);
	}
	close(options = {}) {
		this.splitter.close(options);
	}
	toggle(options = {}) {
		console.log(this.splitter);
		this.splitter.toggle(options);
	}
}

export default SplitterSideController;
