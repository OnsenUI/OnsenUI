/*
 * childNode.remove method polyfill for IE.
 * https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
 */

(function() {
	if (!('remove' in Element.prototype)) {
	  Element.prototype.remove = function() {
	    if (this.parentNode) {
	    	this.parentNode.removeChild(this);
	    }
	  };
	}
})();
