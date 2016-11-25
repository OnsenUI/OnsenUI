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
    private _appRef: ApplicationRef
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

        const rootContainer = this._appRef['_rootComponents'][0].location.nativeElement;
        rootContainer.appendChild(rootElement);
        if (this._appRef['registerChangeDetector']) {
          this._appRef['registerChangeDetector'](componentRef.changeDetectorRef);
        }

        componentRef.onDestroy(() => {
          if (this._appRef['unregisterChangeDetector']) {
            this._appRef['unregisterChangeDetector'](componentRef.changeDetectorRef);
          }

          if (rootElement.parentNode) {
            rootElement.parentNode.removeChild(rootElement);
          }
        });

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
