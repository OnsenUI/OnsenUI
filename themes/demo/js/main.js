window.onload = function(){
	var showCodeDivs = document.getElementsByClassName('showcode');
	for (var i = showCodeDivs.length - 1; i >= 0; i--) {
		showCodeDivs[i].firstChild.onclick = function(e) {
			var element = e.target.nextSibling.nextSibling;
			var style = window.getComputedStyle(element);
			if(style.getPropertyValue('display') == 'none'){
				e.target.innerHTML = 'Hide code snippets';
				element.style.display = 'block';
			} else {
				e.target.innerHTML = 'Show code snippets';
				element.style.display = 'none';
			}
			return false;
		};
	};
	var slideMenuButton = document.getElementById('slide-menu-button');
	slideMenuButton.onclick = function(e) {
		var site = document.getElementById('site');
		var cl = site.classList;
		if (cl.contains('open')) {
			cl.remove('open');
		} else {
			cl.add('open');
		}
	};
	var docNavs = document.getElementsByClassName('docNav');
	for (var j = docNavs.length - 1; j >= 0; j--) {
		docNavs[j].onchange = function(e){
			window.location.href = e.target[e.target.selectedIndex].value;
		};
	};
	var pageNav = document.getElementById('pageNav');
	var pageLinks = pageNav.getElementsByTagName('a');
	for (var k = pageLinks.length - 1; k >= 0; k--) {
		pageLinks[k].onclick = function(e) {
			var site = document.getElementById('site');
			var cl = site.classList;
			if (cl.contains('open')) {
				cl.remove('open');
			}
		};
	};
}
