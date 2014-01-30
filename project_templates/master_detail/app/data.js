var myApp = angular.module('myApp');

myApp.factory('Data', function(){
    var data = {};
    
    data.items = [
        { 
            title: 'Item 1 Title',
            icon: 'comments-o',
            description: 'Item 1 Description'
        },
        { 
            title: 'Another Item Title',
            icon: 'desktop',
            description: 'Item 2 Description'
        },
        { 
            title: 'Yet Anoter Item Title',
            icon: 'heart-o',
            description: 'Item 3 Description'
        }
    ]; 
    
    return data;
});