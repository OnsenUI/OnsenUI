(function() {
	'use strict';
	Modernizr.testStyles('#modernizr { -webkit-overflow-scrolling:touch }', function(elem, rule) {
		Modernizr.addTest(
			'overflowtouch',
			window.getComputedStyle && window.getComputedStyle(elem).getPropertyValue('-webkit-overflow-scrolling') == 'touch');
	});

	yepnope({
		test: Modernizr.overflowtouch,
		// nope: ['lib/onsen/css/polyfill/sliding_menu_polyfill.css']
		nope: ['plugins/onsenui/0.6.0/css/polyfill/sliding_menu_polyfill.css']
	});

})();