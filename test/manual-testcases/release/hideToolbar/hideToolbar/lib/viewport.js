function Viewport(vierportElement){
	this.vierportElement = vierportElement;
	this.platform = {};
	this.platform.name = this.getPlatformName();
	this.platform.version = this.getPlatformVersion();
}

Viewport.prototype.getPlatformName = function(){
	if (navigator.userAgent.match(/Android/i)) {
		return "android";
	}

	if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
		return "ios";
	}

	// unknown
	return undefined;
};

Viewport.prototype.getPlatformVersion = function(){
	return window.Number( agent.substr( start + 3, 3 ).replace( '_', '.' ) );
}