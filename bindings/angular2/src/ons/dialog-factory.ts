import {
  Injector,
  ComponentFactoryResolver,
  Injectable,
  ApplicationRef,
  ComponentRef,
  ReflectiveInjector
} from '@angular/core';
import {Params} from './params';

export interface DialogRef {
  dialog: any;
  destroy: Function;
}

@Injectable()
export class DialogFactory {

  constructor(
    private _injector: Injector,
    private _resolver: ComponentFactoryResolver,
    private _appRef: ApplicationRef
  ) {
  }

  createDialog(componentType: any, params: Object = {}): Promise<DialogRef> { // TODO: fix "any"
    return new Promise(resolve => {
      setImmediate(() => {
        const factory = this._resolver.resolveComponentFactory(componentType);
        const injector = ReflectiveInjector.resolveAndCreate([
          {provide: Params, useValue: new Params(params)}
        ], this._injector);

        const rootViewContainerRef = this._appRef['_rootComponents'][0]['_hostElement'].vcRef; // TODO: fix this dirty hack
        const componentRef = rootViewContainerRef.createComponent(factory, 0, injector);
        const element = componentRef.location.nativeElement.children[0];
        const dialogElement = element.tagName === 'ONS-DIALOG' ? element : element.querySelector('ons-dialog');

        resolve({dialog: dialogElement, destroy: () => componentRef.destroy()});
      });
    });
  }
}

