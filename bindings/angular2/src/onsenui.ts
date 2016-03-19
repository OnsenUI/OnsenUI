import {bootstrap} from 'angular2/platform/browser'
import {
  Component,
  DynamicComponentLoader,
  Injector,
  reflector,
  Directive,
  ElementRef,
  TemplateRef,
  ViewContainerRef,
  OnInit,
  OnDestroy,
  DoCheck,
  OnChanges,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  ViewChild
} from 'angular2/core';

console.log("!!!!");


declare var ons: {_elementReady:{installImplementation: Function}};

function initAngular2Binding(injector: Injector) {
  console.log('initialize Angular2 Binding');
}

function createRootComponent() {
  @Component({
    selector: 'body',
    template: ''
  })
  class RootComponent {}

  return RootComponent;
}

function bootstrapWithOnsenUI(componentType: Function) {
  return bootstrap(createRootComponent()).then(componentRef => {

    initAngular2Binding(componentRef.injector);

    const injector = componentRef.injector;
    const dynamicComponentLoader = injector.get(DynamicComponentLoader);

    return dynamicComponentLoader.loadAsRoot(componentType, null, injector).catch(error => {
      console.log(error);
    });
  });
}

//bootstrapWithOnsenUI(AppComponent);
//bootstrap(AppComponent);

ons._elementReady.installImplementation(function(element, callback) {
  setImmediate(callback);
});
