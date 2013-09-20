window.addEventListener('load', function() {
	new FastClick(document.body);

	setTimeout(function() {
		// Hide the address bar!
		window.scrollTo(0, 1);
	}, 0);

}, false);