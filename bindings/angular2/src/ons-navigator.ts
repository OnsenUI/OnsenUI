import {
  Component,
  DynamicComponentLoader,
  Injector,
  Directive,
  ElementRef,
  Type,
  Compiler,
  provide,
  NgZone,
  AppViewManager,
  Renderer,
  ResolvedProvider,
  Input
} from 'angular2/core';

declare class NavigatorElement {
  public pushPage(page: string);
};

@Directive({
  selector: 'ons-navigator',
  providers: []
})
export class OnsNavigator {
  private _navigator: NavigatorElement;
  private _providers: ResolvedProvider[];

  constructor(private _elementRef: ElementRef, private _compiler: Compiler, private _viewManager: AppViewManager) {
    this._navigator = _elementRef.nativeElement;
    this._providers = Injector.resolve([
      provide(OnsNavigator, {useValue: this})
    ]);
  }

  pushComponent(type: Type): Promise<any> {
    console.log("this is pushComponent");

    this.loadPageComponent(type, component => {
      console.log('kita-!', component);
    });

    return Promise.reject(null);
  }

  private loadPageComponent(type: Type, done: Function): void {
    this._compiler.compileInHost(type).then(hostProtoViewRef => {
      const location = this._elementRef;
      const viewContainer = this._viewManager.getViewContainer(location);
      const hostViewRef = viewContainer.createHostView(hostProtoViewRef, viewContainer.length, this._providers);
      const elementRef = this._viewManager.getHostElement(hostViewRef);
      const component = this._viewManager.getComponent(elementRef);

      done(component);
    });
  }

  popComponent(): Promise<any> {
    // TODO: implement
    return Promise.reject(null);
  }
}

