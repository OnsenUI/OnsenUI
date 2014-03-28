(function(){
        
    var directives = angular.module('onsen.directives'); 
        
    //Attache ontouchstart event to the element.
    directives.directive('onsTouchstart', function() {
        return function(scope, element, attrs) {
            element.bind('touchstart', function() {
                scope.$apply(attrs['onsTouchstart']);
            });
        };
    });
})();

(function(){

    var directives = angular.module('onsen.directives');

    //Attache ontouchend event to the element.
    directives.directive('onsTouchend', function() {
        return function(scope, element, attrs) {
            element.bind('touchend', function() {
                scope.$apply(attrs['onsTouchend']);
            });
        };
    });
})();


