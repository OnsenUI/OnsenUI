System.registerDynamic("onsenui.js", ["angular2/platform/browser", "angular2/core"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var browser_1 = $__require('angular2/platform/browser');
  var core_1 = $__require('angular2/core');
  console.log("!!!!");
  function initAngular2Binding(injector) {
    console.log('initialize Angular2 Binding');
  }
  function createRootComponent() {
    var RootComponent = (function() {
      function RootComponent() {}
      RootComponent = __decorate([core_1.Component({
        selector: 'body',
        template: ''
      }), __metadata('design:paramtypes', [])], RootComponent);
      return RootComponent;
    })();
    return RootComponent;
  }
  function bootstrapWithOnsenUI(componentType) {
    return browser_1.bootstrap(createRootComponent()).then(function(componentRef) {
      initAngular2Binding(componentRef.injector);
      var injector = componentRef.injector;
      var dynamicComponentLoader = injector.get(core_1.DynamicComponentLoader);
      return dynamicComponentLoader.loadAsRoot(componentType, null, injector).catch(function(error) {
        console.log(error);
      });
    });
  }
  ons._elementReady.installImplementation(function(element, callback) {
    setImmediate(callback);
  });
  return module.exports;
});
