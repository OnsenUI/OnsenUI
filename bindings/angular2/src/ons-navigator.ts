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

export class PageParams {
  constructor(private _data = {}) {}

  at(key: string): any {
    return this._data[key];
  }

  get data() {
    return this._data;
  }
}

export class NavigatorPage {
  constructor(public elementRef: ElementRef, public component: Type, public type: Function, public dispose: Function, public params: PageParams) {
  }
}

@Directive({
  selector: 'ons-navigator > ons-page'
})
export class OnsNavigator {
  private _navigator: NavigatorElement;
  private _providers: ResolvedProvider[];
  private _pages: NavigatorPage[];

  constructor(private _elementRef: ElementRef, private _compiler: Compiler, private _viewManager: AppViewManager) {
    this._navigator = _elementRef.nativeElement;
    this._providers = Injector.resolve([
      provide(OnsNavigator, {useValue: this})
    ]);
    this._pages = [];
  }

  /**
   * @method pushComponent
   * @signature pushComponent(type: Type, params: Map = {})
   * @param {Type} type
   * @param {Map} params
   */
  pushComponent(type: Type, params: Object = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this.loadPageComponent(type, params, navigatorPage => {
        this._pages.push(navigatorPage);
        resolve(navigatorPage);
      });
    });
  }

  private loadPageComponent(type: Type, params: Object, done: Function): void {
    this._compiler.compileInHost(type).then(hostProtoViewRef => {
      const location = this._elementRef;
      const pageParams = new PageParams(params);
      const providers = this._providers.concat(Injector.resolve([
        provide(PageParams, {useValue: pageParams})
      ]));
      const viewContainer = this._viewManager.getViewContainer(location);
      const hostViewRef = viewContainer.createHostView(hostProtoViewRef, viewContainer.length, providers);
      const elementRef = this._viewManager.getHostElement(hostViewRef);
      const component = this._viewManager.getComponent(elementRef);

      const dispose = () => {
        const index = viewContainer.indexOf(hostViewRef);
        if (!hostViewRef.destroyed && index !== -1) {
          viewContainer.remove(index);
        }
      };

      done(new NavigatorPage(elementRef, component, type, dispose, pageParams));
    });
  }

  popComponent(): Promise<any> {
    return new Promise((resolve, reject) => {
      const page: NavigatorPage = this._pages.pop();
      page.dispose();

      resolve();
    });
  }
}

