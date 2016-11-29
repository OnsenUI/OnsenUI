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

export interface AlertDialogRef {
  alertDialog: any;
  destroy: Function;
}

/**
 * @object AlertDialogFactory
 */
@Injectable()
export class AlertDialogFactory {

  constructor(
    private _injector: Injector,
    private _resolver: ComponentFactoryResolver,
    private _appRef: ApplicationRef,
    private _componentLoader: ComponentLoader
  ) {
  }

  createAlertDialog(componentType: Type<any>, params: Object = {}): Promise<AlertDialogRef> {
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
        const alertDialogElement = element.tagName === 'ONS-ALERT-DIALOG' ? element : element.querySelector('ons-alert-dialog');

        if (!alertDialogElement) {
          throw Error('<ons-alert-dialog> element is not found in component\'s template.');
        }

        resolve({alertDialog: alertDialogElement, destroy: () => componentRef.destroy()});
      });
    });
  }
}
