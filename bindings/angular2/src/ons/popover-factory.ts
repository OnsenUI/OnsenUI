import {
  Injector,
  ElementRef,
  Type,
  ComponentResolver,
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
    private _resolver: ComponentResolver,
    private _appRef: ApplicationRef
  ) {
  }

  createPopover(componentType: Type, params: Object = {}): Promise<PopoverRef> {
    return this._resolver.resolveComponent(componentType).then(factory => {
      const injector = ReflectiveInjector.resolveAndCreate([
        provide(Params, {useValue: new Params(params)})
      ], this._injector);

      const rootViewContainerRef = this._appRef['_rootComponents'][0]['_hostElement'].vcRef; // TODO: fix this dirty hack
      const componentRef = rootViewContainerRef.createComponent(factory, 0, injector);
      const element = componentRef.location.nativeElement.children[0];
      const popoverElement = element.tagName === 'ONS-POPOVER' ? element : element.querySelector('ons-popover');

      return {popover: popoverElement, destroy: () => componentRef.destroy()};
    });
  }
}
