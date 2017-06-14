import {
  Injector,
  ComponentFactoryResolver,
  Injectable,
  ApplicationRef,
  ComponentRef,
  ReflectiveInjector,
  Type,
  NgZone
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
    private _componentLoader: ComponentLoader,
    private _zone: NgZone
  ) {
  }

  createAlertDialog(componentType: Type<any>, params: Object = {}): Promise<AlertDialogRef> {
    console.warn('[ngx-onsenui] AlertDialogFactory is deprecated since 4.0.0-rc.0. Place <ons-alert-dialog> into your component instead.');

    return new Promise(resolve => {
      setImmediate(() => {
        this._zone.run(() => {
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
    });
  }
}
