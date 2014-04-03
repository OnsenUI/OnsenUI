var app = angular.module('myApp', [ 'onsen.directives']);


app.controller('inheritCtrl', function($scope){
    
    $scope.test = function(){
        alert('inherited');
    };
    
    
    $scope.back = function(id){
        $(id).hide();
        $scope.ons.navigator.popPage();
    };

    

    
});

app.controller('hoge', function($scope){
    
    $scope.test = function(){
        alert('hoge');
    };
    
});

app.controller('testCaseCtrl', function($scope){
    
    
    
});



