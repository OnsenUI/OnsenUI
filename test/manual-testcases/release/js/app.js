var app = angular.module('myApp', ['onsen.directives']);

app.controller('inheritCtrl', function ($scope) {


    $scope.test = function () {
        alert('inherited');
    };

    $scope.pushTestPage = function (mainDirectory, subDirectory, id, page) {

        var page = page || 'index.html'
        var id = id || subDirectory;

        $scope.ons.navigator.pushPage(mainDirectory + "/" + subDirectory + "/" + page, {
            leftButtonIcon: 'fa fa-angle-left',
            onLeftButtonClick: 'back(\'#' + id + '\')'
        });
    }

    $scope.linkPage = function (mainDirectory, subDirectory, page) {

        var page = page || 'index.html';

        location.href = mainDirectory + "/" + subDirectory + "/" + page;
    }

    $scope.back = function (id) {
        $(id).hide();
        $scope.ons.navigator.popPage();
    };

});