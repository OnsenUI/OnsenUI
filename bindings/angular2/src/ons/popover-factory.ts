import {
  Injector,
  ElementRef,
  ComponentFactoryResolver,
  provide,
  Injectable,
  ApplicationRef,
  ComponentRef,
  ViewContainerRef,
  ReflectiveInjector
} from '@angular/core';
import {Params} from './params';

export interface PopoverRef {
  popover: any;
  destroy: Function;
}

@Injectable()
export class PopoverFactory {

  constructor(
    private _injector: Injector,
    private _resolver: ComponentFactoryResolver,
    private _appRef: ApplicationRef
  ) {
  }

  createPopover(componentType: any, params: Object = {}): Promise<PopoverRef> { // TODO: fix "any"
    return new Promise(resolve => {
      setImmediate(() => {
        const factory = this._resolver.resolveComponentFactory(componentType);
        const injector = ReflectiveInjector.resolveAndCreate([
          provide(Params, {useValue: new Params(params)})
        ], this._injector);

        const rootViewContainerRef = this._appRef['_rootComponents'][0]['_hostElement'].vcRef; // TODO: fix this dirty hack
        const componentRef = rootViewContainerRef.createComponent(factory, 0, injector);
        const element = componentRef.location.nativeElement.children[0];
        const popoverElement = element.tagName === 'ONS-POPOVER' ? element : element.querySelector('ons-popover');

        resolve({popover: popoverElement, destroy: () => componentRef.destroy()});
      });
    });
  }
}
