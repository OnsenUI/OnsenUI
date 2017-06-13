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

export interface ModalRef {
  modal: any;
  destroy: Function;
}

/**
 * @object ModalFactory
 */
@Injectable()
export class ModalFactory {

  constructor(
    private _injector: Injector,
    private _resolver: ComponentFactoryResolver,
    private _appRef: ApplicationRef,
    private _componentLoader: ComponentLoader,
    private _zone: NgZone
  ) {
  }

  createModal(componentType: Type<any>, params: Object = {}): Promise<ModalRef> {
    console.warn('[ngx-onsenui] ModalFactory is deprecated since 4.0.0-rc.0. Place <ons-modal> into your component instead.');

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
          const modalElement = element.tagName === 'ONS-MODAL' ? element : element.querySelector('ons-modal');

          if (!modalElement) {
            throw Error('<ons-modal> element is not found in component\'s template.');
          }

          resolve({modal: modalElement, destroy: () => componentRef.destroy()});
        });
      });
    });
  }
}
