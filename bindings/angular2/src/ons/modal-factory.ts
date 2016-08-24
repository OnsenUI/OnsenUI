import {
  Injector,
  Type,
  ComponentResolver,
  provide,
  Injectable,
  ApplicationRef,
  ComponentRef,
  ReflectiveInjector
} from '@angular/core';
import {Params} from './params';

export interface ModalRef {
  modal: any;
  destroy: Function;
}

@Injectable()
export class ModalFactory {

  constructor(
    private _injector: Injector,
    private _resolver: ComponentResolver,
    private _appRef: ApplicationRef
  ) {
  }

  createModal(componentType: Type, params: Object = {}): Promise<ModalRef> {
    return this._resolver.resolveComponent(componentType).then(factory => {
      const injector = ReflectiveInjector.resolveAndCreate([
        provide(Params, {useValue: new Params(params)})
      ], this._injector);

      const rootViewContainerRef = this._appRef['_rootComponents'][0]['_hostElement'].vcRef; // TODO: fix this dirty hack
      const componentRef = rootViewContainerRef.createComponent(factory, 0, injector);
      const element = componentRef.location.nativeElement.children[0];
      const modalElement = element.tagName === 'ONS-MODAL' ? element : element.querySelector('ons-modal');

      return {modal: modalElement, destroy: () => componentRef.destroy()};
    });
  }
}
