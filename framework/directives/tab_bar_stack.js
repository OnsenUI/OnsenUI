(function() {
  var module = angular.module('onsen');

  module.factory('TabbarStack', function($rootScope, $onsen) {
    var TabbarStack = Class.extend({
      tabbars: [],

      init: function() {
        $rootScope.ons = $rootScope.ons || {};
        $rootScope.ons.tabbar = {};
        $rootScope.ons.tabbar.setActiveTab = this.setActiveTab.bind(this);
      },

      _findClosestTabbar: function($event) {

        var tabbar;
        if ($event) {
          var tabbarElement = $onsen.upTo($event.target, 'ons-tabbar');
          tabbar = angular.element(tabbarElement).isolateScope();
        } else {
          tabbar = this.tabbars[this.tabbars.length - 1];
        }

        return tabbar;
      },

      _checkExistence: function() {
        if (this.tabbars.length === 0) {
          throw new Error('oops!! no tabbar registerred');
        }
      },

      add: function(tabbar) {
        this.tabbars.push(tabbar);
      },

      remove: function(tabbar){
        for (var i = 0; i < this.tabbars.length; i++) {
          if(this.tabbars[i] == tabbar){
            this.tabbars.splice(i, 1);
          }
        }
      },

      setActiveTab: function(index, $event){
        this._checkExistence();

        var tabbar = this._findClosestTabbar($event);
        tabbar.setActiveTab(index);
      }
    });

    return new TabbarStack();
  });
})();
