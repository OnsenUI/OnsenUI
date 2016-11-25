import {
  Injector,
  ComponentFactoryResolver,
  Injectable,
  ApplicationRef,
  ComponentRef,
  ReflectiveInjector,
  Type
} from '@angular/core';
import {Params} from './params';
import {ComponentLoader} from './component-loader';

export interface DialogRef {
  dialog: any;
  destroy: Function;
}

/**
 * @object DialogFactory
 */
@Injectable()
export class DialogFactory {

  constructor(
    private _injector: Injector,
    private _resolver: ComponentFactoryResolver,
    private _appRef: ApplicationRef,
    private _componentLoader: ComponentLoader
  ) {
  }

  createDialog(componentType: Type<any>, params: Object = {}): Promise<DialogRef> { // TODO: fix "any"
    return new Promise(resolve => {
      setImmediate(() => {
        const factory = this._resolver.resolveComponentFactory(componentType);
        const injector = ReflectiveInjector.resolveAndCreate([
          {provide: Params, useValue: new Params(params)}
        ], this._injector);
        const componentRef = factory.create(injector);
        const rootElement = componentRef.location.nativeElement;

        this._componentLoader.load(componentRef);

        const element = rootElement.children[0];
        const dialogElement = element.tagName === 'ONS-DIALOG' ? element : element.querySelector('ons-dialog');

        if (!dialogElement) {
          throw Error('<ons-dialog> element is not found in component\'s template.');
        }

        resolve({dialog: dialogElement, destroy: () => componentRef.destroy()});
      });
    });
  }
}

