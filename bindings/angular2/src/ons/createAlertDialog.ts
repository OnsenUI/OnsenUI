import {
  Component,
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
  Input,
  Injectable,
  DynamicComponentLoader,
  RootRenderer,
  ApplicationRef,
  RenderComponentType,
  ViewEncapsulation,
  ComponentRef
} from 'angular2/core';

const gen = (() => {
  let i = 0;
  return () => {
    return i++;
  };
})();

@Injectable()
export class AlertDialogFactory {
  constructor(
    private _dcl: DynamicComponentLoader,
    private _compiler: Compiler,
    private _rootRenderer: RootRenderer,
    private _viewManager: AppViewManager,
    private _injector: Injector
  ) {
  }

  createAlertDialog(componentType: Type, params: Object = {}): Promise<ComponentRef> {
    const id = this._createBackDrop();
    const dispose = () => {
      const backdrop: any = document.querySelector('#' + id);
      if (backdrop.childen[0] && backdrop.children[0].dismiss instanceof Function) {
        backdrop.children[0].dismiss();
      }
      backdrop.remove();
    };

    return this._dcl.loadAsRoot(componentType, '#' + id, this._injector, dispose)
      .then(componentRef => {
        return new Promise(resolve => {
          setImmediate(() => {
            componentRef.location.nativeElement.children[0].show();
            resolve(componentRef);
          });
        });
      });
  }

  _createBackDrop(): string {
    const backdrop = window.document.createElement('div');
    const id = 'ons-alert-dialog-backdrop-' + gen();
    backdrop.setAttribute('id', id);
    window.document.body.appendChild(backdrop);

    return id;
  }
}
