Modernizr.testStyles('#modernizr { -webkit-overflow-scrolling:touch }', function(elem, rule) {
	Modernizr.addTest(
		'overflowtouch',
		window.getComputedStyle && window.getComputedStyle(elem).getPropertyValue('-webkit-overflow-scrolling') == 'touch');
});

yepnope({
	test: Modernizr.svg,
	nope: ['css/topcoat-mobile-light-polyfill.css']
});

yepnope({
	test: Modernizr.overflowtouch,
	nope: ['css/sliding_menu_polyfill.css']
});

yepnope({
	test: Modernizr.overflowtouch,
	nope: ['lib/iscroll-lite.js']
});