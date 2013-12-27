var myApp = angular.module('myApp');

myApp.factory('Data', function(){
    var data = {};
    
    data.items = [
        { 
            title: 'Item 1',
            description: 'Item 1 Description'
        },
        { 
            title: 'Item 2',
            description: 'Item 2 Description'
        },
        { 
            title: 'Item 3',
            description: 'Item 3 Description'
        }
    ]; 
    
    return data;
});