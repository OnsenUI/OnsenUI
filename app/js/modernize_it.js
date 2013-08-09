Modernizr.testStyles('#modernizr { -webkit-overflow-scrolling:touch }', function(elem, rule) {
	Modernizr.addTest(
		'overflowtouch',
		window.getComputedStyle && window.getComputedStyle(elem).getPropertyValue('-webkit-overflow-scrolling') == 'touch');
});

yepnope({
	test: Modernizr.svg,
	nope: ['maccha/app/css/topcoat-mobile-light-polyfill.css']
});

yepnope({
	test: Modernizr.overflowtouch,
	nope: ['maccha/app/css/sliding_menu_polyfill.css']
});

yepnope({
	test: Modernizr.overflowtouch,
	nope: ['maccha/app/lib/iscroll-lite.js']
});